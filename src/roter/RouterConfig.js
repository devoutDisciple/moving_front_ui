/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Text} from 'react-native';
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
import TabBarItem from './TabBarItem';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
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
        initialRouteName: 'My', // 第一次加载tab bar时路由的routeName
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
        Tab: {
            screen: TabNavigator,
            // navigationOptions: {
            //     title: '首页',
            //     headerTitle: '首页',
            //     headerBackTitle: '返回',
            //     headerRight: () => <Text>详情</Text>,
            //     headerLeft: <Text>返回</Text>,
            // },
            navigationOptions: ({navigation}) => {
                console.log(navigation);
                let title = '首页';
                if (navigation.state.index == 0) {
                    title = '首页';
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
                    headerShown: false, // 是否显示header
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
    },
);

export default createAppContainer(SimpleApp);
