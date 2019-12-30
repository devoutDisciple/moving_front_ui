/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Swiper from './Swiper';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({navigation, navigationOptions}) => {
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
                                color="#333"
                            />
                            <Text style={{flex: 1, marginTop: 2}}>
                                广州一号洗衣店
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
        console.log('切换位置');
    }

    // 点击客服按钮
    serviceClick() {
        console.log('点击客服按钮');
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}>
                {/* <Text>这是主页</Text> */}
                <Swiper />
            </View>
        );
    }
}

export default HomeScreen;
