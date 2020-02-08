/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import ListItem from './ListItem';
import Request from '../util/request';
import Storage from '../util/Storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    RefreshControl,
} from 'react-native';

export default class MyScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTitle: '',
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.state.params.rightIconClick()
                        }>
                        <Icon
                            style={{width: 20, marginTop: 3, marginRight: 3}}
                            name="setting"
                            size={20}
                            color="#333"
                        />
                    </TouchableOpacity>
                );
            },
            headerStyle: {
                borderWidth: 0,
                borderBottomColor: '#fff',
            },
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: false,
        };
    }

    async componentDidMount() {
        // 增加设置按钮点击功能
        const {setParams} = this.props.navigation;
        setParams({
            rightIconClick: () => this.setIconClick(),
        });

        // 获取用户信息
        await this.getUserInfo();
    }

    // 获取用户信息
    async getUserInfo() {
        this.setState({loading: true});
        // 获取用户token值
        let token = await Storage.getString('token');
        let res = await Request.get('/user/getUserByToken', {token});
        let user = res.data || '';
        await Storage.set('user', user);
        // 获取本地存储的用户信息
        if (!user) {
            // 去登陆页面
            this.props.navigation.navigate('LoginScreen');
        }
        this.setState({user: user, loading: false});
    }

    // 下拉刷新的时候
    async refreshing() {
        await this.getUserInfo();
    }

    // 点击设置按钮
    setIconClick() {
        this.props.navigation.navigate('MySetting');
    }

    // 点击登录
    onLogin() {
        this.props.navigation.navigate('LoginScreen');
    }

    // 点击注册
    onRegister() {
        this.props.navigation.navigate('ResgisterScreen');
    }

    // 点击我的地址
    onMyAddressClick() {
        this.props.navigation.navigate('AddressScreen');
    }

    render() {
        let {user, loading} = this.state;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this.refreshing.bind(this)}
                        />
                    }>
                    <My_Header navigation={this.props.navigation} user={user} />
                    <My_Wallert
                        navigation={this.props.navigation}
                        user={user}
                    />
                    <View style={{height: 20}} />
                    <ListItem
                        iconName="creditcard"
                        text="我的地址"
                        onPress={this.onMyAddressClick.bind(this)}
                    />
                    {/* <ListItem
                    iconName="creditcard"
                    text="登录"
                    onPress={this.onLogin.bind(this)}
                />
                <ListItem
                    iconName="creditcard"
                    text="注册"
                    onPress={this.onRegister.bind(this)}
                /> */}
                    <ListItem iconName="creditcard" text="钱包管理" />
                    <ListItem iconName="creditcard" text="积分兑换" />
                    <ListItem iconName="creditcard" text="我的评价" />
                    <ListItem iconName="creditcard" text="帮助中心" />
                    <ListItem iconName="creditcard" text="意见反馈" />
                    <ListItem iconName="creditcard" text="关于我们" />
                    <ListItem iconName="creditcard" text="联系我们" />
                </ScrollView>
            </View>
        );
    }
}

// 展示头像的view高度
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    content: {
        flex: 1,
    },
});
