/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

export default class FooterScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		let { status } = this.props;
		// 什么也不显示
		if (status === 1) {
			return null;
		}
		// 上拉加载
		if (status === 2) {
			return (
				<View style={styles.commonView}>
					<Text style={styles.commonText}>上拉加载更多数据</Text>
				</View>
			);
		}
		// 正在加载中
		if (status === 3) {
			return (
				<View style={styles.commonView}>
					<ActivityIndicator size="small" color="#bfbfbf" style={{ marginBottom: 10 }} />
					<Text style={styles.commonText}>加载中...</Text>
				</View>
			);
		}
		// 已经全部加载完成
		if (status === 4) {
			return (
				<View style={styles.commonView}>
					<Text style={styles.commonText}>暂无更多数据</Text>
				</View>
			);
		}
		return null;
	}
}

const styles = StyleSheet.create({
	commonView: {
		marginVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
		color: '#bfbfbf',
	},
	commonText: {
		color: '#bfbfbf',
	},
});
