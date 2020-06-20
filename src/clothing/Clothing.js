/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from '../component/Toast';
import config from '../config/config';
import Dialog from '../component/Dialog';
import Picker from 'react-native-picker';
import Loading from '../component/Loading';
// import Toast from 'react-native-root-toast';
import CommonHeader from '../component/CommonHeader';
import MessageItem from '../my/message/MessageItem';

export default class Member extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			dialogVisible: false,
		};
	}

	showDialog() {
		this.setState({ dialogVisible: true });
	}

	onOkDialog() {
		this.setState({ dialogVisible: false });
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
	onSureOrder() {
		this.setState({ loadingVisible: true });
		setTimeout(() => {
			this.setState({ loadingVisible: false });
			Toast.success('下单成功, 正在等待商店接单');
		}, 1000);
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible, dialogVisible } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="预约上门取衣" navigation={navigation} />
				<ScrollView style={styles.content}>
					<MessageItem label="店铺" value="北京店" showIcon onPress={this.showDialog.bind(this, '修改昵称')} />
					<MessageItem label="预约时间" value="2020-02-14 20:20" showIcon onPress={this.showDialog.bind(this, '修改昵称')} />
					<MessageItem label="取货地址" value="广州市" showIcon onPress={this.showDialog.bind(this, '修改昵称')} />
					<MessageItem label="联系人" value="张振" showIcon onPress={this.showDialog.bind(this, '修改昵称')} />
					<MessageItem label="联系方式" value="18210619398" showIcon onPress={this.showDialog.bind(this, '修改昵称')} />
					<MessageItem label="物品数量" value="2" showIcon onPress={this.showDialog.bind(this, '修改昵称')} />
					<MessageItem label="物品重量" value="3 kg" showIcon onPress={this.showWeightPick.bind(this, '修改昵称')} />
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
						title="修改信息"
						changeKey="world"
						defalutValue="hello"
						onOk={this.onOkDialog.bind(this)}
						onCancel={this.onCancelDialog.bind(this)}
					/>
				)}
			</View>
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
