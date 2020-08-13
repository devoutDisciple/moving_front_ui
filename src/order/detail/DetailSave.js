import React from 'react';
import CommonShow from './CommonShow';
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
						<CommonShow label="存货时间" value={orderDetail.create_time} />
						<CommonShow label="存货地点" value={`${orderDetail.cabinetAddress} ${orderDetail.cellid} 格口`} />
						<CommonShow label="收件人" value={address.username} />
						<CommonShow label="收件人电话" value={address.phone} />
						<CommonShow label="收件人地址" value={`${address.area} ${address.street}`} />
						<CommonShow label="备注" value={orderDetail.desc || '无'} />
					</View>
				</View>
			);
		}
		if (type === 2) {
			return (
				<>
					{orderDetail.cabinetAddress ? (
						<View style={styles.detail_send}>
							<View style={styles.detail_common_title}>
								<Text>衣物存放信息</Text>
							</View>
							<View style={styles.detail_send_content}>
								<CommonShow label="取衣时间" value={orderDetail.home_time} />
								<CommonShow label="取衣地点" value={orderDetail.home_address} />
								<CommonShow label="联系人" value={orderDetail.home_username} />
								<CommonShow label="联系方式" value={orderDetail.home_phone} />
								<CommonShow label="备注" value={orderDetail.desc} />
							</View>
						</View>
					) : null}

					<View style={styles.detail_send}>
						<View style={styles.detail_common_title}>
							<Text>预约信息</Text>
						</View>
						<View style={styles.detail_send_content}>
							<CommonShow label="取衣时间" value={orderDetail.home_time} />
							<CommonShow label="取衣地点" value={orderDetail.home_address} />
							<CommonShow label="联系人" value={orderDetail.home_username} />
							<CommonShow label="联系方式" value={orderDetail.home_phone} />
							<CommonShow label="备注" value={orderDetail.desc} />
						</View>
					</View>
				</>
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
