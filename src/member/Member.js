/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/AntDesign';
// import Dialog from '../util/Dialog';
import CommonHeader from '../component/CommonHeader';

const {width} = Dimensions.get('window');

export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
        };
    }

    componentDidMount() {
        console.log(234);
    }

    // swiperChange 选择不同的会员的时候
    swiperChange(index) {
        console.log(index);
        this.setState({selectIndex: index});
    }

    renderIcon(soure, text, index) {
        return (
            <View key={index} style={styles.home_icon_item}>
                <Image style={styles.home_icon_item_img} source={soure} />
                <Text style={styles.home_icon_item_text}>{text}</Text>
            </View>
        );
    }

    render() {
        const {navigation} = this.props;
        let {selectIndex} = this.state;
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
                url:
                    selectIndex === 0
                        ? require('../../img/home/icon4.png')
                        : require('../../img/home/icon5.png'),
                text: '联系我们',
            },
        ];
        return (
            <View style={styles.container}>
                <CommonHeader title="会员页面" navigation={navigation} />
                <View style={styles.swiperContainer}>
                    <Swiper
                        autoplay={false}
                        loop={false}
                        index={this.state.selectIndex}
                        onIndexChanged={this.swiperChange.bind(this)}
                        dotColor="rgba(255,255,255,.3)"
                        activeDotColor="#fff">
                        <View style={styles.slide}>
                            <Image
                                style={styles.img}
                                source={require('../../img/public/lunbo1.png')}
                                // source={{uri:  'https://facebook.githuby_logo.png',}}
                            />
                        </View>
                        <View style={styles.slide}>
                            <Image
                                style={styles.img}
                                source={require('../../img/public/lunbo2.png')}
                                // source={{uri:  'https://facebook.githuby_logo.png',}}
                            />
                        </View>
                    </Swiper>
                </View>
                <ScrollView style={styles.member_content}>
                    <View>
                        <View style={styles.home_icon}>
                            {iconList1.map((item, index) => {
                                return this.renderIcon(
                                    item.url,
                                    item.text,
                                    index,
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.member_bottom}>
                    <TouchableOpacity style={styles.member_bottom_btn}>
                        <Text style={{marginTop: 5, color: '#fff'}}>
                            超值价 ￥
                        </Text>
                        <Text style={{fontSize: 25, color: 'red'}}>
                            {selectIndex === 0 ? 80 : 90}
                        </Text>
                        <Text style={{marginTop: 5, color: '#fff'}}> /月</Text>
                        <Text
                            style={{
                                marginTop: 5,
                                marginLeft: 5,
                                color: '#fff',
                            }}>
                            立即抢购
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let iconSize = 45;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    member_content: {
        flex: 1,
        backgroundColor: 'orange',
    },
    member_bottom: {
        height: 100,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    member_bottom_btn: {
        height: 60,
        width: width * 0.8,
        backgroundColor: '#fb9dd0',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    swiperContainer: {
        width: width,
        height: (width - 20) * 0.5,
        marginTop: 10,
    },
    slide: {
        marginHorizontal: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
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
