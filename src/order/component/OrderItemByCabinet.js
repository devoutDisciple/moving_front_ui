/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MoneyItem from './MoneyItem';
import Request from '../../util/Request';
import Config from '../../config/config';
import Toast from '../../component/Toast';
import { Badge } from 'react-native-elements';
import Message from '../../component/Message';
import FastImage from '../../component/FastImage';
import FilterStatus from '../../util/FilterStatus';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
		this.renderBtn = this.renderBtn.bind(this);
		this.updateOrderStatus = this.updateOrderStatus.bind(this);
	}

	componentDidMount() {}

	// 点击去支付
	async payOrder() {
		try {
			// 判断店员是否确认
			let { is_sure, id } = this.props.detail;
			if (Number(is_sure) !== 2) {
				return Toast.warning('订单金额待店员确认，请稍后');
			}
			// 查看会员余额是否充足
			let { navigation } = this.props;
			navigation.navigate('PayOrderScreen', { money: this.props.detail.money, type: 'order', orderid: id });
		} catch (error) {
			return Toast.warning(error || '系统错误');
		}
	}

	async updateOrderStatus() {
		let { id } = this.props.detail;
		let orderStatus = await Request.post('/order/updateOrderStatus', { orderid: id, status: 4 });
		if (orderStatus.data === 'success') {
			return this.props.onSearch();
		}
		return;
	}

	// 打开柜子
	async onOpenCabinet() {
		let { id } = this.props.detail;
		let result = await Request.post('/order/openCellById', { orderId: id });
		if (result.data === 'success') {
			Message.warning('柜门已打开', '请取出衣物，随手关门，谢谢！');
			return this.props.onSearch();
		}
		return Message.warning('网络错误', '请稍后重试！');
	}

	// 联系我们
	async onConnectUs() {
		let { shopid } = this.props.detail;
		let shop = await Request.get('/shop/getShopById', { shopid });
		let phone = shop && shop.data ? shop.data.phone : '18210619398';
		let tel = `tel:${phone}`; // 目标电话
		Linking.canOpenURL(tel)
			.then(supported => {
				if (!supported) {
					Message.warning('商家电话', '18210619398');
				} else {
					return Linking.openURL(tel);
				}
			})
			.catch(error => console.log('tel error', error));
	}

	// 点击查看详情页面
	onSearchDetail(id) {
		const { navigation } = this.props;
		navigation.navigate('OrderDetailScreen', {
			id: id,
		});
	}

	renderBtn() {
		let actionBtn = [];
		let { status } = this.props.detail;
		const payBtn = (
			<TouchableOpacity key="payBtn" onPress={this.payOrder.bind(this)} style={styles.order_item_right_bottom_btn}>
				<Text style={styles.order_pay_font}>去支付</Text>
			</TouchableOpacity>
		);
		const connectBtn = (
			<TouchableOpacity key="connectBtn" onPress={this.onConnectUs.bind(this)} style={styles.order_item_right_bottom_btn}>
				<Text style={styles.order_pay_font}>联系我们</Text>
			</TouchableOpacity>
		);
		const openBoxBtn = (
			<TouchableOpacity key="openBoxBtn" onPress={this.onOpenCabinet.bind(this)} style={styles.order_item_right_bottom_btn}>
				<Text style={styles.order_pay_font}>打开柜子</Text>
			</TouchableOpacity>
		);
		if (status === 1 || status === 2 || status === 5) {
			actionBtn = [connectBtn];
		}
		if (status === 3) {
			actionBtn = [payBtn, connectBtn];
		}
		if (status === 4) {
			actionBtn = [openBoxBtn, connectBtn];
		}
		return actionBtn;
	}

	render() {
		const { goods } = this.props;
		const { id, shopName, cabinetUrl, create_time, cabinetAdderss, cabinetName, money, urgency, status } = this.props.detail;
		return (
			<View style={styles.order_item}>
				<View style={styles.order_item_left}>
					<FastImage style={styles.order_item_left_img} source={{ uri: `${Config.baseUrl}/${cabinetUrl}` }} />
				</View>
				<View style={styles.order_item_right}>
					<View style={styles.order_item_right_title}>
						<View style={styles.order_item_right_title_left}>
							<Text style={styles.font_title_style}>{shopName}</Text>
						</View>
						<View style={styles.order_item_right_title_right}>
							<Text style={styles.font_title_style}>{FilterStatus.filterOrderStatus(status)}</Text>
						</View>
					</View>
					<View style={styles.order_item_right_time}>
						<View style={styles.order_item_right_time_left}>
							<Text style={{ fontSize: 10, color: '#333' }}>{create_time}</Text>
						</View>
						{Number(urgency) === 2 && (
							<View style={styles.order_item_right_time_right}>
								<Badge value="加急订单" status="success" textStyle={{ fontSize: 10 }} />
							</View>
						)}
					</View>
					<TouchableOpacity style={styles.order_item_touch} onPress={this.onSearchDetail.bind(this, id)}>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>
								存取地址：{cabinetAdderss} {cabinetName}
							</Text>
						</View>
						<MoneyItem text={goods} money={Number(money).toFixed(2)} />
						{Number(urgency) === 2 && (
							<>
								<MoneyItem text="加急费用：" money={Number(money * 0.5).toFixed(2)} />
								<MoneyItem text="洗衣总费用：" money={Number(money * 1.5).toFixed(2)} />
							</>
						)}
						<View style={styles.order_item_right_order_type}>
							<Text style={styles.font_desc_style}>订单方式：MOVING洗衣柜下单</Text>
						</View>
					</TouchableOpacity>
					<View style={styles.order_item_right_bottom}>{this.renderBtn()}</View>
				</View>
			</View>
		);
	}
}

const order_item_left_width = 35;
const styles = StyleSheet.create({
	font_title_style: {
		fontSize: 14,
		color: '#606060',
	},
	font_desc_style: {
		fontSize: 12,
		color: '#333',
		lineHeight: 28,
	},
	order_item_touch: {
		paddingTop: 10,
	},
	order_item: {
		minHeight: 150,
		margin: 10,
		marginBottom: 0,
		backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10,
	},
	order_item_left: {
		width: order_item_left_width,
		height: order_item_left_width,
	},
	order_item_left_img: {
		width: order_item_left_width,
		height: order_item_left_width,
	},
	order_item_right: {
		flex: 1,
		marginLeft: 10,
	},
	order_item_right_title: {
		height: 20,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	order_item_right_title_left: {
		flex: 1,
	},
	order_item_right_title_right: {
		width: 72,
		alignItems: 'flex-end',
	},
	order_item_right_time: {
		height: 25,
		alignItems: 'center',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 1,
		flexDirection: 'row',
	},
	order_item_right_time_left: {
		flex: 1,
	},
	order_item_right_bottom: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	order_item_right_bottom_btn: {
		padding: 5,
		borderWidth: 1,
		borderColor: '#fb9dd0',
		alignItems: 'center',
		borderRadius: 5,
		marginHorizontal: 5,
	},
	order_pay_font: {
		color: '#fb9dd0',
	},
});
