/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import Config from '../config/config';
import FastImage from '../component/FastImage';
import {StyleSheet, Dimensions, View} from 'react-native';

const {width} = Dimensions.get('window');

export default class SwiperComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {swiperList = []} = this.props;
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
                                    <FastImage
                                        style={styles.img}
                                        source={{
                                            uri: `${Config.lunboUrl}/${
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
