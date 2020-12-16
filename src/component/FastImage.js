import React, { Component } from 'react';
// import FastImage from 'react-native-fast-image';
import { Image } from 'react-native';

export default class SwiperComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { style, source } = this.props;
		return <Image style={style} source={source} />;
	}
}
