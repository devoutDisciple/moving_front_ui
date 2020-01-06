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

export default class Register extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Home!',
        headerShown: true,
    };
    render() {
        return <Text>注册界面</Text>;
    }
}
