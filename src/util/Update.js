import config from '../config/config';
import { Linking, Platform } from 'react-native';

export default {
	updateVersion: async () => {
		let androidUrl = 'https://www.pgyer.com/moving-cleaner';
		let iosUrl = `itms-apps://itunes.apple.com/app/${config.AppStoreId}`;
		if (Platform.OS === 'android') {
			//todo
			Linking.canOpenURL(androidUrl)
				.then(supported => {
					if (supported) {
						Linking.openURL(androidUrl);
					} else {
					}
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			//后面有个APP_ID，
			Linking.canOpenURL(iosUrl)
				.then(supported => {
					if (supported) {
						Linking.openURL(iosUrl);
					} else {
					}
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
};
