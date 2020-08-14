import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		const { label, value } = this.props;
		return (
			<View style={styles.detail_send_content_item}>
				<Text style={styles.detail_send_content_item_label}>{label}:</Text>
				<Text style={styles.detail_send_content_item_text}>{value}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_send_content_item: {
		flexDirection: 'row',
		marginBottom: 10,
		marginLeft: 20,
	},
	detail_send_content_item_label: {
		width: 84,
		marginRight: 5,
	},
	detail_send_content_item_text: {
		flex: 1,
		color: '#8a8a8a',
	},
});
