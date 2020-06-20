/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.defalutValue || '',
			changeKey: props.changeKey || '',
		};
	}

	componentDidMount() {}

	onChangeText(value) {
		this.setState({ value });
	}

	render() {
		let { title, placeHolder } = this.props,
			{ changeKey, value } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.content_title}>
						<Text
							style={{
								color: '#333',
								fontSize: 16,
								fontWeight: '700',
							}}
						>
							{title}
						</Text>
					</View>
					<View style={styles.content_desc}>
						<TextInput
							maxLength={20}
							defaultValue={value}
							selectionColor="#fb9bcd"
							placeholderTextColor="#bfbfbf"
							style={styles.message_edit_input}
							placeholder={placeHolder || '请输入'}
							onChangeText={this.onChangeText.bind(this)}
						/>
					</View>
					<View style={styles.content_footer}>
						<TouchableOpacity onPress={() => this.props.onOk(changeKey, value)} style={styles.content_footer_left}>
							<Text style={styles.content_footer_text}>确定</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.onCancel()} style={styles.content_footer_right}>
							<Text style={styles.content_footer_text}>取消</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width,
		height: height,
		backgroundColor: 'rgba(204,204,204,0.5)',
		position: 'absolute',
	},
	content: {
		minHeight: 40,
		width: width * 0.8,
		position: 'absolute',
		left: width / 10,
		top: height / 2 - 60,
		opacity: 1,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 10,
		overflow: 'hidden',
	},
	content_title: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content_desc: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
		marginTop: -10,
	},
	message_edit_input: {
		height: 35,
		width: width * 0.7,
		fontSize: 14,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		borderColor: '#cdcdcd',
		borderWidth: 0.5,
		borderRadius: 5,
	},
	content_footer: {
		flexDirection: 'row',
		height: 40,
	},
	content_footer_text: {
		color: '#2d8afd',
		fontSize: 16,
		fontWeight: '700',
	},
	content_footer_left: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#cdcdcd',
		borderWidth: 0.5,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
	},
	content_footer_right: {
		flex: 1,
		justifyContent: 'center',
		borderTopColor: '#cdcdcd',
		borderTopWidth: 0.5,
		alignItems: 'center',
	},
});
