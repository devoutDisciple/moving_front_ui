import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import CommonHeader from '@/component/CommonHeader';
import DetailSave from './DetailSave';
import DetailShop from './DetailShop';
import Detailgoods from './DetailGoods';
import Request from '@/util/Request';
import Loading from '@/component/Loading';
import storageUtil from '@/util/Storage';
import { Badge } from 'react-native-elements';
import DetailShopOrder from './DetailShopOrder';
import SafeViewComponent from '@/component/SafeViewComponent';

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
		await this.initSearch();
	}

	async initSearch() {
		try {
			this.setState({ loadingVisible: true });
			await this.getOrderById();
			await this.getUserDefaultAddress();
			this.setState({ loadingVisible: false });
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	// 根据订单id获取订单
	async getOrderById() {
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
							<View style={styles.detail_content_title_time}>
								<Text style={styles.detail_content_title_time_left}>{orderDetail.create_time}</Text>
								{orderDetail.urgency === 2 && <Badge value="加急订单" status="success" textStyle={{ fontSize: 10 }} />}
							</View>
						</View>
						<Detailgoods orderDetail={orderDetail} type={type} />
						{Number(type) === 5 ? <DetailShopOrder orderDetail={orderDetail} address={address} /> : null}
						<View>
							<DetailSave orderDetail={orderDetail} address={address} type={type} />
						</View>
						<DetailShop orderDetail={orderDetail} address={address} type={type} />

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
		paddingTop: 10,
		paddingBottom: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	detail_content_title_num: {
		fontSize: 14,
		color: '#333',
	},
	detail_content_title_time: {
		marginTop: 5,
		flexDirection: 'row',
	},
	detail_content_title_time_left: {
		flex: 1,
		fontSize: 12,
		color: '#8a8a8a',
	},
	detail_content_title_time_right: {
		fontSize: 12,
		color: '#8a8a8a',
	},
});
