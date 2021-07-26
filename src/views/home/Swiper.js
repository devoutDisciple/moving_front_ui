import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import Config from '@/config/config';
import FastImage from '@/component/FastImage';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
let swiperIdx = 0;
export default class SwiperComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
		};
	}

	changeIdx(idx) {
		swiperIdx = idx;
	}

	render() {
		let { swiperList } = this.props;
		return (
			// <TouchableOpacity style={styles.swiperContainer} onPress={() => this.props.onShowPreviewModal(swiperList)}>
			<TouchableOpacity style={styles.swiperContainer} onPress={() => this.props.onShowPreviewModal(swiperIdx)}>
				{swiperList && swiperList.length !== 0 ? (
					<Swiper
						onIndexChanged={this.changeIdx.bind(this)}
						removeClippedSubviews={false}
						autoplay={true}
						dotColor="rgba(255,255,255,.3)"
						activeDotColor="#fff"
					>
						{swiperList.map((item, index) => {
							return (
								<View key={index} style={styles.slide} onClick={() => console.log(123)}>
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
			</TouchableOpacity>
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
