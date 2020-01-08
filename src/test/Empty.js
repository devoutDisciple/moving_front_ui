/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image} from 'react-native';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(4);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        marginTop: 150,
                        marginBottom: 100,
                    }}
                    source={require('../../img/public/order.png')}
                />
                <Text style={{fontSize: 18, color: '#bfbfbf'}}>暂无数据</Text>
            </View>
        );
    }
}
