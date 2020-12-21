import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from '@/component/FastImage';
import config from '@/config/config';

export default class ShopRecord extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {}

	onPress(data) {
		this.props.onSelectClothingType(data.id);
	}

	render() {
		const { tabList, selectId } = this.props;
		return (
			<ScrollView style={styles.tab} horizontal showsHorizontalScrollIndicator={false}>
				{tabList.map((item, index) => {
					let tabStyle = [styles.tab_item];
					if (item.id === selectId) {
						tabStyle.push(styles.tab_item_select);
					}
					return (
						<TouchableOpacity key={index} style={tabStyle} onPress={this.onPress.bind(this, item)}>
							<View style={styles.img_container}>
								<FastImage style={styles.img} source={{ uri: `${config.baseUrl}/${item.url}` }} />
							</View>
							<View style={styles.desc_container}>
								<Text style={styles.desc}>{item.name}</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	}
}

const commonStyle = {
	justifyContent: 'center',
	alignItems: 'center',
};
const styles = StyleSheet.create({
	tab: {
		flexDirection: 'row',
		height: 50,
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
		marginTop: 20,
	},
	tab_item: {
		width: 80,
	},
	tab_item_select: {
		borderBottomColor: '#fb9dd0',
		borderBottomWidth: 2,
	},
	img_container: {
		height: 20,
		...commonStyle,
	},
	img: {
		width: 20,
		height: 20,
	},
	desc_container: {
		height: 30,
		...commonStyle,
	},
	desc: {
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 12,
		color: '#707070',
	},
});
