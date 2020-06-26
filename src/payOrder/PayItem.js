/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Config from '../config/config';
import FastImage from '../component/FastImage';
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class Waller extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let { iconName, text, onPress, iconColor, active, iconType } = this.props;
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={styles.my_list_item}>
					<>
						{iconName && !iconType && (
							<View style={styles.my_list_item_icon}>
								<Icon name={iconName} size={22} color={iconColor || '#fb9dd0'} />
							</View>
						)}
						{iconType && (
							<View style={styles.my_list_item_icon}>
								<FastImage
									style={styles.logo}
									source={{
										uri: `${Config.baseUrl}/logo.jpg`,
									}}
								/>
							</View>
						)}
						<View style={styles.my_list_item_desc}>
							<Text style={styles.my_list_item_desc_text}>{text}</Text>
						</View>
					</>

					{active ? (
						<View style={styles.my_list_item_icon}>
							<Icon name="checkcircleo" size={20} color="#fb9dd0" />
						</View>
					) : (
						<View style={styles.my_list_item_empty}>
							<View style={styles.my_list_item_empty_circle} />
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	my_list_item: {
		height: 60,
		justifyContent: 'center',
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
	logo: {
		width: 22,
		height: 22,
	},
	my_list_item_with_border: {
		height: 60,
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	my_list_item_empty: {
		width: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	my_list_item_empty_circle: {
		height: 20,
		width: 20,
		borderWidth: 1,
		borderColor: '#bfbfbf',
		borderRadius: 18,
	},
	my_list_item_icon: {
		marginLeft: 5,
		paddingTop: 2,
		width: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	my_list_item_desc: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'center',
	},
	my_list_item_desc_text: {
		fontSize: 16,
		color: '#3f3f3f',
	},
	my_list_item_other: {
		width: 70,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginRight: 10,
	},
});
