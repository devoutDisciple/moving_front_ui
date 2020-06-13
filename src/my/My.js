/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import My_Header from './Header';
import My_Wallert from './Wallet';
import Request from '../util/Request';
import Storage from '../util/Storage';
import ListItem from '../component/ListItem';
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet, TouchableOpacity, ScrollView, View, RefreshControl } from 'react-native';

export default class MyScreen extends React.Component {
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			headerTitle: '',
			headerRight: () => {
				return (
					<TouchableOpacity onPress={() => navigation.state.params.rightIconClick()}>
						<Icon style={{ width: 20, marginTop: 3, marginRight: 10 }} name="setting" size={20} color="#333" />
					</TouchableOpacity>
				);
			},
			headerStyle: {
				borderWidth: 0,
				borderBottomColor: '#fff',
			},
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			loading: false,
		};
	}

	async componentDidMount() {
		// 增加设置按钮点击功能
		const { setParams } = this.props.navigation;
		setParams({
			rightIconClick: () => this.setIconClick(),
		});

		// 获取用户信息
		await this.getUserInfo();
	}

	// 获取用户信息
	async getUserInfo() {
		this.setState({ loading: true });
		// 获取用户token值
		let token = await Storage.getString('token');
		let res = await Request.get('/user/getUserByToken', { token });
		let user = res.data || '';
		await Storage.set('user', user);
		// 获取本地存储的用户信息
		if (!user) {
			// 去登陆页面
			this.props.navigation.navigate('LoginScreen');
		}
		this.setState({ user: user, loading: false });
	}

	// 下拉刷新的时候
	async refreshing() {
		await this.getUserInfo();
	}

	// 点击设置按钮
	setIconClick() {
		this.props.navigation.navigate('MySetting');
	}

	// 点击listItem的时候
	onPressListItem(key) {
		const { navigation } = this.props;
		// 点击我的地址
		if (key === 'address') {
			return navigation.navigate('MyAddressScreen');
		}
		// 点击积分兑换的时候
		if (key === 'intergralGoods') {
			return navigation.navigate('IntergralScreen');
		}
		// 点击积分兑换记录的时候
		if (key === 'intergralRecord') {
			return navigation.navigate('IntergralRecordScreen');
		}
		// 点击余额充值
		if (key === 'account') {
			return navigation.navigate('ReChargeScreen');
		}
		// 点击消费记录
		if (key === 'shopping') {
			return navigation.navigate('ShopRecordScreen');
		}
		// 点击意见反馈
		if (key === 'suggestion') {
			return navigation.navigate('SuggestionScreen');
		}
		// 点击moving简介
		if (key === 'aboutUs') {
			return navigation.navigate('AboutUsScreen');
		}
		// 点击联系我们
		if (key === 'concatUs') {
			return navigation.navigate('ConcatUsScreen');
		}
	}

	render() {
		let { user, loading } = this.state;
		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.content}
					refreshControl={<RefreshControl refreshing={loading} onRefresh={this.refreshing.bind(this)} />}
				>
					<My_Header navigation={this.props.navigation} user={user} getUserInfo={this.getUserInfo.bind(this)} />
					<My_Wallert navigation={this.props.navigation} user={user} />
					<View style={{ height: 10 }} />
					<ListItem iconName="enviromento" text="我的地址" onPress={this.onPressListItem.bind(this, 'address')} />
					<ListItem iconName="staro" text="Moving商城" onPress={this.onPressListItem.bind(this, 'intergralGoods')} />
					<ListItem iconName="staro" text="购买记录" onPress={this.onPressListItem.bind(this, 'intergralRecord')} />
					<ListItem iconName="creditcard" text="余额充值" onPress={this.onPressListItem.bind(this, 'account')} />
					<ListItem iconName="linechart" text="消费记录" onPress={this.onPressListItem.bind(this, 'shopping')} />
					<ListItem iconName="notification" text="意见反馈" onPress={this.onPressListItem.bind(this, 'suggestion')} />
					<ListItem iconName="team" text="moving简介" onPress={this.onPressListItem.bind(this, 'aboutUs')} />
					<ListItem iconName="message1" text="联系我们" onPress={this.onPressListItem.bind(this, 'concatUs')} />
				</ScrollView>
			</View>
		);
	}
}

// 展示头像的view高度
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
	},
	content: {
		flex: 1,
	},
});
