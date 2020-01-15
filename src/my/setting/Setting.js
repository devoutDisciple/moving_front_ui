/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View>
                <CommonHeader title="个人信息" />
                <Text style={{fontSize: 18, color: '#bfbfbf'}}>暂无数据</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});
