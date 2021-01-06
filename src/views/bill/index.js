import React from 'react';
import BillItem from './BillItem';
import Request from '@/util/Request';
import FooterContent from './Footer';
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
			refreshing: false,
		};
	}

	componentDidMount() {
		this.onSearchBill();
	}

	async onSearchBill() {
		try {
			this.setState({ refreshing: true });
			let user = await StorageUtil.get('user');
			let userid = user.id;
			const res = await Request.get('/bill/getAllBillByUserid', { userid });
			let data = res.data || [];
			this.setState({ refreshing: false, billList: data });
		} catch (error) {
			this.setState({ refreshing: false });
		}
	}

	render() {
		const { navigation } = this.props;
		const { billList, refreshing } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="消费记录" navigation={navigation} />
					<View style={styles.content}>
						{billList && billList.length !== 0 ? (
							<FlatList
								data={billList}
								refreshing={refreshing}
								onRefresh={this.onSearchBill.bind(this)}
								keyExtractor={item => item.id}
								showsVerticalScrollIndicator={false}
								ListEmptyComponent={<EmptyContent />}
								ListFooterComponent={<FooterContent />}
								renderItem={item => <BillItem data={item} />}
							/>
						) : (
							<EmptyContent />
						)}
					</View>
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
