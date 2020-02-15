/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Storage from '../../util/Storage';
import Toast from '../../component/Toast';
import Loading from '../../component/Loading';
import ListItem from '../../component/ListItem';
import CommonHeader from '../../component/CommonHeader';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: false,
        };
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
        // 检查更新
        if (key === 'about') {
            this.setState({loadingVisible: true});
            setTimeout(() => {
                this.setState({loadingVisible: false});
                Toast.success('已经是最新版本');
            }, 2000);
        }
        // 隐私政策
        if (key === 'privacy') {
            return navigation.navigate('PrivacyScreen');
        }
        // 永久注销账号
        if (key === 'logout') {
            Alert.alert(
                '提示',
                '注销后将不可恢复',
                [
                    {
                        text: '取消',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: '确定',
                        onPress: () => Toast.warning('暂不支持永久注销'),
                    },
                ],
                {cancelable: false},
            );
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
        let {loadingVisible} = this.state;
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
                <Loading visible={loadingVisible} />
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
