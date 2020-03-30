/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import Config from '../config/config';
import FastImage from '../component/FastImage';
import Request from '../util/Request';
import Storage from '../util/Storage';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

const { width } = Dimensions.get('window');

export default class SwiperComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			swiperList: [],
		};
	}

	async componentDidMount() {
		await this.getSwiperList();
	}

	async componentWillReceiveProps() {
		await this.getSwiperList();
	}

	async getSwiperList() {
		let shop = await Storage.get('shop');
		// 获取当前门店的轮播图列表
		let res = await Request.get('/swiper/getAllById', { shopid: shop.id });
		this.setState({ swiperList: res.data || [] });
	}

	render() {
		let { swiperList = [] } = this.state;
		return (
			<View style={styles.swiperContainer}>
				{swiperList && swiperList.length !== 0 ? (
					<Swiper autoplay={true} dotColor="rgba(255,255,255,.3)" activeDotColor="#fff">
						{swiperList.map((item, index) => {
							return (
								<View key={index} style={styles.slide}>
									<FastImage
										style={styles.img}
										source={{
											uri: `${Config.baseUrl}/${item.url}`,
										}}
									/>
								</View>
							);
						})}
					</Swiper>
				) : (
					<View style={styles.empty_swiper_container}>
						<Text style={{ color: '#bfbfbf' }}>暂无数据</Text>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	swiperContainer: {
		width: width,
		height: (width - 20) * 0.5,
		marginTop: 10,
	},
	slide: {
		flex: 1,
		marginHorizontal: 10,
	},
	img: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	empty_swiper_container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
