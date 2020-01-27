/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import CommonHeader from '../component/CommonHeader';
import MessageItem from '../my/message/MessageItem';
import Dialog from '../component/Dialog';

export default class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentDidMount() {}

    showInputDialog() {
        this.setState({
            visible: true,
        });
    }

    // 保存的时候
    onSaveValue() {}

    // 弹框确定的时候
    onOkDialog() {
        this.setState({
            visible: false,
        });
    }

    // 弹框取消的时候
    onCancelDialog() {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {navigation} = this.props;
        const {visible} = this.state;
        return (
            <View style={styles.address_container}>
                <CommonHeader title="编辑地址" navigation={navigation} />
                <ScrollView style={styles.address_content}>
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
                    <Button
                        buttonStyle={{
                            backgroundColor: '#fb9bcd',
                            borderRadius: 10,
                            height: 50,
                            marginTop: 20,
                        }}
                        onPress={this.onSaveValue.bind(this)}
                        title="保存"
                    />
                </ScrollView>
                <Dialog
                    visible={visible}
                    title="修改信息"
                    defalutValue="hello"
                    onOk={this.onOkDialog.bind(this)}
                    onCancel={this.onCancelDialog.bind(this)}
                />
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
    address_container: {
        flex: 1,
    },
    address_content: {
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
