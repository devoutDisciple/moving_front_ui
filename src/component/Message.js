import { Alert } from 'react-native';

export default {
	warning: (title, message, callBack) => {
		Alert.alert(
			title,
			message,
			[
				{
					text: '确定',
					onPress: callBack ? callBack : () => {},
				},
			],
			{ cancelable: false },
		);
	},
	confirm: (title, message, callBack) => {
		Alert.alert(
			title,
			message,
			[
				{
					text: '确定',
					onPress: callBack ? callBack : () => {},
				},
				{
					text: '取消',
				},
			],
			{ cancelable: false },
		);
	},
	confirmPay: (title, message, callBack) => {
		Alert.alert(
			title,
			message,
			[
				{
					text: '取消',
				},
				{
					text: '已完成支付',
					onPress: callBack ? callBack : () => {},
				},
			],
			{ cancelable: false },
		);
	},
	forceUpdateVersion: (title, message) => {
		Alert.alert(
			title,
			message,
			[
				{
					text: '更新',
					onPress: () => {
						console.log('强制更新');
					},
				},
			],
			{ cancelable: false },
		);
	},
	softUpdate: (title, message) => {
		Alert.alert(
			title,
			message,
			[
				{
					text: '暂不更新',
				},
				{
					text: '更新',
				},
			],
			{ cancelable: true },
		);
	},
	// 费用支付
	paySelect: (title, message, okFun, cancelFun, complatePay, wechatVisible) => {
		let content = [
			{
				text: '支付宝支付',
				onPress: okFun ? okFun : () => {},
			},
		];
		if (wechatVisible) {
			content.push({
				text: '微信支付',
				onPress: cancelFun ? cancelFun : () => {},
			});
		}
		content.push({
			text: '已完成支付',
			onPress: complatePay ? complatePay : () => {},
		});
		content.push({
			text: '取消',
		});
		return Alert.alert(title, message, content, { cancelable: true });
	},
};
