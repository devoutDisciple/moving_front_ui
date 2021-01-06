import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FastImage from '@/component/FastImage';
import Config from '@/config/config';
import RenderIcon from './RenderIcon';

export default class RankingItem extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	changeTab(idx) {
		console.log(idx);
	}

	render() {
		const { data, idx } = this.props;
		return (
			<View style={styles.ranking_item}>
				<RenderIcon idx={idx} />
				<View style={styles.ranking_item_desc}>
					{/* <FastImage style={styles.ranking_item_desc_img} source={require('@/asserts/home/ranking_one.png')} /> */}
					{data.photo ? (
						<FastImage
							style={styles.ranking_item_desc_img}
							source={{
								uri: `${Config.baseUrl}/${data.photo}`,
							}}
						/>
					) : (
						<FastImage style={styles.ranking_item_desc_img} source={require('@/asserts/home/photo.png')} />
					)}
				</View>
				<View style={styles.ranking_item_name}>
					<Text>{data.username}</Text>
				</View>
				<View style={styles.ranking_item_money}>
					<Text>{data.money}</Text>
				</View>
			</View>
		);
	}
}

const commonFlex = {
	justifyContent: 'center',
	alignItems: 'center',
};

const styles = StyleSheet.create({
	ranking_item: {
		height: 50,
		// backgroundColor: 'red',
		flexDirection: 'row',
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
	},
	ranking_item_desc: {
		width: 50,
		// backgroundColor: 'blue',
		...commonFlex,
		flexDirection: 'row',
	},
	ranking_item_desc_img: {
		height: 30,
		width: 30,
		borderRadius: 30,
		marginLeft: 10,
	},
	ranking_item_name: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 20,
	},
	ranking_item_money: {
		width: 100,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});
