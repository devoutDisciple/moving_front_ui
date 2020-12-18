import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Storage from '@/util/Storage';
import langage from '@/language/index';
// 首页
import HomeScreen from '@/views/home/Home';
// 上门取衣服
import ClothingScreen from '@/views/clothing/Clothing';
// 我的页面
import MyScreen from '@/views/my/My';
// 我的设置页面
import MySetting from '@/views/my/setting/Setting';
// 我的个人信息页面
import MyMessage from '@/views/my/message/Message';
// 积分兑换页面
import IntergralScreen from '@/views/integral/Intergral';
// 积分兑换记录页面
import IntergralRecordScreen from '@/views/intergralRecord/IntergralRecord';
// 订单页面
import OrderScreen from '@/views/order/Index';
// 二维码页面
import ScanCameraScreen from '@/views/scan/ScanCamera';
// 登录页面
import LoginScreen from '@/views/login/Login';
// 注册页面
import ResgisterScreen from '@/views/login/Register';
// 验证码登录页面
import SecurityLoginScreen from '@/views/login/SecurityLogin';
// 重置密码页面
import ResetPasswordScreen from '@/views/login/ResetPassword';
// 会员页面
import MemberScreen from '@/views/member/Member';
// 我的地址页面
import MyAddressScreen from '@/views/address/Address';
// 地址编辑页面
import AddressEditScreen from '@/views/address/AddressEdit';
// 新增地址页面
import AddressAddScreen from '@/views/address/AddressAdd';
// 设置商品金额页面
import GoodsScreen from '@/views/goods/Goods';
// 订单详情页面
import OrderDetailScreen from '@/views/order/detail/Detail';
// 选择柜子界面
import CabinetScreen from '@/views/cabinet/Cabinet';
// 消费记录页面
import ShopRecordScreen from '@/views/shopRecord/ShopRecord';
// 充值页面
import ReChargeScreen from '@/views/Recharge/ReCharge';
// 意见和反馈页面
import SuggestionScreen from '@/views/suggestion/Suggestion';
// 联系我们页面
import ConcatUsScreen from '@/views/concatUs/ConcatUs';
// 关于我们页面
import AboutUsScreen from '@/views/aboutUs/AboutUs';
// 隐私政策页面
import PrivacyScreen from '@/views/privacy/Privacy';
// 支付订单页面
import PayOrderScreen from '@/views/payOrder/PayOrder';
// 首屏广告
import AdvertisementScreen from '@/views/advertisement/index';
// 服务协议
import ServiceProtocolScreen from '@/views/protocol/ServiceProtocol';
// 消费排行榜
import RankingScreen from '@/views/ranking/Ranking';

import TabBarItem from './TabBarItem';

// 首页的页面
const HomeContainer = createStackNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);
// 订单页面
const OrderContainer = createStackNavigator(
	{
		OrderScreen: {
			screen: OrderScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);

// 我的页面
const MyContainer = createStackNavigator(
	{
		MyScreen: {
			screen: MyScreen,
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);

const TabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeContainer,
			navigationOptions: {
				title: 'Home',
				tabBarLabel: langage.menu.home,
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('@/asserts/tabbar/tabbar_homepage.png')}
						selectedImage={require('@/asserts/tabbar/tabbar_homepage_selected.png')}
					/>
				),
			},
		},
		Order: {
			screen: OrderContainer,
			navigationOptions: {
				title: 'Order',
				tabBarLabel: langage.menu.order,
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('@/asserts/tabbar/tabbar_order.png')}
						selectedImage={require('@/asserts/tabbar/tabbar_order_selected.png')}
					/>
				),
				tabBarOnPress: async ({ navigation, defaultHandler }) => {
					let user = await Storage.get('user');
					if (!user) {
						// 去登陆页面
						return navigation.navigate('LoginScreen');
					}
					return navigation.navigate('Order');
				},
			},
		},
		My: {
			screen: MyContainer,
			navigationOptions: {
				title: 'My',
				tabBarLabel: langage.menu.my,
				tabBarIcon: ({ focused, tintColor }) => (
					<TabBarItem
						focused={focused}
						normalImage={require('@/asserts/tabbar/tabbar_mine.png')}
						selectedImage={require('@/asserts/tabbar/tabbar_mine_selected.png')}
					/>
				),
				tabBarOnPress: async ({ navigation, defaultHandler }) => {
					let user = await Storage.get('user');
					if (!user) {
						// 去登陆页面
						return navigation.navigate('LoginScreen');
					}
					return navigation.navigate('My');
				},
			},
		},
	},
	{
		initialRouteName: 'Home', // 第一次加载tab bar时路由的routeName
		tabBarOptions: {
			activeTintColor: '#fb9dd0', //当前选中的tab bar的文本颜色和图标颜色
			inactiveTintColor: '#8a8a8a', // 当前未选中的tab bar的文本颜色和图标颜色
			activeBackgroundColor: '#fff', // 当前选中的tab bar的背景色
			inactiveBackgroundColor: '#fff', //当前未选中的tab bar的背景色
			// labelStyle: {
			//     color: 'orange',
			// },
		},
	},
);

