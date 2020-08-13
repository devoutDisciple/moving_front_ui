import React from 'react';
import CommonSylte from '../../style/common';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { orderDetail, address, type } = this.props;
		// type-1 快递柜下单 2-积分兑换 3-上门取衣
		if (Number(type) === 1) {
			return (
				<View style={styles.detail_send}>
					<View style={styles.detail_common_title}>
						<Text>衣物信息</Text>
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
						<View style={styles.detail_send_content_item}>
							<Text style={styles.detail_send_content_item_label}>备注: </Text>
							<Text style={styles.detail_send_content_item_text}>{orderDetail.desc || '无'}</Text>
						</View>
					</View>
				</View>
			);
		}
		if (type === 2) {
			return (
				<View style={styles.detail_send}>
					<View style={styles.detail_common_title}>
						<Text>预约信息</Text>
					</View>
					<View style={styles.detail_send_content}>
						<View style={styles.detail_send_content_item}>
							<Text style={styles.detail_send_content_item_label}>取衣时间: </Text>
							<Text style={styles.detail_send_content_item_text}>{orderDetail.home_time}</Text>
						</View>
						<View style={styles.detail_send_content_item}>
							<Text style={styles.detail_send_content_item_label}>取衣地点: </Text>
							<Text style={styles.detail_send_content_item_text}>{orderDetail.home_address}</Text>
						</View>
						<View style={styles.detail_send_content_item}>
							<Text style={styles.detail_send_content_item_label}>联系人: </Text>
							<Text style={styles.detail_send_content_item_text}>{orderDetail.home_username}</Text>
						</View>
						<View style={styles.detail_send_content_item}>
							<Text style={styles.detail_send_content_item_label}>联系方式: </Text>
							<Text style={styles.detail_send_content_item_text}>{orderDetail.home_phone}</Text>
						</View>
						<View style={styles.detail_send_content_item}>
							<Text style={styles.detail_send_content_item_label}>备注: </Text>
							<Text style={styles.detail_send_content_item_text}>{orderDetail.desc}</Text>
						</View>
					</View>
				</View>
			);
		}
		return (
			<View style={styles.detail_send}>
				<View style={styles.detail_common_title}>
					<Text>兑换人信息</Text>
				</View>
				<View style={styles.detail_send_content}>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>收货人: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.intergral_username}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>联系方式: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.intergral_phone}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>收货地址: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.intergral_address}</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>消耗积分: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.intergral_num} 积分</Text>
					</View>
					<View style={styles.detail_send_content_item}>
						<Text style={styles.detail_send_content_item_label}>兑换时间: </Text>
						<Text style={styles.detail_send_content_item_text}>{orderDetail.create_time}</Text>
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
		padding: 10,
		marginBottom: 20,
		marginTop: 10,
		borderRadius: 5,
	},
	detail_send_content_item: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 20,
	},
	detail_send_content_item_label: {
		width: 80,
		// textAlign: 'right',
		marginRight: 5,
	},
	detail_send_content_item_text: {
		flex: 1,
		color: '#8a8a8a',
	},
});
