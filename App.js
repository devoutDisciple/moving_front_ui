/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { PixelRatio, Text, TextInput } from 'react-native';
import RouterConfig from './src/router/RouterConfig';

export default class App extends React.Component {
	componentDidMount() {
		console.log('PixelRatio.get----', PixelRatio.get());
		console.log('PixelRatio.getFontScale----', PixelRatio.getFontScale());
		PixelRatio.roundToNearestPixel(0.82);
		TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { allowFontScaling: false }); // 新版RN使用该方法替代
		Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false });
	}
	render() {
		return <RouterConfig />;
	}
}
