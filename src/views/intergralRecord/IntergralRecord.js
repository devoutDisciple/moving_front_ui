import React from 'react';
import RecordItem from './RecordItem';
import Loading from '@/component/Loading';
import Request from '@/util/Request';
import StorageUtil from '@/util/Storage';
import CommonHeader from '@/component/CommonHeader';
import Footer from '../order/component/Footer';
import { Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';

export default class Intergral extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			data: [],
			headerLoading: false,
		};
	}

	async componentDidMount() {
		await this.getUserIntergralRecord();
	}

	// 获取用户兑换记录
	async getUserIntergralRecord() {
		this.setState({ loadingVisible: true });
		let user = await StorageUtil.get('user');
		let userid = user.id;
		let res = await Request.get('/intergral_record/getRecordByUserid', { userid });
		this.setState({ data: res.data || [], loadingVisible: false });
	}

	async headerRefresh() {
		this.setState({ headerLoading: true });
		await this.getUserIntergralRecord();
		this.setState({ headerLoading: false });
	}

	render() {
		const { navigation } = this.props;
		let { loadingVisible, data, headerLoading } = this.state;
		return (
			<View style={styles.container}>
				<CommonHeader title="积分兑换记录" navigation={navigation} />
				<ScrollView style={styles.intergrals_content} showsVerticalScrollIndicator={false}>
					{data && data.length !== 0 ? (
						<FlatList
							data={data}
							onRefresh={this.headerRefresh.bind(this)}
							refreshing={headerLoading}
							keyExtractor={(item, index) => String(item.id)}
							ListFooterComponent={<Footer status={4} />}
							renderItem={({ item, index }) => {
								return <RecordItem key={index} data={item} />;
							}}
						/>
					) : (
						<View style={styles.empty}>
							<Text style={styles.empty_text}>暂无记录</Text>
						</View>
					)}
				</ScrollView>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	intergrals_content: {
		flex: 1,
		marginHorizontal: 2,
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: '#f2f3f7',
	},
	empty: {
		height: 500,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_text: {
		fontSize: 20,
		color: '#bfbfbf',
	},
});
