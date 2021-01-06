import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class BillItem extends React.Component {
	render() {
		const { label, value, style } = this.props;
		return (
			<View style={[style, styles.item]}>
				{label && <Text style={styles.label}>{label || '--'}</Text>}
				{value && <Text style={styles.value}>{value || '--'}</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		height: 15,
		alignItems: 'center',
	},
	label: {
		fontSize: 13,
		color: '#333',
	},
	value: {
		fontSize: 13,
		color: '#515151',
	},
});
