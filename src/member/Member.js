/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
// import Dialog from '../util/Dialog';
import CommonHeader from '../component/CommonHeader';
import IconWithText from '../component/IconWithText';

const { width } = Dimensions.get('window');

export default class Member extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectIndex: 0,
		};
	}

	// swiperChange 选择不同的会员的时候
	swiperChange(index) {
		this.setState({ selectIndex: index });
	}

	// 去支付
	payOrder() {
		let { selectIndex } = this.state;
		let money = selectIndex === 1 ? 90 : 80;
		this.props.navigation.navigate('PayOrderScreen', { money, type: 'beMember' });
	}

	render() {
		const { navigation } = this.props;
		let { selectIndex } = this.state;
		const iconList = [
			{
				url: require('../../img/home/icon1.png'),
				text: '免费配送',
			},
			{
				url: require('../../img/home/icon2.png'),
				text: '上门取衣',
			},
			{
				url: selectIndex === 1 ? require('../../img/home/icon3.png') : '',
				text: selectIndex === 1 ? '专属客服' : '',
			},
			{
				url: selectIndex === 1 ? require('../../img/home/icon3.png') : '',
				text: selectIndex === 1 ? '免费配送' : '',
			},
		];
		return (
			<View style={styles.container}>
				<CommonHeader title="成为会员" navigation={navigation} />
				<View style={styles.swiperContainer}>
					<Swiper
						autoplay={false}
						loop={false}
						index={this.state.selectIndex}
						onIndexChanged={this.swiperChange.bind(this)}
						dotColor="rgba(255,255,255,.3)"
						activeDotColor="#fff"
					>
						<View style={styles.slide}>
							<Image
								style={styles.img}
								source={require('../../img/public/lunbo1.png')}
								// source={{uri:  'https://facebook.githuby_logo.png',}}
							/>
						</View>
						<View style={styles.slide}>
							<Image
								style={styles.img}
								source={require('../../img/public/lunbo2.png')}
								// source={{uri:  'https://facebook.githuby_logo.png',}}
							/>
						</View>
					</Swiper>
				</View>
				<ScrollView style={styles.member_content}>
					<View style={styles.home_icon}>
						{iconList.map((item, index) => {
							return <IconWithText key={index} source={item.url} text={item.text} index={index} />;
						})}
					</View>
					<View style={styles.member_empty} />
					<View style={styles.member_detail}>
						<View style={styles.member_detail_title}>
							<Text
								style={{
									fontSize: 16,
									color: '#fb9dd0',
									fontWeight: 'bold',
								}}
							>
								会员权益说明
							</Text>
						</View>
						<View style={styles.member_detail_content}>
							<Text style={styles.member_detail_content_text}>1. 免费配送</Text>
							<Text style={styles.member_detail_content_text}>2. 上门免费取衣服</Text>
							{selectIndex === 1 && <Text style={styles.member_detail_content_text}>3. 专属客服</Text>}
							{selectIndex === 1 && <Text style={styles.member_detail_content_text}>4. 免费配送</Text>}
						</View>
					</View>
				</ScrollView>
				<View style={styles.member_bottom}>
					<TouchableOpacity onPress={this.payOrder.bind(this)} style={styles.member_bottom_btn}>
						<Text style={{ marginTop: 5, color: '#fff' }}>超值价 ￥</Text>
						<Text style={{ fontSize: 25, color: '#ffe4f2' }}>{selectIndex === 0 ? 80 : 90}</Text>
						<Text style={{ marginTop: 5, color: '#fff' }}> 元 / </Text>
						<Text
							style={{
								marginTop: 5,
								marginLeft: 5,
								color: '#fff',
							}}
						>
							立即抢购
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

let iconSize = 45;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	member_content: {
		flex: 1,
		// backgroundColor: 'orange',
	},
	member_empty: {
		height: 10,
		backgroundColor: '#f5f6fa',
	},
	member_detail: {},
	member_detail_title: {
		height: 30,
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	member_detail_content: {
		height: 100,
		margin: 10,
		shadowColor: 'green',
		// borderColor: 'red',
		// borderWidth: 1,
		shadowOffset: {
			width: 18,
			height: 20,
		},
	},
	member_detail_content_text: {
		fontSize: 14,
		color: '#f3b3d4',
		margin: 10,
	},
	member_bottom: {
		height: 100,
		// backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'center',
	},
	member_bottom_btn: {
		height: 60,
		width: width - 20,
		backgroundColor: '#fb9dd0',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	swiperContainer: {
		width: width,
		height: (width - 20) * 0.5,
		marginTop: 10,
	},
	slide: {
		marginHorizontal: 10,
	},
	img: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	icon_container: {
		marginTop: 10,
	},
	home_icon: {
		height: 80,
		marginHorizontal: 10,
		flexDirection: 'row',
	},
	home_icon_item: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	home_icon_item_img: {
		height: iconSize,
		width: iconSize,
	},
	home_icon_item_text: {
		marginTop: 10,
		fontSize: 12,
	},
});
