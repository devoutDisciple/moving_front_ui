/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.detail_content_goods}>
                <View style={styles.detail_common_title}>
                    <Text>物品信息</Text>
                </View>
                <View style={styles.detail_content_goods_item}>
                    <Image
                        style={styles.detail_content_goods_item_img}
                        source={require('../../../img/lunbo/3.jpg')}
                    />
                    <View style={styles.detail_content_goods_item_name}>
                        <Text>羽绒服</Text>
                    </View>
                    <View style={styles.detail_content_goods_item_num}>
                        <Text>x 4</Text>
                    </View>
                    <View style={styles.detail_content_goods_item_price}>
                        <Text
                            style={styles.detail_content_goods_item_price_text}>
                            ￥ 100
                        </Text>
                    </View>
                </View>
                <View style={styles.detail_content_goods_send}>
                    <Text>派送费： 18</Text>
                </View>
                <View style={styles.detail_content_goods_total}>
                    <Text style={styles.detail_content_goods_total_text}>
                        总价： 438
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    detail_common_title: {
        height: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#fb9dd0',
        borderLeftWidth: 3,
        marginBottom: 10,
    },
    detail_content_goods: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10,
    },
    detail_content_goods_item: {
        flexDirection: 'row',
        height: 50,
    },
    detail_content_goods_item_img: {
        height: 30,
        width: 30,
        marginTop: 10,
    },
    detail_content_goods_item_name: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    detail_content_goods_item_num: {
        width: 50,
        justifyContent: 'center',
    },
    detail_content_goods_item_price: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    detail_content_goods_item_price_text: {
        fontSize: 16,
        fontWeight: '800',
    },
    detail_content_goods_send: {
        marginVertical: 10,
    },
    detail_content_goods_total: {
        alignItems: 'flex-end',
    },
    detail_content_goods_total_text: {
        fontSize: 18,
        fontWeight: '800',
    },
});
