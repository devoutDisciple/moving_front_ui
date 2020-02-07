/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.detail_send}>
                <View style={styles.detail_common_title}>
                    <Text>收货信息</Text>
                </View>
                <View style={styles.detail_send_content}>
                    <View style={styles.detail_send_content_item}>
                        <Text style={styles.detail_send_content_item_label}>
                            存货时间:{' '}
                        </Text>
                        <Text style={styles.detail_send_content_item_text}>
                            2020-04-05 20:18:32
                        </Text>
                    </View>
                    <View style={styles.detail_send_content_item}>
                        <Text style={styles.detail_send_content_item_label}>
                            存货地点:{' '}
                        </Text>
                        <Text style={styles.detail_send_content_item_text}>
                            幸福家园北门二号蜂巢柜子29格
                        </Text>
                    </View>
                    <View style={styles.detail_send_content_item}>
                        <Text style={styles.detail_send_content_item_label}>
                            收件人:{' '}
                        </Text>
                        <Text style={styles.detail_send_content_item_text}>
                            李二狗
                        </Text>
                    </View>
                    <View style={styles.detail_send_content_item}>
                        <Text style={styles.detail_send_content_item_label}>
                            收件人电话:{' '}
                        </Text>
                        <Text style={styles.detail_send_content_item_text}>
                            182110110110
                        </Text>
                    </View>
                    <View style={styles.detail_send_content_item}>
                        <Text style={styles.detail_send_content_item_label}>
                            收件人地址:{' '}
                        </Text>
                        <Text style={styles.detail_send_content_item_text}>
                            幸福家园25栋1单元804室
                        </Text>
                    </View>
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
    detail_send: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10,
    },
    detail_send_content_item: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    detail_send_content_item_label: {
        width: 80,
    },
    detail_send_content_item_text: {
        flex: 1,
        color: '#8a8a8a',
    },
});
