/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Image, View, Text, StatusBar} from 'react-native';
import RootConfig from './NavigatorFirst';
import TabNav from './TabNav';

export default class App extends React.Component {
    componentDidMount() {
        let obj = {hello: 'world'};
        console.log(123);
        console.log(obj);
    }
    render() {
        // return <RootConfig />;
        return <TabNav />;
    }
}
