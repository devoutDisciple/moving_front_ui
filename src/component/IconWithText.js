/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default class IconWithText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {source, text, index, onPress} = this.props;
        if (source) {
            return (
                <TouchableOpacity
                    onPress={onPress}
                    key={index}
                    style={styles.home_icon_item}>
                    <Image style={styles.home_icon_item_img} source={source} />
                    <Text style={styles.home_icon_item_text}>{text}</Text>
                </TouchableOpacity>
            );
        }
        return <View key={index} style={styles.home_icon_item} />;
    }
}

let iconSize = 45;
const styles = StyleSheet.create({
    home_icon_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    home_icon_item_img: {
        height: iconSize,
        width: iconSize,
    },
    home_icon_item_text: {
        marginTop: 10,
        fontSize: 12,
    },
});
