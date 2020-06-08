/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import Dialog from '../util/Dialog';

const { width } = Dimensions.get('window');

export default class Member extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	// 点击返回图标
	backIconClick() {
		if (this.props.back) {
			return this.props.back();
		}
		this.props.navigation.goBack();
	}

	render() {
		const { title } = this.props;
		const num = title.length;
		let titleStyle = '';
		switch (num) {
			case 4:
				titleStyle = styles.header_title_four_text;
				break;
			case 6:
				titleStyle = styles.header_title_six_text;
				break;
			case 8:
				titleStyle = styles.header_title_eight_text;
				break;
			default:
				titleStyle = styles.header_title_two_text;
		}
		return (
			<View style={styles.header}>
				<TouchableOpacity onPress={this.backIconClick.bind(this)} style={styles.header_back}>
					<Icon name="left" size={20} color="#333" />
				</TouchableOpacity>
				<View style={titleStyle}>
					<Text style={styles.header_title_text}>{title}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
	},
	header_back: {
		width: 50,
		justifyContent: 'center',
		paddingTop: 4,
	},
	header_title_two_text: {
		flex: 1,
		paddingLeft: width / 2 - 66,
		justifyContent: 'center',
	},
	header_title_four_text: {
		flex: 1,
		paddingLeft: width / 2 - 81,
		justifyContent: 'center',
	},
	header_title_six_text: {
		flex: 1,
		paddingLeft: width / 2 - 98,
		justifyContent: 'center',
	},
	header_title_eight_text: {
		flex: 1,
		paddingLeft: width / 2 - 114,
		justifyContent: 'center',
	},
	header_title_text: {
		fontSize: 16,
		color: '#333',
	},
});
