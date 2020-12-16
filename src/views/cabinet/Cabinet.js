/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '@/util/Request';
import CabinetItem from './CabinetItem';
import CommonSylte from '@/style/common';
import Loading from '@/component/Loading';
import storageUtil from '@/util/Storage';
import Message from '@/component/Message';
import { INIT_BOX_STATE } from './const';
import Alipay from '@/util/Alipay';
import PayUtil from '@/util/PayUtil';
import config from '@/config/config';
import * as WeChat from 'react-native-wechat-lib';
import CommonHeader from '@/component/CommonHeader';
import SafeViewComponent from '@/component/SafeViewComponent';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			active: 'smallBox',
			cabinetDetail: {},
			wechatVisible: false,
			loadingVisible: false,
			boxDetail: INIT_BOX_STATE.INIT_BOX_STATE,
		};
	}

	async componentDidMount() {
		await this.getInitData();
		await this.onJudgeWechat();
	}

	async onJudgeWechat() {
		let isWXAppInstalled = await WeChat.isWXAppInstalled();
		if (isWXAppInstalled) {
			this.setState({ wechatVisible: true });
		}
	}

	async getInitData() {
		try {
			this.setState({ loadingVisible: true });
			// 获取格子可用状态
			await this.getState();
			// 获取用户信息
			await this.getUserInfo();
			// 获取快递柜详细信息
			await this.getCabinetDetail();
			this.setState({ loadingVisible: false });
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	getParams() {
		let { navigation } = this.props;
		let boxid = navigation.getParam('boxid', ''),
			goods = navigation.getParam('goods', ''),
			remark = navigation.getParam('remark', ''),
			cabinetId = navigation.getParam('cabinetId', ''),
			urgency = navigation.getParam('urgency', 1),
			totalPrice = navigation.getParam('totalPrice', '');
		return { goods, boxid, remark, totalPrice, cabinetId, urgency };
	}

	// 获取格子的可用状态
	async getState() {
		let params = this.getParams();
		let res = await Request.get('/cabinet/getStateById', { cabinetId: params.cabinetId });
		let data = res.data;
		let boxState = INIT_BOX_STATE.INIT_BOX_STATE;
		boxState[0].used = data && data.samllBox ? data.samllBox.used : 0;
		boxState[0].empty = data && data.samllBox ? data.samllBox.empty : 0;
		boxState[1].used = data && data.bigBox ? data.bigBox.used : 0;
		boxState[1].empty = data && data.bigBox ? data.bigBox.empty : 0;
		this.setState({ boxDetail: boxState });
	}

	// 获取用户信息
	async getUserInfo() {
		let user = await storageUtil.get('user');
		let res = await Request.get('/user/getUserByUserid', { userid: user.id });
		let currentUser = res.data || '';
		this.setState({ user: currentUser });
	}

	// 获取当前快递柜信息
	async getCabinetDetail() {
		let params = this.getParams();
		let res = await Request.get('/cabinet/getDetailById', { cabinetId: params.cabinetId });
		this.setState({ cabinetDetail: res.data || {} });
	}

	// 切换格口
	onPress(id) {
		this.setState({ active: id });
	}

	// 点击打开柜子
	async onClickOpenBtn() {
		let { user, wechatVisible } = this.state;
		// let { navigation } = this.props;
		if (Number(user.member) === 1) {
			let res = await Request.get('/user/getUserCabinetUseTimeByUserid', { userid: user.id });
			let result = res.data || '';
			if (result.cabinet_use_time > 0) {
				return this.onOpenCabinet(true);
			}
			return Message.paySelect(
				'请知悉',
				'普通用户将收取一元钱作为洗衣柜使用费用',
				async () => {
					let alipayRes = await Request.post('/pay/payByOrderAlipay', {
						desc: '洗衣柜使用费用',
						money: config.SAVE_CLOTHING_MONEY,
						type: 'save_clothing',
						userid: user.id,
					});
					await Alipay.pay(alipayRes.data);
				},
				async () => {
					await PayUtil.payMoneyByWeChat({
						money: config.SAVE_CLOTHING_MONEY,
						desc: '洗衣柜使用费用',
						type: 'save_clothing',
						userid: user.id,
					});
				},
				async () => {
					this.getInitData();
				},
				wechatVisible,
			);
		}
		this.onOpenCabinet(false);
	}

	// 打开柜子
	async onOpenCabinet(flag) {
		let detail = this.getParams();
		let boxid = detail.boxid,
			type = this.state.active,
			cabinetId = detail.cabinetId,
			urgency = detail.urgency,
			{ user } = this.state;
		this.setState({ loadingVisible: true });
		try {
			let res = await Request.post('/cabinet/openCellSave', { cabinetId, boxid, type, userid: user.id });
			this.setState({ loadingVisible: false });
			if (res.code === 200) {
				let { cellid } = res.data;
				// 如果用户不是会员的话， 减少用户使用柜子次数
				if (flag) {
					this.subUserUseTime();
				}
				// 增加订单
				return this.addOrder(detail.boxid, cellid, urgency, flag);
			}
		} catch (error) {
			console.log(error, 111);
			this.setState({ loadingVisible: false });
		}
	}

	// 减少用户打开柜子的次数
	async subUserUseTime() {
		let { user } = this.state;
		await Request.post('/user/subCabinetUseTime', { userid: user.id });
	}

	// 增加订单
	async addOrder(boxid, cellid, urgency, flag) {
		let params = this.getParams(),
			{ navigation } = this.props,
			shop = await storageUtil.get('shop'),
			user = await storageUtil.get('user'),
			shopid = shop.id,
			userid = user.id;
		let result = await Request.post('/order/addByCabinet', {
			shopid,
			userid,
			goods: JSON.stringify(params.goods || []),
			money: params.totalPrice,
			desc: params.remark,
			status: 1,
			cabinetId: params.cabinetId,
			boxid,
			cellid,
			urgency,
			pre_pay: flag ? 1 : 0,
			order_type: 1, // 通过柜子送货
		});
		if (result.data === 'success') {
			Message.warning('洗衣柜已打开, 请存放衣物!', '订单已生成,祝您生活愉快', () => {
				return navigation.navigate('HomeScreen');
			});
			this.getState();
		}
	}

	render() {
		const { navigation } = this.props;
		let { active, boxDetail, loadingVisible, cabinetDetail } = this.state;
		return (
			<SafeViewComponent>
				<View style={{ flex: 1 }}>
					<CommonHeader title="选择柜口" navigation={navigation} back={() => navigation.navigate('HomeScreen')} />
					<ScrollView style={styles.cabinet} showsVerticalScrollIndicator={false}>
						<View style={styles.cabinet_item}>
							<View style={styles.detail_common_title}>
								<Text>{cabinetDetail.name || 'MOVING洗衣柜'}</Text>
							</View>
							<View style={styles.cabinet_item_content}>
								{boxDetail.map((item, index) => {
									return (
										<CabinetItem
											key={index}
											detail={item}
											active={active === item.id}
											onPress={this.onPress.bind(this)}
										/>
									);
								})}
							</View>
						</View>
						<View style={styles.cabinet_tip}>
							<Text style={styles.cabinet_tip_text}>Tip: 洗衣柜可免费存放三天,超出时间将收取费用</Text>
							<Text style={styles.cabinet_tip_text}>收到取衣通知后,请尽快取回您的衣物</Text>
							<Text style={styles.cabinet_tip_text}>谢谢配合!</Text>
						</View>
					</ScrollView>
					<TouchableOpacity style={styles.cabinet_item_bottom} onPress={this.onClickOpenBtn.bind(this)}>
						<Text style={styles.cabinet_item_bottom_text}>打开柜子</Text>
					</TouchableOpacity>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

let itemHeight = (width - 60) / 2 + 20;
const styles = StyleSheet.create({
	cabinet: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
	},
	detail_common_title: CommonSylte.detail_common_title,
	cabinet_item: {
		padding: 10,
		borderWidth: 0.5,
		borderColor: '#dbdbdb',
		marginBottom: 10,
	},
	cabinet_item_content: {
		flexDirection: 'row',
		height: itemHeight,
	},
	cabinet_item_bottom: {
		height: 50,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cabinet_item_bottom_text: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '800',
	},
	cabinet_tip: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cabinet_tip_text: {
		fontSize: 12,
		color: '#8a8a8a',
	},
});
