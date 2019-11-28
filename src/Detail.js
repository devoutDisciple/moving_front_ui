/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

export default class Detail extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>这是详情页</Text>
            </View>
        );
    }
}
