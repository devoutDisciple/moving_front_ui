/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import CommonHeader from '../../component/CommonHeader';
import CabinetItem from './CabinetItem';
const {width} = Dimensions.get('window');

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'little',
        };
    }

    componentDidMount() {}

    onPress(id) {
        console.log(id);
        this.setState({active: id});
    }

    render() {
        const {navigation} = this.props;
        let {active} = this.state;
        const expressList = [
            {
                id: 'little',
                title: '小格口',
                desc: '限重一公斤',
                normalImg: require('../../../img/public/express_little.png'),
                activeImg: require('../../../img/public/express_little_active.png'),
            },
            {
                id: 'middle',
                title: '中格口',
                desc: '限重三公斤',
                normalImg: require('../../../img/public/express_middle.png'),
                activeImg: require('../../../img/public/express_middle_acitve.png'),
            },
            {
                id: 'big',
                title: '大格口',
                desc: '限重五公斤',
                normalImg: require('../../../img/public/express_big.png'),
                activeImg: require('../../../img/public/express_big_active.png'),
            },
        ];
        return (
            <View style={{flex: 1}}>
                <CommonHeader title="选择快递柜" navigation={navigation} />
                <ScrollView style={styles.cabinet}>
                    <View style={styles.cabinet_item}>
                        <View style={styles.detail_common_title}>
                            <Text>幸福家园北门一号柜</Text>
                        </View>
                        <View style={styles.cabinet_item_content}>
                            {expressList.map((item, index) => {
                                return (
                                    <CabinetItem
                                        key={index}
                                        id={item.id}
                                        onPress={this.onPress.bind(this)}
                                        title={item.title}
                                        active={active === item.id}
                                        source={item.normalImg}
                                        acitveSource={item.activeImg}
                                        desc={item.desc}
                                    />
                                );
                            })}
                        </View>
                    </View>
                    <View style={styles.cabinet_item}>
                        <View style={styles.detail_common_title}>
                            <Text>幸福家园北门二号柜</Text>
                        </View>
                        <View style={styles.cabinet_item_content}>
                            {expressList.map((item, index) => {
                                return (
                                    <CabinetItem
                                        key={index}
                                        id={item.id}
                                        onPress={this.onPress.bind(this)}
                                        title={item.title}
                                        active={active === item.id}
                                        source={item.normalImg}
                                        acitveSource={item.activeImg}
                                        desc={item.desc}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.cabinet_item_bottom}>
                    <Text style={styles.cabinet_item_bottom_text}>
                        打开柜子
                    </Text>
                </View>
            </View>
        );
    }
}

let itemHeight = (width - 60) / 3;
const styles = StyleSheet.create({
    cabinet: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    detail_common_title: {
        height: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        borderLeftColor: '#fb9dd0',
        borderLeftWidth: 3,
        marginBottom: 10,
    },
    cabinet_item: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#dbdbdb',
        marginBottom: 10,
    },
    cabinet_item_content: {
        flexDirection: 'row',
        height: itemHeight,
    },
    cabinet_item_bottom: {
        height: 50,
        backgroundColor: '#fb9dd0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cabinet_item_bottom_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
    },
});
