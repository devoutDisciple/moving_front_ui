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
import Request from '../util/Request';
import config from '../config/config';
import message from '../component/Message';
import {Button} from 'react-native-elements';
import {Kohana} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/AntDesign';
import {baseColor, commonInputParams} from './commonParams';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginBtnDisable: true,
            timeNumVisible: false,
            timeNum: config.sercurity_code_time,
            phone: '', // 输入的手机号
            securityCode: '', // 验证码
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

    // 点击登录
    async secuityCodeBtnClick() {
        let {phone, securityCode} = this.state;
        // 手机号不通过
        if (!/^1[3456789]\d{9}$/.test(phone)) {
            return message.warning('提示', '请输入正确的手机号码');
        }
        if (securityCode.length <= 5) {
            return message.warning('提示', '请输入正确的验证码');
        }
        let res = await Request.post('/login/bySercurityCode', {
            phone,
            security_code: securityCode,
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

    // 输入框改变的时候
    inputChange(key, value) {
        let params = {};
        params[key] = value;
        this.setState(params, () => {
            let {phone, securityCode} = this.state;
            if (phone && securityCode) {
                this.setState({loginBtnDisable: false});
            } else {
                this.setState({loginBtnDisable: true});
            }
        });
    }

    // 点击获取验证码
    async getMessage() {
        const {phone} = this.state;
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
            let {timeNum} = this.state;
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
        const {loginBtnDisable, timeNumVisible, timeNum} = this.state;
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <TouchableOpacity
                    style={{marginVertical: 20}}
                    onPress={this.backHome.bind(this)}>
                    <Icon name="left" size={22} color="#333" />
                </TouchableOpacity>
                <View style={{marginVertical: 20, marginLeft: 20}}>
                    <Text style={{fontSize: 20}}>验证码登录</Text>
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
                <View style={styles.register_message}>
                    <View style={styles.register_message_left}>
                        <Kohana
                            {...commonInputParams}
                            iconName="message1"
                            label={'验证码'}
                            onChangeText={this.inputChange.bind(
                                this,
                                'securityCode',
                            )}
                            keyboardType="number-pad"
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
                                }}>
                                {timeNum}秒后重新获取
                            </Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={this.getMessage.bind(this)}
                            style={styles.register_message_right}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginTop: 8,
                                    color: baseColor.fontColor,
                                }}>
                                获取验证码
                            </Text>
                        </TouchableOpacity>
                    )}
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
                        disabledTitleStyle={{color: '#fff'}}
                        onPress={this.secuityCodeBtnClick.bind(this)}
                        title="登录"
                    />
                </View>
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
