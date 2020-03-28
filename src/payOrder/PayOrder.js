/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PayItem from './PayItem';
import Toast from '../component/Toast';
import CommonStyle from '../style/common';
import FastImage from '../component/FastImage';
import CommonHeader from '../component/CommonHeader';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');

export default class PayOrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payWay: 'alipay',
        };
    }

    componentDidMount() {}

    // 支付方式改变
    payWayChange(key) {
        this.setState({payWay: key});
    }

    // 确认充值
    onSurePay() {
        Toast.error('请先安装支付宝或微信');
    }

    render() {
        const {navigation} = this.props;
        let {payWay} = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader title="支付" navigation={navigation} />
                <ScrollView style={styles.content}>
                    {/* <FastImage
                        style={styles.content_logo}
                        source={require('../../img/public/logo2.png')}
                    /> */}
                    <View style={styles.money}>
                        <Text style={styles.money_num}>￥ 290</Text>
                        <Text style={styles.money_order}>
                            订单编号: 328443973823897493
                        </Text>
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
                <TouchableOpacity
                    style={styles.bottom_btn}
                    onPress={this.onSurePay.bind(this)}>
                    <Text style={styles.bottom_btn_text}>确认支付</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 10,
    },
    content_logo: {
        width: width - 20,
        height: 0.4 * width,
    },
    money: {
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    money_num: {
        fontSize: 28,
        color: '#fb9dd0',
        fontWeight: '800',
    },
    money_order: {
        fontSize: 12,
        color: '#8a8a8a',
    },
    detail_common_title: CommonStyle.detail_common_title,
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
