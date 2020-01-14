/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image} from 'react-native';
import Dialog from '../util/Dialog';

export default class Member extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: '#bfbfbf'}}>暂无数据</Text>
                <Dialog />
            </View>
        );
    }
}
