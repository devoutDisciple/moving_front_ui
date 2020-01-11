/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
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
            timeNum: 60,
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

    // 获取验证码登录
    secuityCodeBtnClick() {
        console.log(123);
    }

    // 点击获取验证码
    getMessage() {
        this.setState({
            timeNumVisible: true,
        });
        this.timer = setInterval(() => {
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
                            backgroundColor: baseColor.heightColoe,
                            borderRadius: 30,
                            height: 60,
                        }}
                        disabled={loginBtnDisable}
                        disabledStyle={{backgroundColor: '#9be3bd'}}
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
