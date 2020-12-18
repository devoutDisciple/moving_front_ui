import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from '@/component/FastImage';

export default class ShopRecord extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { idx } = this.props;
		const arr = [
			require('@/asserts/home/ranking_one.png'),
			require('@/asserts/home/ranking_two.png'),
			require('@/asserts/home/ranking_three.png'),
		];
		if (idx < 3) {
			return (
				<View style={styles.icon}>
					<FastImage style={styles.ranking_item_desc_img} source={arr[idx]} />
				</View>
			);
		}
		return <View />;
	}
}

const styles = StyleSheet.create({
	icon: {
		width: 30,
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	ranking_item_desc_img: {
		height: 18,
		width: 18,
	},
});
