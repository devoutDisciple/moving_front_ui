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
};
