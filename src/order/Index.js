/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

export default class OrderScreen extends React.Component {
    componentDidMount() {
        console.log(this.props, 878);
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>这是订单页面</Text>
            </View>
        );
    }
}
