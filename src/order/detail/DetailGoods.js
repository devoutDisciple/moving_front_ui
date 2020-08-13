/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonSylte from '../../style/common';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let { orderDetail, type } = this.props,
			goods = [];
		try {
			goods = JSON.parse(orderDetail.goods);
		} catch (error) {
			goods = [];
		}
		let subMoney = Number(Number(orderDetail.origin_money) - Number(orderDetail.money)).toFixed(2);
		if (Number(orderDetail.urgency) === 2) {
			subMoney = Number(orderDetail.origin_money * 1.5 - (orderDetail.origin_money * 1.5 * orderDetail.discount) / 10).toFixed(2);
		}
		if (goods && goods.length !== 0 && (Number(type) === 1 || Number(type) === 2)) {
			return (
				<View style={styles.detail_content_goods}>
					<View style={styles.detail_common_title}>
						<Text>物品信息</Text>
					</View>
					{goods.map((item, index) => {
						return (
							<View key={index} style={styles.detail_content_goods_item}>
								<View style={styles.detail_content_goods_item_name}>
									<Text>{item.name}</Text>
								</View>
								<View style={styles.detail_content_goods_item_num}>
									<Text>x {item.num}</Text>
								</View>
								<View style={styles.detail_content_goods_item_price}>
									<Text style={styles.detail_content_goods_item_price_text}>
										￥ {Number(item.num * item.price).toFixed(2)}
									</Text>
								</View>
							</View>
						);
					})}
					<View style={styles.detail_content_goods_send}>
						<Text>洗衣费用：￥{Number(orderDetail.origin_money).toFixed(2) || '0.00'}</Text>
					</View>
					{orderDetail.urgency === 2 && (
						<View style={styles.detail_content_goods_send}>
							<Text>加急费用：￥{Number(orderDetail.origin_money * 0.5).toFixed(2)}</Text>
						</View>
					)}

					<View style={styles.detail_content_goods_send}>
						{Number(orderDetail.discount) === 10 ? (
							<Text>折扣：无</Text>
						) : (
							<Text>折扣：{(orderDetail.discount || 10) + '折'}</Text>
						)}
					</View>
					<View style={styles.detail_content_goods_send}>
						<Text>优惠金额：￥{Number(subMoney).toFixed(2) || '0.00'}</Text>
					</View>
					<View style={styles.detail_content_goods_send}>
						<Text>派送费：￥{Number(orderDetail.send_money).toFixed(2) || '0.00'}</Text>
					</View>
					<View style={styles.detail_content_goods_total}>
						<Text style={styles.detail_content_goods_total_text}>
							总价：￥
							{orderDetail.urgency === 2 ? Number(orderDetail.money * 1.5).toFixed(2) : Number(orderDetail.money).toFixed(2)}
						</Text>
					</View>
				</View>
			);
		}
		// 积分兑换商品
		if (Number(type) === 2) {
			return (
				<View style={styles.detail_content_goods}>
					<View style={styles.detail_common_title}>
						<Text>预约上门取衣</Text>
					</View>
				</View>
			);
		}
		// 积分兑换商品
		if (Number(type) === 3) {
			return (
				<View style={styles.detail_content_goods}>
					<View style={styles.detail_common_title}>
						<Text>积分兑换</Text>
					</View>
					<View style={styles.detail_content_goods_item}>
						<View style={styles.detail_content_goods_item_name}>
							<Text>{goods.name}</Text>
						</View>
						<View style={styles.detail_content_goods_item_num}>
							<Text>x 1</Text>
						</View>
						<View style={styles.detail_content_goods_item_price}>
							<Text style={styles.detail_content_goods_item_price_text}>{goods.intergral}积分</Text>
						</View>
					</View>
				</View>
			);
		}
		return (
			<View style={styles.detail_content_goods}>
				<View style={styles.empty}>
					<Text style={{ color: '#bfbfbf' }}>暂无物品信息</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	detail_content_goods: {
		backgroundColor: '#fff',
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
	},
	empty: {
		fontSize: 12,
		justifyContent: 'center',
	},
	detail_content_goods_item: {
		flexDirection: 'row',
		height: 40,
	},
	detail_content_goods_item_img: {
		height: 30,
		width: 30,
		marginTop: 10,
	},
	detail_content_goods_item_name: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 10,
		color: '#8a8a8a',
	},
	detail_content_goods_item_num: {
		width: 50,
		justifyContent: 'center',
	},
	detail_content_goods_item_price: {
		width: 80,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	detail_content_goods_item_price_text: {
		fontSize: 16,
		fontWeight: '800',
		color: '#333',
	},
	detail_content_goods_send: {
		marginVertical: 10,
		marginLeft: 10,
	},
	detail_content_goods_total: {
		alignItems: 'flex-end',
	},
	detail_content_goods_total_text: {
		fontSize: 18,
		fontWeight: '800',
		color: '#333',
	},
});
