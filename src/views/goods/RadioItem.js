import React from 'react';
import FastImage from '@/component/FastImage';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	render() {
		let { select, text } = this.props;
		return (
			<TouchableOpacity style={styles.urgency_content} onPress={() => this.props.onPress()}>
				<FastImage
					style={styles.img}
					source={select ? require('../../img/public/check_box_select.png') : require('../../img/public/check_box_no_select.png')}
				/>
				<Text style={styles.img_des}>{text}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	urgency_content: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 35,
	},
	img: {
		height: 18,
		width: 18,
		// marginTop: -2,
	},
	img_des: {
		marginLeft: 5,
		marginRight: 10,
		color: '#333',
		fontSize: 14,
	},
});
