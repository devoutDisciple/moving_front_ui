/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import ListItem from './ListItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, TouchableOpacity, ScrollView, View} from 'react-native';

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
        this.state = {};
    }

    componentDidMount() {
        const {setParams} = this.props.navigation;
        setParams({
            rightIconClick: () => this.setIconClick(),
        });
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <My_Header navigation={this.props.navigation} />
                <My_Wallert navigation={this.props.navigation} />
                <View style={{height: 20}} />
                <ListItem iconName="creditcard" text="我的地址" />
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
                <ListItem iconName="creditcard" text="我的评价" />
                <ListItem iconName="creditcard" text="帮助中心" />
                <ListItem iconName="creditcard" text="意见反馈" />
                <ListItem iconName="creditcard" text="关于我们" />
                <ListItem iconName="creditcard" text="联系我们" />
            </ScrollView>
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
});
