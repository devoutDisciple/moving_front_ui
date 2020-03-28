/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CommonSylte from '../style/common';
import {Button} from 'react-native-elements';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class Express extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expressList: [
                {
                    title: '西溪水岸小区北门一号丰巢柜子',
                    imgUrl: require('../../img/public/3-express.jpg'),
                },
                {
                    title: '西溪水岸小区北门二号丰巢柜子',
                    imgUrl: require('../../img/public/2-express.jpg'),
                },
            ],
        };
    }

    componentDidMount() {}

    // 存放衣物
    putClothing() {
        this.props.navigation.navigate('GoodsScreen');
    }

    render() {
        let {expressList} = this.state;
        return (
            <View style={styles.home_express}>
                {/* <View style={styles.home_express_title}>
                    <Text style={styles.home_express_title_text}>
                        moving 收衣柜
                    </Text>
                </View> */}
                <View style={styles.detail_common_title}>
                    <Text style={{fontSize: 16, color: '#333'}}>
                        MOVING 收衣柜
                    </Text>
                </View>
                {expressList.map((item, index) => {
                    return (
                        <View style={styles.home_express_item} key={index}>
                            <View style={styles.home_express_item_left}>
                                <Image
                                    style={styles.home_express_item_left_img}
                                    source={item.imgUrl}
                                />
                            </View>
                            <View style={styles.home_express_item_right}>
                                <View
                                    style={
                                        styles.home_express_item_right_title
                                    }>
                                    <Text>{item.title}</Text>
                                </View>
                                <View
                                    style={
                                        styles.home_express_item_right_bottom
                                    }>
                                    <Button
                                        buttonStyle={{
                                            backgroundColor: '#fb9dd0',
                                            paddingVertical: 7,
                                            paddingHorizontal: 10,
                                            borderRadius: 6,
                                        }}
                                        titleStyle={{
                                            fontSize: 14,
                                        }}
                                        title="存放衣物"
                                        onPress={this.putClothing.bind(this)}
                                    />
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    detail_common_title: CommonSylte.detail_common_title,
    home_express: {
        flex: 1,
        margin: 10,
    },
    home_express_title: {
        height: 50,
        justifyContent: 'center',
    },
    home_express_title_text: {
        fontSize: 18,
        color: '#333',
    },
    home_express_item: {
        height: 120,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
    },
    home_express_item_left: {
        width: 100,
        shadowColor: '#505050',
        shadowOffset: {
            width: 10,
            height: 5,
        },
    },
    home_express_item_left_img: {
        width: '100%',
        height: '100%',
    },
    home_express_item_right: {
        flex: 1,
        marginLeft: 10,
    },
    home_express_item_right_title: {
        height: 60,
    },
    home_express_item_right_bottom: {
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});
