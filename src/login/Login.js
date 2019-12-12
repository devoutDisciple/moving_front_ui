/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, ImageBackground, Dimensions} from 'react-native';
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

const {width, height} = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require('../../img/bg.jpg')}
                // resizeMode="cover" // 等比放大或缩小，以填充整个 view。超出的部分被裁剪掉。默认值。
                // resizeMode="contain" // 等比例缩小或放大至图片完全显示出来。可能会无法填充整个 view
                resizeMode="stretch" // 直接填充整个 view。图片会变形。
                style={{flex: 1, width: null}}>
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
                        label={'用户名'}
                        labelStyle={{color: '#a3a3a3'}}
                        inputStyle={{color: '#f95a25'}}
                        iconClass={FontAwesomeIcon}
                        style={{
                            backgroundColor: 'rgba(251,251,251, 0.5)',
                            width: '96%',
                            marginLeft: '2%',
                        }}
                        iconName={'pencil'}
                        iconColor={'white'}
                        inputPadding={8}
                        labelHeight={12}
                        // active border height
                        borderHeight={1}
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        iconSize={15}
                    />
                </View>
            </ImageBackground>
        );
    }
}
