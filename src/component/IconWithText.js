import React from 'react';
import FastImage from '@/component/FastImage';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default class IconWithText extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { source, text, index, onPress } = this.props;
		if (source) {
			return (
				<TouchableOpacity onPress={onPress} key={index} style={styles.home_icon_item}>
					<FastImage style={styles.home_icon_item_img} source={source} />
					<Text style={styles.home_icon_item_text}>{text}</Text>
				</TouchableOpacity>
			);
		}
		return <View key={index} style={styles.home_icon_item} />;
	}
}

let iconSize = 28;
const styles = StyleSheet.create({
	home_icon_item: {
		width: (width - 20) / 4,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 18,
		backgroundColor: '#fff',
	},
	home_icon_item_img: {
		height: iconSize,
		width: iconSize,
	},
	home_icon_item_text: {
		marginTop: 10,
		fontSize: 12,
	},
});
