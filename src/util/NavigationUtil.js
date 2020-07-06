const { exp } = require('react-native-reanimated');

import { NavigationActions, StackActions } from 'react-navigation';
export default {
	reset: (navigation, screenName, index = 0) => {
		const resetAction = StackActions.reset({
			index: index,
			actions: [NavigationActions.navigate({ routeName: screenName })],
		});
		navigation.dispatch(resetAction);
	},
};
