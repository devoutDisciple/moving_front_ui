/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import CommonHeader from '../../component/CommonHeader';

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            value: '',
        };
    }

    componentDidMount() {
        let {navigation} = this.props;
        console.log(navigation.getParam('title'));
        this.inputRef.current.focus();
    }

    onChangeText(text) {
        console.log(text);
        this.setState({value: text});
    }

    // 点击保存的时候
    onSaveValue() {
        console.log(this.state.value, 111);
    }

    render() {
        let {value} = this.state;
        let {navigation} = this.props;
        return (
            <View style={styles.message_edit_container}>
                <CommonHeader
                    title={navigation.getParam('title') || '修改个人信息'}
                    navigation={navigation}
                />
                <View style={styles.message_edit_content}>
                    <TextInput
                        ref={this.inputRef}
                        style={styles.message_edit_input}
                        onChangeText={this.onChangeText.bind(this)}
                        clearButtonMode="always"
                        defaultValue={value}
                        selectionColor="#fb9bcd"
                        // keyboardType="default"
                        maxLength={12}
                        placeholder="请输入"
                        placeholderTextColor="#bfbfbf"
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
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    message_edit_container: {
        flex: 1,
    },
    message_edit_content: {
        flex: 1,
        backgroundColor: '#f2f3f7',
        padding: 10,
    },
    message_edit_input: {
        height: 50,
        // borderColor: 'blue',
        // borderWidth: 1,
        fontSize: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    message_edit_btn: {
        height: 50,
        backgroundColor: 'red',
        marginTop: 20,
        borderRadius: 10,
    },
});
