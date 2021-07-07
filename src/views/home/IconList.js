import React from 'react';
import config from '@/config/config';
import Toast from '@/component/Toast';
import StorageUtil from '@/util/Storage';
import UpdateVersion from '@/util/Update';
import Message from '@/component/Message';
import IconWithText from '@/component/IconWithText';
import { View, StyleSheet, Linking } from 'react-native';
// import PushNotificationIOS from '@/util/PushNotification';
import { init, Geolocation } from 'react-native-amap-geolocation';
import language from '@/language/index';
export default class IconList extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		// 使用自己申请的高德 App Key 进行初始化
		await init({
			ios: config.map_key_IOS,
			android: config.map_key_android,
		});
		Geolocation.getCurrentPosition(({ coords }) => {
			// console.log(coords, '用户位置');
		});
		// PushNotificationIOS.requestPermissions().then(
		// 	data => {
		// 		console.log('PushNotificationIOS.requestPermissions', data);
		// 	},
		// 	data => {
		// 		console.log('PushNotificationIOS.requestPermissions failed', data);
		// 	},
		// );
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
		if (!user.phone || !user.username) {
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

		// 店铺内下单
		if (data && data.key === 'shop_order') {
			await this.judgeMember();
			navigation.navigate('GoodsScreen', { order_type: 'shop_order' });
		}

		// moving商城
		if (data && data.key === 'home_shop') {
			await this.judgeMember();
			navigation.navigate('IntergralScreen');
		}

		// 洗衣排行
		if (data && data.key === 'home_ranking') {
			navigation.navigate('RankingScreen');
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
			UpdateVersion.updateVersion();
		}

		// 关于我们
		if (data && data.key === 'home_concat') {
			navigation.navigate('ConcatUsScreen');
		}

		// 获取所有的存储的key
		if (data && data.key === 'guanwang') {
			let url = 'http://47.107.43.166/';
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

		// 清除所有的keys
		if (data && data.key === 'bbb') {
			// let keys = await StorageUtil.getAllKeys();
			// let res = await StorageUtil.multiGet(keys);
			// console.log('StorageUtil: ', res);
			//
			// await StorageUtil.clear();
			// console.log('清除成功');
			//
		}
	}

	render() {
		const iconList1 = [
			{
				key: 'shop_order',
				url: require('@/asserts/home/shop.png'),
				text: language.homeScreen.shopOrder,
			},
			{
				key: 'home_clothing',
				url: require('@/asserts/home/service.png'),
				text: language.homeScreen.clothing,
			},
			{
				key: 'home_shop',
				url: require('@/asserts/home/jifen.png'),
				text: language.homeScreen.shop,
			},
			{
				key: 'home_ranking',
				url: require('@/asserts/home/ranking.png'),
				text: language.homeScreen.ranking,
			},
			{
				key: 'home_member',
				url: require('@/asserts/home/member.png'),
				text: language.homeScreen.member,
			},
			{
				key: 'home_recharge',
				url: require('@/asserts/home/chongzhi.png'),
				text: language.homeScreen.recharge,
			},

			{
				key: 'home_concat',
				url: require('@/asserts/home/lianxi.png'),
				text: language.homeScreen.aboutUs,
			},
			{
				key: 'home_operation',
				url: require('@/asserts/home/caozuo.png'),
				text: language.homeScreen.update,
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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	icon_container: {
		marginTop: 10,
	},
	home_icon: {
		height: 145,
		marginHorizontal: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
