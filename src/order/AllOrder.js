/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import FooterScreen from './Footer';
import OrderItem from './OrderItem';
import Empty from './Empty';

export default class AllOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 'hello',
                },
                {
                    id: 'world',
                },
                {
                    id: 'fuck',
                },
            ],
            headerLoading: false, // 头部的loading是否显示
            footerStatus: 1, // 底部的状态 1-什么也不显示 2-上拉加载 3-加载中 4-已经全部加载完成
        };
    }

    componentDidMount() {
        console.log(1);
    }

    // 下拉刷新
    headerRefresh() {
        this.setState({headerLoading: true});
        let data = [];
        for (let i = 10; i < 20; i++) {
            data.push({id: String(i)});
        }
        this.setState({data: data});
        setTimeout(() => {
            this.setState({headerLoading: false, footerStatus: 2});
        }, 4000);
    }

    // 上拉加载更多
    footerRefresh() {
        let {footerStatus, data} = this.state;
        // 已经全部加载完成
        if (footerStatus === 4) {
            return;
        }
        this.setState({footerStatus: 3});
        setTimeout(() => {
            for (let i = 20; i < 30; i++) {
                data.push({id: String(i)});
            }
            this.setState({footerStatus: 4, data});
        }, 3000);
    }

    render() {
        let {data, headerLoading, footerStatus} = this.state;
        return (
            <View style={styles.order_container}>
                <FlatList
                    data={data}
                    onRefresh={this.headerRefresh.bind(this)}
                    refreshing={headerLoading}
                    onEndReachedThreshold={0.1} // 决定当距离内容最底部还有多远时触发onEndReached回调
                    onEndReached={this.footerRefresh.bind(this)}
                    ListEmptyComponent={<Empty />}
                    ListFooterComponent={<FooterScreen status={footerStatus} />}
                    renderItem={({item}) => (
                        <View style={styles.order_item}>
                            <View style={styles.order_item_left}>
                                <Image
                                    style={styles.order_item_left_img}
                                    source={require('../../img/public/3-express.jpg')}
                                />
                            </View>
                            <View style={styles.order_item_right}>
                                <View style={styles.order_item_right_title}>
                                    <View
                                        style={
                                            styles.order_item_right_title_left
                                        }>
                                        <Text style={styles.font_title_style}>
                                            西溪水岸北二门二号丰巢柜子
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            styles.order_item_right_title_right
                                        }>
                                        <Text style={styles.font_title_style}>
                                            待支付
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.order_item_right_time}>
                                    <Text style={{fontSize: 10, color: '#333'}}>
                                        2019-10-28 18:00:00
                                    </Text>
                                </View>
                                <View style={styles.order_item_right_adrress}>
                                    <Text style={styles.font_desc_style}>
                                        取货地点：西溪水岸北二门二号丰巢柜子西溪水岸北二门二号丰巢柜
                                    </Text>
                                </View>
                                <View style={styles.order_item_right_goods}>
                                    <View
                                        style={
                                            styles.order_item_right_goods_left
                                        }>
                                        <Text style={styles.font_desc_style}>
                                            羽绒服 等 3 件
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            styles.order_item_right_goods_right
                                        }>
                                        <Text style={styles.font_desc_style}>
                                            ￥ 59.0
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.order_item_right_bottom}>
                                    <TouchableOpacity
                                        style={
                                            styles.order_item_right_bottom_btn
                                        }>
                                        <Text style={styles.order_pay_font}>
                                            去支付
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
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
    order_container: {
        flex: 1,
        backgroundColor: '#fafafa',
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
