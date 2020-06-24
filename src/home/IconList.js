/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconWithText from '../component/IconWithText';
import StorageUtil from '../util/Storage';
import config from '../config/config';
import Toast from '../component/Toast';
import I18n from '../language/I18n';
import Alipay from '../util/Alipay';
import { init, Geolocation } from 'react-native-amap-geolocation';
import Request from '../util/Request';

export default class IconList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 1,
		};
	}

	async componentDidMount() {
		// 使用自己申请的高德 App Key 进行初始化
		await init({
			ios: config.map_key_IOS,
			android: config.map_key_android,
		});
		Geolocation.getCurrentPosition(({ coords }) => {
			console.log(coords);
		});
	}

	// 判断是不是会员
	async judgeMember() {
		return new Promise(async (resolve, reject) => {
			let { navigation } = this.props;
			let user = await StorageUtil.get('user');
			// 如果用户没有登录
			if (!user) {
				reject();
				Toast.warning('请先登录!');
				return setTimeout(() => {
					navigation.navigate('LoginScreen');
				}, 2000);
			}
			resolve(user);
		});
	}

	// icon点击的时候
	async onIconPress(data) {
		let { navigation } = this.props;

		// moving商城
		if (data && data.key === 'home_integral') {
			await this.judgeMember();
			navigation.navigate('IntergralScreen');
		}

		// 成为会员
		if (data && data.key === 'home_member') {
			await this.judgeMember();
			navigation.navigate('MemberScreen');
		}
		// 上门取衣
		if (data && data.key === 'home_clothing') {
			await this.judgeMember();
			navigation.navigate('ClothingScreen');
		}

		// 充值
		if (data && data.key === 'home_recharge') {
			await this.judgeMember();
			navigation.navigate('ReChargeScreen');
		}

		// 联系我们
		if (data && data.key === 'home_concat') {
			navigation.navigate('ConcatUsScreen');
		}

		// 获取所有的存储的key
		if (data && data.key === 'aaa') {
			// this.setState({ num: this.state.num + 1 });
			// let keys = await StorageUtil.getAllKeys();
			// let res = await StorageUtil.multiGet(keys);
			// console.log('StorageUtil: ', res);
			// let res = await Request.get('/test/alipay');
			console.log(111111);
			let res = await Request.post('/pay/payByOrderAlipay', { desc: 'moving会员', money: '0.01' });
			console.log(res.data, 2666);
			Alipay.pay(res.data)
				.then(data => {
					console.log(data, 123);
				})
				.catch(err => {
					console.log('err=' + err);
					this.refs.toast.show('支付失败');
				});
		}

		// 清除所有的keys
		if (data && data.key === 'bbb') {
			this.setState({ num: this.state.num + 1 });
			await StorageUtil.clear();
			console.log('清除成功');
		}
	}

	render() {
		const iconList1 = [
			{
				key: 'home_clothing',
				url: require('../../img/home/service.png'),
				text: '上门取衣',
			},
			{
				key: 'home_integral',
				url: require('../../img/home/jifen.png'),
				text: 'Moving商城',
			},
			{
				key: 'home_member',
				url: require('../../img/home/hello.png'),
				text: I18n.t('home.member'),
			},
			{
				key: 'home_recharge',
				url: require('../../img/home/chongzhi.png'),
				text: I18n.t('home.recharge'),
			},
		];
		const iconList2 = [
			{
				key: 'home_operation',
				url: require('../../img/home/caozuo.png'),
				text: '操作指南',
			},
			{
				key: 'home_concat',
				url: require('../../img/home/lianxi.png'),
				text: '关于我们',
			},
			{
				key: 'aaa',
				url: require('../../img/home/icon6.png'),
				text: '邀请用户',
			},
			{
				key: 'bbb',
				url: require('../../img/home/icon6.png'),
				text: '协议',
			},
		];
		return (
			<View style={styles.icon_container}>
				<View style={styles.home_icon}>
					{iconList1.map((item, index) => {
						return (
							<IconWithText
								key={index}
								onPress={this.onIconPress.bind(this, item)}
								source={item.url}
								text={item.text}
								index={`incon1_${index}`}
							/>
						);
					})}
				</View>
				<View style={styles.home_icon}>
					{iconList2.map((item, index) => {
						return (
							<IconWithText
								key={index}
								onPress={this.onIconPress.bind(this, item)}
								source={item.url}
								text={item.text}
								index={`incon2_${index}`}
							/>
						);
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	icon_container: {
		marginTop: 10,
	},
	home_icon: {
		height: 80,
		marginHorizontal: 10,
		flexDirection: 'row',
	},
	home_icon_item: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	home_icon_item_text: {
		marginTop: 10,
		fontSize: 12,
	},
});
