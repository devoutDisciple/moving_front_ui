import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		const { id, name, num, price } = this.props;
		return (
			<View style={styles.goodsItem}>
				<View style={styles.goodsItem_name}>
					<Text style={styles.goodsItem_name_text}>{name}</Text>
					<Text style={styles.goodsItem_price_text}>清洗价格：{price}元</Text>
				</View>
				<View style={styles.goodsItem_count}>
					<TouchableOpacity style={styles.goodsItem_count_icon} onPress={() => this.props.onSubCloth(id)}>
						<Icon name="minuscircleo" size={18} color="#fb9dd0" />
					</TouchableOpacity>
					<View style={styles.goodsItem_count_num}>
						<Text style={styles.goodsItem_count_num_text}>{num}</Text>
					</View>
					<TouchableOpacity style={styles.goodsItem_count_icon} onPress={() => this.props.onAddCloth(id)}>
						<Icon name="pluscircleo" size={18} color="#fb9dd0" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	goodsItem: {
		flexDirection: 'row',
		height: 65,
		borderBottomColor: '#dbdbdb',
		borderBottomWidth: 0.5,
		paddingLeft: 10,
	},
	goodsItem_name: {
		flex: 1,
		justifyContent: 'center',
	},
	goodsItem_name_text: {
		fontSize: 14,
		color: '#707070',
	},
	goodsItem_price_text: {
		fontSize: 11,
		marginTop: 5,
		color: '#bfbfbf',
	},
	goodsItem_count: {
		width: 100,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	goodsItem_count_icon: {
		width: 20,
		marginHorizontal: 8,
	},
	goodsItem_count_num: {
		flex: 1,
		alignItems: 'center',
	},
	goodsItem_count_num_text: {
		fontSize: 20,
		color: '#fb9dd0',
		marginTop: -3,
	},
});
