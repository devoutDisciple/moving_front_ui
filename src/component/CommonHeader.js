/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import Dialog from '../util/Dialog';

const {width} = Dimensions.get('window');

export default class Member extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    // 点击返回图标
    backIconClick() {
        this.props.navigation.goBack();
    }

    render() {
        const {title} = this.props;
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={this.backIconClick.bind(this)}
                    style={styles.header_back}>
                    <Icon name="left" size={20} color="#333" />
                </TouchableOpacity>
                <View style={styles.header_title}>
                    <Text style={styles.header_title_text}>{title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
    },
    header_back: {
        width: 50,
        justifyContent: 'center',
        paddingTop: 4,
    },
    header_title: {
        flex: 1,
        paddingLeft: width / 2 - 100,
        justifyContent: 'center',
    },
    header_title_text: {
        fontSize: 14,
        color: '#333',
    },
});
