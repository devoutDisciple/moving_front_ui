import React from 'react';
import CommonShow from './CommonShow';
import CommonSylte from '@/style/common';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderDetail } = this.props;
		if (orderDetail.shopName) {
			return (
				<View style={styles.detail_send}>
					<View style={styles.detail_common_title}>
						<Text>店铺信息</Text>
					</View>
					<View style={styles.detail_send_content}>
						<CommonShow label="店铺名称" value={orderDetail.shopName} />
						<CommonShow label="店铺联系人" value={orderDetail.shopManager} />
						<CommonShow label="联系电话" value={orderDetail.shopPhone} />
						<CommonShow label="店铺地址" value={orderDetail.shopAddress} />
					</View>
				</View>
			);
		}
		return null;
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	detail_send: {
		backgroundColor: '#fff',
		marginTop: 10,
		padding: 10,
		paddingTop: 0,
		borderRadius: 5,
	},
});
