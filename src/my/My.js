/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActionSheetIOS,
    Alert,
    AsyncStorage,
} from 'react-native';
import {Avatar} from 'react-native-elements';

export default class MyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View
                    style={{
                        borderBottomColor: 'red',
                        height: 100,
                        borderBottomWidth: 1,
                        padding: 10,
                        flexDirection: 'row',
                    }}>
                    <View
                        style={{
                            height: 80,
                            width: 80,
                        }}>
                        <Avatar
                            style={{height: 80}}
                            size="large"
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View
                        style={{
                            height: 80,
                            flex: 1,
                            // backgroundColor: 'red',
                            marginLeft: 20,
                        }}>
                        <Text
                            style={{
                                marginTop: 20,
                                color: '#313131',
                                fontSize: 20,
                            }}>
                            用户姓名
                        </Text>
                        <Text
                            style={{
                                marginTop: 20,
                                color: '#9e9e9e',
                                fontSize: 12,
                            }}>
                            Moving Laundry, 您的私人管家
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log(124);
                        ActionSheetIOS.showActionSheetWithOptions(
                            {
                                options: ['取消', '删除'],
                                destructiveButtonIndex: 1,
                                cancelButtonIndex: 0,
                            },
                            buttonIndex => {
                                if (buttonIndex === 1) {
                                    /* 当接收到的索引为1，即点击了删除按钮时，执行对应操作 */
                                }
                            },
                        );
                        Alert.alert(
                            'Alert Title',
                            'My Alert Msg',
                            [
                                {
                                    text: 'Ask me later',
                                    onPress: () =>
                                        console.log('Ask me later pressed'),
                                },
                                {
                                    text: 'Cancel',
                                    onPress: () =>
                                        console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => console.log('OK Pressed'),
                                },
                            ],
                            {cancelable: false},
                        );
                    }}>
                    <Text>dddd</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>获取位置</Text>
                </TouchableOpacity>

                {/* geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]); */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
});
