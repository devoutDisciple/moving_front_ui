/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Request from '@/util/Request';
import config from '@/config/config';
import message from '@/component/Message';
import { Button } from 'react-native-elements';
import { Kohana } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from '@/component/FastImage';
import Storage from '@/util/Storage';
import NavigationUtil from '@/util/NavigationUtil';
import SafeViewComponent from '@/component/SafeViewComponent';
import { baseColor, commonInputParams } from './commonParams';

export default class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginBtnDisable: true,
			timeNumVisible: false,
			timeNum: config.sercurity_code_time,
			phone: '', // 输入的手机号
			securityCode: '', // 验证码
			password: '', // 密码
			confirmPassword: '', // 确认的密码
			checked: false,
		};
	}

	componentWillUnmount() {
		// 卸载定时器
		this.timer && clearInterval(this.timer);
	}

	// 点击叉号的时候
	backHome() {
		this.props.navigation.goBack();
	}

	// 点击重置密码的时候
	async secuityCodeBtnClick() {
		let { phone, securityCode, password, confirmPassword, checked } = this.state;
		if (!checked) {
			return message.warning('提示', '请先勾选用户协议！');
		}
		// 手机号不通过
		if (!/^1[3456789]\d{9}$/.test(phone)) {
			return message.warning('提示', '请输入正确的手机号码');
		}
		if (securityCode.length <= 5) {
			return message.warning('提示', '请输入正确的验证码');
		}
		if (password.length <= 5 || password.length > 11 || confirmPassword.length <= 5 || confirmPassword.length > 11) {
			return message.warning('提示', '密码请输入6-12个字符以内');
		}
		if (password !== confirmPassword) {
			return message.warning('提示', '两次输入密码不一致');
		}
		let res = await Request.post('/login/resetPassword', {
			phone,
			security_code: securityCode,
			password,
			confirmPassword,
		});
		if (res && res.code === 200) {
			await Storage.setString('token', res.data ? res.data.token : '');
			// 更新会员信息
			await Storage.set('user', res.data);
			NavigationUtil.reset(this.props.navigation, 'HomeScreen');
		}
	}

	// 输入框改变的时候
	inputChange(key, value) {
		let params = {};
		params[key] = value;
		this.setState(params, () => {
			let { phone, securityCode, password } = this.state;
			if (phone && securityCode && password) {
				this.setState({ loginBtnDisable: false });
			} else {
				this.setState({ loginBtnDisable: true });
			}
		});
	}

	// 点击获取验证码
	async getMessage() {
		const { phone } = this.state;
		// 手机号不通过
		if (!/^1[3456789]\d{9}$/.test(phone)) {
			return message.warning('提示', '请输入正确的手机号码');
		}
		// 请求获得验证码
		await Request.post('/login/sendMessage', {
			phoneNum: phone,
		});
		this.setState({
			timeNumVisible: true,
		});
		this.timer = setInterval(() => {
			let { timeNum } = this.state;
			if (timeNum === 1) {
				this.timer && clearInterval(this.timer);
				return this.setState({
					timeNumVisible: false,
					timeNum: config.sercurity_code_time,
				});
			}
			this.setState({
				timeNum: this.state.timeNum - 1,
			});
		}, 1000);
	}

	render() {
		const { loginBtnDisable, timeNumVisible, timeNum, checked } = this.state;
		const { navigation } = this.props;
		return (
			<SafeViewComponent>
				<ScrollView style={{ flex: 1, padding: 10 }} showsVerticalScrollIndicator={false}>
					<TouchableOpacity style={{ marginVertical: 20 }} onPress={this.backHome.bind(this)}>
						<Icon name="left" size={22} color="#333" />
					</TouchableOpacity>
					<View style={{ marginVertical: 20, marginLeft: 20 }}>
						<Text style={{ fontSize: 20 }}>重置密码</Text>
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
					<View style={styles.register_message}>
						<View style={styles.register_message_left}>
							<Kohana
								{...commonInputParams}
								iconName="message1"
								label={'验证码'}
								onChangeText={this.inputChange.bind(this, 'securityCode')}
								keyboardType="number-pad"
								returnKeyType="done"
								maxLength={6}
								selectionColor={baseColor.fontColor}
							/>
						</View>
						{timeNumVisible ? (
							<View style={styles.register_message_right}>
								<Text
									style={{
										fontSize: 14,
										marginTop: 8,
										color: baseColor.fontColor,
									}}
								>
									{timeNum}秒后重新获取
								</Text>
							</View>
						) : (
							<TouchableOpacity onPress={this.getMessage.bind(this)} style={styles.register_message_right}>
								<Text
									style={{
										fontSize: 16,
										marginTop: 8,
										color: baseColor.fontColor,
									}}
								>
									获取验证码
								</Text>
							</TouchableOpacity>
						)}
					</View>
					<Kohana
						iconName="lock"
						{...commonInputParams}
						label={'设置密码'}
						onChangeText={this.inputChange.bind(this, 'password')}
						secureTextEntry={true}
						selectionColor={baseColor.fontColor}
						maxLength={20}
					/>
					<Kohana
						iconName="lock"
						{...commonInputParams}
						label={'确认密码'}
						onChangeText={this.inputChange.bind(this, 'confirmPassword')}
						secureTextEntry={true}
						selectionColor={baseColor.fontColor}
						maxLength={20}
					/>
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
							onPress={this.secuityCodeBtnClick.bind(this)}
							title="确定"
						/>
					</View>
					<View style={styles.protocol}>
						<TouchableOpacity style={styles.img_container} onPress={() => this.setState({ checked: !checked })}>
							<FastImage
								style={styles.img}
								source={
									checked ? require('@/img/public/check_box_select.png') : require('@/img/public/check_box_no_select.png')
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
		marginTop: 20,
		// backgroundColor: 'red',
	},
	phoneLogin: {
		alignItems: 'center',
	},
	register_message: {
		flexDirection: 'row',
	},
	register_message_left: {
		flex: 1,
	},
	register_message_right: {
		width: 160,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
