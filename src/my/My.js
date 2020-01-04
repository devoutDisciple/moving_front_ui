/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

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
                            style={{width: 20, marginTop: 3}}
                            name="setting"
                            size={16}
                            color="#333"
                        />
                    </TouchableOpacity>
                );
            },
            // 整个标题的样式
            headerStyle: {
                borderWidth: 0,
                // borderBottomColor: '#fff',
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
        this.props.navigation.navigate('My_Setting');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.my_header}>
                    <View style={styles.my_header_img_container}>
                        <Image
                            style={styles.my_header_image}
                            source={require('../../img/public/header.jpg')}
                        />
                    </View>
                    <View style={styles.my_header_message}>
                        {/* <View><Text>11</Text></View> */}
                        <View style={styles.my_header_message_name}>
                            <Text>张振</Text>
                            <Text>
                                <Icon
                                    style={{
                                        width: 20,
                                        marginTop: 3,
                                    }}
                                    name="edit"
                                    size={16}
                                    color="#333"
                                />
                            </Text>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    my_header: {
        backgroundColor: 'red',
        height: headerHeight,
        flexDirection: 'row',
    },
    my_header_img_container: {
        height: headerHeight,
        width: headerHeight,
        backgroundColor: 'blue',
    },
    my_header_image: {
        height: headerHeight,
        width: headerHeight,
        borderRadius: 100,
    },
    my_header_message: {
        flex: 1,
        backgroundColor: 'orange',
    },
    my_header_message_name: {
        height: 40,
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
});
