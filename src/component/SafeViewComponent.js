import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
export default function(props) {
	return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
}

// 展示头像的view高度
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: -20,
	},
});
