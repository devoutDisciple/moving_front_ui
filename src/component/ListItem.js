/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class Waller extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let {iconName, text, onPress, withBorder, otherText} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View
                    style={
                        withBorder
                            ? styles.my_list_item_with_border
                            : styles.my_list_item
                    }>
                    {iconName ? (
                        <View style={styles.my_list_item_icon}>
                            <Icon name={iconName} size={16} color="#fb9dd0" />
                        </View>
                    ) : null}
                    <View style={styles.my_list_item_desc}>
                        <Text style={{fontSize: 16, color: '#3f3f3f'}}>
                            {text}
                        </Text>
                    </View>
                    {otherText ? (
                        <View style={styles.my_list_item_other}>
                            <Text style={{fontSize: 13, color: '#434343'}}>
                                {otherText}
                            </Text>
                        </View>
                    ) : null}
                    <View style={styles.my_list_item_icon}>
                        <Icon name="right" size={16} color="#b1a082" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    my_list_item: {
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    my_list_item_with_border: {
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 0.5,
    },
    my_list_item_icon: {
        width: 18,
        justifyContent: 'center',
    },
    my_list_item_desc: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    my_list_item_other: {
        width: 70,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
    },
});
