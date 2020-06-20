/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Storage from '../util/Storage';
import Request from '../util/Request';
import CommonHeader from '../component/CommonHeader';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Toast from '../component/Toast';

export default class Member extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addressList: [],
		};
	}

	async componentDidMount() {
		await this.onSearchAddress();
	}

	// 当参数含有flash的时候会进行刷新
	async componentWillReceiveProps(nextProps) {
		console.log(nextProps.navigation, 898989);
		if (nextProps && nextProps.navigation && nextProps.navigation.state.params.flash) {
			await this.onSearchAddress();
		}
	}

	// 查找用户地址
	async onSearchAddress() {
		let user = await Storage.get('user');
		let userid = user.id;
		let result = await Request.get('/address/getAllByUserid', { userid });
		let addressList = result.data || [];
		this.setState({ addressList });
	}

	// radio选择的时候
	async selectRadio(index) {
		let { addressList } = this.state,
			currentDefalutAddress = addressList[index];
		let preDefalutAddressList = addressList.filter(item => item.is_defalut === 2);
		let preDefaultAddress = preDefalutAddressList[0] || {};
		let result = await Request.post('/address/changeDefalut', { preId: preDefaultAddress.id, currentId: currentDefalutAddress.id });
		if (result.data === 'success') {
			Toast.success('默认地址修改成功');
			this.onSearchAddress();
		}
	}

	// 点击编辑地址的时候
	editAddressClick(record) {
		let { navigation } = this.props;
		navigation.navigate('AddressEditScreen', {
			id: record.id,
		});
	}

	// 新增收货地址
	onAddAddress() {
		let { navigation } = this.props;
		navigation.navigate('AddressAddScreen');
	}

	render() {
		const { navigation } = this.props;
		let { addressList } = this.state;
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
											item.is_defalut === 2
												? require('../../img/home/radioActive.png')
												: require('../../img/home/radio.png')
										}
									/>
								</TouchableOpacity>
								<View style={styles.content_item_center}>
									<View style={styles.content_item_center_title}>
										<Text style={styles.content_item_center_title_text}>
											{item.username} {item.sex === 1 ? '先生' : '女士'} {item.phone}
										</Text>
									</View>
									<View style={styles.content_item_center_address}>
										<Text style={styles.content_item_center_address_text}>{`${item.area} ${item.street}`}</Text>
									</View>
								</View>
								<TouchableOpacity onPress={this.editAddressClick.bind(this, item)} style={styles.content_item_right}>
									<Image style={styles.content_item_img} source={require('../../img/home/edit.png')} />
								</TouchableOpacity>
							</View>
						);
					})}
				</ScrollView>
				<TouchableOpacity onPress={this.onAddAddress.bind(this)} style={styles.add_address_btn}>
					<Text style={styles.add_address_btn_text}>新增地址</Text>
				</TouchableOpacity>
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
	add_address_btn: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fb9dd0',
	},
	add_address_btn_text: {
		fontSize: 20,
		color: '#fff',
	},
});
