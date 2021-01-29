import React from 'react';
import Config from '@/config/config';
import NavigationUtil from '@/util/NavigationUtil';
import { Image, ScrollView, Dimensions, Text, StyleSheet, TouchableOpacity, View } from 'react-native';

const windowDetail = Dimensions.get('window');
const screenWidth = windowDetail.width;
const screenHeight = windowDetail.height;

export default class Advertisement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			textArr: ['3 跳过', '2 跳过', '1 跳过', '跳过'],
			text: '3 跳过',
		};
		this.timer = null;
	}

	componentDidMount() {
		this.startTimer();
	}

	componentWillUnmount() {
		this.timer && clearInterval(this.timer);
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
			if (index < 4) {
				this.setState({ text: textArr[index] });
			}
			index++;
		}, 1000);
	}

	getImageSize() {
		Image.getSize(`${Config.baseUrl}/advertisement.png`, (imgWidth, imgHeight) => {
			let pre = imgWidth / screenWidth;
			// eslint-disable-next-line radix
			let height = parseInt(imgHeight / pre);
			this.setState({ height: height });
		});
	}

	goHome() {
		let { navigation } = this.props;
		if (this.timer) {
			clearInterval(this.timer);
		}
		NavigationUtil.reset(navigation, 'HomeScreen');
	}

	render() {
		let { height, text } = this.state;
		let relHeight = screenHeight > height ? screenHeight : height;
		return (
			<View style={styles.content}>
				<TouchableOpacity style={styles.skip} onPress={this.goHome.bind(this)}>
					<Text style={styles.skip_text}>{text}</Text>
				</TouchableOpacity>
				<ScrollView style={{ height: relHeight, backgroundColor: '#fdfdfd' }} showsVerticalScrollIndicator={false}>
					<Image
						style={{ width: screenWidth, height: relHeight }}
						source={{ uri: `${Config.baseUrl}/advertisement.png` }}
						onLoad={this.getImageSize.bind(this)}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	skip: {
		position: 'absolute',
		right: 20,
		top: 70,
		height: 30,
		width: 60,
		zIndex: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#bfbfbf',
		borderRadius: 50,
		opacity: 0.7,
	},
	skip_text: {
		color: '#fff',
		fontSize: 13,
	},
});
