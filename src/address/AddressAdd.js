/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import config from '../config/config';
import Request from '../util/Request';
import Storage from '../util/Storage';
import Toast from '../component/Toast';
import Dialog from '../component/Dialog';
import Picker from 'react-native-picker';
import { Button } from 'react-native-elements';
import MessageItem from '../my/message/MessageItem';
import CommonHeader from '../component/CommonHeader';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default class Member extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: {
				sex: 1,
			},
			pickData: [],
			visible: false,
			title: '',
			changeKey: '',
			defalutValue: '',
		};
		this.filterArea = this.filterArea.bind(this);
	}

	async componentDidMount() {
		await this.onSearchArea();
	}

	// 查询所有配送区域
	async onSearchArea() {
		let result = await Request.get('/area/getAll');
		let areas = result.data || [];
		let pickData = await this.filterArea(areas, [], 0);
		this.setState({ pickData });
	}

	async onShowPicker() {
		let { pickData } = this.state;
		Picker.init({
			...config.pickCommonConfig,
			pickerData: pickData,
			onPickerConfirm: async res => {
				let area = res.join(' ');
				let { address } = this.state;
				address.area = area;
				this.setState({ address });
			},
		});
		Picker.show();
	}

	// 筛选区域条件
	filterArea(area, arr, parentid) {
		let obj = {},
			flag = 0;
		area.map(item => {
			if ((item.level === 1 || item.level === 2) && item.parentid === parentid) {
				let tempObj = {};
				flag = 0;
				tempObj[item.name] = [];
				this.filterArea(area, tempObj[item.name], item.id);
				arr.push(tempObj);
			}
			if (item.level === 3 && item.parentid === parentid) {
				arr.push(item.name);
			}
		});
		flag === 1 && arr.push(obj);
		return arr;
	}

	// 弹框确定的时候
	onOkDialog(key, value) {
		let { address } = this.state;
		address[key] = value;
		this.setState({ visible: false, address });
	}

	// 修改性别
	onChangeSex(sex) {
		let { address } = this.state;
		address.sex = sex;
		this.setState({ address });
	}

	filterNull(obj, keys) {
		let flag = true;
		keys.forEach(item => {
			console.log(!obj[item], obj[item]);
			if (!obj[item]) {
				flag = false;
			}
		});
		return flag;
	}

	// 保存的时候
	async onSaveValue() {
		let { address } = this.state;
		let flag = this.filterNull(address, ['username', 'phone', 'area', 'street']);
		if (!flag) {
			return Toast.warning('请填写完整');
		}
		// 手机号不通过
		if (!/^1[3456789]\d{9}$/.test(address.phone)) {
			return Toast.warning('请输入正确的手机号码');
		}
		let user = await Storage.get('user');
		address.userid = user.id;
		address.is_defalut = 2;
		let result = await Request.post('/address/add', address);
		if (result.data === 'success') {
			Toast.success('保存成功');
			let { navigation } = this.props;
			navigation.navigate('MyAddressScreen', {
				flash: true,
			});
		}
	}

	render() {
		const { navigation } = this.props,
			{ visible, title, defalutValue, changeKey, address } = this.state;
		return (
			<View style={styles.address_container}>
				<CommonHeader title="编辑地址" navigation={navigation} />
				<ScrollView style={styles.address_content}>
					<MessageItem
						showIcon
						label="姓名"
						value={address.username}
						onPress={() => {
							this.setState({ changeKey: 'username', title: '修改姓名', defalutValue: address.username }, () => {
								this.setState({ visible: true });
							});
						}}
					/>
					<MessageItem
						label="性别"
						value={
							<View style={styles.sex_container}>
								<TouchableOpacity onPress={this.onChangeSex.bind(this, 1)}>
									<Text style={address.sex === 1 ? styles.sex_item_active : styles.sex_item_normal}>男</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={this.onChangeSex.bind(this, 2)}>
									<Text style={address.sex === 2 ? styles.sex_item_active : styles.sex_item_normal}>女</Text>
								</TouchableOpacity>
							</View>
						}
						isSwitch
					/>
					<MessageItem
						showIcon
						label="手机号"
						value={address.phone}
						onPress={() =>
							this.setState({ changeKey: 'phone', title: '修改手机号', defalutValue: address.phone }, () => {
								this.setState({ visible: true });
							})
						}
					/>
					<MessageItem label="所在区域" value={address.area} showIcon onPress={this.onShowPicker.bind(this)} />
					<MessageItem
						showIcon
						label="街道/小区"
						value={address.street}
						onPress={() =>
							this.setState({ changeKey: 'street', title: '修改具体位置', defalutValue: address.street }, () => {
								this.setState({ visible: true });
							})
						}
					/>
					{address.area && (
						<View style={styles.address_desc}>
							<Text style={styles.address_desc_title}>收货地址为：</Text>
							<Text style={styles.address_desc_street}>
								{address.area} {address.street}
							</Text>
						</View>
					)}
					<Button
						buttonStyle={{
							backgroundColor: '#fb9bcd',
							borderRadius: 10,
							height: 50,
							marginTop: 20,
						}}
						onPress={this.onSaveValue.bind(this)}
						title="保存"
					/>
				</ScrollView>
				{visible && (
					<Dialog
						title={title}
						changeKey={changeKey}
						defalutValue={defalutValue}
						onOk={this.onOkDialog.bind(this)}
						onCancel={() => this.setState({ visible: false })}
					/>
				)}
			</View>
		);
	}
}

const sex_common = {
	marginLeft: 20,
	borderWidth: 1,
	paddingHorizontal: 20,
	paddingVertical: 5,
	borderRadius: 13,
};
const styles = StyleSheet.create({
	address_container: {
		flex: 1,
	},
	address_content: {
		flex: 1,
		margin: 10,
	},
	sex_container: {
		flexDirection: 'row',
	},
	sex_item_active: {
		...sex_common,
		borderColor: '#fb9cce',
		color: '#fb9cce',
	},
	sex_item_normal: {
		...sex_common,
		borderColor: '#e5e5e5',
		color: '#333',
	},
	address_desc: {
		marginTop: 17,
		marginHorizontal: 10,
		flexDirection: 'row',
	},
	address_desc_title: {
		width: 86,
		marginTop: 1,
		color: '#bfbfbf',
	},
	address_desc_street: {
		flex: 1,
		color: '#bfbfbf',
	},
});
