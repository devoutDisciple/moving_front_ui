/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import IconWithText from '../component/IconWithText';
import Storage from '../util/Storage';

export default class IconList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    // icon点击的时候
    async onIconPress(data) {
        let {navigation} = this.props;
        // 成为会员
        if (data && data.key === 'home_member') {
            navigation.navigate('MemberScreen');
        }
        // 上门取衣
        if (data && data.key === 'home_clothing') {
            navigation.navigate('ClothingScreen');
        }
        // 积分兑换
        if (data && data.key === 'home_integral') {
            navigation.navigate('IntergralScreen');
        }

        // 获取所有的存储的key
        if (data && data.key === 'aaa') {
            let keys = await Storage.getAllKeys();
            let res = await Storage.multiGet(keys);
            console.log('storage是: ', res);
        }

        // 清除所有的keys
        if (data && data.key === 'bbb') {
            await Storage.clear();
            console.log('清除成功');
        }
    }

    render() {
        const iconList1 = [
            {
                key: 'home_member',
                url: require('../../img/home/icon1.png'),
                text: '成为会员',
            },
            {
                key: 'home_clothing',
                url: require('../../img/home/icon2.png'),
                text: '上门取衣',
            },
            {
                key: 'home_integral',
                url: require('../../img/home/icon3.png'),
                text: '积分兑换',
            },
            {
                key: 'home_concat',
                url: require('../../img/home/icon4.png'),
                text: '联系我们',
            },
        ];
        const iconList2 = [
            {
                key: 'home_operation',
                url: require('../../img/home/icon5.png'),
                text: '操作指南',
            },
            {
                key: 'home_more',
                url: require('../../img/home/icon6.png'),
                text: '更多',
            },
            {
                key: 'aaa',
                url: require('../../img/home/icon6.png'),
                text: '获取',
            },
            {
                key: 'bbb',
                url: require('../../img/home/icon6.png'),
                text: '清除',
            },
        ];
        return (
            <View style={styles.icon_container}>
                <View style={styles.home_icon}>
                    {iconList1.map((item, index) => {
                        return (
                            <IconWithText
                                key={index}
                                onPress={this.onIconPress.bind(this, item)}
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
                                onPress={this.onIconPress.bind(this, item)}
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
