/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import FastImage from '../component/FastImage';
import CommonHeader from '../component/CommonHeader';
import EmptyContent from '../component/EmptyContent';
import {Text, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default class ReCharge extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="充值" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <FastImage
                        style={styles.content_logo}
                        source={require('../../img/public/logo2.png')}
                    />
                    <View style={styles.detail_common_title}>
                        <Text style={{fontSize: 16, color: '#333'}}>
                            押金充值
                        </Text>
                    </View>
                </ScrollView>
                {/* <EmptyContent /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        // backgroundColor: 'red',
        paddingHorizontal: 10,
    },
    content_logo: {
        width: width - 20,
        height: 0.4 * width,
    },
    detail_common_title: {
        height: 20,
        marginVertical: 10,
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#fb9dd0',
        borderLeftWidth: 3,
        marginBottom: 10,
    },
});
