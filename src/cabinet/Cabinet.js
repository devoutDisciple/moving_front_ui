/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../util/Request';
import CabinetItem from './CabinetItem';
import CommonSylte from '../style/common';
import CommonHeader from '../component/CommonHeader';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../component/Loading';
import storageUtil from '../util/Storage';
import Message from '../component/Message';
import { INIT_BOX_STATE } from './const';

const { width } = Dimensions.get('window');

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'smallBox',
			loadingVisible: false,
			boxDetail: INIT_BOX_STATE.INIT_BOX_STATE,
		};
		this.getParams = this.getParams.bind(this);
		this.addOrder = this.addOrder.bind(this);
		this.getState = this.getState.bind(this);
	}

	async componentDidMount() {
		await this.getState();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.getParams);
		window.removeEventListener('scroll', this.addOrder);
		window.removeEventListener('scroll', this.getState);
	}

	getParams() {
		let { navigation } = this.props;
		let boxid = navigation.getParam('boxid', ''),
			goods = navigation.getParam('goods', ''),
			remark = navigation.getParam('remark', ''),
			cabinetId = navigation.getParam('cabinetId', ''),
			totalPrice = navigation.getParam('totalPrice', '');
		return { goods, boxid, remark, totalPrice, cabinetId };
	}

	// 获取格子的可用状态
	getState() {
		let params = this.getParams();
		Request.get('/cabinet/getStateById', { cabinetId: params.cabinetId || 8 }).then(res => {
			let data = res.data;
			let boxState = INIT_BOX_STATE.INIT_BOX_STATE;
			boxState[0].used = data && data.samllBox ? data.samllBox.used : 0;
			boxState[0].empty = data && data.samllBox ? data.samllBox.empty : 0;
			boxState[1].used = data && data.bigBox ? data.bigBox.used : 0;
			boxState[1].empty = data && data.bigBox ? data.bigBox.empty : 0;
			this.setState({
				boxDetail: boxState,
			});
		});
	}

	// 切换格口
	onPress(id) {
		this.setState({ active: id });
	}

	// 打开柜子
	onOpenCabinet() {
		let detail = this.getParams();
		let boxid = detail.boxid,
			type = this.state.active,
			cabinetId = detail.cabinetId;
		this.setState({ loadingVisible: true }, () => {
			Request.post('/cabinet/openCellSave', { cabinetId, boxid, type })
				.then(res => {
					if (res.code === 200) {
						let { cellid } = res.data;
						return this.addOrder(detail.boxid, cellid);
						// return Toast.success('柜子已打开, 请存放衣物!');
					}
				})
				.finally(() => this.setState({ loadingVisible: false }));
		});
	}

	// 增加订单
	async addOrder(boxid, cellid) {
		let params = this.getParams();
		let shop = await storageUtil.get('shop'),
			user = await storageUtil.get('user');
		let shopid = shop.id,
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
			order_type: 1, // 通过柜子送货
		});
		if (result.data === 'success') {
			Message.warning('柜子已打开, 请存放衣物!', '订单已生成,祝您生活愉快');
			this.getState();
		}
	}

	render() {
		const { navigation } = this.props;
		let { active, boxDetail, loadingVisible } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader title="选择柜口" navigation={navigation} back={() => navigation.navigate('HomeScreen')} />
				<ScrollView style={styles.cabinet}>
					<View style={styles.cabinet_item}>
						<View style={styles.detail_common_title}>
							<Text>幸福家园北门一号柜</Text>
						</View>
						<View style={styles.cabinet_item_content}>
							{boxDetail.map((item, index) => {
								return (
									<CabinetItem key={index} detail={item} active={active === item.id} onPress={this.onPress.bind(this)} />
								);
							})}
						</View>
					</View>
					<View style={styles.cabinet_tip}>
						<Text style={styles.cabinet_tip_text}>Tip: 柜子可免费存放三天,超出时间将收取费用</Text>
						<Text style={styles.cabinet_tip_text}>收到取衣通知后,请尽快取回您的衣物</Text>
						<Text style={styles.cabinet_tip_text}>谢谢配合!</Text>
					</View>
				</ScrollView>
				<TouchableOpacity style={styles.cabinet_item_bottom} onPress={this.onOpenCabinet.bind(this)}>
					<Text style={styles.cabinet_item_bottom_text}>打开柜子</Text>
				</TouchableOpacity>
				<Loading visible={loadingVisible} />
			</View>
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