const finnalApp = createStackNavigator(
	{
		// 首屏广告
		AdvertisementScreen: {
			screen: AdvertisementScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 首页
		HomeScreen: {
			screen: TabNavigator,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 消费排行榜页面 RankingScreen
		RankingScreen: {
			screen: RankingScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 登录页面
		LoginScreen: {
			screen: LoginScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 隐私政策页面
		PrivacyScreen: {
			screen: PrivacyScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		ServiceProtocolScreen: {
			screen: ServiceProtocolScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 积分兑换记录页面
		IntergralRecordScreen: {
			screen: IntergralRecordScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		// 积分兑换页面
		IntergralScreen: {
			screen: IntergralScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 选择快递柜子页面
		CabinetScreen: {
			screen: CabinetScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},

		// 地址编辑页面
		AddressEditScreen: {
			screen: AddressEditScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 新增地址页面
		AddressAddScreen: {
			screen: AddressAddScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		// 支付方式页面
		PayOrderScreen: {
			screen: PayOrderScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 订单详情页面
		OrderDetailScreen: {
			screen: OrderDetailScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 设置金额页面
		GoodsScreen: {
			screen: GoodsScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 联系我们页面
		ConcatUsScreen: {
			screen: ConcatUsScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		// 关于我们页面 AboutUsScreen
		AboutUsScreen: {
			screen: AboutUsScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 意见和反馈页面
		SuggestionScreen: {
			screen: SuggestionScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		// 消费记录页面 ShopRecordScreen
		ShopRecordScreen: {
			screen: ShopRecordScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		// 充值页面 ReChargeScreen
		ReChargeScreen: {
			screen: ReChargeScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 上门取衣服服务
		ClothingScreen: {
			screen: ClothingScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 收货地址页面
		MyAddressScreen: {
			screen: MyAddressScreen,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},
		// 我的个人信息页面
		MyMessage: {
			screen: MyMessage,
			headerBackTitle: '返回',
			navigationOptions: {
				headerShown: false,
			},
		},

		// 注册页面
		ResgisterScreen: {
			screen: ResgisterScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 验证码登录
		SecurityLoginScreen: {
			screen: SecurityLoginScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 重置密码页面
		ResetPasswordScreen: {
			screen: ResetPasswordScreen,
			navigationOptions: {
				headerShown: false,
				headerBackTitle: '返回',
				headerBackAllowFontScaling: false,
			},
		},
		// 二维码扫描页面
		ScanCameraScreen: {
			screen: ScanCameraScreen,
			navigationOptions: {
				title: '扫码开门',
			},
		},
		// -------------------- 我的 ---------------------
		// 我的设置页面
		MySetting: {
			screen: MySetting,
			navigationOptions: {
				title: '设置',
				headerShown: false,
			},
		},

		// 会员页面 MemberScreen
		MemberScreen: {
			screen: MemberScreen,
			navigationOptions: {
				headerShown: false,
			},
		},
	},
	{
		mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
		headerMode: 'float', // headerMode -
	},
);

export default createAppContainer(finnalApp);
