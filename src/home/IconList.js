/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import IconWithText from '../component/IconWithText';
import StorageUtil from '../util/Storage';
import config from '../config/config';
import Toast from '../component/Toast';
import Message from '../component/Message';
import I18n from '../language/I18n';
import { init, Geolocation } from 'react-native-amap-geolocation';

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
			console.log(coords, 9999);
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

	// 判断用户是否登录
	async onJudgeUserIsLogin() {
		let user = await StorageUtil.get('user');
		// 用户没有登录
		if (!user) {
			return 1;
		}
		// 用户信息不完整
		if (!user.phone || !user.username || !user.email) {
			return 2;
		}
		// 普通会员
		if (Number(user.member) === 1) {
			return 3;
		}
		return 9;
	}

	// icon点击的时候
	async onIconPress(data) {
		let { navigation } = this.props;
		let status = await this.onJudgeUserIsLogin();
		// 先进行验证
		// 需要个人信息完整和需要登录的功能
		let beBogin = ['home_clothing', 'home_recharge'];
		if (data && beBogin.includes(data.key)) {
			if (status === 1) {
				navigation.navigate('LoginScreen');
				return Toast.warning('请先登录');
			}
			if (status === 2) {
				navigation.navigate('MyMessage');
				return Toast.warning('请先完善个人信息');
			}
		}
		// 上门取衣
		if (data && data.key === 'home_clothing') {
			if (status === 3) {
				navigation.navigate('MemberScreen');
				return Message.warning('请知悉', '此服务仅会员可用');
			}
			await this.judgeMember();
			navigation.navigate('ClothingScreen');
		}
		// moving商城
		if (data && data.key === 'home_shop') {
			await this.judgeMember();
			navigation.navigate('IntergralScreen');
		}

		// 成为会员
		if (data && data.key === 'home_member') {
			await this.judgeMember();
			navigation.navigate('MemberScreen');
		}

		// 充值
		if (data && data.key === 'home_recharge') {
			await this.judgeMember();
			navigation.navigate('ReChargeScreen', { type: 'recharge' });
		}

		// 版本更新
		if (data && data.key === 'home_operation') {
			let url = `itms-apps://itunes.apple.com/app/${config.AppStoreId}`;
			// let url = `itms-apps://apps.apple.com/us/app/${config.AppStoreId}`;
			//后面有个APP_ID，
			Linking.canOpenURL(url)
				.then(supported => {
					if (supported) {
						Linking.openURL(url);
					} else {
					}
				})
				.catch(error => {
					console.log(error);
				});
		}

		// 关于我们
		if (data && data.key === 'home_concat') {
			navigation.navigate('ConcatUsScreen');
		}

		// 获取所有的存储的key
		if (data && data.key === 'aaa') {
			// let url = 'http://47.107.43.166/';
			// Linking.canOpenURL(url)
			// 	.then(supported => {
			// 		if (supported) {
			// 			Linking.openURL(url);
			// 		} else {
			// 		}
			// 	})
			// 	.catch(error => {
			// 		console.log(error);
			// 	});
			this.setState({ num: this.state.num + 1 });
			let keys = await StorageUtil.getAllKeys();
			let res = await StorageUtil.multiGet(keys);
			console.log('StorageUtil: ', res);
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
				key: 'home_shop',
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
				key: 'home_concat',
				url: require('../../img/home/lianxi.png'),
				text: '关于我们',
			},
			{
				key: 'home_operation',
				url: require('../../img/home/caozuo.png'),
				text: '版本更新',
			},
			{
				key: 'aaa',
				url: require('../../img/home/icon6.png'),
				text: 'MOVING官网',
			},
			{
				key: 'bbb',
				// url: require('../../img/home/icon6.png'),
				// text: '协议',
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
