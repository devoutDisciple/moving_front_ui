/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import Config from '../config/config';
import config from '../config/config';
import Toast from '../component/Toast';
import Dialog from '../component/Dialog';
import Picker from 'react-native-picker';
import RequestUtil from '../util/Request';
import Loading from '../component/Loading';
import { getDayHours } from '../util/Util';
import StorageUtil from '../util/Storage';
import message from '../component/Message';
import ClothingItem from './ClothingItem';
import CommonHeader from '../component/CommonHeader';
import SafeViewComponent from '../component/SafeViewComponent';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const timeFormat = 'YYYY-MM-DD';
export default class Member extends React.Component {
	constructor(props) {
		super(props);
		let tomorrow = moment()
			.add(1, 'days')
			.format(timeFormat);
		this.state = {
			loadingVisible: false,
			dialogVisible: false,
			addressList: [],
			changeKey: '',
			defalutValue: '',
			placeHolder: '',
			selectDay: `${tomorrow}(明天)`,
			selectTime: '09:00',
			selectAddress: '',
			username: '',
			phone: '',
			house: '',
			desc: '',
		};
	}

	async componentDidMount() {
		await this.onSearchArea();
	}

	// 查询该商店的配送区域
	async onSearchArea() {
		let result = await RequestUtil.get('/area/getAll');
		let areas = result.data || [];
		let addressList = await this.filterArea(areas, [], 0);
		this.setState({ addressList: addressList });
	}

	// 筛选区域条件
	filterArea(area, arr, parentid) {
		let obj = {},
			flag = 0;
		area.map(item => {
			if ((item.level === 1 || item.level === 2) && item.parentid === parentid) {
				let tempObj = {};
				flag = 0;
				tempObj[item.name] = [];
				this.filterArea(area, tempObj[item.name], item.id);
				arr.push(tempObj);
			}
			if (item.level === 3 && item.parentid === parentid) {
				arr.push(item.name);
			}
		});
		flag === 1 && arr.push(obj);
		return arr;
	}

	// 选择时间
	showTimeSelect() {
		let pickData = [],
			hourList = getDayHours(),
			{ selectDay, selectTime } = this.state;
		let today = moment().format(timeFormat);
		let tomorrow = moment()
			.add(1, 'days')
			.format(timeFormat);
		let twoTomorrow = moment()
			.add(2, 'days')
			.format(timeFormat);
		pickData = [[`${today}(今天)`, `${tomorrow}(明天)`, `${twoTomorrow}(后天)`], hourList];
		Picker.init({
			...Config.pickCommonConfig,
			pickerData: pickData,
			selectedValue: [selectDay, selectTime],
			onPickerConfirm: res => {
				let day = res[0],
					hour = res[1];
				this.setState({ selectDay: day, selectTime: hour });
			},
		});
		Picker.show();
	}

	// 点击选择地址
	onSelectAddress() {
		let { addressList } = this.state;
		Picker.init({
			...config.pickCommonConfig,
			pickerData: addressList,
			onPickerConfirm: async res => {
				let area = res.join(' ');
				this.setState({ selectAddress: area });
			},
		});
		Picker.show();
	}

	// 弹框确定的时候
	onOkDialog(key, value) {
		let params = {};
		params[key] = value;
		this.setState(Object.assign(params, { dialogVisible: false }));
	}

	onCancelDialog() {
		this.setState({ dialogVisible: false });
	}

