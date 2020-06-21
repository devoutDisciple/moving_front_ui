import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';

export default class SwiperComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { style, source } = this.props;
		return <FastImage style={style} source={source} />;
	}
}
