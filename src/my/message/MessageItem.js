/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {label, value, showIcon, isImage, onPress, isSwitch} = this.props;
        return (
            <TouchableOpacity
                style={styles.setting_content_item}
                onPress={onPress}>
                <View style={styles.setting_content_item_left}>
                    <Text style={styles.common_text_style}>{label}</Text>
                </View>
                {isImage ? (
                    <View style={styles.setting_content_item_center}>
                        <Image
                            style={styles.setting_content_item_center_img}
                            source={value}
                        />
                    </View>
                ) : isSwitch ? (
                    <View style={styles.setting_content_item_center}>
                        {value}
                    </View>
                ) : (
                    <View style={styles.setting_content_item_center}>
                        <Text style={styles.common_text_style}>{value}</Text>
                    </View>
                )}
                {showIcon && (
                    <View style={styles.setting_content_item_right}>
                        <Icon
                            style={{
                                width: 20,
                                marginTop: 3,
                                marginRight: 3,
                            }}
                            name="right"
                            size={20}
                            color="#d1d1d1"
                        />
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    common_text_style: {
        fontSize: 16,
        color: '#333',
    },
    setting_content_item: {
        marginHorizontal: 10,
        height: 70,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    setting_content_item_left: {
        width: 100,
        // backgroundColor: 'red',
        justifyContent: 'center',
    },
    setting_content_item_center: {
        flex: 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    setting_content_item_center_img: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    setting_content_item_right: {
        width: 30,
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});
