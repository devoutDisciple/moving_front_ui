import React from 'react';
import BillItem from './BillItem';
import Request from '@/util/Request';
import FooterContent from './Footer';
import Loading from '@/component/Loading';
import StorageUtil from '@/util/Storage';
import EmptyContent from '@/component/EmptyContent';
import { View, StyleSheet, FlatList } from 'react-native';
import SafeViewComponent from '@/component/SafeViewComponent';
import CommonHeader from '@/component/CommonHeader';

export default class BillRecord extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			billList: [],
			loading: true,
			refreshing: false,
		};
	}

	componentDidMount() {
		this.onInitSearch();
	}

	async onInitSearch() {
		this.setState({ loading: true });
		let data = await this.onSearchBill();
		this.setState({ loading: false, billList: data || [] });
	}

	async onRefresh() {
		this.setState({ refreshing: true });
		let data = await this.onSearchBill();
		this.setState({ refreshing: false, billList: data || [] });
	}

	async onSearchBill() {
		try {
			let user = await StorageUtil.get('user');
			let userid = user.id;
			const res = await Request.get('/bill/getAllBillByUserid', { userid });
			let data = res.data || [];
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { navigation } = this.props;
		const { billList, refreshing, loading } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="消费记录" navigation={navigation} />
					<View style={styles.content}>
						{billList && billList.length !== 0 ? (
							<FlatList
								data={billList}
								refreshing={refreshing}
								onRefresh={this.onRefresh.bind(this)}
								keyExtractor={item => String(item.id)}
								showsVerticalScrollIndicator={false}
								ListEmptyComponent={<EmptyContent />}
								ListFooterComponent={<FooterContent />}
								renderItem={item => <BillItem data={item} />}
							/>
						) : (
							<EmptyContent />
						)}
					</View>
					<Loading visible={loading} />
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
	content: {
		flex: 1,
	},
});
