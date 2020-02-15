import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const {width} = Dimensions.get('window');

export const baseColor = {
    fontColor: '#fb9dd0',
    shadowColor: '#7e7e7e',
    heightColor: '#fb9dd0',
    disableColor: '#fbc9e4',
};

export const commonInputParams = {
    style: {
        backgroundColor: '#fff',
        width: width - 60,
        marginLeft: 20,
        borderColor: '#fff',
        borderBottomColor: '#f7f7f7',
        borderWidth: 1,
    },
    label: '请输入手机号',
    iconClass: Icon,
    // 图标的颜色
    iconColor: baseColor.fontColor,
    // label的颜色
    labelStyle: {
        color: '#cacaca',
        paddingLeft: 5,
        marginLeft: -15,
    },
    // input里面的字体颜色
    inputStyle: {color: '#333', paddingTop: 5, paddingLeft: 0},
    labelContainerStyle: {paddingTop: 10, paddingLeft: 4},
    iconContainerStyle: {paddingTop: 20, marginLeft: -10},
};
