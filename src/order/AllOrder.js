/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Empty from './component/Empty';
import FooterScreen from './component/Footer';
import OrderItem from './component/OrderItem';
import { View, FlatList, StyleSheet } from 'react-native';
import Request from '../util/Request';
import storageUtil from '../util/Storage';
import Loading from '../component/Loading';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			current: 1,
			pagesize: 10,
			headerLoading: false, // 头部的loading是否显示
			loadingVisible: false,
			footerStatus: 1, // 底部的状态 1-什么也不显示 2-上拉加载 3-加载中 4-已经全部加载完成
		};
	}

	async componentDidMount() {
		await this.onJustSearch();
	}

	async onJustSearch() {
		let data = await this.onSearchOrder(true);
		this.setState({ data });
	}

	async onSearchOrder(show) {
		show && (await this.setState({ loadingVisible: true }));
		let user = await storageUtil.get('user');
		let userid = user.id,
			{ current, pagesize } = this.state;
		let result = await Request.get('/order/getOrderByPage', { current, pagesize, userid });
		let data = result.data || [];
		show && (await this.setState({ loadingVisible: false }));
		console.log(data, 111);
		return data;
	}

	// 下拉刷新
	headerRefresh() {
		this.setState({ headerLoading: true, current: 1 }, async () => {
			let orders = await this.onSearchOrder(false);
			this.setState({ headerLoading: false, data: orders, footerStatus: 2 });
		});
	}

	// 上拉加载更多
	footerRefresh() {
		let { footerStatus, data, current, pagesize } = this.state;
		if (current * pagesize > data.length) {
			return;
		}
		if (footerStatus !== 3) {
			this.setState({ footerStatus: 3, current: current + 1 }, async () => {
				let orders = await this.onSearchOrder(false);
				let result = data.concat(orders || []);
				this.setState({ footerStatus: 4, data: result });
			});
		}
	}

	render() {
		let { navigation } = this.props;
		let { data, headerLoading, footerStatus, loadingVisible } = this.state;
		return (
			<View style={styles.order_container}>
				<FlatList
					data={data}
					onRefresh={this.headerRefresh.bind(this)}
					refreshing={headerLoading}
					onEndReachedThreshold={0.1} // 决定当距离内容最底部还有多远时触发onEndReached回调
					onEndReached={this.footerRefresh.bind(this)}
					ListEmptyComponent={<Empty />}
					keyExtractor={(item, index) => String(item.id)}
					ListFooterComponent={<FooterScreen status={footerStatus} />}
					renderItem={({ item, index }) => {
						let goods = JSON.parse(item.goods || []);
						let firstName = goods[0] ? goods[0].name : '--';
						let totalThings = 0;
						if (goods.length !== 0) {
							goods.forEach(good => {
								totalThings += Number(good.num);
							});
						}
						return (
							<OrderItem
								key={String(item.id)}
								id={item.id}
								navigation={navigation}
								title={item.shopName}
								imgUrl={item.cabinetUrl}
								address={item.cabinetAdderss}
								time={item.create_time}
								money={item.money}
								goods={`${firstName} 等 ${totalThings} 件衣物`}
							/>
						);
					}}
				/>
				<Loading visible={loadingVisible} />
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
