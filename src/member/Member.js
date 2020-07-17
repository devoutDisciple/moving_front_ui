/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonSylte from '../style/common';
// import Dialog from '../util/Dialog';
import CommonHeader from '../component/CommonHeader';
import IconWithText from '../component/IconWithText';
import SafeViewComponent from '../component/SafeViewComponent';
import config from '../config/config';
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default class Member extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 去支付
	payOrder() {
		// this.props.navigation.navigate('PayOrderScreen', { money, type: 'beMember' });
		let { navigation } = this.props;
		navigation.navigate('ReChargeScreen', { type: 'member' });
	}

	render() {
		const { navigation } = this.props;
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
				// url: require('../../img/home/icon3.png'),
				// text: '专属客服',
			},
			{
				// url: require('../../img/home/icon3.png'),
				// text: '免费配送',
			},
		];
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="成为会员" navigation={navigation} />
					<ScrollView style={styles.container_scroll} showsVerticalScrollIndicator={false}>
						<View style={styles.swiperContainer}>
							<View style={styles.slide}>
								<Image
									style={styles.img}
									source={{
										uri: `${config.baseUrl}/member.jpg`,
									}}
									// source={{uri:  'https://facebook.githuby_logo.png',}}
								/>
							</View>
						</View>
						<View style={styles.member_content}>
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
									<View style={styles.detail_common_title}>
										<Text style={{ fontSize: 16, color: '#333' }}>MOVING 普通会员</Text>
									</View>
									<Text style={styles.member_detail_content_text}>
										&emsp;&emsp;充值200元赠送20元 每周四会员日可享8.5折优惠（皮衣，皮鞋，包包护理不适用）
										获赠积分奖励，可在积分商城兑换相应礼品。 每一次使用MOVING收衣柜可免费使用七天
									</Text>
									<Text style={styles.member_detail_content_text}>
										&emsp;&emsp;充值500元赠送150元 每周四会员日可享8.5折优惠（皮衣，皮鞋，包包护理不适用）
										获赠积分奖励，可在积分商城兑换相应礼品。 每一次使用MOVING收衣柜可免费使用七天。
										赠送MOVING集团旗下《MOVING FITNESS动健身》月卡（有效期兑换一个月）
									</Text>
									<Text style={styles.member_detail_content_text}>
										&emsp;&emsp;充值600元赠送200元 每周四会员日可享8.5折优惠（皮衣，皮鞋，包包护理不适用）
										获赠积分奖励，可在积分商城兑换相应礼品。 每一次使用MOVING收衣柜可免费使用七天。
										赠送MOVING集团旗下《MOVING FITNESS动健身》2月卡（有效期兑换一个月）
									</Text>
									<Text style={styles.member_detail_content_text}>
										&emsp;&emsp;充值1000元赠送400元 每周四会员日可享8.5折优惠（皮衣，皮鞋，包包护理不适用）
										获赠积分奖励，可在积分商城兑换相应礼品。 每一次使用MOVING收衣柜可免费使用七天。
										赠送MOVING集团旗下《MOVING FITNESS动健身》季卡（有效期兑换一个月）
									</Text>
									<View style={styles.detail_common_title}>
										<Text style={{ fontSize: 16, color: '#333' }}>MOVING PLUS会员</Text>
									</View>
									<Text style={styles.member_detail_content_text}>
										&emsp;&emsp;MOVING PLUS会员是针对企业机构以及酒店服务，请联系我们得到更多的信息
									</Text>
									<Text style={styles.member_detail_content_text}>&emsp;&emsp;+86 13672473338</Text>
								</View>
							</View>
						</View>
					</ScrollView>
					<View style={styles.member_bottom}>
						<TouchableOpacity onPress={this.payOrder.bind(this)} style={styles.member_bottom_btn}>
							<Text style={{ color: '#fff', fontSize: 20 }}>超低价立即抢购</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeViewComponent>
		);
	}
}

let iconSize = 45;
const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	member_content: {
		flex: 1,
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
		margin: 10,
		shadowColor: 'green',
		shadowOffset: {
			width: 18,
			height: 20,
		},
	},
	member_detail_content_text: {
		fontSize: 13,
		lineHeight: 18,
		color: '#8a8a8a',
		marginBottom: 10,
	},
	member_bottom: {
		height: 100,
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
	container_scroll: {
		flex: 1,
	},
});
