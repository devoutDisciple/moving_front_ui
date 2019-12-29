/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from 'react-native';
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

const {width, height} = Dimensions.get('window');

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home!',
        headerShown: true,
    };
    render() {
        return (
            <Text>12</Text>
            // <ScrollView style={{flex: 1}}>
            //     {/* <StatusBar backgroundColor="#fff" barStyle="dark-content" /> */}
            //     {/* <Text>登录页面11</Text>
            //     <Text
            //         onPress={() => {
            //             this.props.navigation.push('Tab');
            //         }}>
            //         返回
            //     </Text> */}
            //     <Kohana
            //         // 背景色
            //         style={{
            //             backgroundColor: 'gray',
            //             borderRadius: 20,
            //             width: 300,
            //             marginLeft: 20,
            //         }}
            //         label={'账号'}
            //         iconClass={FontAwesomeIcon}
            //         iconName={'pencil'}
            //         // 图标的颜色
            //         iconColor={'orange'}
            //         inputPadding={16}
            //         // label的颜色
            //         labelStyle={{color: 'blue'}}
            //         // input里面的字体颜色
            //         inputStyle={{color: 'red'}}
            //         labelContainerStyle={{paddingTop: 5, paddingLeft: 0}}
            //         iconContainerStyle={{padding: 20}}
            //         useNativeDriver
            //     />
            // </ScrollView>
        );
    }
}
