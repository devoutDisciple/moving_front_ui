/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Image, View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// 首页
import HomeScreen from '../home/Home';
// 我的
import MyScreen from '../my/My';
// 订单页面
import OrderScreen from '../order/Index';
// 测试详情
import Detail from '../home/Detail';
// 登录和注册页面
import Login from '../login/Login';
import TabBarItem from './TabBarItem';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            path: 'Home',
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
            screen: OrderScreen,
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
            screen: MyScreen,
            params: {hello: 'world'},
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
                // tabBarOnPress: (props, a) => {
                //     console.log(props.defaultHandler());
                //     console.log(props, a);
                // },
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

const SimpleApp = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        Tab: {
            screen: TabNavigator,
            navigationOptions: ({navigation}) => {
                let title = '首页';
                if (navigation.state.index == 0) {
                    title = 'Cleaner';
                }
                if (navigation.state.index == 1) {
                    title = '订单';
                }
                if (navigation.state.index == 2) {
                    title = '我的';
                }
                return {
                    title: title,
                    headerBackTitle: '返回',
                    headerRight: () => {
                        return <Text>234</Text>;
                    },
                    headerLeft: () => {
                        return <Text>123</Text>;
                    },
                    headerTitleStyle: {
                        alignSelf: 'center',
                        textAlign: 'center',
                        flex: 1,
                    },
                    // 整个标题的样式
                    headerStyle: {
                        shadowColor: '#505050',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.3,
                    },
                    headerLeftContainerStyle: {
                        color: 'red',
                        padding: 10,
                    },
                    // 题组件的样式对象
                    // headerTitleStyle: {
                    //     // backgroundColor: 'red',
                    //     color: '#333',
                    //     alignItems: 'center',
                    //     alignSelf: 'center',
                    // },

                    // headerShown: false, // 是否显示header
                };
            },
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: '详情页',
                headerBackTitle: '返回',
                // headerRight: () => <Text>详情</Text>,
                // headerLeft: <Text>返回</Text>,
            },
        },
    },
    {
        mode: 'card', // 定义页面渲染和转换的风格： card 页面转换风格，此项为缺省。 modal - 使页面从屏幕底部滑入，只适用于iOS
        headerMode: 'float', // headerMode -
        initialRouteName: 'Tab', // 第一次加载tab bar时路由的routeName
    },
);

export default createAppContainer(SimpleApp);
