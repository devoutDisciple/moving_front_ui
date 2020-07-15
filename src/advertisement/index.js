/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Config from '../config/config';
import FastImage from '../component/FastImage';
import NavigationUtil from '../util/NavigationUtil';
import SafeViewComponent from '../component/SafeViewComponent';
import { Image, View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Advertisement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			textArr: ['3s', '2s', '1s', '跳过'],
			text: '3s',
		};
	}

	componentDidMount() {
		this.getImageSize();
		this.startTimer();
	}

	// 开启定时器
	startTimer() {
		let index = 0,
			{ textArr } = this.state,
			{ navigation } = this.props;
		this.timer = setInterval(() => {
			if (index === 4) {
				clearInterval(this.timer);
				return NavigationUtil.reset(navigation, 'HomeScreen');
			}
			this.setState({ text: textArr[index] });
			index++;
		}, 1000);
	}

	componentWillUnmount() {
		this.timer && clearInterval(this.timer);
	}

	getImageSize() {
		Image.getSize(`${Config.baseUrl}/advertisement.jpg`, (imgWidth, imgHeight) => {
			let pre = imgWidth / screenWidth;
			// eslint-disable-next-line radix
			let height = parseInt(imgHeight / pre);
			this.setState({ height: height });
		});
	}

	goHome() {
		let { navigation } = this.props;
		NavigationUtil.reset(navigation, 'HomeScreen');
	}

	render() {
		let { height, text } = this.state;
		return (
			<SafeViewComponent>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#fdfdfd',
					}}
				>
					<FastImage
						style={{ width: screenWidth, height: height }}
						source={{
							uri: `${Config.baseUrl}/advertisement.jpg`,
						}}
					/>
					<TouchableOpacity style={styles.skip} onPress={this.goHome.bind(this)}>
						<Text style={styles.skip_text}>{text}</Text>
					</TouchableOpacity>
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	skip: {
		position: 'absolute',
		right: 20,
		top: 70,
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fb9dd0',
		borderRadius: 100,
	},
	skip_text: {
		color: '#fff',
		fontSize: 13,
	},
});
