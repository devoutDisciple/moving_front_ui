/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PayItem from './PayItem';
import MoneyItem from './MoneyItem';
import FastImage from '../component/FastImage';
import CommonHeader from '../component/CommonHeader';
import CommonStyle from '../style/common';
import Toast from '../component/Toast';
import config from '../config/config';
import PayUtil from '../util/PayUtil';
import Request from '../util/Request';
import StorageUtil from '../util/Storage';
import Alipay from '../util/Alipay';
import Message from '../component/Message';
import * as WeChat from 'react-native-wechat-lib';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import NavigationUtil from '../util/NavigationUtil';

const { width } = Dimensions.get('window');

export default class ReCharge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMoney: 0,
			payWay: 'alipay',
			wechatVisible: false,
		};
	}

	async componentDidMount() {
		await this.onJudgeWechat();
	}

	async onJudgeWechat() {
		let isWXAppInstalled = await WeChat.isWXAppInstalled();
		if (isWXAppInstalled) {
			this.setState({ wechatVisible: true });
		}
	}

	// 支付金额改变
	onPressChargeItem(key) {
		this.setState({ activeMoney: key });
	}

	// 支付方式改变
	payWayChange(key) {
		this.setState({ payWay: key });
	}

	// 确认充值
	async onSurePay() {
		// Toast.error('请先安装支付宝或微信');
		const { navigation } = this.props,
			{ activeMoney, payWay } = this.state;
		let currentPay = config.PAY_MONEY_FOR_BALANCE[activeMoney];
		// member-会员 recharge-余额充值
		let type = navigation.getParam('type');
		let storageUser = await StorageUtil.get('user');
		let res = await Request.get('/user/getUserByUserid', { userid: storageUser.id });
		let currentUser = res.data;
		// 判断用户是否是会员
		if (type === 'member' && Number(currentUser.member) === 2) {
			return Message.confirm('您已经是MOVING会员', '前往余额充值', () => {
				NavigationUtil.reset(navigation, 'HomeScreen');
			});
		}
		// 支付宝支付
		if (payWay === 'alipay') {
			let alires = await Request.post('/pay/payByOrderAlipay', {
				desc: 'MOVING会员',
				money: currentPay.pay,
				type: type,
				userid: currentUser.id,
				given: currentPay.given,
			});
			Alipay.pay(alires.data);
			setTimeout(() => {
				Message.confirmPay('是否支付成功', '', () => {
					Toast.success('请前往我的余额查看');
					NavigationUtil.reset(navigation, 'HomeScreen');
				});
			}, 1000);
		}
		// 微信支付
		if (payWay === 'wechat') {
			// let result = await PayUtil.payMoneyByWeChat(currentPay.pay, type === 'member' ? 'MOVING会员' : 'MOVING充值');
			let result = await PayUtil.payMoneyByWeChat({
				desc: type === 'member' ? 'MOVING会员' : 'MOVING充值',
				mmoney: currentPay.pay,
				type: type,
				userid: currentUser.id,
				given: currentPay.given,
			});
			if (result === 'success') {
				Toast.success('支付成功');
				return setTimeout(() => {
					NavigationUtil.reset(navigation, 'HomeScreen');
				}, 1000);
			}
			Message.confirmPay('是否支付成功', '', () => {
				Toast.success('请前往我的余额查看');
				NavigationUtil.reset(navigation, 'HomeScreen');
			});
		}
	}

	// async changeUserBalance() {
	// 	// Toast.error('请先安装支付宝或微信');
	// 	const { navigation } = this.props,
	// 		{ activeMoney } = this.state;
	// 	let currentPay = config.PAY_MONEY_FOR_BALANCE[activeMoney];
	// 	// member-会员
	// 	let type = navigation.getParam('type');
	// 	let { pay, given } = currentPay;
	// 	let user = await StorageUtil.get('user');
	// 	let userData = await Request.post('/user/recharge', { userid: user.id, money: pay, given });
	// 	if (userData.data === 'success') {
	// 		Toast.success(type === 'member' ? '恭喜您成为MOVING会员' : '充值成功');
	// 		setTimeout(() => {
	// 			NavigationUtil.reset(navigation, 'HomeScreen');
	// 		}, 1000);
	// 	} else {
	// 		return Toast.warning('网络出小差了，请联系管理员');
	// 	}
	// }

	render() {
		let { navigation } = this.props,
			// member-会员
			type = navigation.getParam('type'),
			{ activeMoney, payWay, wechatVisible } = this.state,
			flag = type === 'member';
		return (
			<View style={styles.container}>
				<CommonHeader title={flag ? '成为会员' : '充值'} navigation={navigation} />
				<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
					<FastImage style={styles.content_logo} source={require('../../img/public/logo2.png')} />
					<View style={styles.detail_common_title}>
						<Text style={{ fontSize: 14, color: '#333' }}>{flag ? '会员价格' : '余额充值'}</Text>
					</View>
					<View style={styles.content_account}>
						{config.PAY_MONEY_FOR_BALANCE.map((item, index) => {
							return (
								<MoneyItem
									key={index}
									money={item.pay}
									discount={item.given}
									active={activeMoney === index}
									onPress={this.onPressChargeItem.bind(this, index)}
								/>
							);
						})}
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
				</ScrollView>
				<TouchableOpacity style={styles.bottom_btn} onPress={this.onSurePay.bind(this)}>
					<Text style={styles.bottom_btn_text}>去支付</Text>
				</TouchableOpacity>
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
		// backgroundColor: 'red',
		paddingHorizontal: 10,
	},
	content_logo: {
		width: width - 20,
		height: 0.4 * width,
	},
	detail_common_title: CommonStyle.detail_common_title,
	content_account: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 10,
	},
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
