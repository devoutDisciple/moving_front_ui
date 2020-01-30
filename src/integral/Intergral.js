/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonHeader from '../component/CommonHeader';
import {Text, View, StyleSheet} from 'react-native';

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
                <Text style={{fontSize: 18, color: '#bfbfbf'}}>积分兑换</Text>
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
        backgroundColor: 'red',
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
});
