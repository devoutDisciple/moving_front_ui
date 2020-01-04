/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class IconList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    renderIcon(soure, text, index) {
        return (
            <TouchableOpacity key={index} style={styles.home_icon_item}>
                <Image style={styles.home_icon_item_img} source={soure} />
                <Text style={styles.home_icon_item_text}>柜子</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const iconList1 = [
            {
                url: require('../../img/home/icon1.png'),
                text: '柜子',
            },
            {
                url: require('../../img/home/icon2.png'),
                text: '自取',
            },
            {
                url: require('../../img/home/icon3.png'),
                text: '商店',
            },
            {
                url: require('../../img/home/icon4.png'),
                text: '联系我们',
            },
        ];
        const iconList2 = [
            {
                url: require('../../img/home/icon5.png'),
                text: 'hello',
            },
            {
                url: require('../../img/home/icon6.png'),
                text: 'world',
            },
            {
                url: require('../../img/home/icon7.png'),
                text: 'what',
            },
            {
                url: require('../../img/home/icon8.png'),
                text: 'why',
            },
        ];
        return (
            <View>
                <View style={styles.home_icon}>
                    {iconList1.map((item, index) => {
                        return this.renderIcon(item.url, item.text, index);
                    })}
                </View>
                <View style={styles.home_icon}>
                    {iconList2.map((item, index) => {
                        return this.renderIcon(item.url, item.text, index);
                    })}
                </View>

                {/* <View style={styles.home_icon}>
                    {this.renderIcon(imgUrl.icon1, '柜子')}
                    {this.renderIcon(imgUrl.icon1, '自取')}
                    {this.renderIcon(imgUrl.icon1, '会员')}
                    {this.renderIcon(imgUrl.icon1, '商店')}
                </View>
                <View style={styles.home_icon}>
                    {this.renderIcon(imgUrl.icon1, '商店')}
                    {this.renderIcon(imgUrl.icon1, '商店')}
                    {this.renderIcon(
                        require('../../img/home/icon7.png'),
                        '商店',
                    )}
                    {this.renderIcon(
                        require('../../img/home/icon8.png'),
                        '商店',
                    )}
                </View> */}
            </View>
        );
    }
}

let iconSize = 45;
const styles = StyleSheet.create({
    home_icon: {
        height: 100,
        // backgroundColor: 'red',
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    home_icon_item: {
        flex: 1,
        // backgroundColor: 'blue',
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
