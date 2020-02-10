/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PayItem from './PayItem';
import MoneyItem from './MoneyItem';
import FastImage from '../component/FastImage';
import CommonHeader from '../component/CommonHeader';
import CommonStyle from '../style/common';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default class ReCharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMoney: 1,
            payWay: 'alipay',
        };
    }

    componentDidMount() {}

    // 支付金额改变
    onPressChargeItem(key) {
        this.setState({activeMoney: key});
    }

    // 支付方式改变
    payWayChange(key) {
        this.setState({payWay: key});
    }

    render() {
        const {navigation} = this.props;
        let {activeMoney, payWay} = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader title="充值" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <FastImage
                        style={styles.content_logo}
                        source={require('../../img/public/logo2.png')}
                    />
                    <View style={styles.detail_common_title}>
                        <Text style={{fontSize: 14, color: '#333'}}>
                            余额充值
                        </Text>
                    </View>
                    <View style={styles.content_account}>
                        <MoneyItem
                            money={1000}
                            discount={200}
                            active={activeMoney === 1}
                            onPress={this.onPressChargeItem.bind(this, 1)}
                        />
                        <MoneyItem
                            money={500}
                            discount={80}
                            active={activeMoney === 2}
                            onPress={this.onPressChargeItem.bind(this, 2)}
                        />
                        <MoneyItem
                            money={200}
                            discount={20}
                            active={activeMoney === 3}
                            onPress={this.onPressChargeItem.bind(this, 3)}
                        />
                        <MoneyItem
                            money={100}
                            active={activeMoney === 4}
                            onPress={this.onPressChargeItem.bind(this, 4)}
                        />
                    </View>
                    <View style={styles.detail_common_title}>
                        <Text style={{fontSize: 14, color: '#333'}}>
                            选择支付方式
                        </Text>
                    </View>
                    <PayItem
                        iconName="alipay-circle"
                        onPress={this.payWayChange.bind(this, 'alipay')}
                        iconColor="#208ee9"
                        text="支付宝支付"
                        active={payWay === 'alipay'}
                    />
                    <PayItem
                        iconName="wechat"
                        onPress={this.payWayChange.bind(this, 'wechat')}
                        iconColor="#89e04c"
                        text="微信支付"
                        active={payWay === 'wechat'}
                    />
                </ScrollView>
                <View style={styles.bottom_btn}>
                    <Text style={styles.bottom_btn_text}>确认支付</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        // backgroundColor: 'red',
        paddingHorizontal: 10,
    },
    content_logo: {
        width: width - 20,
        height: 0.4 * width,
    },
    detail_common_title: CommonStyle.detail_common_title,
    content_account: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    bottom_btn: {
        height: 50,
        width: width - 40,
        marginLeft: 20,
        backgroundColor: '#fb9dd0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 50,
    },
    bottom_btn_text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800',
    },
});
