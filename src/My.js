/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

export default class DetailScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>我的页面</Text>
            </View>
        );
    }
}
