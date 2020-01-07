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

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginBtnDisable: true,
            checked: false,
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
            this.props.navigation.navigate('SecurityCodeScreen');
        }
        // 点击忘记密码
        if (num === 4) {
            this.props.navigation.navigate('ResetPasswordScreen');
        }
    }

    // 点击登录按钮
    loginBtnClick() {
        console.log(123);
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
                    iconName="user"
                    label={'请输入手机号'}
                    keyboardType="number-pad"
                    maxLength={11}
                    selectionColor={baseColor.fontColor}
                />
                <Kohana
                    iconName="lock"
                    {...commonInputParams}
                    label={'登录密码'}
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
