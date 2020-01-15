/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View>
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
