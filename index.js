/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import * as WeChat from 'react-native-wechat-lib';
import App from './App';

WeChat.registerApp('wxcf235c09083c777a', 'https://applinks:www.example.com/'); // appid

console.disableYellowBox = true;
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
// if (__DEV__) {
//     NativeModules.DevSettings.setIsDebuggingRemotely(true);
// }
global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.XMLHttpRequest;
global.FormData = global.originalFormData ? global.originalFormData : global.FormData;

if (window.__FETCH_SUPPORT__) {
	// it's RNDebugger only to have
	window.__FETCH_SUPPORT__.blob = false;
} else {
	/*
	 * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
	 * If you're using another way you can just use the native Blob and remove the `else` statement
	 */
	global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
	global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader;
}

AppRegistry.registerComponent(appName, () => App);
