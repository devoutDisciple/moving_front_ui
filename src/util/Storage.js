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
};
