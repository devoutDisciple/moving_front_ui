/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class AllOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(1);
    }

    render() {
        const {title, imgUrl, time, address, goods, money} = this.props;
        return (
            <View style={styles.order_item}>
                <View style={styles.order_item_left}>
                    <Image style={styles.order_item_left_img} source={imgUrl} />
                </View>
                <View style={styles.order_item_right}>
                    <View style={styles.order_item_right_title}>
                        <View style={styles.order_item_right_title_left}>
                            <Text style={styles.font_title_style}>{title}</Text>
                        </View>
                        <View style={styles.order_item_right_title_right}>
                            <Text style={styles.font_title_style}>待支付</Text>
                        </View>
                    </View>
                    <View style={styles.order_item_right_time}>
                        <Text style={{fontSize: 10, color: '#333'}}>
                            {time}
                        </Text>
                    </View>
                    <View style={styles.order_item_right_adrress}>
                        <Text style={styles.font_desc_style}>
                            取货地点：{address}
                        </Text>
                    </View>
                    <View style={styles.order_item_right_goods}>
                        <View style={styles.order_item_right_goods_left}>
                            <Text style={styles.font_desc_style}>{goods}</Text>
                        </View>
                        <View style={styles.order_item_right_goods_right}>
                            <Text style={styles.font_desc_style}>
                                ￥ {money}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.order_item_right_bottom}>
                        <TouchableOpacity
                            style={styles.order_item_right_bottom_btn}>
                            <Text style={styles.order_pay_font}>去支付</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const order_item_left_width = 35;
const styles = StyleSheet.create({
    font_title_style: {
        fontSize: 14,
        color: '#606060',
    },
    font_desc_style: {
        fontSize: 12,
        color: '#333',
        lineHeight: 20,
    },
    order_item: {
        height: 180,
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
    },
    order_item_left: {
        width: order_item_left_width,
        height: order_item_left_width,
        backgroundColor: 'blue',
    },
    order_item_left_img: {
        width: order_item_left_width,
        height: order_item_left_width,
    },
    order_item_right: {
        flex: 1,
        marginLeft: 10,
    },
    order_item_right_title: {
        height: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    order_item_right_title_left: {
        flex: 1,
    },
    order_item_right_title_right: {
        width: 50,
        alignItems: 'flex-end',
    },
    order_item_right_time: {
        height: 20,
        justifyContent: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    order_item_right_adrress: {
        marginTop: 5,
        height: 50,
        // backgroundColor: 'red',
    },
    order_item_right_goods: {
        flexDirection: 'row',
    },
    order_item_right_goods_left: {
        flex: 1,
    },
    order_item_right_goods_right: {
        width: 70,
        alignItems: 'flex-end',
    },
    order_item_right_bottom: {
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    order_item_right_bottom_btn: {
        width: 60,
        padding: 5,
        borderWidth: 1,
        borderColor: '#2fc1ae',
        alignItems: 'center',
        borderRadius: 5,
    },
    order_pay_font: {
        color: '#2fc1ae',
    },
});
