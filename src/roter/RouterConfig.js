/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../Home';
import MyScreen from '../My';
import Detail from '../Detail';
import TabBarItem from './TabBarItem';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'Home',
                tabBarLabel: '后台',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('../../img/home/icon_homepage_hotel_category.png')}
                        selectedImage={require('../../img/home/icon_homepage_ktv_category.png')}
                    />
                ),
            },
        },
        My: {
            screen: MyScreen,
            navigationOptions: {
                title: 'My',
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('../../img/home/icon_homepage_beauty_category.png')}
                        selectedImage={require('../../img/home/icon_homepage_default.png')}
                    />
                ),
            },
        },
    },
    {
        initialRouteName: 'Home', // 第一次加载tab bar时路由的routeName
        tabBarOptions: {
            activeTintColor: '#008dcf',
            inactiveTintColor: '#333333',
            // activeTintColor: '#333', //当前选中的tab bar的文本颜色和图标颜色
            // inactiveTintColor: '#fff', // 当前未选中的tab bar的文本颜色和图标颜色
            activeBackgroundColor: 'green', // 当前选中的tab bar的背景色
            inactiveBackgroundColor: '#fff', //当前未选中的tab bar的背景色
            labelStyle: {
                color: 'orange',
            },
        },
    },
);

const SimpleApp = createStackNavigator(
    {
        Tab: {screen: TabNavigator, headerTitle: '首页'},
        Detail: {
            screen: Detail,
            navigationOptions: {
                headerTitle: '详情页',
                headerBackTitle: '返回',
                // headerRight: '详情',
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
