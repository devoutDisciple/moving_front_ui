import React from 'react';
import PayItem from './PayItem';
import Alipay from '@/util/Alipay';
import Request from '@/util/Request';
import PayUtil from '@/util/PayUtil';
import Toast from '@/component/Toast';
import CommonStyle from '@/style/common';
import StorageUtil from '@/util/Storage';
import Loading from '@/component/Loading';
import Message from '@/component/Message';
import * as WeChat from 'react-native-wechat-lib';
import NavigationUtil from '@/util/NavigationUtil';
import CommonHeader from '@/component/CommonHeader';
import SafeViewComponent from '@/component/SafeViewComponent';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

export default class PayOrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			payWay: 'alipay', // 默认微信支付
			user: { balance: 0 }, // 用户信息
			money: 0.0, // 默认80
			type: 'loading...', // beMember - 成为会员 recharge - 余额充值 order -订单支付
			given: 0, // 余额充值的时候赠送的
			loadingVisible: false,
			wechatVisible: false,
			clothingPay: '',
		};
	}

	async componentDidMount() {
		await this.getUser();
		await this.onJudgeWechat();
	}

	async onJudgeWechat() {
		let isWXAppInstalled = await WeChat.isWXAppInstalled();
		if (isWXAppInstalled) {
			this.setState({ wechatVisible: true });
		}
	}

	// 获取用户
	async getUser() {
		this.setState({ loadingVisible: true });
		const { navigation } = this.props;
		let money = navigation.getParam('money');
		let type = navigation.getParam('type'); // beMember - 成为会员 recharge - 余额充值 order -订单支付 clothing-上门取衣
		let clothingPay = navigation.getParam('pay');
		// 获取用户id的值
		let currentUser = await StorageUtil.get('user');
		let userid = currentUser.id;
		let res = await Request.get('/user/getUserByUserid', { userid });
		let user = res.data;
		this.setState({ user: user, money, type, clothingPay, loadingVisible: false });
	}

	// 支付方式改变
	payWayChange(key) {
		this.setState({ payWay: key });
	}

	// 付款
	pay() {
		const { navigation } = this.props;
		let type = navigation.getParam('type'); // beMember - 成为会员 recharge - 余额充值 order -订单支付
		if (type === 'clothing') {
			return this.payGetClothing();
		}
		return this.payOrder();
	}

	// 上门取衣支付
	async payGetClothing() {
		let { payWay, money, user } = this.state;
		const { navigation } = this.props;
		let userid = navigation.getParam('userid'),
			shopid = navigation.getParam('shopid'),
			hasOrder = navigation.getParam('hasOrder'),
			home_time = navigation.getParam('home_time'),
			home_address = navigation.getParam('home_address'),
			home_username = navigation.getParam('home_username'),
			home_phone = navigation.getParam('home_phone'),
			home_desc = navigation.getParam('desc'),
			urgency = navigation.getParam('urgency'),
			clothingPay = navigation.getParam('pay');
		let orderid = '',
			showText = clothingPay === 'payAllClothing' ? '洗衣费用支付' : '预约取衣派送费用';
		// pay --- clothingpay: pre_pay: 1 --- 预付款 9.9     2--- payAllClothing-支付订单金额
		// 支付上门取衣费用 hasOrder - no-还没有创建此订单 has-已经创建过此订单
		if (clothingPay === 'pre_pay' && hasOrder === 'no') {
			this.setState({ loadingVisible: true });
			// 创建上门取衣订单
			let orderResult = await Request.post('/order/addByHome', {
				userid,
				shopid,
				home_time,
				home_address,
				home_username,
				home_phone,
				urgency,
				desc: home_desc,
			});
			this.setState({ loadingVisible: false });
			if (!orderResult || !orderResult.data || !orderResult.data.data || orderResult.data.success !== 'success') {
				return;
			}
			orderid = orderResult.data.data;
		} else {
			orderid = navigation.getParam('orderid');
		}
		if (payWay === 'wechat') {
			try {
				let res = await PayUtil.payMoneyByWeChat({
					desc: showText,
					money: money,
					type: 'clothing',
					orderid: orderid,
					userid: user.id,
				});
				if (res === 'success') {
					// 上门取衣预付款
					if (clothingPay === 'pre_pay') {
						return Message.warning('订单已下达', '我们店员稍后会联系您，请耐心等待', () => {
							NavigationUtil.reset(navigation, 'HomeScreen');
						});
					} else {
						let orderResult = await Request.get('/order/getOrderById', { id: orderid });
						let newOrderDetail = orderResult.data;
						// 店员将衣物放到快递柜
						if (newOrderDetail.cabinetName && newOrderDetail.cabinetAddress) {
							return Message.warning('已完成支付', '请刷新订单，取出衣物', () => {
								navigation.goBack();
							});
						}
						// 店员将衣物送到客户手中
						if (newOrderDetail.status === 5 && newOrderDetail.send_home === 2) {
							return Message.warning('已完成支付', '感谢您的使用，祝您生活愉快', () => {
								NavigationUtil.reset(navigation, 'HomeScreen');
							});
						}
					}
				}
				Message.confirmPay('是否支付成功', '', () => {
					Toast.success('请前往订单查看详细信息');
					NavigationUtil.reset(navigation, 'HomeScreen');
				});
			} catch (error) {
				Toast.warning(error);
			}
		}
		if (payWay === 'alipay') {
			let res = await Request.post('/pay/payByOrderAlipay', {
				desc: showText,
				money: money,
				type: 'clothing',
				userid: user.id,
				orderid: orderid,
			});
			setTimeout(() => {
				Message.confirmPay('是否支付成功', '', () => {
					Toast.success('请前往订单查看详细信息');
					NavigationUtil.reset(navigation, 'HomeScreen');
				});
			}, 1000);
			await Alipay.pay(res.data);
		}
		if (payWay === 'moving') {
			this.setState({ loadingVisible: true });
			// 扣除用户余额费用
			let res = await Request.post('/order/subMoneyByAccount', { userid: user.id, orderid: orderid, money: money });
			this.setState({ loadingVisible: false });
			if (res.data === 'success') {
				// 上门取衣预付款
				if (clothingPay === 'pre_pay') {
					return Message.warning('订单已下达', '我们店员稍后会联系您，请耐心等待', () => {
						NavigationUtil.reset(navigation, 'HomeScreen');
					});
				} else {
					let orderResult = await Request.get('/order/getOrderById', { id: orderid });
					let newOrderDetail = orderResult.data;
					// 店员将衣物放到快递柜
					if (newOrderDetail.cabinetName && newOrderDetail.cabinetAddress) {
						return Message.warning('已完成支付', '请刷新订单，取出衣物', () => {
							navigation.goBack();
						});
					}
					// 店员将衣物送到客户手中
					if (newOrderDetail.status === 5 && newOrderDetail.send_home === 2) {
						return Message.warning('已完成支付', '感谢您的使用，祝您生活愉快', () => {
							NavigationUtil.reset(navigation, 'HomeScreen');
						});
					}
				}
			}
		}
	}

	// 订单支付
	async payOrder() {
		let { payWay, money, user } = this.state;
		const { navigation } = this.props;
		let orderid = navigation.getParam('orderid');
		if (payWay === 'wechat') {
			try {
				let res = await PayUtil.payMoneyByWeChat({
					desc: 'MOVING洗衣费用结算',
					money: money,
					type: 'order',
					orderid: orderid,
					userid: user.id,
				});
				if (res === 'success') {
					let orderResult = await Request.get('/order/getOrderById', { id: orderid });
					let newOrderDetail = orderResult.data;
					// 店员将衣物放到快递柜
					if (newOrderDetail.cabinetName && newOrderDetail.cabinetAddress) {
						return Message.warning('已完成支付', '请刷新订单，取出衣物', () => {
							navigation.goBack();
						});
					}
					// 店员将衣物送到客户手中
					if (newOrderDetail.status === 5 && newOrderDetail.send_home === 2) {
						return Message.warning('已完成支付', '感谢您的使用，祝您生活愉快', () => {
							NavigationUtil.reset(navigation, 'HomeScreen');
						});
					}
				}
				Message.confirmPay('是否支付成功', '', () => {
					Toast.success('请刷新订单');
					navigation.goBack();
				});
			} catch (error) {
				Toast.warning(error);
			}
		}
		if (payWay === 'alipay') {
			let res = await Request.post('/pay/payByOrderAlipay', {
				desc: 'MOVING洗衣费用结算',
				money: money,
				type: 'order',
				orderid: orderid,
				userid: user.id,
			});
			setTimeout(() => {
				Message.confirmPay('是否支付成功', '', () => {
					Toast.success('请刷新订单');
					navigation.goBack();
				});
			}, 1000);
			await Alipay.pay(res.data);
		}
		if (payWay === 'moving') {
			this.setState({ loadingVisible: true });
			let res = await Request.post('/pay/payByOrderByBalance', { orderid: orderid, money: money, userid: user.id });
			if (res.data === 'success') {
				let orderResult = await Request.get('/order/getOrderById', { id: orderid });
				this.setState({ loadingVisible: false });
				let newOrderDetail = orderResult.data;
				// 店员将衣物放到快递柜，用户取出快递柜归订单
				if (newOrderDetail.cabinetName && newOrderDetail.cabinetAddress) {
					return Message.warning('已完成支付', '请刷新订单，取出衣物', () => {
						navigation.goBack();
					});
				}
				// 店员将衣物送到客户手中
				if (newOrderDetail.status === 5 && newOrderDetail.send_home === 2) {
					return Message.warning('已完成支付', '感谢您的使用，祝您生活愉快', () => {
						NavigationUtil.reset(navigation, 'HomeScreen');
					});
				}
				navigation.goBack();
			}
		}
	}

	render() {
		const { navigation } = this.props;
		let { payWay, user, money, wechatVisible, loadingVisible, type, clothingPay } = this.state;
		let shoText = type === 'clothing' ? (clothingPay === 'payAllClothing' ? '洗衣费用支付' : '收取衣物费用') : '洗衣费用支付';
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title={shoText} navigation={navigation} />
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						<View style={styles.money}>
							<Text style={styles.money_num}>￥ {money}</Text>
							<Text style={styles.money_order}>{shoText}</Text>
							{/* <Text style={styles.money_order}>
								用户名称: {user.username} 手机号: {user.phone}
							</Text> */}
						</View>
						<View style={styles.detail_common_title}>
							<Text style={{ fontSize: 14, color: '#333' }}>选择支付方式</Text>
						</View>
						{wechatVisible && (
							<PayItem
								iconName="wechat"
								onPress={this.payWayChange.bind(this, 'wechat')}
								iconColor="#89e04c"
								text="微信支付"
								active={payWay === 'wechat'}
							/>
						)}
						<PayItem
							iconName="alipay-circle"
							onPress={this.payWayChange.bind(this, 'alipay')}
							iconColor="#208ee9"
							text="支付宝支付"
							active={payWay === 'alipay'}
						/>
						<PayItem
							iconName="alipay-circle"
							iconType="img"
							onPress={this.payWayChange.bind(this, 'moving')}
							iconColor="#208ee9"
							text={`余额支付(${user.balance}元 可用)`}
							active={payWay === 'moving'}
						/>
					</ScrollView>
					<TouchableOpacity style={styles.bottom_btn} onPress={this.pay.bind(this)}>
						<Text style={styles.bottom_btn_text}>确认支付</Text>
					</TouchableOpacity>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		paddingHorizontal: 10,
	},
	content_logo: {
		width: width - 20,
		height: 0.4 * width,
	},
	money: {
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	money_num: {
		fontSize: 28,
		color: '#fb9dd0',
		fontWeight: '800',
	},
	money_order: {
		fontSize: 12,
		paddingLeft: 10,
		color: '#8a8a8a',
		marginVertical: 5,
	},
	detail_common_title: CommonStyle.detail_common_title,
	bottom_btn: {
		height: 50,
		width: width - 40,
		marginLeft: 20,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		borderRadius: 50,
	},
	bottom_btn_text: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '800',
	},
});
