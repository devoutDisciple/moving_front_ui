/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Dimensions, View, Image} from 'react-native';

const {width} = Dimensions.get('window');

export default class SwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: [
                '../../img/lunbo/1.jpg',
                '../../img/lunbo/2.jpg',
                '../../img/lunbo/3.jpg',
                '../../img/lunbo/4.jpg',
                '../../img/lunbo/5.jpg',
            ],
        };
    }

    render() {
        let {imgUrl} = this.state;
        return (
            <View style={styles.swiperContainer}>
                <Swiper
                    autoplay
                    dotColor="rgba(255,255,255,.3)"
                    activeDotColor="#fff">
                    {imgUrl &&
                        imgUrl.length !== 0 &&
                        imgUrl.map((item, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <View key={index} style={styles.slide}>
                                        <Image
                                            style={styles.img}
                                            source={require('../../img/lunbo/3.jpg')}
                                            // source={{uri:  'https://facebook.githuby_logo.png',}}
                                        />
                                    </View>
                                );
                            }
                            return (
                                <View key={index} style={styles.slide}>
                                    <Image
                                        style={styles.img}
                                        source={require('../../img/lunbo/4.jpg')}
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
