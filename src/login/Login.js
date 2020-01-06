/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import {Kohana} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');
const baseColor = {
    fontColor: '#5abb8c',
    shadowColoe: '#7e7e7e',
};

export default class LoginScreen extends React.Component {
    // 点击叉号的时候
    backHome() {
        this.props.navigation.navigate('Home');
    }
    render() {
        const commonParams = {
            style: {
                backgroundColor: '#fff',
                width: width - 60,
                marginLeft: 20,
                borderColor: '#fff',
                borderBottomColor: '#f7f7f7',
                borderWidth: 1,
            },
            label: '请输入手机号',
            iconClass: Icon,
            // 图标的颜色
            iconColor: baseColor.fontColor,
            // label的颜色
            labelStyle: {
                color: '#cacaca',
                paddingLeft: 0,
                marginLeft: -15,
            },
            // input里面的字体颜色
            inputStyle: {color: '#333', paddingTop: 5},
            labelContainerStyle: {paddingTop: 10, paddingLeft: 0},
            iconContainerStyle: {paddingTop: 20},
        };
        return (
            <ScrollView style={{flex: 1, padding: 10}}>
                <TouchableOpacity
                    style={{marginVertical: 20}}
                    onPress={this.backHome.bind(this)}>
                    <Icon name="close" size={22} color="#333" />
                </TouchableOpacity>
                <View style={{marginVertical: 20, marginLeft: 20}}>
                    <Text style={{fontSize: 20}}>账号登录</Text>
                </View>
                <Kohana
                    {...commonParams}
                    iconName="user"
                    label={'请输入手机号'}
                    useNativeDriver
                />
                <Kohana iconName="lock" {...commonParams} label={'登录密码'} />
                <View style={styles.login_desc}>
                    <View style={styles.login_desc_left}>
                        <View style={styles.login_desc_left_account}>
                            <Text style={{color: baseColor.shadowColoe}}>
                                没有账号？
                            </Text>
                        </View>
                        <View style={styles.login_desc_left_register}>
                            <Text style={{color: baseColor.fontColor}}>
                                立即注册
                            </Text>
                        </View>
                    </View>
                    <View style={styles.login_desc_right}>
                        <Text style={{color: baseColor.shadowColoe}}>
                            忘记密码？
                        </Text>
                    </View>
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
});
