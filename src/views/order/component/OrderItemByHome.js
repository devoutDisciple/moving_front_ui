import React from 'react';
import MoneyItem from './MoneyItem';
import Request from '@/util/Request';
import Config from '@/config/config';
import Toast from '@/component/Toast';
import Message from '@/component/Message';
import { Badge } from 'react-native-elements';
import FastImage from '@/component/FastImage';
import FilterStatus from '@/util/FilterStatus';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
		this.renderBtn = this.renderBtn.bind(this);
	}

	componentDidMount() {}

	onSearch() {
		this.props.onSearch();
	}

	// 点击去支付
	async payOrder() {
		try {
			let { detail, navigation } = this.props,
				{ id } = detail;
			// 订单金额待支付
			if (detail.status === 3) {
				let { is_sure, payMoney } = detail;
				// 判断店员是否确认
				if (Number(is_sure) !== 2) {
					return Toast.warning('订单金额待店员确认，请稍后');
				}
				return navigation.navigate('PayOrderScreen', {
					money: payMoney,
					type: 'clothing',
					orderid: id,
					pay: 'payAllClothing',
					onSearch: this.onSearch.bind(this),
				});
			}
			// 支付上门取衣费用
			navigation.navigate('PayOrderScreen', {
				money: Config.getClothingMoney,
				type: 'clothing',
				orderid: id,
				pay: 'pre_pay',
				hasOrder: 'yes',
				onSearch: this.onSearch.bind(this),
			});
		} catch (error) {
			return Toast.warning(error || '系统错误');
		}
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

	// 打开柜子
	async onOpenCabinet() {
		Message.confirm('请注意', '请确认是否在柜子旁边', async () => {
			try {
				this.props.setLoading(true);
				let { id } = this.props.detail;
				let result = await Request.post('/order/openCellById', { orderId: id });
				this.props.setLoading(false);
				if (result.data === 'success') {
					Message.warning('柜门已打开', '请取出衣物，随手关门，谢谢！');
					return this.props.onSearch();
				}
				return Message.warning('网络错误', '请稍后重试！');
			} catch (error) {
				this.props.setLoading(false);
			}
		});
	}

	// 取消订单
	cancleOrder() {
		// cancleOrder
		Message.confirm('请确认', '是否取消此订单', async () => {
			try {
				this.props.setLoading(true);
				let { id } = this.props.detail;
				let result = await Request.post('/order/cancleOrder', { orderid: id });
				this.props.setLoading(false);
				if (result.data === 'success') {
					Toast.success('此订单已取消');
					return this.props.onSearch();
				}
			} catch (error) {
				this.props.setLoading(false);
			}
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
		const cancelBtn = (
			<TouchableOpacity key="cancelBtn" onPress={this.cancleOrder.bind(this)} style={styles.order_item_right_bottom_btn}>
				<Text style={styles.order_pay_font}>取消</Text>
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
		// 已经下单， 未付款
		if (status === 6) {
			actionBtn = [connectBtn, payBtn, cancelBtn];
		}
		// 已经下单已付款
		if (status === 8) {
			actionBtn = [connectBtn];
		}
		// 店员下单
		if (status === 9) {
			actionBtn = [connectBtn];
		}
		return actionBtn;
	}

	render() {
		let { goods, detail } = this.props;
		const { id, shopName, create_time, status, home_time, urgency, cabinetAdderss, cabinetName, is_sure } = detail;
		return (
			<View style={styles.order_item}>
				<View style={styles.order_item_left}>
					<FastImage style={styles.order_item_left_img} source={{ uri: `${Config.baseUrl}/logo_square.png` }} />
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
							<Text style={styles.font_desc_style}>预约时间：{home_time}</Text>
						</View>
						{cabinetAdderss && cabinetName ? (
							<View style={styles.order_item_right_adrress}>
								<Text style={styles.font_desc_style}>
									衣物存取地址：{cabinetAdderss} {cabinetName}
								</Text>
							</View>
						) : null}
						{Number(is_sure) === 2 ? <MoneyItem text={goods} money={detail.money} /> : null}
						{Number(urgency) === 2 && (
							<>
								<MoneyItem text="加急费用：" money={detail.urgencyMoney} />
							</>
						)}
						<MoneyItem text="优惠价格：" money={`-${detail.subDiscountMoney}`} />
						<MoneyItem text="洗衣总费用：" money={detail.payMoney} />
						<View style={styles.order_item_right_order_type}>
							<Text style={styles.font_desc_style}>订单方式：预约上门取衣</Text>
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
	order_item_right_goods: {
		flexDirection: 'row',
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
