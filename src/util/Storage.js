import AsyncStorage from '@react-native-community/async-storage';
export default {
	set: async (key, data) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(data));
		} catch (e) {
			console.log(e);
		}
	},
	get: async key => {
		try {
			let value = await AsyncStorage.getItem(key);
			value = JSON.parse(value);
			return value;
		} catch (e) {
			console.log(e);
		}
	},
	setString: async (key, data) => {
		try {
			await AsyncStorage.setItem(key, data);
		} catch (e) {
			console.log(e);
		}
	},
	getString: async key => {
		try {
			let value = await AsyncStorage.getItem(key);
			return value || '';
		} catch (e) {
			console.log(e);
		}
	},
	remove: async key => {
		try {
			await AsyncStorage.removeItem(key);
		} catch (e) {
			console.log(e);
		}
	},
	clear: async () => {
		try {
			await AsyncStorage.clear();
		} catch (e) {
			console.log(e);
		}
	},
	getAllKeys: async () => {
		try {
			let res = await AsyncStorage.getAllKeys();
			return res;
		} catch (e) {
			console.log(e);
		}
	},
	multiGet: async keys => {
		try {
			let res = await AsyncStorage.multiGet(keys);
			return res;
		} catch (e) {
			console.log(e);
		}
	},
	multiRemove: async keys => {
		try {
			await AsyncStorage.multiRemove(keys);
		} catch (e) {
			console.log(e);
		}
	},
};
