import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class BillItem extends React.Component {
	render() {
		return (
			<View style={styles.footer}>
				<Text style={{ color: '#8a8a8a' }}>暂无更多数据</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	footer: {
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
