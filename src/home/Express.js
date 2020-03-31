/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../util/Request';
import FastImage from '../component/FastImage';
import CommonSylte from '../style/common';
import { Button } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import config from '../config/config';

export default class Express extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cabinetList: [],
		};
	}

	async componentDidMount() {
		await this.getAllCabinetByShop(this.props.shopid);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.shopid !== nextProps.shopid) {
			this.getAllCabinetByShop(nextProps.shopid);
		}
	}

	// 根据商店id获取快递柜子
	async getAllCabinetByShop(shopid) {
		if (!shopid) {
			return;
		}
		let res = await Request.get('/cabinet/getAllByShop', { shopid });
		this.setState({ cabinetList: res.data || [] });
	}

	// 存放衣物
	putClothing() {
		this.props.navigation.navigate('GoodsScreen');
	}

	render() {
		let { cabinetList } = this.state;
		return (
			<View style={styles.home_express}>
				<View style={styles.detail_common_title}>
					<Text style={{ fontSize: 16, color: '#333' }}>MOVING 收衣柜</Text>
				</View>
				{cabinetList && cabinetList.length != 0 ? (
					cabinetList.map((item, index) => {
						return (
							<View style={styles.home_express_item} key={index}>
								<View style={styles.home_express_item_left}>
									<FastImage
										style={styles.home_express_item_left_img}
										source={{
											uri: `${config.baseUrl}/${item.url}`,
										}}
									/>
								</View>
								<View style={styles.home_express_item_right}>
									<View style={styles.home_express_item_right_title}>
										<Text style={styles.home_express_item_right_title_name}>{item.name}</Text>
										<Text style={styles.home_express_item_right_title_address}>位置：{item.address}</Text>
									</View>
									<View style={styles.home_express_item_right_bottom}>
										<Button
											buttonStyle={{
												backgroundColor: '#fb9dd0',
												paddingVertical: 7,
												paddingHorizontal: 10,
												borderRadius: 6,
											}}
											titleStyle={{ fontSize: 14 }}
											title="存放衣物"
											onPress={this.putClothing.bind(this)}
										/>
									</View>
								</View>
							</View>
						);
					})
				) : (
					<View style={styles.empty}>
						<Text style={styles.empty_text}>快递柜不见了。。。</Text>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	home_express: {
		flex: 1,
		margin: 10,
	},
	home_express_title: {
		height: 50,
		justifyContent: 'center',
	},
	home_express_title_text: {
		fontSize: 18,
		color: '#333',
	},
	home_express_item: {
		height: 120,
		borderBottomWidth: 0.5,
		borderBottomColor: '#cccccc',
		flexDirection: 'row',
		padding: 10,
		marginBottom: 10,
	},
	home_express_item_left: {
		width: 100,
		shadowColor: '#505050',
		shadowOffset: {
			width: 10,
			height: 5,
		},
	},
	home_express_item_left_img: {
		width: '100%',
		height: '100%',
	},
	home_express_item_right: {
		flex: 1,
		marginLeft: 10,
	},
	home_express_item_right_title: {
		height: 60,
	},
	home_express_item_right_title_name: {
		fontSize: 14,
		color: '#515151',
	},
	home_express_item_right_title_address: {
		marginTop: 5,
		fontSize: 12,
		color: '#8a8a8a',
	},
	home_express_item_right_bottom: {
		height: 40,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	empty: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_text: {
		fontSize: 18,
		color: '#bfbfbf',
	},
});
