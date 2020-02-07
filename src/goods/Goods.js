/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    Dimensions,
} from 'react-native';
import GoodsItem from './GoodsItem';
import CommonHeader from '../component/CommonHeader';

const {width} = Dimensions.get('window');

export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1],
            value: '0',
        };
    }

    componentDidMount() {}

    onChangeText() {}

    render() {
        const {navigation} = this.props;
        let {data} = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader title="设置订单金额" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <View style={styles.content_title}>
                        <Text>衣物结算</Text>
                    </View>
                    <View style={styles.content_clothing}>
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <GoodsItem
                                        key={index}
                                        num={8}
                                        price={36}
                                        name="羽绒服"
                                        source={require('../../img/lunbo/3.jpg')}
                                    />
                                );
                            })}
                    </View>
                    <View style={styles.content_title}>
                        <Text>运费设置</Text>
                    </View>
                    <View style={styles.content_input}>
                        <TextInput
                            style={styles.message_edit_input}
                            onChangeText={this.onChangeText.bind(this)}
                            defaultValue={this.state.value}
                            autoComplete="off"
                            selectionColor="#fb9bcd"
                            keyboardType="numeric"
                            maxLength={12}
                            placeholder="请输入"
                            placeholderTextColor="#bfbfbf"
                        />
                    </View>
                    <View style={styles.content_title}>
                        <Text>备注信息</Text>
                    </View>
                    <View style={styles.content_input}>
                        <TextInput
                            style={styles.message_edit_input}
                            onChangeText={this.onChangeText.bind(this)}
                            autoComplete="off"
                            selectionColor="#fb9bcd"
                            keyboardType="numeric"
                            maxLength={12}
                            placeholder="请输入"
                            placeholderTextColor="#bfbfbf"
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.footer_left}>
                        <View style={styles.footer_left_content}>
                            <Text style={styles.footer_left_content_text}>
                                总金额： ￥
                            </Text>
                        </View>

                        <View style={styles.footer_right_content}>
                            <Text style={styles.footer_right_content_text}>
                                288
                            </Text>
                        </View>
                    </View>
                    <View style={styles.footer_right}>
                        <Text style={styles.footer_right_text}>确定</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        margin: 10,
    },
    content_title: {
        height: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#fb9dd0',
        borderLeftWidth: 3,
    },
    content_clothing: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: '#dbdbdb',
        borderLeftWidth: 0.5,
        borderTopWidth: 0.5,
        marginBottom: 20,
    },
    message_edit_input: {
        height: 40,
        width: width - 20,
        fontSize: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderColor: '#cdcdcd',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    content_input: {
        marginVertical: 20,
    },
    footer: {
        height: 50,
        flexDirection: 'row',
    },
    footer_left: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        // alignItems: 'flex-start',
        backgroundColor: '#fbc2dd',
        flexDirection: 'row',
    },
    footer_left_content: {
        width: 85,
        justifyContent: 'center',
    },
    footer_left_content_text: {
        fontSize: 14,
        color: '#fff',
    },
    footer_right_content: {
        flex: 1,
        justifyContent: 'center',
    },
    footer_right_content_text: {
        fontSize: 28,
        color: '#ff4343',
        fontWeight: '600',
        marginTop: -5,
    },
    footer_right: {
        width: 100,
        backgroundColor: '#fb9dd0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer_right_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },
});
