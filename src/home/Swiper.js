/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import request from '../util/request';
import Swiper from 'react-native-swiper';
import {StyleSheet, Dimensions, View, Image} from 'react-native';

const {width} = Dimensions.get('window');

export default class SwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperList: [],
            imgUrl: [
                '../../img/lunbo/1.jpg',
                '../../img/lunbo/2.jpg',
                '../../img/lunbo/3.jpg',
                '../../img/lunbo/4.jpg',
                '../../img/lunbo/5.jpg',
            ],
        };
    }

    componentDidMount() {
        // 获取当前门店的轮播图列表
        request.get('/swiper/getAllById', {id: 1}).then(res => {
            this.setState({swiperList: res || []});
        });
    }

    render() {
        let {swiperList} = this.state;
        return (
            <View style={styles.swiperContainer}>
                <Swiper
                    autoplay
                    dotColor="rgba(255,255,255,.3)"
                    activeDotColor="#fff">
                    {swiperList &&
                        swiperList.length !== 0 &&
                        swiperList.map((item, index) => {
                            return (
                                <View key={index} style={styles.slide}>
                                    <Image
                                        style={styles.img}
                                        source={{
                                            uri: `http://localhost:3001/${
                                                item.url
                                            }`,
                                        }}
                                    />
                                </View>
                            );
                        })}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    swiperContainer: {
        width: width,
        height: (width - 20) * 0.5,
        marginTop: 10,
    },
    slide: {
        flex: 1,
        marginHorizontal: 10,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
