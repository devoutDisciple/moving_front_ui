/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let {source, acitveSource, title, desc, active, id} = this.props;
        return (
            <TouchableOpacity
                onPress={this.props.onPress.bind(this, id)}
                style={
                    active
                        ? styles.cabinet_item_content_chunk_active
                        : styles.cabinet_item_content_chunk
                }>
                <View style={styles.cabinet_item_content_chunk_img_content}>
                    <Image
                        style={styles.cabinet_item_content_chunk_img}
                        source={active ? acitveSource : source}
                    />
                </View>
                <View style={styles.cabinet_item_content_chunk_title}>
                    <Text
                        style={
                            active
                                ? styles.cabinet_item_content_chunk_title_text_active
                                : styles.cabinet_item_content_chunk_title_text
                        }>
                        {title}
                    </Text>
                </View>
                <View style={styles.cabinet_item_content_chunk_desc}>
                    <Text
                        style={
                            active
                                ? styles.cabinet_item_content_chunk_desc_text_active
                                : styles.cabinet_item_content_chunk_desc_text
                        }>
                        {desc}
                    </Text>
                </View>
                {active ? (
                    <View style={styles.cabinet_item_content_chunk_icon}>
                        <Icon
                            style={
                                styles.content_clothing_item_money_right_icon
                            }
                            name="checkcircleo"
                            size={24}
                            color="#fb9dd0"
                        />
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    }
}

let itemHeight = (width - 60) / 3;
const styles = StyleSheet.create({
    cabinet_item_content_chunk: {
        width: itemHeight,
        height: itemHeight,
        marginRight: 10,
        position: 'relative',
    },
    cabinet_item_content_chunk_active: {
        borderWidth: 0.5,
        borderColor: '#fb9dd0',
        width: itemHeight,
        height: itemHeight,
        marginRight: 10,
        position: 'relative',
    },
    cabinet_item_content_chunk_icon: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    cabinet_item_content_chunk_img_content: {
        height: itemHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cabinet_item_content_chunk_img: {
        height: itemHeight / 2,
        width: itemHeight / 2,
    },
    cabinet_item_content_chunk_title: {
        justifyContent: 'center',
        minHeight: itemHeight / 4,
        alignItems: 'center',
    },
    cabinet_item_content_chunk_title_text: {
        fontSize: 16,
        fontWeight: '800',
        color: '#333',
    },
    cabinet_item_content_chunk_title_text_active: {
        fontSize: 16,
        fontWeight: '800',
        color: '#fb9dd0',
    },
    cabinet_item_content_chunk_desc: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cabinet_item_content_chunk_desc_text: {
        fontSize: 12,
        color: '#8a8a8a',
    },
    cabinet_item_content_chunk_desc_text_active: {
        fontSize: 12,
        fontWeight: '800',
        color: '#fb9dd0',
    },
});
