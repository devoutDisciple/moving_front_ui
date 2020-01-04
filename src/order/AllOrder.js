/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import FooterScreen from './Footer';
import Empty from './Empty';

export default class AllOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    onRefresh={this.headerRefresh.bind(this)}
                    refreshing={headerLoading}
                    onEndReachedThreshold={0.1} // 决定当距离内容最底部还有多远时触发onEndReached回调
                    onEndReached={this.footerRefresh.bind(this)}
                    ListEmptyComponent={<Empty />}
                    ListFooterComponent={<FooterScreen status={footerStatus} />}
                    renderItem={({item}) => (
                        <View style={styles.text}>
                            <Text>{item.id}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        height: 100,
        borderBottomColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
    },
});
