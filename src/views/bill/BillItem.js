import React from 'react';
import { View, StyleSheet } from 'react-native';
import FilterStatus from '@/util/FilterStatus';
import TextItem from './TextItem';

export default class BillItem extends React.Component {
	render() {
		let data = this.props.data || {};
		let billItem = data.item || {};
		console.log(billItem, 999);
		let showSend = ['recharge', 'member'];
		return (
			<View style={styles.detail}>
				<View style={[styles.item, styles.item1]}>
					<TextItem style={styles.item_type} label="消费类型: " value={FilterStatus.filterConsumeType(billItem.type)} />
					<TextItem style={styles.item_time} label={billItem.create_time} />
				</View>
				<View style={[styles.item, styles.item2]}>
					<TextItem style={styles.item_type} label="金额: " value={billItem.money} />
					{showSend.includes(billItem.type) && <TextItem style={styles.item_type} label="赠送金额: " value={billItem.send} />}
					<TextItem style={styles.item_time} label="支付方式: " value={FilterStatus.filterPayType(billItem.pay_type)} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail: {
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
		padding: 10,
	},
	item: {
		flexDirection: 'row',
	},
	item1: {
		marginBottom: 10,
	},
	item_type: {
		flex: 1,
	},
	item_time: {
		width: 150,
		justifyContent: 'flex-end',
	},
});
