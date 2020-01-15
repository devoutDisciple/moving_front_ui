/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import MessageItem from './MessageItem';
import Picker from 'react-native-picker';
import CommonHeader from '../../component/CommonHeader';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    showInputDialog(title) {
        Alert.alert(
            'Alert Title',
            '32423',
            [
                {
                    text: 'Ask me later',
                    onPress: () => console.log('Ask me later pressed'),
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                // {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    showAgeSelect() {
        let data = [];
        for (let i = 18; i < 100; i++) {
            data.push(i);
        }
        Picker.init({
            pickerData: data,
            selectedValue: [25],
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '',
            pickerConfirmBtnColor: [251, 156, 206, 1],
            pickerCancelBtnColor: [196, 199, 206, 1],
            pickerTitleColor: [251, 156, 206, 1],
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
        return (
            <View style={styles.container}>
                <CommonHeader title="个人信息" navigation={navigation} />
                <ScrollView style={styles.setting_content}>
                    <MessageItem
                        label="头像"
                        value={require('../../../img/public/header.jpg')}
                        showIcon
                        isImage
                        onPress={() => {
                            console.log(111);
                        }}
                    />
                    <MessageItem
                        label="昵称"
                        value="小张"
                        showIcon
                        onPress={this.showInputDialog.bind(this)}
                    />
                    <MessageItem
                        label="姓名"
                        value="张振"
                        showIcon
                        onPress={() => {
                            console.log(111);
                        }}
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
                        onPress={() => {
                            console.log(111);
                        }}
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
