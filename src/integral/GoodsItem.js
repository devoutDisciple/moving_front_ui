/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Dimensions, Image} from 'react-native';

const {width} = Dimensions.get('window');

export default class Intergral extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {source, title, num} = this.props;
        return (
            <View style={styles.intergrals_content_item}>
                <Image
                    style={styles.intergrals_content_item_img}
                    source={source}
                />
                <View style={styles.intergrals_content_item_title}>
                    <Text style={styles.intergrals_content_item_title_text}>
                        {title}
                    </Text>
                </View>
                <View style={styles.intergrals_content_item_buy}>
                    <View style={styles.intergrals_content_item_buy_left}>
                        <Text
                            style={
                                styles.intergrals_content_item_buy_left_text
                            }>
                            {num}
                        </Text>
                    </View>
                    <View style={styles.intergrals_content_item_buy_right}>
                        <Text
                            style={
                                styles.intergrals_content_item_buy_right_text
                            }>
                            兑换
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

let itemWidth = (width - 23) / 2;
const styles = StyleSheet.create({
    intergrals_content_item: {
        width: itemWidth,
        height: itemWidth + 80,
        borderWidth: 0.5,
        borderColor: '#cdcdcd',
        margin: 5,
        marginTop: 0,
        marginRight: 0,
    },
    intergrals_content_item_img: {
        width: itemWidth,
        height: itemWidth,
    },
    intergrals_content_item_title: {
        height: 30,
        paddingHorizontal: 5,
        justifyContent: 'center',
    },
    intergrals_content_item_title_text: {
        fontSize: 12,
        color: '#333',
    },
    intergrals_content_item_buy: {
        paddingHorizontal: 5,
        marginVertical: 10,
        height: 30,
        flexDirection: 'row',
    },
    intergrals_content_item_buy_left: {
        flex: 1,
        justifyContent: 'center',
    },
    intergrals_content_item_buy_left_text: {
        fontSize: 12,
        color: '#cdcdcd',
    },
    intergrals_content_item_buy_right: {
        width: 60,
        backgroundColor: '#fb9dd0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    intergrals_content_item_buy_right_text: {
        fontSize: 12,
        color: '#fff',
    },
});
