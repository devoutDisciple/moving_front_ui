/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PayItem from './PayItem';
import Toast from '../component/Toast';
import CommonStyle from '../style/common';
import CommonHeader from '../component/CommonHeader';
import Request from '../util/Request';
import PayUtil from '../util/PayUtil';
import StorageUtil from '../util/Storage';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

export default class PayOrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			payWay: 'wechat', // 默认微信支付
			user: {}, // 用户信息
			money: 80, // 默认80
			type: 'loading...', // beMember - 成为会员 recharge - 余额充值 order -订单支付
			given: 0, // 余额充值的时候赠送的
		};
	}

	async componentDidMount() {
		await this.getUser();
	}

	// 获取用户
	async getUser() {
		const { navigation } = this.props;
		let money = navigation.getParam('money');
		let type = navigation.getParam('type'); // beMember - 成为会员 recharge - 余额充值 order -订单支付
		let given = 0;
		if (type === 'recharge') {
			given = navigation.getParam('given');
		}
		// 获取用户id的值
		let currentUser = await StorageUtil.get('user');
		let userid = currentUser.id;
		let res = await Request.get('/user/getUserByUserid', { userid });
		let user = res.data;
		this.setState({ user: user, money, type, given });
	}

	// 支付方式改变
	payWayChange(key) {
		this.setState({ payWay: key });
	}

	// 确认支付
	async onSurePay() {
		let { type } = this.state;
		// 成为会员
		if (type === 'beMember') {
			return await this.onBeMember();
		}
		// 余额充值
		if (type === 'recharge') {
			return await this.onRecharge();
		}
	}

	// 余额充值
	async onRecharge() {
		try {
			let { money, given } = this.state;
			// 获取用户token值
			let token = await StorageUtil.getString('token');
			let res = await PayUtil.payMoneyByWeChat(money, 'Moving余额充值');
			if (res === 'success') {
				let result = await Request.post('/user/recharge', { token: token, money, given });
				if (result) {
					return Toast.success('恭喜您充值成功');
				}
			}
		} catch (error) {
			Toast.warning(error);
		}
	}

	// 成为会员
	async onBeMember() {
		try {
			let { money } = this.state;
			// 获取用户token值
			let token = await StorageUtil.getString('token');
			let res = await PayUtil.payMoneyByWeChat(money, 'Moving洗衣金卡会员');
			if (res === 'success') {
				let result = await Request.post('/user/beMember', { token: token, level: 2 });
				if (result) {
					return Toast.success('恭喜您已成为Moving尊贵会员');
				}
			}
		} catch (error) {
			Toast.warning(error);
		}
	}

	render() {
		const { navigation } = this.props;
		let { payWay, user, money, type, given } = this.state;
		let showType = 'loading....';
		switch (type) {
			case 'beMember':
				showType = '成为会员';
				break;
			case 'recharge':
				showType = `余额充值 充 ${money} 送 ${given}`;
				break;
		}
		return (
			<View style={styles.container}>
				<CommonHeader title="支付" navigation={navigation} />
				<ScrollView style={styles.content}>
					{/* <FastImage
                        style={styles.content_logo}
                        source={require('../../img/public/logo2.png')}
                    /> */}
					<View style={styles.money}>
						<Text style={styles.money_num}>￥ {money}</Text>
						{/* <Text style={styles.money_order}>订单编号: 328443973823897493</Text> */}
						<Text style={styles.money_order}>{showType}</Text>
						<Text style={styles.money_order}>
							用户名称: {user.username} 手机号: {user.phone}
						</Text>
					</View>
					<View style={styles.detail_common_title}>
						<Text style={{ fontSize: 14, color: '#333' }}>选择支付方式</Text>
					</View>
					<PayItem
						iconName="wechat"
						onPress={this.payWayChange.bind(this, 'wechat')}
						iconColor="#89e04c"
						text="微信支付"
						active={payWay === 'wechat'}
					/>
					<PayItem
						iconName="alipay-circle"
						onPress={this.payWayChange.bind(this, 'alipay')}
						iconColor="#208ee9"
						text="支付宝支付"
						active={payWay === 'alipay'}
					/>
				</ScrollView>
				<TouchableOpacity style={styles.bottom_btn} onPress={this.onSurePay.bind(this)}>
					<Text style={styles.bottom_btn_text}>确认支付</Text>
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
