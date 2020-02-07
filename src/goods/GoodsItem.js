/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

export default class Goods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const {source, name, num, price} = this.props;
        return (
            <View style={styles.content_clothing_item}>
                <Image
                    style={styles.content_clothing_item_img}
                    source={source}
                />
                <View style={styles.content_clothing_item_title}>
                    <Text style={styles.content_clothing_item_title_text}>
                        {name}
                    </Text>
                </View>
                <View style={styles.content_clothing_item_money}>
                    <View style={styles.content_clothing_item_money_left}>
                        <Text style={styles.content_clothing_item_money_text}>
                            ￥ {price}
                        </Text>
                    </View>
                    <View style={styles.content_clothing_item_money_right}>
                        <TouchableOpacity>
                            <Icon
                                style={
                                    styles.content_clothing_item_money_right_icon
                                }
                                name="minuscircleo"
                                size={18}
                                color="#fb9dd0"
                            />
                        </TouchableOpacity>

                        <Text
                            style={
                                styles.content_clothing_item_money_right_num
                            }>
                            {num}
                        </Text>
                        <TouchableOpacity>
                            <Icon
                                style={
                                    styles.content_clothing_item_money_right_icon
                                }
                                name="pluscircleo"
                                size={18}
                                color="#fb9dd0"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
let clothingItemWidth = (width - 20) / 2 - 1;
const styles = StyleSheet.create({
    content_clothing_item: {
        height: clothingItemWidth + 50,
        width: clothingItemWidth,
        borderWidth: 0.5,
        borderColor: '#dbdbdb',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    content_clothing_item_img: {
        width: clothingItemWidth,
        height: clothingItemWidth,
    },
    content_clothing_item_title: {
        justifyContent: 'center',
        // paddingLeft: 5,
        margin: 5,
    },
    content_clothing_item_title_text: {
        fontSize: 12,
        color: '#333',
    },
    content_clothing_item_money: {
        height: 20,
        justifyContent: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    content_clothing_item_money_left: {
        flex: 1,
    },
    content_clothing_item_money_right: {
        width: 85,
        flexDirection: 'row',
    },
    content_clothing_item_money_right_icon: {
        width: 18,
        marginHorizontal: 8,
    },
    content_clothing_item_money_right_num: {
        fontSize: 18,
        marginTop: -3,
    },
    content_clothing_item_money_text: {
        fontSize: 14,
        color: '#8a8a8a',
    },
});
