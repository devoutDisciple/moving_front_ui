/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import RouterConfig from './src/roter/RouterConfig';
import * as WeChat from 'react-native-wechat';
WeChat.registerApp('zhangzhen941025@icloud.com');

export default class App extends React.Component {
	render() {
		return <RouterConfig />;
	}
}
