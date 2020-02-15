/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CommonHeader from '../component/CommonHeader';

export default class ConcatUs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="MOVING 简介" navigation={navigation} />
                <View style={styles.content}>
                    <Text style={styles.text_item}>
                        开发人员微信: 18210619398
                    </Text>
                    <Text style={styles.text_item}>
                        开发人员手机号: 18210619398
                    </Text>
                    <Text style={styles.text_item}>UI设计: 刘亦菲</Text>
                    <Text style={styles.text_item}>后端接口: 吴彦祖</Text>
                    <Text style={styles.text_item}>项目经理: 成龙</Text>
                    <Text style={styles.text_item}>产品经理: 彭于晏</Text>
                    <Text style={styles.text_item}>总负责人: 张振</Text>
                </View>
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
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_item: {
        height: 30,
        fontSize: 13,
        color: '#8a8a8a',
    },
});
