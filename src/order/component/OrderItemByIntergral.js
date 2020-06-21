/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../../util/Request';
import Config from '../../config/config';
import Toast from '../../component/Toast';
import Message from '../../component/Message';
import PayUtil from '../../util/PayUtil';
import FilterStatus from '../../util/FilterStatus';
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

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
			let result = await PayUtil.payMoneyByWeChat(this.props.detail.money, '支付洗衣费用');
			if (result === 'success') {
				Toast.success('支付成功');
				try {
					setTimeout(async () => {
						let orderStatus = await Request.post('/order/updateOrderStatus', { orderid: id, status: 4 });
						if (orderStatus.data === 'success') {
							return this.props.onSearch();
						}
					}, 500);
				} catch (error) {
					console.log(error);
				}
			}
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
		if (status === 1 || status === 2 || status === 5 || 6 || 7) {
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
		let { id, shopName, create_time, goods, intergral_username, intergral_phone, intergral_num, status } = this.props.detail;
		console.log(this.props.detail);
		goods = JSON.parse(goods || {});
		console.log(goods, 222);
		return (
			<View style={styles.order_item}>
				<View style={styles.order_item_left}>
					<Image style={styles.order_item_left_img} source={{ uri: `${Config.baseUrl}/${goods.url}` }} />
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
						<Text style={{ fontSize: 10, color: '#333' }}>{create_time}</Text>
					</View>
					<TouchableOpacity onPress={this.onSearchDetail.bind(this, id)}>
						<View style={styles.order_item_right_goods}>
							<View style={styles.order_item_right_goods_left}>
								<Text style={styles.font_desc_style}>兑换商品：{goods.name}</Text>
							</View>
							<View style={styles.order_item_right_goods_right}>
								<Text style={styles.font_desc_style}>{intergral_num} 积分</Text>
							</View>
						</View>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>收货人：{intergral_username}</Text>
						</View>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>联系方式：{intergral_phone}</Text>
						</View>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>订单方式：积分兑换</Text>
						</View>

						{/* <View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>订单链路：MOVING洗衣柜下单</Text>
						</View>
						<View style={styles.order_item_right_adrress}>
							<Text style={styles.font_desc_style}>取货方式：MOVING洗衣柜取货</Text>
						</View> */}
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
		lineHeight: 20,
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
		height: 20,
		justifyContent: 'center',
		borderBottomColor: '#f2f2f2',
		borderBottomWidth: 1,
	},
	order_item_right_adrress: {
		marginTop: 8,
		minHeight: 24,
	},
	order_item_right_goods: {
		flexDirection: 'row',
		marginTop: 5,
	},
	order_item_right_goods_left: {
		flex: 1,
	},
	order_item_right_goods_right: {
		width: 70,
		alignItems: 'flex-end',
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
