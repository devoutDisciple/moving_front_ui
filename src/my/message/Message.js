/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MessageItem from './MessageItem';
import Config from '../../config/config';
import Request from '../../util/Request';
import Storage from '../../util/Storage';
import Picker from 'react-native-picker';
import Toast from '../../component/Toast';
import Dialog from '../../component/Dialog';
import FileterStatus from '../../util/FilterStatus';
import ImagePicker from 'react-native-image-crop-picker';
import CommonHeader from '../../component/CommonHeader';

export default class SettingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			loading: false,
			user: {},
			defalutValue: '',
			title: '',
			changeKey: '',
		};
	}

	async componentDidMount() {
		await this.getUserInfo();
	}

	// 获取用户信息
	async getUserInfo() {
		this.setState({ loading: true });
		// 获取用户token值
		let token = await Storage.getString('token');
		let res = await Request.get('/user/getUserByToken', { token });
		let user = res.data || '';
		if (!user) {
			// 去登陆页面
			this.props.navigation.navigate('LoginScreen');
		}
		this.setState({ user: user, loading: false });
	}

	// 弹框确定的时候
	onOkDialog(key, value) {
		console.log(key, value, 111);
		this.setState({ visible: false });
		this.onSaveValue(key, value);
	}

	// 年龄选择
	showAgeSelect() {
		let data = [];
		for (let i = 18; i < 100; i++) {
			data.push(i);
		}
		Picker.init({
			...Config.pickCommonConfig,
			pickerData: data,
			selectedValue: [25],
			onPickerConfirm: res => {
				this.onSaveValue('age', res[0]);
			},
		});
		Picker.show();
	}

	// 保存的时候
	async onSaveValue(key, value) {
		// 获取用户token值
		let token = await Storage.getString('token');
		let params = { token, key, value };
		let result = await Request.post('/user/update', params);
		if (result.data === 'success') {
			Toast.success('修改成功');
			this.getUserInfo();
		}
	}

	// 用户上传头像
	selectPhoto() {
		ImagePicker.openPicker({
			width: 200,
			height: 200,
			cropping: true,
			cropperCircleOverlay: true,
			includeBase64: true,
		}).then(async response => {
			// 获取用户token值
			let token = await Storage.getString('token'),
				data = { img: response.data, token };
			let result = await Request.post('/user/addPhoto', data);
			if (result.data === 'success') {
				Toast.success('头像修改成功');
				this.getUserInfo();
			}
		});
	}

	render() {
		const { navigation } = this.props,
			{ visible, loading, user, changeKey, title, defalutValue } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="个人信息" navigation={navigation} />
				<ScrollView style={styles.setting_content} refreshing={loading}>
					<MessageItem label="头像" value={user.photo} showIcon isImage onPress={this.selectPhoto.bind(this)} />
					<MessageItem
						showIcon
						label="昵称"
						value={user.nickname}
						onPress={() => {
							this.setState({ changeKey: 'nickname', title: '修改昵称', defalutValue: user.nickname }, () => {
								this.setState({ visible: true });
							});
						}}
					/>
					<MessageItem
						showIcon
						label="姓名"
						value={user.username}
						onPress={() => {
							this.setState({ changeKey: 'username', title: '修改姓名', defalutValue: user.username }, () => {
								this.setState({ visible: true });
							});
						}}
					/>
					<MessageItem
						label="性别"
						value={
							<View style={styles.sex_container}>
								<TouchableOpacity onPress={this.onSaveValue.bind(this, 'sex', 1)}>
									<Text style={user.sex === 1 ? styles.sex_item_active : styles.sex_item_normal}>男</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={this.onSaveValue.bind(this, 'sex', 2)}>
									<Text style={user.sex === 2 ? styles.sex_item_active : styles.sex_item_normal}>女</Text>
								</TouchableOpacity>
							</View>
						}
						isSwitch
					/>
					<MessageItem label="年龄" value={user.age} showIcon onPress={this.showAgeSelect.bind(this)} />
					<MessageItem
						showIcon
						label="邮箱"
						value={user.email}
						onPress={() => {
							this.setState({ changeKey: 'email', title: '修改邮箱', defalutValue: user.email }, () => {
								this.setState({ visible: true });
							});
						}}
					/>
					<MessageItem label="会员等级" value={FileterStatus.filterMemberStatus(user.member)} onPress={() => {}} />
					<MessageItem label="登录账号" value={user.phone} onPress={() => {}} />
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
	container: {
		flex: 1,
	},
	common_text_style: {
		fontSize: 16,
		color: '#333',
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
	setting_content: {
		flex: 1,
		marginTop: 20,
	},
	setting_content_item: {
		marginHorizontal: 10,
		height: 50,
		borderBottomColor: '#f1f1f1',
		borderBottomWidth: 0.5,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	setting_content_item_left: {
		width: 100,
		// backgroundColor: 'red',
		justifyContent: 'center',
	},
	setting_content_item_center: {
		flex: 1,
		// backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	setting_content_item_center_img: {
		width: 40,
		height: 40,
		borderRadius: 50,
	},
	setting_content_item_right: {
		width: 30,
		// backgroundColor: 'orange',
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
});
