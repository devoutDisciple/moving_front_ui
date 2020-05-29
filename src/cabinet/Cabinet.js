/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../util/Request';
import Toast from '../component/Toast';
import CabinetItem from './CabinetItem';
import CommonSylte from '../style/common';
import CommonHeader from '../component/CommonHeader';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../component/Loading';
import storageUtil from '../util/Storage';
import Message from '../component/Message';
import { INIT_BOX_STATE, EXPRESS_LIST } from './const';

const { width } = Dimensions.get('window');

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'smallBox',
			loadingVisible: false,
			boxDetail: INIT_BOX_STATE.INIT_BOX_STATE,
			expressList: EXPRESS_LIST,
		};
		this.getParams = this.getParams.bind(this);
		this.addOrder = this.addOrder.bind(this);
		this.getState = this.getState.bind(this);
	}

	async componentDidMount() {
		console.log(this.props.navigation, 888);
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

	getState() {
		let params = this.getParams();
		Request.get('/cabinet/getStateById', { boxid: params.boxid }).then(res => {
			this.setState({
				boxDetail: res.data || INIT_BOX_STATE.INIT_BOX_STATE,
			});
		});
	}

	onPress(id) {
		this.setState({ active: id });
	}

	// 打开柜子
	onOpenCabinet() {
		let detail = this.getParams();
		this.setState({ loadingVisible: true }, () => {
			Request.post('/cabinet/open', { boxid: detail.boxid, type: this.state.active })
				.then(res => {
					if (res.code === 200) {
						let { boxid, cellid } = res.data;
						this.addOrder(boxid, cellid);
						return Toast.success('柜子已打开, 请存放衣物!');
					}
					Toast.warning('网络错误');
				})
				.finally(() => this.setState({ loadingVisible: false }));
		});
	}

	async addOrder(boxid, cellid) {
		let params = this.getParams();
		let shop = await storageUtil.get('shop'),
			user = await storageUtil.get('user');
		let shopid = shop.id,
			userid = user.id;
		let result = await Request.post('/order/add', {
			shopid,
			userid,
			goods: JSON.stringify(params.goods || []),
			money: params.totalPrice,
			desc: params.remark,
			status: 1,
			cabinetId: params.cabinetId,
			boxid,
			cellid,
		});
		if (result.data === 'success') {
			Message.warning('订单已生成', '祝您生活愉快');
		}
	}

	render() {
		const { navigation } = this.props;
		let { active, expressList, boxDetail, loadingVisible } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader title="选择柜口" navigation={navigation} />
				<ScrollView style={styles.cabinet}>
					<View style={styles.cabinet_item}>
						<View style={styles.detail_common_title}>
							<Text>幸福家园北门一号柜</Text>
						</View>
						<View style={styles.cabinet_item_content}>
							{expressList.map((item, index) => {
								return (
									<CabinetItem
										key={index}
										id={item.id}
										boxDetail={boxDetail}
										onPress={this.onPress.bind(this)}
										title={item.title}
										active={active === item.id}
										source={item.normalImg}
										acitveSource={item.activeImg}
										desc={item.desc}
									/>
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

let itemHeight = (width - 60) / 3 + 20;
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
