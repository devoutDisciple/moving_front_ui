/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonHeader from '../component/CommonHeader';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import GoodsItem from './GoodsItem';

const {width} = Dimensions.get('window');

export default class Intergral extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="积分兑换" navigation={navigation} />
                <View style={styles.intergrals_show}>
                    <View style={styles.intergrals_show_content}>
                        <Text style={styles.intergrals_show_content_title}>
                            可用积分
                        </Text>
                        <Text style={styles.intergrals_show_content_num}>
                            999
                        </Text>
                    </View>
                </View>
                <View style={styles.intergrals_title}>
                    <Text>积分兑换</Text>
                </View>
                <ScrollView style={styles.intergrals_content}>
                    <View style={styles.intergrals_content_chunk}>
                        <GoodsItem
                            source={require('../../img/lunbo/2.jpg')}
                            title="新版病毒"
                            num="220积分"
                        />
                        <GoodsItem
                            source={require('../../img/lunbo/2.jpg')}
                            title="新版病毒"
                            num="220积分"
                        />
                    </View>
                    <View style={styles.intergrals_content_chunk}>
                        <GoodsItem
                            source={require('../../img/lunbo/2.jpg')}
                            title="新版病毒"
                            num="220积分"
                        />
                        <GoodsItem
                            source={require('../../img/lunbo/2.jpg')}
                            title="新版病毒"
                            num="220积分"
                        />
                    </View>
                    <View style={styles.intergrals_content_chunk}>
                        <GoodsItem
                            source={require('../../img/lunbo/2.jpg')}
                            title="新版病毒"
                            num="220积分"
                        />
                        <GoodsItem
                            source={require('../../img/lunbo/2.jpg')}
                            title="新版病毒"
                            num="220积分"
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    intergrals_show: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intergrals_show_content: {
        width: 100,
        height: 100,
        backgroundColor: '#fb9cce',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intergrals_show_content_title: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '400',
        marginBottom: 5,
    },
    intergrals_show_content_num: {
        fontSize: 18,
        color: '#f3dcea',
        fontWeight: '800',
        marginBottom: 5,
    },
    intergrals_title: {
        marginLeft: 10,
        height: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#ffc6e5',
    },
    intergrals_content: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 2,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: '#e6e6e6',
    },
    intergrals_content_chunk: {
        flexDirection: 'row',
    },
});
