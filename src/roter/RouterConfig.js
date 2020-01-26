/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// 首页
import HomeScreen from '../home/Home';
// 上门取衣服
import ClothingScreen from '../clothing/Clothing';

// 我的  --------------------
import MyScreen from '../my/My';
import MySetting from '../my/setting/Setting';
import MyMessage from '../my/message/Message';
import MessageEditScreen from '../my/message/MessageEdit';

// 订单页面
import OrderScreen from '../order/Index';
// 二维码页面
import ScanCameraScreen from '../home/ScanCamera';
// 登录和注册页面
import LoginScreen from '../login/Login';
import ResgisterScreen from '../login/Register';
import SecurityLoginScreen from '../login/SecurityLogin';
import ResetPasswordScreen from '../login/ResetPassword';
// 会员页面
import MemberScreen from '../member/Member';
// 我的地址页面
import AddressScreen from '../address/Address';
import AddressEditScreen from '../address/AddressEdit';

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
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('../../img/tabbar/tabbar_homepage.png')}
                        selectedImage={require('../../img/tabbar/tabbar_homepage_selected.png')}
                    />
                ),
            },
        },
        Order: {
            screen: OrderContainer,
            navigationOptions: {
                title: 'Order',
                tabBarLabel: '订单',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('../../img/tabbar/tabbar_order.png')}
                        selectedImage={require('../../img/tabbar/tabbar_order_selected.png')}
                    />
                ),
            },
        },
        My: {
            screen: MyContainer,
            navigationOptions: {
                title: 'My',
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('../../img/tabbar/tabbar_mine.png')}
                        selectedImage={require('../../img/tabbar/tabbar_mine_selected.png')}
                    />
                ),
            },
        },
    },
    {
        initialRouteName: 'Home', // 第一次加载tab bar时路由的routeName
        tabBarOptions: {
            activeTintColor: '#2fc3af', //当前选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#666', // 当前未选中的tab bar的文本颜色和图标颜色
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
        // 地址编辑页面
        AddressEditScreen: {
            screen: AddressEditScreen,
            headerBackTitle: '返回',
            navigationOptions: {
                headerShown: false,
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

        // 收货地址页面
        AddressScreen: {
            screen: AddressScreen,
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

        // 我的个人信息页面
        MyMessage: {
            screen: MyMessage,
            headerBackTitle: '返回',
            navigationOptions: {
                headerShown: false,
            },
        },
        // 信息编辑页面
        MessageEditScreen: {
            screen: MessageEditScreen,
            navigationOptions: {
                headerShown: false,
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
                title: '',
            },
        },
        // -------------------- 我的 ---------------------
        // 我的设置页面
        MySetting: {
            screen: MySetting,
            navigationOptions: {
                title: '设置',
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
