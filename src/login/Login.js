/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Storage from '../util/Storage';
import Request from '../util/Request';
import message from '../component/Message';
import { Button } from 'react-native-elements';
import FastImage from '../component/FastImage';
import NavigationUtil from '../util/NavigationUtil';
import Icon from 'react-native-vector-icons/AntDesign';
import { Kohana } from 'react-native-textinput-effects';
import { baseColor, commonInputParams } from './commonParams';
import SafeViewComponent from '../component/SafeViewComponent';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginBtnDisable: true,
			timeNumVisible: false,
			phone: '', // 输入的手机号
			password: '', // 验证码
			checked: false,
		};
	}

	// 导航到其他页面
	goOtherPage(num) {
		// 点击叉号
		if (num === 1) {
			this.props.navigation.navigate('HomeScreen');
		}
		// 点击注册按钮
		if (num === 2) {
			this.props.navigation.navigate('ResgisterScreen');
		}
		// 点击验证码登录
		if (num === 3) {
			this.props.navigation.navigate('SecurityLoginScreen');
		}
		// 点击忘记密码
		if (num === 4) {
			this.props.navigation.navigate('ResetPasswordScreen');
		}
	}

	// 输入框改变的时候
	inputChange(key, value) {
		let params = {};
		params[key] = value;
		this.setState(params, () => {
			let { phone, password } = this.state;
			if (phone && password) {
				this.setState({ loginBtnDisable: false });
			} else {
				this.setState({ loginBtnDisable: true });
			}
		});
	}

	// 点击登录按钮
	async loginBtnClick() {
		let { phone, password, checked } = this.state;
		if (!checked) {
			return message.warning('提示', '请先勾选用户协议！');
		}
		// 手机号不通过
		if (!/^1[3456789]\d{9}$/.test(phone)) {
			return message.warning('提示', '请输入正确的手机号码');
		}
		if (password.length <= 5 || password.length > 11) {
			return message.warning('提示', '密码请输入6-12个字符以内');
		}
		let res = await Request.post('/login/byPassword', {
			phone,
			password,
		});
		if (res && res.code === 200) {
			await Storage.setString('token', res.data ? res.data.token : '');
			// 更新会员信息
			await Storage.set('user', res.data);
			NavigationUtil.reset(this.props.navigation, 'HomeScreen');
		}
	}

	render() {
		const { navigation } = this.props;
		const { loginBtnDisable, checked } = this.state;
		return (
			<SafeViewComponent>
				<ScrollView style={{ flex: 1, padding: 10 }} showsVerticalScrollIndicator={false}>
					<TouchableOpacity style={{ marginVertical: 20 }} onPress={this.goOtherPage.bind(this, 1)}>
						<Icon name="close" size={22} color="#333" />
					</TouchableOpacity>
					<View style={{ marginVertical: 20, marginLeft: 20 }}>
						<Text style={{ fontSize: 20 }}>账号登录</Text>
					</View>
					<Kohana
						{...commonInputParams}
						iconName="phone"
						label={'请输入手机号'}
						onChangeText={this.inputChange.bind(this, 'phone')}
						keyboardType="number-pad"
						returnKeyType="done"
						maxLength={11}
						selectionColor={baseColor.fontColor}
					/>
					<Kohana
						iconName="lock"
						{...commonInputParams}
						label={'登录密码'}
						onChangeText={this.inputChange.bind(this, 'password')}
						secureTextEntry={true}
						selectionColor={baseColor.fontColor}
						maxLength={20}
					/>
					<View style={styles.login_desc}>
						<View style={styles.login_desc_left}>
							<View style={styles.login_desc_left_account}>
								<Text style={{ color: baseColor.shadowColor }}>没有账号？</Text>
							</View>
							<TouchableOpacity onPress={this.goOtherPage.bind(this, 2)} style={styles.login_desc_left_register}>
								<Text style={{ color: baseColor.fontColor }}>立即注册</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress={this.goOtherPage.bind(this, 4)} style={styles.login_desc_right}>
							<Text style={{ color: baseColor.shadowColor }}>忘记密码？</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.login_btn}>
						<Button
							buttonStyle={{
								backgroundColor: baseColor.heightColor,
								borderRadius: 30,
								height: 60,
							}}
							disabled={loginBtnDisable}
							disabledStyle={{
								backgroundColor: baseColor.disableColor,
							}}
							disabledTitleStyle={{ color: '#fff' }}
							onPress={this.loginBtnClick.bind(this)}
							title="登录"
						/>
					</View>
					<TouchableOpacity onPress={this.goOtherPage.bind(this, 3)} style={styles.phoneLogin}>
						<Text style={{ color: baseColor.fontColor }}>手机验证码登录</Text>
					</TouchableOpacity>
					<View style={styles.protocol}>
						<TouchableOpacity style={styles.img_container} onPress={() => this.setState({ checked: !checked })}>
							<FastImage
								style={styles.img}
								source={
									checked
										? require('../../img/public/check_box_select.png')
										: require('../../img/public/check_box_no_select.png')
								}
							/>
						</TouchableOpacity>
						<Text style={styles.protocol_desc}>我已阅读并同意MOVING洗衣</Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('PrivacyScreen');
							}}
						>
							<Text style={styles.protocol_text}>《隐私政策》</Text>
						</TouchableOpacity>
						<Text style={styles.protocol_desc}>和</Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('ServiceProtocolScreen');
							}}
						>
							<Text style={styles.protocol_text}>《服务协议》</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	img_container: {
		width: 20,
		height: 20,
	},
	protocol: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	img: {
		height: 18,
		width: 18,
		marginTop: -2,
	},
	protocol_desc: {
		fontSize: 12,
		color: '#cdcdcd',
	},
	protocol_text: {
		fontSize: 12,
		color: '#515151',
	},
	login_desc: {
		marginVertical: 30,
		height: 50,
		flexDirection: 'row',
	},
	login_desc_left: {
		flex: 1,
		// justifyContent: 'center',
		paddingLeft: 25,
		flexDirection: 'row',
	},
	login_desc_left_account: {
		width: 80,
		justifyContent: 'center',
	},
	login_desc_left_register: {
		flex: 1,
		justifyContent: 'center',
	},
	login_desc_right: {
		width: 80,
		justifyContent: 'center',
	},
	login_btn: {
		height: 90,
		// backgroundColor: 'red',
	},
	phoneLogin: {
		alignItems: 'center',
	},
});
