/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>
                <Text>登录页面</Text>
                <Text
                    onPress={() => {
                        this.props.navigation.push('Tab');
                    }}>
                    返回
                </Text>
                <Fumi
                    label="Course Name"
                    // iconClass={FontAwesomeIcon}
                    iconName="university"
                    iconColor="#f95a25"
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                />
            </View>
        );
    }
}
