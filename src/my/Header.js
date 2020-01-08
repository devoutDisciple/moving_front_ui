/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class MyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    // 点击编辑按钮
    editBtnClick() {
        console.log(this.props);
        this.props.navigation.navigate('MyMessage');
    }

    render() {
        return (
            <View style={styles.my_header}>
                <View style={styles.my_header_img_container}>
                    <Image
                        style={styles.my_header_image}
                        source={require('../../img/public/header.jpg')}
                    />
                </View>
                <View style={styles.my_header_message}>
                    <View style={styles.my_header_message_name}>
                        <View style={styles.my_header_message_name_left}>
                            <Text
                                style={styles.my_header_message_name_left_text}>
                                张振
                            </Text>
                        </View>
                        <View style={styles.my_header_message_name_right}>
                            <TouchableOpacity
                                onPress={this.editBtnClick.bind(this)}>
                                <Icon
                                    style={{
                                        width: 20,
                                        marginTop: 3,
                                    }}
                                    name="edit"
                                    size={14}
                                    color="#49bb6d"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.my_header_message_member}>
                        <View style={styles.my_header_message_member_icon}>
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('../../img/public/member.png')}
                            />
                        </View>
                        <View style={styles.my_header_message_member_text}>
                            <Text style={{color: '#fff'}}>普通用户</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
// 展示头像的view高度
let headerHeight = 70;
const styles = StyleSheet.create({
    my_header: {
        height: headerHeight,
        flexDirection: 'row',
    },
    my_header_img_container: {
        height: headerHeight,
        width: headerHeight,
    },
    my_header_image: {
        height: headerHeight,
        width: headerHeight,
        borderRadius: 100,
    },
    my_header_message: {
        flex: 1,
    },
    my_header_message_name: {
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    my_header_message_name_left: {
        minWidth: 20,
        maxWidth: 200,
        justifyContent: 'center',
    },
    my_header_message_name_left_text: {
        fontSize: 16,
        color: '#333',
    },
    my_header_message_name_right: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    my_header_message_member: {
        height: 30,
        width: 110,
        paddingHorizontal: 9,
        backgroundColor: '#49bb6d',
        marginLeft: 11,
        flexDirection: 'row',
        borderRadius: 20,
    },
    my_header_message_member_icon: {
        width: 30,
        justifyContent: 'center',
    },
    my_header_message_member_text: {
        width: 80,
        justifyContent: 'center',
    },
});
