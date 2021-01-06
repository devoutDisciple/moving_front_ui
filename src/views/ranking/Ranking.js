import React from 'react';
import Request from '@/util/Request';
import RankingItem from './RankingItem';
import Loading from '@/component/Loading';
import CommonHeader from '@/component/CommonHeader';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class Ranking extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPageIndex: 0,
			loadingVisible: false,
			list: [],
		};
	}

	componentDidMount() {
		this.onSearchList(1);
	}

	// 查找列表
	async onSearchList(type) {
		this.setState({ loadingVisible: true }, async () => {
			let result = await Request.get(`/ranking/getRankingByType?type=${type}`);
			this.setState({ list: result.data || [], loadingVisible: false });
		});
	}

	// 改变tab的时候
	changeTab(data) {
		// this.setState({
		// 	currentPageIndex: data.i + 1,
		// });
		this.onSearchList(data.i + 1);
	}

	render() {
		const { navigation } = this.props;
		const { loadingVisible, list } = this.state;
		return (
			<View style={styles.page}>
				<CommonHeader title="洗衣排行" navigation={navigation} />
				<View style={styles.content}>
					<View style={styles.tab}>
						<ScrollableTabView
							tabBarActiveTextColor="#fb9dd0"
							tabBarInactiveTextColor="#333"
							tabBarUnderlineStyle={{
								backgroundColor: '#fb9dd0',
								borderWidth: 0,
								borderRadius: 3,
							}}
							initialPage={0}
							onChangeTab={this.changeTab.bind(this)}
							renderTabBar={() => <DefaultTabBar containerWidth={100} />}
						>
							<Text style={{ height: 0 }} tabLabel="周排行榜" />
							<Text style={{ height: 0 }} tabLabel="月排行榜" />
						</ScrollableTabView>
					</View>
					{list && list.length !== 0 ? (
						<ScrollView style={styles.ranking} showsVerticalScrollIndicator={false}>
							{list.map((item, index) => (
								<RankingItem key={item.id} data={item} idx={index} />
							))}
							<View style={styles.footer}>
								<Text>......</Text>
							</View>
						</ScrollView>
					) : (
						<View style={styles.empty}>
							<Text style={styles.empty_text}>暂无数据</Text>
						</View>
					)}

					<Loading visible={loadingVisible} />
				</View>
			</View>
		);
	}
}

const commonFlex = {
	justifyContent: 'center',
	alignItems: 'center',
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		// backgroundColor: 'red',
	},
	tab: {
		height: 50,
	},
	ranking: {
		flex: 1,
		margin: 10,
	},
	footer: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty: {
		flex: 1,
		...commonFlex,
	},
	empty_text: {
		fontSize: 18,
		color: '#bfbfbf',
	},
});
