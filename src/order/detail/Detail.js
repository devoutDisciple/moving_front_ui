/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import CommonHeader from '../../component/CommonHeader';
import DetailSave from './DetailSave';
import DetailSend from './DetailSend';
import Detailgoods from './DetailGoods';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        return (
            // <Text>234</Text>
            <View style={{flex: 1}}>
                <CommonHeader title="订单详情" navigation={navigation} />
                <ScrollView style={styles.detail_content}>
                    <View style={styles.detail_content_title}>
                        <Text style={styles.detail_content_title_num}>
                            订单编号: 1112245443534534
                        </Text>
                        <Text style={styles.detail_content_title_time}>
                            2020-05-06 20:06:08
                        </Text>
                    </View>
                    <Detailgoods />
                    <DetailSave />
                    <DetailSend />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    detail_content: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 10,
    },
    detail_content_title: {
        backgroundColor: '#fff',
        padding: 10,
    },
    detail_content_title_num: {
        fontSize: 16,
        color: '#333',
    },
    detail_content_title_time: {
        marginTop: 5,
        fontSize: 12,
        color: '#8a8a8a',
    },
});
