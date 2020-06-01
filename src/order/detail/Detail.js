/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import CommonHeader from '../../component/CommonHeader';
import DetailSave from './DetailSave';
import DetailSend from './DetailSend';
import Detailgoods from './DetailGoods';
import Request from '../../util/Request';
import Loading from '../../component/Loading';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderDetail: {},
			loadingVisible: false,
		};
	}

	componentDidMount() {
		this.getOrderById();
	}

	// 根据订单id获取订单
	async getOrderById() {
		this.setState({ loadingVisible: true });
		const { navigation } = this.props;
		let id = navigation.getParam('id');
		let order = await Request.get('/order/getOrderById', { id });
		console.log(order, 888);
		this.setState({ orderDetail: order.data || {}, loadingVisible: false });
	}

	render() {
		const { navigation } = this.props,
			{ orderDetail, loadingVisible } = this.state;
		return (
			// <Text>234</Text>
			<View style={{ flex: 1 }}>
				<CommonHeader title="订单详情" navigation={navigation} />
				<ScrollView style={styles.detail_content}>
					<View style={styles.detail_content_title}>
						<Text style={styles.detail_content_title_num}>订单编号: {orderDetail.code}</Text>
						<Text style={styles.detail_content_title_time}>{orderDetail.create_time}</Text>
					</View>
					<Detailgoods orderDetail={orderDetail} />
					<DetailSave orderDetail={orderDetail} />
					<DetailSend orderDetail={orderDetail} />
				</ScrollView>
				<Loading visible={loadingVisible} />
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
		fontSize: 14,
		color: '#333',
	},
	detail_content_title_time: {
		marginTop: 5,
		fontSize: 12,
		color: '#8a8a8a',
	},
});
