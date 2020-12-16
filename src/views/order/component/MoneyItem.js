import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class AllOrder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { text, money } = this.props;
		return (
			<View style={styles.money}>
				<View style={styles.money_left}>
					<Text style={styles.money_text}>{text}</Text>
				</View>
				<View style={styles.money_num}>
					<Text style={styles.money_text}>￥ {money}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	money: {
		flexDirection: 'row',
	},
	money_left: {
		flex: 1,
	},
	money_text: {
		fontSize: 12,
		color: '#333',
		lineHeight: 28,
	},
	money_num: {
		width: 100,
		alignItems: 'flex-end',
	},
});
