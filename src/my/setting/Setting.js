/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Storage from '../../util/Storage';
import ListItem from '../../component/ListItem';
import CommonHeader from '../../component/CommonHeader';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    async onPress(key) {
        const {navigation} = this.props;
        // 重置密码
        if (key === 'resetPassword') {
            return navigation.navigate('ResetPasswordScreen');
        }
        // 清空缓存
        // if (key === 'clearcCache') {
        //     let data = await Storage.getString('cache');
        //     return navigation.navigate('ResetPasswordScreen');
        // }
        // 关于本软件
        if (key === 'about') {
            return navigation.navigate('ResetPasswordScreen');
        }
        // 隐私政策
        if (key === 'privacy') {
            return navigation.navigate('ResetPasswordScreen');
        }
        // 永久注销账号
        if (key === 'logout') {
            return navigation.navigate('ResetPasswordScreen');
        }
    }

    // 点击退出登录
    async logoutBtnClick() {
        const {navigation} = this.props;
        await Storage.multiRemove(['user', 'token']);
        return navigation.navigate('Home');
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="设置" navigation={navigation} />
                <View style={styles.content}>
                    <View style={styles.empty} />
                    <View style={styles.content_chunk}>
                        <ListItem
                            text="重置密码"
                            onPress={this.onPress.bind(this, 'resetPassword')}
                            withBorder
                            bigText
                        />
                        {/* <ListItem
                            text="清空缓存"
                            onPress={this.onPress.bind(this, 'clearcCache')}
                            withBorder
                            otherText="3.0M"
                        /> */}
                        <ListItem
                            text="检查更新"
                            onPress={this.onPress.bind(this, 'about')}
                            withBorder
                            otherText="1.0.0"
                            bigText
                        />
                        <ListItem
                            text="隐私政策"
                            bigText
                            onPress={this.onPress.bind(this, 'privacy')}
                        />
                    </View>

                    <View style={styles.empty} />
                    <View style={styles.content_chunk}>
                        <ListItem
                            text="永久注销账号"
                            bigText
                            onPress={this.onPress.bind(this, 'logout')}
                        />
                    </View>
                    <View style={styles.empty} />
                    <View style={styles.empty} />
                    <TouchableOpacity
                        style={styles.logout}
                        onPress={this.logoutBtnClick.bind(this)}>
                        <Text style={styles.logout_text}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        backgroundColor: '#f2f3f7',
    },
    content_chunk: {
        paddingHorizontal: 5,
    },
    empty: {
        height: 10,
    },
    logout: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logout_text: {
        color: 'red',
        fontSize: 16,
    },
});