	showWeightPick() {
		Picker.init({
			...config.pickCommonConfig,
			pickerData: ['1 kg', '2 kg', '3 kg', '4 kg', '5 kg', '6 kg', '7 kg', '8 kg', '9 kg', '10 kg'],
			selectedValue: [25],
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

	// 确认订单
	async onSureOrder() {
		let shop = await StorageUtil.get('shop');
		let user = await StorageUtil.get('user');
		let { navigation } = this.props;
		let { selectDay, selectTime, selectAddress, username, phone, house, desc } = this.state;
		if (!selectAddress || !username || !phone || !house) {
			return Toast.warning('请完善预约信息');
		}
		// 手机号不通过
		if (!/^1[3456789]\d{9}$/.test(phone)) {
			return message.warning('提示', '请输入正确的手机号码');
		}
		let day = selectDay.split('(')[0];
		let params = {
			userid: user.id,
			shopid: shop.id,
			home_time: `${day} ${selectTime}:00`,
			home_address: `${selectAddress} ${house}`,
			home_username: username,
			home_phone: phone,
			desc,
		};
		// let result = await RequestUtil.post('/order/addByHome', params);
		// if (result.data === 'success') {
		// NavigationUtil.reset(navigation, 'HomeScreen');
		// }
		navigation.navigate('PayOrderScreen', { type: 'clothing', money: 9.9, ...params });
	}

	render() {
		const { navigation } = this.props;
		let {
			loadingVisible,
			dialogVisible,
			changeKey,
			defalutValue,
			title,
			selectDay,
			selectTime,
			selectAddress,
			username,
			phone,
			house,
			placeHolder,
			desc,
		} = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="预约上门取衣" navigation={navigation} />
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						<ClothingItem
							label="预约时间"
							value={`${selectDay} ${selectTime}`}
							showIcon
							onPress={this.showTimeSelect.bind(this)}
						/>
						<ClothingItem
							label="联系人"
							value={username || '请输入'}
							showIcon
							onPress={() => {
								this.setState({ changeKey: 'username', title: '联系人', defalutValue: '', placeHolder: '' }, () => {
									this.setState({ dialogVisible: true });
								});
							}}
						/>
						<ClothingItem
							label="手机号"
							value={phone || '请输入'}
							showIcon
							onPress={() => {
								this.setState({ changeKey: 'phone', title: '手机号', defalutValue: '', placeHolder: '' }, () => {
									this.setState({ dialogVisible: true });
								});
							}}
						/>
						<ClothingItem label="物品重量" value="2 kg" showIcon onPress={this.showWeightPick.bind(this, '修改昵称')} />
						<ClothingItem
							label="取货地址"
							value={selectAddress || '请选择'}
							showIcon
							onPress={this.onSelectAddress.bind(this)}
						/>
						<ClothingItem
							showIcon
							label="小区地址"
							value={house || '请输入'}
							onPress={() => {
								this.setState(
									{ changeKey: 'house', title: '小区地址', defalutValue: '', placeHolder: '请输入xx小区xx幢' },
									() => {
										this.setState({ dialogVisible: true });
									},
								);
							}}
						/>
						<ClothingItem
							showIcon
							label="备注"
							value={desc || '请输入'}
							onPress={() => {
								this.setState({ changeKey: 'desc', title: '备注', defalutValue: '', placeHolder: '' }, () => {
									this.setState({ dialogVisible: true });
								});
							}}
						/>
					</ScrollView>
					<TouchableOpacity onPress={this.onSureOrder.bind(this)} style={styles.bottom}>
						<Text
							style={{
								color: '#fff',
								fontSize: 20,
								fontWeight: '800',
							}}
						>
							确认订单
						</Text>
					</TouchableOpacity>
					<Loading visible={loadingVisible} />
					{dialogVisible && (
						<Dialog
							visible={dialogVisible}
							title={title}
							changeKey={changeKey}
							placeHolder={placeHolder}
							defalutValue={defalutValue}
							onOk={this.onOkDialog.bind(this)}
							onCancel={this.onCancelDialog.bind(this)}
						/>
					)}
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
	},
	content_item: {
		height: 50,
		backgroundColor: 'red',
		flexDirection: 'row',
	},
	content_item_left: {
		width: 80,
		backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'center',
	},

	footer: {
		// marginHorizontal: 10,
		height: 50,
		backgroundColor: '#f8c5d8',
		flexDirection: 'row',
	},
	footer_left: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 20,
	},
	footer_left_text: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '800',
	},
	footer_right: {
		width: 100,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottom: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: '#fb9dd0',
	},
});
