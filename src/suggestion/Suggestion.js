/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Screen from '../util/Screen';
import SugItem from './SugItem';
import CommonHeader from '../component/CommonHeader';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

export default class Suggestion extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <CommonHeader title="意见反馈" navigation={navigation} />
                <ScrollView style={styles.suggest}>
                    <View style={styles.suggest_title}>
                        <Text style={{fontSize: 13, color: '#8a8a8a'}}>
                            请选择您想反馈的问题点
                        </Text>
                    </View>
                    <View style={styles.suggest_content}>
                        <SugItem text="功能异常：功能故障或不可用" active />
                        <SugItem text="产品建议：用的不爽, 我有建议" active />
                        <SugItem text="安全问题：密码, 隐私, 欺诈等" active />
                        <SugItem text="其他问题" active />
                    </View>
                    <View style={styles.suggest_title}>
                        <Text style={{fontSize: 13, color: '#8a8a8a'}}>
                            请补充详细问题和建议
                        </Text>
                    </View>
                    <TextInput
                        maxLength={200}
                        style={styles.suggest_input}
                        multiline
                        placeholder="请描述您使用此软件遇到的问题和意见(200字以内)"
                    />
                </ScrollView>
                <TouchableOpacity style={styles.bottom_btn}>
                    <Text style={styles.bottom_btn_text}>提交</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    suggest: {
        flex: 1,
    },
    suggest_title: {
        height: 30,
        backgroundColor: '#f2f3f7',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    suggest_content: {
        paddingHorizontal: 10,
    },
    suggest_input: {
        height: 150,
        borderColor: '#dbdbdb',
        borderWidth: 0.5,
        marginHorizontal: 10,
        marginVertical: 5,
        textAlignVertical: 'top',
        padding: 5,
    },
    bottom_btn: {
        height: 50,
        width: Screen.width - 40,
        marginLeft: 20,
        backgroundColor: '#fb9dd0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 50,
    },
    bottom_btn_text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '800',
    },
});
