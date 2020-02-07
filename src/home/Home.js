/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Swiper from './Swiper';
import Express from './Express';
import IconList from './IconList';
import request from '../util/request';
import config from '../config/config';
import Storage from '../util/Storage';
import Toast from '../component/Toast';
import Picker from 'react-native-picker';
import Loading from '../component/Loading';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, View, TouchableOpacity, ScrollView, Linking} from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingVisible: false,
            shopList: [],
            shopId: 1,
            swiperList: [],
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
                                {navigation.state.params &&
                                navigation.state.params.title
                                    ? navigation.state.params.title
                                    : ''}
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
        await this.setState({loadingVisible: true});
        // 获取所有门店列表
        request
            .get('/shop/all')
            .then(async res => {
                let shop = await Storage.get('shop');
                // 如果没有缓存过商店
                if (!shop) {
                    shop = (res && res[0]) || {};
                    // 保存设置的商店
                    await Storage.set('shop', JSON.stringify(shop));
                }
                shop = JSON.parse(shop);
                this.setState({shopList: res || [], shopId: shop.id}, () => {
                    let {navigation} = this.props;
                    this.getSwiperList();
                    navigation.navigate('HomeScreen', {
                        title: shop.name || '',
                    });
                });
            })
            .finally(() => {
                this.setState({loadingVisible: false});
            });
    }

    async getSwiperList() {
        let shop = await Storage.get('shop');
        shop = JSON.parse(shop);
        // 获取当前门店的轮播图列表
        let swiperList = await request.get('/swiper/getAllById', {id: shop.id});
        this.setState({swiperList: swiperList || []});
    }

    async clear() {
        await Storage.clear();
    }

    // 位置点击
    locationClick() {
        let {shopList} = this.state,
            {navigation} = this.props,
            pickData = [];
        if (Array.isArray(shopList)) {
            shopList.forEach(item => {
                pickData.push(item.name);
            });
        }
        Picker.init({
            ...config.pickCommonConfig,
            pickerData: pickData,
            // selectedValue: ['广州3号洗衣店'],
            onPickerConfirm: async res => {
                let name = res[0];
                let selectShop = {};
                shopList.forEach(item => {
                    if (name === item.name) {
                        selectShop = item;
                    }
                });
                this.setState({shopId: selectShop.id}, async () => {
                    await Storage.set('shop', JSON.stringify(selectShop));
                    this.getSwiperList();
                    navigation.navigate('HomeScreen', {
                        title: name || '',
                    });
                });
            },
        });
        Picker.show();
    }

    // 点击客服按钮
    serviceClick() {
        let tel = 'tel:1008611'; // 目标电话
        Linking.canOpenURL(tel)
            .then(supported => {
                if (!supported) {
                    Toast.warning('用户手机号', '110');
                } else {
                    return Linking.openURL(tel);
                }
            })
            .catch(error => console.log('tel error', error));
    }

    render() {
        let {navigation} = this.props;
        let {loadingVisible, swiperList} = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    {/* 轮播图 */}
                    <Swiper navigation={navigation} swiperList={swiperList} />
                    {/* 图标选项 */}
                    <IconList navigation={navigation} />
                    {/* 快递柜子 */}
                    <Express navigation={navigation} />
                    {/* <TouchableOpacity onPress={this.clear.bind(this)}>
                        <Text>清除缓存</Text>
                    </TouchableOpacity> */}
                </ScrollView>
                <Loading visible={loadingVisible} />
            </View>
        );
    }
}
