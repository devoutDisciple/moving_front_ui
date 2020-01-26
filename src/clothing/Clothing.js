/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import CommonHeader from '../component/CommonHeader';

export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
        };
    }

    // swiperChange 选择不同的会员的时候
    swiperChange(index) {
        this.setState({selectIndex: index});
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="预约上门取衣" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <Text>123</Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
