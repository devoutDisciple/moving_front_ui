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
					<Text>店铺信息</Text>
				</View>
				<View style={styles.detail_send_content}>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>店铺名称: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.shopName}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>店铺联系人: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.shopManager}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>联系电话: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.shopPhone}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>店铺地址: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.shopAddress}</Text>
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
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
	},
	detail_send_content_item: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 20,
	},
	detail_send_content_item_label: {
		width: 80,
		lineHeight: 20,
	},
	detail_send_content_item_text: {
		flex: 1,
		color: '#8a8a8a',
		lineHeight: 20,
	},
});
