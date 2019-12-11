/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'red',
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
            </View>
        );
    }
}
