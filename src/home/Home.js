/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Swiper from './Swiper';
import Express from './Express';
import IconList from './IconList';
import request from '../util/request';
import Picker from 'react-native-picker';
import Loading from '../component/Loading';
import config from '../config/config';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: false,
            shopList: [],
        };
        this.locationClick = this.locationClick.bind(this);
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
                                color="#fb9dd0"
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
                            color="#fb9dd0"
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

    async componentDidMount() {
        const {setParams} = this.props.navigation;
        // 设置左右按钮的点击功能
        setParams({
            // 左侧按钮点击
            leftIconClick: () => this.locationClick(),
            // 右侧按钮点击
            rightIconClick: () => this.serviceClick(),
        });
        this.setState({loadingVisible: true});
        // 获取所有门店列表
        request
            .get('/shop/all')
            .then(res => {
                this.setState({shopList: res || []});
            })
            .finally(() => {
                this.setState({loadingVisible: false});
            });
    }

    // 位置点击
    locationClick() {
        let {shopList} = this.state;
        console.log(shopList);
        let pickData = [];
        if (Array.isArray(shopList)) {
            shopList.forEach(item => {
                pickData.push(item.name);
            });
        }
        Picker.init({
            ...config.pickCommonConfig,
            pickerData: pickData,
            // selectedValue: ['广州3号洗衣店'],
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
        let {navigation} = this.props;
        let {loadingVisible} = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    {/* 轮播图 */}
                    <Swiper navigation={navigation} />
                    {/* 图标选项 */}
                    <IconList navigation={navigation} />
                    {/* 快递柜子 */}
                    <Express navigation={navigation} />
                </ScrollView>
                <Loading visible={loadingVisible} />
            </View>
        );
    }
}
