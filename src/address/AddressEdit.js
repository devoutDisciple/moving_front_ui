/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import CommonHeader from '../component/CommonHeader';
import MessageItem from '../my/message/MessageItem';

export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // radio选择的时候
    selectRadio(index) {}

    showInputDialog() {}

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="编辑地址" navigation={navigation} />
                <ScrollView style={styles.content}>
                    <MessageItem
                        label="姓名"
                        value="张振"
                        showIcon
                        onPress={this.showInputDialog.bind(this, '修改姓名')}
                    />
                    <MessageItem
                        label="性别"
                        value={
                            <View style={styles.sex_container}>
                                <TouchableOpacity>
                                    <Text style={styles.sex_item_active}>
                                        男
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.sex_item_normal}>
                                        女
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                        isSwitch
                    />
                    <MessageItem
                        label="手机号"
                        value="18210619398"
                        showIcon
                        onPress={this.showInputDialog.bind(this)}
                    />
                    <MessageItem
                        label="送货地址"
                        value="西溪水岸花苑2333号"
                        showIcon
                        onPress={this.showInputDialog.bind(this, '修改地址')}
                    />
                </ScrollView>
            </View>
        );
    }
}

const sex_common = {
    marginLeft: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 13,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        margin: 10,
    },
    sex_container: {
        flexDirection: 'row',
    },
    sex_item_active: {
        ...sex_common,
        borderColor: '#fb9cce',
        color: '#fb9cce',
    },
    sex_item_normal: {
        ...sex_common,
        borderColor: '#e5e5e5',
        color: '#333',
    },
});
