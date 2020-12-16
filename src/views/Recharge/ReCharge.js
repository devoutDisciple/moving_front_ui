/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PayItem from './PayItem';
import MoneyItem from './MoneyItem';
import FastImage from '@/component/FastImage';
import CommonHeader from '@/component/CommonHeader';
import CommonStyle from '@/style/common';
import Toast from '@/component/Toast';
import PayUtil from '@/util/PayUtil';
import Request from '@/util/Request';
import StorageUtil from '@/util/Storage';
import Alipay from '@/util/Alipay';
import Message from '@/component/Message';
import Loading from '@/component/Loading';
import * as WeChat from 'react-native-wechat-lib';
import NavigationUtil from '@/util/NavigationUtil';
import SafeViewComponent from '@/component/SafeViewComponent';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default class ReCharge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeMoney: 0,
			payWay: 'alipay',
			wechatVisible: false,
			moneyTypeList: [],
			loadingVisible: false,
		};
	}

	async componentDidMount() {
		await this.onJudgeWechat();
		await this.getAllMoneyTypeList();
	}

	async getAllMoneyTypeList() {
		this.setState({ loadingVisible: true });
		let res = await Request.get('/money/getAllType');
		console.log(res.data, 999);
		if (res && res.data && Array.isArray(res.data)) {
			this.setState({ moneyTypeList: res.data, loadingVisible: false });
		}
	}

	// 判断是否已经安装微信
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
			{ activeMoney, payWay, moneyTypeList } = this.state;
		let currentPay = moneyTypeList[activeMoney];
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
				money: currentPay.money,
				type: type,
				userid: currentUser.id,
				given: currentPay.send,
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
				money: currentPay.money,
				type: type,
				userid: currentUser.id,
				given: currentPay.send,
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

	render() {
		let { navigation } = this.props,
			// member-会员
			type = navigation.getParam('type'),
			{ activeMoney, payWay, wechatVisible, moneyTypeList, loadingVisible } = this.state,
			flag = type === 'member';
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title={flag ? '成为会员' : '充值'} navigation={navigation} />
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						<FastImage style={styles.content_logo} source={require('@/asserts/public/logo2.png')} />
						<View style={styles.detail_common_title}>
							<Text style={{ fontSize: 14, color: '#333' }}>{flag ? '会员价格' : '余额充值'}</Text>
						</View>
						<View style={styles.content_account}>
							{moneyTypeList.map((item, index) => {
								return (
									<MoneyItem
										key={index}
										money={item.money}
										discount={item.send}
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
