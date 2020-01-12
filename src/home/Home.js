/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Swiper from './Swiper';
import IconList from './IconList';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation, navigationOptions}) => {
        // 自定义左右菜单
        return {
            headerTitle: 'moving',
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.state.params.leftIconClick()}>
                        <View
                            style={{
                                width: 150,
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon
                                style={{width: 20, marginTop: 3}}
                                name="enviromento"
                                size={16}
                                color="#79d9c5"
                            />
                            <Text style={{flex: 1, marginTop: 2}}>
                                太行山洗衣店
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            },
            headerLeftContainerStyle: {
                padding: 10,
            },
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.state.params.rightIconClick()
                        }>
                        <Icon
                            style={{width: 20, marginTop: 3}}
                            name="aliwangwang-o1"
                            size={16}
                            color="#333"
                        />
                    </TouchableOpacity>
                );
            },
            headerRightContainerStyle: {
                padding: 10,
            },
            headerBackTitle: '返回',
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },
            // 整个标题的样式
            headerStyle: {
                shadowColor: '#505050',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.3,
            },
        };
    };

    componentDidMount() {
        const {setParams} = this.props.navigation;
        setParams({
            // 左侧按钮点击
            leftIconClick: () => this.locationClick(),
            // 右侧按钮点击
            rightIconClick: () => this.serviceClick(),
        });
    }

    // 位置点击
    locationClick() {
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push(`广州${i}号洗衣店`);
        }
        Picker.init({
            pickerData: data,
            selectedValue: ['广州3号洗衣店'],
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerTitleText: '选择店铺',
            pickerConfirmBtnColor: [84, 185, 116, 1],
            pickerCancelBtnColor: [196, 199, 206, 1],
            pickerTitleColor: [84, 185, 116, 1],
            onPickerConfirm: res => {
                console.log(res);
            },
            onPickerCancel: res => {
                console.log(res);
            },
            onPickerSelect: res => {
                console.log(res);
            },
        });
        Picker.show();
    }

    // 点击客服按钮
    serviceClick() {
        console.log('点击客服按钮');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Swiper />
                <IconList />
            </View>
        );
    }
}
