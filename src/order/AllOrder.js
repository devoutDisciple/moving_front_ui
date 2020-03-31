/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Empty from './component/Empty';
import FooterScreen from './component/Footer';
import OrderItem from './component/OrderItem';
import { View, FlatList, StyleSheet } from 'react-native';

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

	componentDidMount() {}

	// 下拉刷新
	headerRefresh() {
		this.setState({ headerLoading: true });
		let data = [];
		for (let i = 10; i < 13; i++) {
			data.push({ id: String(i) });
		}
		this.setState({ data: data });
		setTimeout(() => {
			this.setState({ headerLoading: false, footerStatus: 2 });
		}, 4000);
	}

	// 上拉加载更多
	footerRefresh() {
		let { footerStatus, data } = this.state;
		// 已经全部加载完成
		if (footerStatus === 4) {
			return;
		}
		if (footerStatus !== 3) {
			this.setState({ footerStatus: 3 }, () => {
				setTimeout(() => {
					for (let i = 100; i < 103; i++) {
						data.push({ id: String(i) });
					}
					this.setState({ footerStatus: 4, data });
				}, 3000);
			});
		}
	}

	render() {
		let { navigation } = this.props;
		let { data, headerLoading, footerStatus } = this.state;
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
					renderItem={({ item, index }) => (
						<OrderItem
							key={index}
							id={item.id}
							navigation={navigation}
							title={`杭州市丰巢柜子 ${item.id}`}
							imgUrl={require('../../img/public/3-express.jpg')}
							address="西溪水岸北二门二号丰巢柜子西溪水岸北二门二号丰巢柜"
							time="2019-10-28 18:00:00"
							money="59.0"
							goods="羽绒服 等 3 件"
						/>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	order_container: {
		flex: 1,
		backgroundColor: '#fafafa',
	},
});
