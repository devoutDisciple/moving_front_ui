/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    Dimensions,
    Alert,
} from 'react-native';
import GoodsItem from './GoodsItem';
import CommonHeader from '../component/CommonHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    name: '裙子1',
                    price: 10,
                    num: 0,
                },
                {
                    id: 2,
                    name: '裙子2',
                    price: 20,
                    num: 0,
                },
                {
                    id: 3,
                    name: '裙子3',
                    price: 30,
                    num: 0,
                },
                {
                    id: 4,
                    name: '裙子4',
                    price: 40,
                    num: 0,
                },
            ],
            totalPrice: 0,
        };
    }

    componentDidMount() {}

    onChangeText() {}

    // 点击确定的时候
    onSureClothing() {
        Alert.alert(
            '提示',
            '该价格仅供参考,最终价格由店员确认',
            [
                {
                    text: '确定',
                    onPress: () => {
                        this.props.navigation.navigate('CabinetScreen');
                    },
                },
            ],
            {cancelable: false},
        );
    }

    // 减少衣物
    onSubCloth(id) {
        let {data} = this.state;
        let goods = data.filter(item => item.id === id)[0];
        if (goods.num < 1) {
            return;
        }
        goods.num--;
        this.setState({data}, () => this.onCountPrice());
    }

    // 增加衣物
    onAddCloth(id) {
        let {data} = this.state;
        let goods = data.filter(item => item.id === id)[0];
        goods.num++;
        this.setState({data}, () => this.onCountPrice());
    }

    // 结算价格
    onCountPrice() {
        let data = this.state.data;
        let totalPrice = 0;
        data.map(item => {
            totalPrice += Number(item.price * item.num);
        });
        this.setState({totalPrice});
    }

    render() {
        const {navigation} = this.props;
        let {data, totalPrice} = this.state;
        return (
            <View style={styles.container}>
                <CommonHeader title="设置订单金额" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <View style={styles.content_title}>
                        <Text>洗衣费用价格计算（仅供参考）</Text>
                    </View>
                    <View style={styles.content_clothing}>
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <GoodsItem
                                        key={index}
                                        id={item.id}
                                        num={item.num}
                                        name={item.name}
                                        source={item.url}
                                        price={item.price}
                                        onSubCloth={this.onSubCloth.bind(this)}
                                        onAddCloth={this.onAddCloth.bind(this)}
                                    />
                                );
                            })}
                    </View>
                    <View style={styles.content_title}>
                        <Text>备注信息</Text>
                    </View>
                    <View style={styles.content_input}>
                        <TextInput
                            style={styles.message_desc_input}
                            onChangeText={this.onChangeText.bind(this)}
                            autoComplete="off"
                            selectionColor="#fb9bcd"
                            keyboardType="numeric"
                            maxLength={100}
                            placeholder="moving洗衣店为您尽心服务!"
                            placeholderTextColor="#bfbfbf"
                            multiline
                        />
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.footer_left}>
                        <View style={styles.footer_left_content}>
                            <Text style={styles.footer_left_content_text}>
                                预计所需: ￥
                            </Text>
                        </View>
                        <View style={styles.footer_right_content}>
                            <Text style={styles.footer_right_content_text}>
                                {totalPrice}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.footer_right}
                        onPress={this.onSureClothing.bind(this)}>
                        <Text style={styles.footer_right_text}>确定</Text>
                    </TouchableOpacity>
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
        marginBottom: 20,
    },
    message_desc_input: {
        height: 100,
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
        borderTopColor: '#fb9dd0',
        borderTopWidth: 0.5,
    },
    footer_left: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    footer_left_content: {
        width: 82,
        justifyContent: 'center',
    },
    footer_left_content_text: {
        fontSize: 14,
        color: '#333',
    },
    footer_right_content: {
        flex: 1,
        justifyContent: 'center',
    },
    footer_right_content_text: {
        fontSize: 28,
        color: '#fb9dd0',
        fontWeight: '600',
        marginTop: -5,
    },
    footer_right: {
        width: 100,
        height: '100%',
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
