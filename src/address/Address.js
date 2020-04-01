/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonHeader from '../component/CommonHeader';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default class Member extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectIndex: 3,
			addressList: [
				{
					name: '张振1',
					sex: 1,
					phone: 18210619398,
					address: '1杭州市西溪水岸花苑22栋301',
				},
				{
					name: '张振2',
					sex: 2,
					phone: 18210619398,
					address: '2杭州市西溪水岸花苑22栋301',
				},
				{
					name: '张振3',
					sex: 1,
					phone: 18210619398,
					address: '3杭州市西溪水岸花苑22栋301',
				},
				{
					name: '张振4',
					sex: 4,
					phone: 18210619398,
					address: '4杭州市西溪水岸花苑22栋301',
				},
				{
					name: '张振5',
					sex: 1,
					phone: 18210619398,
					address: '5杭州市西溪水岸花苑22栋301',
				},
				{
					name: '张振6',
					sex: 1,
					phone: 18210619398,
					address: '6杭州市西溪水岸花苑22栋301',
				},
			],
		};
	}

	// radio选择的时候
	selectRadio(index) {
		this.setState({ selectIndex: index });
	}

	// 点击编辑地址的时候
	editAddressClick() {
		this.props.navigation.navigate('AddressEditScreen');
	}

	render() {
		const { navigation } = this.props;
		let { addressList, selectIndex } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="我的收货地址" navigation={navigation} />
				<ScrollView style={styles.content}>
					{addressList.map((item, index) => {
						return (
							<View key={index} style={styles.content_item}>
								<TouchableOpacity onPress={this.selectRadio.bind(this, index)} style={styles.content_item_left}>
									<Image
										style={styles.content_item_img}
										source={
											selectIndex === index
												? require('../../img/home/radioActive.png')
												: require('../../img/home/radio.png')
										}
									/>
								</TouchableOpacity>
								<View style={styles.content_item_center}>
									<View style={styles.content_item_center_title}>
										<Text style={styles.content_item_center_title_text}>
											{item.name} {item.sex === 1 ? '先生' : '女士'} {item.phone}
										</Text>
									</View>
									<View style={styles.content_item_center_address}>
										<Text style={styles.content_item_center_address_text}>{item.address}</Text>
									</View>
								</View>
								<TouchableOpacity onPress={this.editAddressClick.bind(this)} style={styles.content_item_right}>
									<Image style={styles.content_item_img} source={require('../../img/home/edit.png')} />
								</TouchableOpacity>
							</View>
						);
					})}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		margin: 10,
	},
	content_item: {
		height: 70,
		borderBottomColor: '#e6e6e6',
		borderBottomWidth: 0.5,
		flexDirection: 'row',
		marginBottom: 10,
	},
	content_item_left: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content_item_img: {
		width: 20,
		height: 20,
	},
	content_item_center: {
		flex: 1,
	},
	content_item_center_title: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	content_item_center_title_text: {
		fontSize: 14,
		color: '#333',
	},
	content_item_center_address: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	content_item_center_address_text: {
		fontSize: 12,
		color: '#bfbfbf',
	},
	content_item_right: {
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
