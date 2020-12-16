import React from 'react';
import FastImage from '@/component/FastImage';
import config from '@/config/config';
import { Text, View, StyleSheet } from 'react-native';

export default class Intergral extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { data } = this.props;
		return (
			<View style={styles.item}>
				<View style={styles.header}>
					<View style={styles.header_left}>
						<View style={styles.header_shop}>
							<Text style={styles.header_shop_text}>{data.shopName}</Text>
						</View>
						<View style={styles.header_time}>
							<Text style={styles.header_time_text}>{data.create_time}</Text>
						</View>
					</View>
					<View style={styles.header_right}>
						<Text style={styles.header_right_text}>待派送</Text>
					</View>
				</View>
				<View style={styles.content}>
					<FastImage
						style={styles.img}
						source={{
							uri: `${config.baseUrl}/${data.goodsUrl}`,
						}}
					/>
					<View style={styles.desc}>
						<Text style={styles.desc_text}>{data.goodsName}</Text>
						<Text style={styles.desc_text}>X 1</Text>
					</View>
					<View style={styles.Intergral}>
						<Text>{data.intergral}积分</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		marginBottom: 10,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	header: {
		height: 30,
		flexDirection: 'row',
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	header_left: {
		flex: 1,
	},
	header_shop: {
		height: 16,
	},
	header_shop_text: {
		fontSize: 12,
	},
	header_time: {
		height: 12,
	},
	header_time_text: {
		fontSize: 10,
		color: '#333',
	},
	header_right: {
		width: 80,
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	header_right_text: {
		color: '#8a8a8a',
	},
	content: {
		height: 60,
		flexDirection: 'row',
		paddingVertical: 10,
	},
	img: {
		height: 50,
		width: 50,
	},
	desc: {
		flex: 1,
		height: 50,
		flexDirection: 'row',
		paddingHorizontal: 10,
		alignItems: 'center',
	},
	desc_text: {
		marginRight: 10,
	},
	Intergral: {
		height: 50,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
