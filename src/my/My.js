/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

export default class MyScreen extends React.Component {
    static navigationOptions = {
        title: 'fuck!',
    };

    componentDidMount() {
        console.log(123);
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>我的页面s</Text>
            </View>
        );
    }
}
