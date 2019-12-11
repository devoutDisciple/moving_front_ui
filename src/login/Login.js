/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {
    Sae,
    Kaede,
    Hoshi,
    Jiro,
    Isao,
    Madoka,
    Akira,
    Hideo,
    Kohana,
    Makiko,
    Fumi,
} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'orange',
                }}>
                <Text>登录页面</Text>
                <Text
                    onPress={() => {
                        this.props.navigation.push('Tab');
                    }}>
                    返回
                </Text>
                <Sae
                    label={'姓名'}
                    iconClass={FontAwesomeIcon}
                    iconName={'pencil'}
                    iconColor={'white'}
                    inputPadding={16}
                    labelHeight={24}
                    // active border height
                    borderHeight={2}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
                <Hoshi
                    label={'Street'}
                    maskColor={'#F9F7F6'}
                    borderColor={'#7ac1ba'}
                />
                <Fumi
                    label={'Course Name'}
                    labelStyle={{color: '#a3a3a3'}}
                    inputStyle={{color: '#f95a25'}}
                    iconClass={FontAwesomeIcon}
                    iconName={'university'}
                    iconColor={'#f95a25'}
                    iconSize={15}
                />
                <Akira
                    label={'First Name'}
                    borderColor={'#a5d1cc'}
                    labelStyle={{color: '#ac83c4'}}
                />
            </View>
        );
    }
}
