import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonHeader from '@/component/CommonHeader';

export default class ShopRecord extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<CommonHeader title="消费记录" navigation={navigation} />
				<View style={styles.empty}>
					<Text style={{ fontSize: 18, color: '#bfbfbf' }}>暂无数据</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
