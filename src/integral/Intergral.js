/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import GoodsItem from './GoodsItem';
import Loading from '../component/Loading';
import Request from '../util/Request';
import Storage from '../util/Storage';
import CommonHeader from '../component/CommonHeader';
import SafeViewComponent from '../component/SafeViewComponent';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default class Intergral extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			integral: '0',
			goods: [],
		};
	}

	async componentDidMount() {
		// 获取用户积分
		await this.getUserIntergral();
		// 获取商店积分商品
		await this.getShopGoods();
	}

	// 获取用户积分
	async getUserIntergral() {
		await this.setState({ loadingVisible: true });
		// 获取用户id的值
		let currentUser = await Storage.get('user');
		let userid = currentUser.id;
		let res = await Request.get('/user/getUserByUserid', { userid });
		let user = res.data || {};
		let integral = user.integral || '0';
		this.setState({ integral: integral, loadingVisible: false });
	}

	// 获取商店积分商品
	async getShopGoods() {
		await this.setState({ loadingVisible: true });
		let shop = await Storage.get('shop');
		let id = shop.id || '';
		if (!id) {
			return;
		}
		let res = await Request.get('/intergral_goods/getAllById', { id });
		let goods = res.data || [];
		this.setState({ goods, loadingVisible: false });
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible, integral, goods } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="积分兑换" navigation={navigation} />
					<View style={styles.intergrals_show}>
						<View style={styles.intergrals_show_content}>
							<Text style={styles.intergrals_show_content_title}>可用积分</Text>
							<Text style={styles.intergrals_show_content_num}>{integral}</Text>
						</View>
					</View>
					<View style={styles.intergrals_title}>
						<Text>可兑换商品</Text>
					</View>
					<ScrollView style={styles.intergrals_content} showsVerticalScrollIndicator={false}>
						{goods && goods.length !== 0 ? (
							<View style={styles.intergrals_content_chunk}>
								{goods.map(item => {
									return (
										<GoodsItem
											key={item.id}
											data={item || {}}
											navigation={navigation}
											onSearch={this.getUserIntergral.bind(this)}
										/>
									);
								})}
							</View>
						) : (
							<View style={styles.empty}>
								<Text style={styles.empty_text}>暂无可兑换商品</Text>
							</View>
						)}

						<View style={{ height: 20 }} />
					</ScrollView>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	intergrals_show: {
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
	},
	intergrals_show_content: {
		width: 100,
		height: 100,
		backgroundColor: '#fb9cce',
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	intergrals_show_content_title: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '400',
		marginBottom: 5,
	},
	intergrals_show_content_num: {
		fontSize: 18,
		color: '#f3dcea',
		fontWeight: '800',
		marginBottom: 5,
	},
	intergrals_title: {
		marginLeft: 10,
		height: 30,
		justifyContent: 'center',
		paddingLeft: 10,
		borderLeftWidth: 5,
		borderLeftColor: '#ffc6e5',
	},
	intergrals_content: {
		flex: 1,
		marginVertical: 10,
		marginHorizontal: 2,
		paddingVertical: 10,
	},
	intergrals_content_chunk: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	empty: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_text: {
		fontSize: 20,
		color: '#bfbfbf',
	},
});
