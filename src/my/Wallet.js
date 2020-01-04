/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class Waller extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View>
                <View style={styles.my_wallet}>
                    <TouchableOpacity style={styles.my_wallet_chunk}>
                        <Text style={styles.my_wallet_chunk_top}>3000</Text>
                        <Text style={styles.my_wallet_chunk_bottom}>
                            我的余额
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.my_wallet_chunk}>
                        <Text style={styles.my_wallet_chunk_top}>0</Text>
                        <Text style={styles.my_wallet_chunk_bottom}>
                            优惠券
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.my_member}>
                    <View style={styles.my_member_left}>
                        <View style={styles.my_member_left_icon}>
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('../../img/public/member.png')}
                            />
                        </View>
                        <View style={styles.my_member_left_text}>
                            <Text style={{color: '#fff'}}>Moving 尊贵会员</Text>
                        </View>
                    </View>
                    <View style={styles.my_member_right}>
                        {/* <Text>成为会员</Text> */}
                        <Button
                            icon={
                                <Icon name="right" size={15} color="#b1a082" />
                            }
                            iconRight
                            title="成为会员"
                            buttonStyle={{
                                backgroundColor: '#f8eacf',
                                borderRadius: 10,
                            }}
                            titleStyle={{
                                color: '#333',
                                fontSize: 16,
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    my_wallet: {
        height: 80,
        // backgroundColor: 'red',
        marginTop: 10,
        flexDirection: 'row',
    },
    my_wallet_chunk: {
        width: 100,
        // backgroundColor: 'blue',
        // marginRight: 20,
        alignItems: 'center',
    },
    my_wallet_chunk_top: {
        fontSize: 18,
        maxWidth: 129,
        maxHeight: 20,
        marginVertical: 10,
    },
    my_wallet_chunk_bottom: {
        color: '#bfbfbf',
    },
    my_member: {
        backgroundColor: '#3c3e57',
        height: 50,
        flexDirection: 'row',
        // paddingHorizontal: 20,
        paddingRight: 10,
        alignItems: 'center',
    },
    my_member_left: {
        flex: 1,
        // backgroundColor: 'orange',
        height: 30,
        width: 110,
        paddingHorizontal: 9,
        flexDirection: 'row',
    },
    my_member_left_icon: {
        width: 30,
        justifyContent: 'center',
    },
    my_member_left_text: {
        justifyContent: 'center',
    },
    my_member_right: {
        width: 100,
        // backgroundColor: 'green',
    },
});
