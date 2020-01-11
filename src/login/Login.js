/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Kohana} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/AntDesign';
import {baseColor, commonInputParams} from './commonParams';
import request from '../util/request';
import message from '../util/message';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginBtnDisable: true,
            timeNumVisible: false,
            phone: '', // 输入的手机号
            password: '', // 验证码
        };
    }

    // 导航到其他页面
    goOtherPage(num) {
        // 点击叉号
        if (num === 1) {
            this.props.navigation.navigate('Home');
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
            let {phone, password} = this.state;
            if (phone && password) {
                this.setState({loginBtnDisable: false});
            } else {
                this.setState({loginBtnDisable: true});
            }
        });
    }

    // 点击登录按钮
    async loginBtnClick() {
        let {phone, password} = this.state;
        // 手机号不通过
        if (!/^1[3456789]\d{9}$/.test(phone)) {
            return message.warning('提示', '请输入正确的手机号码');
        }
        if (password.length <= 5) {
            return message.warning('提示', '密码最少为六位字符');
        }
        console.log(phone, password, 888);
        let res = await request.post('/login/byPassword', {
            phone,
            password,
        });
        if (res && res.code === 200) {
            AsyncStorage.setItem('token', res.data, (error, result) => {
                if (error) {
                    return message.warning('提示', '网络错误，请稍后重试');
                }
                this.props.navigation.navigate('Home');
            });
        }
    }

    render() {
        const {loginBtnDisable} = this.state;

        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <TouchableOpacity
                    style={{marginVertical: 20}}
                    onPress={this.goOtherPage.bind(this, 1)}>
                    <Icon name="close" size={22} color="#333" />
                </TouchableOpacity>
                <View style={{marginVertical: 20, marginLeft: 20}}>
                    <Text style={{fontSize: 20}}>账号登录</Text>
                </View>
                <Kohana
                    {...commonInputParams}
                    iconName="phone"
                    label={'请输入手机号'}
                    onChangeText={this.inputChange.bind(this, 'phone')}
                    keyboardType="number-pad"
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
                            <Text style={{color: baseColor.shadowColoe}}>
                                没有账号？
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.goOtherPage.bind(this, 2)}
                            style={styles.login_desc_left_register}>
                            <Text style={{color: baseColor.fontColor}}>
                                立即注册
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this.goOtherPage.bind(this, 4)}
                        style={styles.login_desc_right}>
                        <Text style={{color: baseColor.shadowColoe}}>
                            忘记密码？
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.login_btn}>
                    <Button
                        buttonStyle={{
                            backgroundColor: baseColor.heightColoe,
                            borderRadius: 30,
                            height: 60,
                        }}
                        disabled={loginBtnDisable}
                        disabledStyle={{backgroundColor: '#9be3bd'}}
                        disabledTitleStyle={{color: '#fff'}}
                        onPress={this.loginBtnClick.bind(this)}
                        title="登录"
                    />
                </View>
                <TouchableOpacity
                    onPress={this.goOtherPage.bind(this, 3)}
                    style={styles.phoneLogin}>
                    <Text style={{color: baseColor.fontColor}}>
                        手机验证码登录
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
