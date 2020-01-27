/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import MessageItem from './MessageItem';
import Picker from 'react-native-picker';
import Dialog from '../../component/Dialog';
import config from '../../config/config';
import CommonHeader from '../../component/CommonHeader';
export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {}

    showDialog() {
        this.setState({
            visible: true,
        });
    }

    // 保存的时候
    onSaveValue() {}

    // 弹框确定的时候
    onOkDialog() {
        this.setState({
            visible: false,
        });
    }

    // 弹框取消的时候
    onCancelDialog() {
        this.setState({
            visible: false,
        });
    }

    testToast() {}

    showAgeSelect() {
        let data = [];
        for (let i = 18; i < 100; i++) {
            data.push(i);
        }
        Picker.init({
            ...config.pickCommonConfig,
            pickerData: data,
            selectedValue: [25],
            onPickerConfirm: res => {
                console.log(res);
            },
            onPickerCancel: res => {
                console.log(res);
            },
            onPickerSelect: res => {
                console.log(res);
            },
        });
        Picker.show();
    }

    render() {
        const {navigation} = this.props;
        let {visible} = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader title="个人信息" navigation={navigation} />
                <ScrollView style={styles.setting_content}>
                    <MessageItem
                        label="头像"
                        value={require('../../../img/public/header.jpg')}
                        showIcon
                        isImage
                        onPress={this.testToast.bind(this)}
                    />
                    <MessageItem
                        label="昵称"
                        value="小张11"
                        showIcon
                        onPress={this.showDialog.bind(this, '修改昵称')}
                    />
                    <MessageItem
                        label="姓名"
                        value="张振"
                        showIcon
                        onPress={this.showDialog.bind(this, '修改姓名')}
                    />
                    <MessageItem
                        label="性别"
                        value={
                            <View style={styles.sex_container}>
                                <TouchableOpacity>
                                    <Text style={styles.sex_item_active}>
                                        男
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.sex_item_normal}>
                                        女
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                        isSwitch
                    />
                    <MessageItem
                        label="年龄"
                        value="25"
                        showIcon
                        onPress={this.showAgeSelect.bind(this)}
                    />
                    <MessageItem
                        label="邮箱"
                        value="1094705507@qq.com"
                        showIcon
                        onPress={this.showDialog.bind(this, '修改邮箱')}
                    />
                    <MessageItem
                        label="会员等级"
                        value="普通用户"
                        onPress={() => {
                            console.log(111);
                        }}
                    />
                    <MessageItem
                        label="登录账号"
                        value="18210619398"
                        onPress={() => {
                            console.log(111);
                        }}
                    />
                </ScrollView>
                <Dialog
                    visible={visible}
                    title="修改信息"
                    defalutValue="hello"
                    onOk={this.onOkDialog.bind(this)}
                    onCancel={this.onCancelDialog.bind(this)}
                />
            </View>
        );
    }
}

const sex_common = {
    marginLeft: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 13,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    common_text_style: {
        fontSize: 16,
        color: '#333',
    },
    sex_container: {
        flexDirection: 'row',
    },
    sex_item_active: {
        ...sex_common,
        borderColor: '#fb9cce',
        color: '#fb9cce',
    },
    sex_item_normal: {
        ...sex_common,
        borderColor: '#e5e5e5',
        color: '#333',
    },
    setting_content: {
        flex: 1,
        marginTop: 20,
    },
    setting_content_item: {
        marginHorizontal: 10,
        height: 50,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    setting_content_item_left: {
        width: 100,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    setting_content_item_center: {
        flex: 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    setting_content_item_center_img: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    setting_content_item_right: {
        width: 30,
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});
