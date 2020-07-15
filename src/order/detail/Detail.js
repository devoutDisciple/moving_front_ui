/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import CommonHeader from '../../component/CommonHeader';
import DetailSave from './DetailSave';
// import DetailSend from './DetailSend';
import DetailShop from './DetailShop';
import Detailgoods from './DetailGoods';
import Request from '../../util/Request';
import Loading from '../../component/Loading';
import storageUtil from '../../util/Storage';
import SafeViewComponent from '../../component/SafeViewComponent';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderDetail: {},
			loadingVisible: false,
			address: {},
			type: 1, // 默认是从柜子下的订单
		};
	}

	async componentDidMount() {
		await this.getOrderById();
		await this.getUserDefaultAddress();
	}

	// 根据订单id获取订单
	async getOrderById() {
		this.setState({ loadingVisible: true });
		const { navigation } = this.props;
		let id = navigation.getParam('id');
		let order = await Request.get('/order/getOrderById', { id });
		this.setState({ orderDetail: order.data || {}, loadingVisible: false, type: order.data.order_type });
	}

	// 获取用户默认地址
	async getUserDefaultAddress() {
		let user = await storageUtil.get('user');
		let userid = user.id;
		let address = await Request.get('/address/getUserDefaultAddress', { userid });
		this.setState({ address: address.data || {} });
	}

	render() {
		const { navigation } = this.props,
			{ orderDetail, loadingVisible, address, type } = this.state;
		return (
			<SafeViewComponent>
				<View style={{ flex: 1 }}>
					<CommonHeader title="订单详情" navigation={navigation} />
					<ScrollView style={styles.detail_content} showsVerticalScrollIndicator={false}>
						<View style={styles.detail_content_title}>
							<Text style={styles.detail_content_title_num}>订单编号: {orderDetail.code}</Text>
							<Text style={styles.detail_content_title_time}>{orderDetail.create_time}</Text>
						</View>
						<Detailgoods orderDetail={orderDetail} type={type} />
						<DetailShop orderDetail={orderDetail} address={address} type={type} />
						<View>
							<DetailSave orderDetail={orderDetail} address={address} type={type} />
						</View>

						{/* <DetailSend orderDetail={orderDetail} /> */}
					</ScrollView>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
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
