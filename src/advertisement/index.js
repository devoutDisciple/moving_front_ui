/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Config from '../config/config';
import FastImage from '../component/FastImage';
import NavigationUtil from '../util/NavigationUtil';
import { Image, View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Advertisement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
		};
	}

	componentDidMount() {
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
		console.log(`${Config.baseUrl}/advertisement.jpg`);
		let { height } = this.state;
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<FastImage
					style={{ width: screenWidth, height: height }}
					source={{
						uri: `${Config.baseUrl}/advertisement.jpg`,
					}}
				/>
				<TouchableOpacity style={styles.skip} onPress={this.goHome.bind(this)}>
					<Text style={styles.skip_text}>跳过</Text>
				</TouchableOpacity>
			</View>
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
