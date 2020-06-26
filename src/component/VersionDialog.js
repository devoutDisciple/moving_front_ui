/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class Dialog extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let { title, okText, cancelText, cancelShow, onOk, onCancel, desc } = this.props;
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
					{desc && (
						<View style={styles.content_desc}>
							<Text style={styles.content_desc_text}>{desc}</Text>
						</View>
					)}
					<View style={styles.content_footer}>
						<TouchableOpacity onPress={onOk} style={styles.content_footer_left}>
							<Text style={styles.content_footer_text}>{okText}</Text>
						</TouchableOpacity>
						{cancelShow && (
							<TouchableOpacity onPress={onCancel} style={styles.content_footer_right}>
								<Text style={styles.content_footer_text}>{cancelText}</Text>
							</TouchableOpacity>
						)}
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
		width: 250,
		position: 'absolute',
		left: (width - 250) / 2,
		top: height / 2 - 60,
		opacity: 1,
		backgroundColor: 'rgba(255,255,255,1)',
		borderRadius: 10,
		overflow: 'hidden',
	},
	content_title: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content_desc: {
		height: 40,
		// backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: -10,
	},
	content_desc_text: {
		fontSize: 12,
		color: '#8a8a8a',
	},
	message_edit_input: {
		height: 40,
		width: width * 0.75,
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
