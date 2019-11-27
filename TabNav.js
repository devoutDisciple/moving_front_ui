/* eslint-disable react-native/no-inline-styles */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './src/Home';
import DetailScreen from './src/Detail';
import TabBarItem from './TabBarItem';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerTitle: '首页',
                title: 'Home',
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={require('./images/hello.png')}
                        selectedImage={require('./images/world.png')}
                    />
                ),
            },
        },
        Settings: DetailScreen,
    },
    {
        tabBarOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#fff',
            inactiveTintColor: 'red',
            inactiveBackgroundColor: 'red',
            labelStyle: {
                color: 'red',
            },
        },
    },
);

const TabNavigationConfigs = {
    activeTintColor: 'red',
    activeBackgroundColor: 'red',
    inactiveTintColor: 'green',
    inactiveBackgroundColor: 'green',
    labelStyle: {
        color: 'red',
    },
};

export default createAppContainer(TabNavigator);
