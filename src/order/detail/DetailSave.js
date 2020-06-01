/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonSylte from '../../style/common';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderDetail, address } = this.props;
		return (
			<View style={styles.detail_send}>
				<View style={styles.detail_common_title}>
					<Text>收货信息</Text>
				</View>
				<View style={styles.detail_send_content}>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>存货时间: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.create_time}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>存货地点: </Text>
						<Text style={styles.detail_send_content_item_text}>
							{orderDetail.cabinetAddress} {orderDetail.cellid}格口
						</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>收件人: </Text>
						<Text style={styles.detail_send_content_item_text}>{address.username}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>收件人电话: </Text>
						<Text style={styles.detail_send_content_item_text}>{address.phone}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>收件人地址: </Text>
						<Text style={styles.detail_send_content_item_text}>
							{address.area} {address.street}
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	detail_send: {
		backgroundColor: '#fff',
		marginVertical: 10,
		padding: 10,
		marginBottom: 20,
	},
	detail_send_content_item: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 20,
	},
	detail_send_content_item_label: {
		width: 80,
	},
	detail_send_content_item_text: {
		flex: 1,
		color: '#8a8a8a',
	},
});
