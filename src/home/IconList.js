/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconWithText from '../component/IconWithText';

export default class IconList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const iconList1 = [
            {
                url: require('../../img/home/icon1.png'),
                text: '成为会员',
            },
            {
                url: require('../../img/home/icon2.png'),
                text: '上门取衣',
            },
            {
                url: require('../../img/home/icon3.png'),
                text: '积分兑换',
            },
            {
                url: require('../../img/home/icon4.png'),
                text: '联系我们',
            },
        ];
        const iconList2 = [
            {
                url: require('../../img/home/icon5.png'),
                text: '操作指南',
            },
            {
                url: require('../../img/home/icon6.png'),
                text: '更多',
            },
            {
                url: '',
                text: '',
            },
            {
                url: '',
                text: '',
            },
        ];
        return (
            <View style={styles.icon_container}>
                <View style={styles.home_icon}>
                    {iconList1.map((item, index) => {
                        return (
                            <IconWithText
                                key={index}
                                source={item.url}
                                text={item.text}
                                index={`incon1_${index}`}
                            />
                        );
                    })}
                </View>
                <View style={styles.home_icon}>
                    {iconList2.map((item, index) => {
                        return (
                            <IconWithText
                                key={index}
                                source={item.url}
                                text={item.text}
                                index={`incon2_${index}`}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}

let iconSize = 45;
const styles = StyleSheet.create({
    icon_container: {
        marginTop: 10,
    },
    home_icon: {
        height: 80,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    home_icon_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    home_icon_item_img: {
        height: iconSize,
        width: iconSize,
    },
    home_icon_item_text: {
        marginTop: 10,
        fontSize: 12,
    },
});
