import StorageUtil from './Storage';
import NavigationUtil from './NavigationUtil';
export default {
	hasUser: async (user, navigation) => {
		if (!user || !user.id || !user.phone) {
			await StorageUtil.multiRemove(['user', 'token']);
			NavigationUtil.reset(navigation, 'LoginScreen');
			return false;
		}
		return true;
	},
};
