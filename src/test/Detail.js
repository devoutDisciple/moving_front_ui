/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class DetailScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Home',
    // };

    static navigationOptions = ({navigation, navigationOptions}) => {
        console.log(navigation, navigationOptions, 222);
        const {params} = navigation.state;
        return {
            title: 'hello',
            /* These values are used instead of the shared configuration! */
        };
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>test也米娜</Text>
            </View>
        );
    }
}
