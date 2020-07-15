/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonHeader from '../component/CommonHeader';
import { ScrollView } from 'react-native-gesture-handler';
import SafeViewComponent from '../component/SafeViewComponent';

export default class ShopRecord extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { navigation } = this.props;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="服务协议" navigation={navigation} />
					<ScrollView style={styles.container_text} showsVerticalScrollIndicator={false}>
						<View style={styles.member_detail_content}>
							<Text style={styles.member_detail_content_text}>&emsp;&emsp;最终解释权归广州锐动洗衣有限公司所有</Text>
						</View>
					</ScrollView>
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	container_text: {
		flex: 1,
	},
	member_detail_content: {
		margin: 10,
		shadowColor: 'green',
		shadowOffset: {
			width: 18,
			height: 20,
		},
	},
	member_detail_content_text: {
		fontSize: 13,
		lineHeight: 18,
		color: '#8a8a8a',
		marginBottom: 10,
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
