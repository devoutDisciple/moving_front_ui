/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PayItem from './PayItem';
import Toast from '../component/Toast';
import CommonStyle from '../style/common';
import CommonHeader from '../component/CommonHeader';
import Request from '../util/Request';
import PayUtil from '../util/PayUtil';
import Alipay from '../util/Alipay';
import StorageUtil from '../util/Storage';
import * as WeChat from 'react-native-wechat-lib';
import Loading from '../component/Loading';
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
		const { navigation } = this.props;
		let money = navigation.getParam('money');
		let type = navigation.getParam('type'); // beMember - 成为会员 recharge - 余额充值 order -订单支付
		// 获取用户id的值
		let currentUser = await StorageUtil.get('user');
		let userid = currentUser.id;
		let res = await Request.get('/user/getUserByUserid', { userid });
		let user = res.data;
		this.setState({ user: user, money, type });
	}

	// 支付方式改变
	payWayChange(key) {
		this.setState({ payWay: key });
	}

	// 订单支付
	async payOrder() {
		let { payWay, money, user } = this.state;
		const { navigation } = this.props;
		let orderid = navigation.getParam('orderid');
		if (payWay === 'wechat') {
			try {
				let res = await PayUtil.payMoneyByWeChat(money, 'MOVING洗衣费用结算');
				if (res === 'success') {
					Toast.success('支付完成');
					try {
						setTimeout(async () => {
							// 更改订单状态
							let orderStatus = await Request.post('/order/updateOrderStatus', { orderid: orderid, status: 4 });
							// 更改用户积分
							await Request.post('/user/updateUserIntergral', { userid: user.id, money: money });
							if (orderStatus.data === 'success') {
								return navigation.goBack();
							}
						}, 500);
					} catch (error) {
						console.log(error);
					}
				}
			} catch (error) {
				Toast.warning(error);
			}
		}
		if (payWay === 'alipay') {
			let res = await Request.post('/pay/payByOrderAlipay', {
				desc: 'MOVING洗衣费用结算',
				money: 0.01,
				// money: money,
				type: 'order',
				orderid: orderid,
				userid: user.id,
			});
			await Alipay.pay(res.data);
			return navigation.goBack();
		}
		if (payWay === 'moving') {
			this.setState({ loadingVisible: true });
			let res = await Request.post('/pay/payByOrderByBalance', { orderid: orderid, money: money, userid: user.id });
			this.setState({ loadingVisible: false });
			if (res.data === 'success') {
				Toast.success('支付完成, 请刷新订单');
				return navigation.goBack();
			}
		}
	}

	render() {
		const { navigation } = this.props;
		let { payWay, user, money, wechatVisible, loadingVisible } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="洗衣费用支付" navigation={navigation} />
				<ScrollView style={styles.content}>
					<View style={styles.money}>
						<Text style={styles.money_num}>￥ {money}</Text>
						<Text style={styles.money_order}>订单支付</Text>
						<Text style={styles.money_order}>
							用户名称: {user.username} 手机号: {user.phone}
						</Text>
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
				<TouchableOpacity style={styles.bottom_btn} onPress={this.payOrder.bind(this)}>
					<Text style={styles.bottom_btn_text}>确认支付</Text>
				</TouchableOpacity>
				<Loading visible={loadingVisible} />
			</View>
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
		height: 250,
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
