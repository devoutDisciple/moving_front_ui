/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import FastImage from '@/component/FastImage';
import config from '@/config/config';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';

const { width } = Dimensions.get('window');

export default class Intergral extends React.Component {
	constructor(props) {
		super(props);
	}

	// 购买商品
	async onBuyGoods() {
		let { data } = this.props;
		Alert.alert(
			`是否确认兑换 ${data.name} ？`,
			`该次兑换将消耗 ${data.intergral} 积分`,
			[
				{
					text: '确认兑换',
					onPress: async () => {
						try {
							this.props.navigation.navigate('MyAddressScreen', { type: 'intergral', goods: data });
						} catch (error) {}
					},
				},
				{
					text: '取消',
				},
			],
			{ cancelable: false },
		);
	}

	render() {
		let { url, name, intergral, desc } = this.props.data;
		return (
			<View style={styles.intergrals_content_item}>
				<FastImage
					style={styles.intergrals_content_item_img}
					source={{
						uri: `${config.baseUrl}/${url}`,
					}}
				/>
				<View style={styles.intergrals_content_item_bottom}>
					<View style={styles.intergrals_content_item_title}>
						<Text style={styles.intergrals_content_item_title_text}>{name}</Text>
						<Text style={styles.intergrals_content_item_title_desc}>{desc}</Text>
					</View>
					<View style={styles.intergrals_content_item_buy}>
						<View style={styles.intergrals_content_item_buy_left}>
							<Text style={styles.intergrals_content_item_buy_left_text}>{intergral}积分</Text>
						</View>
						<TouchableOpacity onPress={this.onBuyGoods.bind(this)} style={styles.intergrals_content_item_buy_right}>
							<Text style={styles.intergrals_content_item_buy_right_text}>兑换</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

let itemWidth = (width - 20) / 2;
const styles = StyleSheet.create({
	intergrals_content_item: {
		borderWidth: 0.5,
		borderColor: '#cdcdcd',
		width: itemWidth,
		height: itemWidth + 99,
		margin: 5,
		marginTop: 0,
		marginRight: 0,
	},
	intergrals_content_item_img: {
		width: itemWidth - 1,
		height: itemWidth,
	},
	intergrals_content_item_bottom: {
		height: 98,
		borderColor: '#cdcdcd',
		borderTopWidth: 0.5,
	},
	intergrals_content_item_title: {
		height: 50,
		paddingHorizontal: 5,
		justifyContent: 'center',
	},
	intergrals_content_item_title_text: {
		lineHeight: 26,
		fontSize: 14,
		color: '#8a8a8a',
	},
	intergrals_content_item_title_desc: {
		fontSize: 12,
		color: '#bfbfbf',
		lineHeight: 14,
	},
	intergrals_content_item_buy: {
		paddingHorizontal: 5,
		marginVertical: 10,
		height: 30,
		flexDirection: 'row',
	},
	intergrals_content_item_buy_left: {
		flex: 1,
		justifyContent: 'center',
	},
	intergrals_content_item_buy_left_text: {
		fontSize: 12,
		color: '#cdcdcd',
	},
	intergrals_content_item_buy_right: {
		width: 60,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	intergrals_content_item_buy_right_text: {
		fontSize: 12,
		color: '#fff',
	},
});
