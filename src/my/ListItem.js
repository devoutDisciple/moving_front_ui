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
        let {iconName, text, onPress} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.my_list_item}>
                    <View style={styles.my_list_item_icon}>
                        <Icon name={iconName || ''} size={16} color="#79d9c5" />
                    </View>
                    <View style={styles.my_list_item_desc}>
                        <Text style={{fontSize: 15, color: '#333'}}>
                            {text}
                        </Text>
                    </View>
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
        // backgroundColor: 'red',
        // marginVertical: 20,
        height: 60,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    my_list_item_icon: {
        width: 30,
        // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    my_list_item_desc: {
        flex: 1,
        justifyContent: 'center',
    },
});
