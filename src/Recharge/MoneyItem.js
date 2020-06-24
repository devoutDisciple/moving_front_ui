/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default class ReChargeItem extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { money, discount, onPress, active } = this.props;
		return (
			<TouchableOpacity style={active ? styles.content_account_chunk_active : styles.content_account_chunk} onPress={onPress}>
				<Text style={styles.content_account_chunk_top_text}>充{money}元</Text>
				{discount && <Text style={styles.content_account_chunk_bottom_text}>送{discount}元</Text>}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	content_account_chunk: {
		height: 60,
		width: (width - 50) / 2,
		backgroundColor: '#f6f3f7',
		marginLeft: 10,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	content_account_chunk_active: {
		height: 60,
		width: (width - 50) / 2,
		backgroundColor: '#fb9dd0',
		marginLeft: 10,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	content_account_chunk_top_text: {
		fontSize: 16,
		color: '#515151',
	},
	content_account_chunk_bottom_text: {
		fontSize: 12,
		color: '#ff4040',
	},
});
