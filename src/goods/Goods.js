import React from 'react';
import GoodsItem from './GoodsItem';
import Request from '../util/Request';
import Toast from '../component/Toast';
import Message from '../component/Message';
import storageUtil from '../util/Storage';
import Loading from '../component/Loading';
import CommonHeader from '../component/CommonHeader';
import SafeViewComponent from '../component/SafeViewComponent';
import FastImage from '../component/FastImage';
import { Text, View, StyleSheet, ScrollView, TextInput, Dimensions, Alert, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			totalPrice: 0.0,
			remark: '',
			boxid: '',
			cabinetId: '',
			loadingVisible: false,
			urgencyMoney: 0.0, // 加急后的费用
			urgency: 1, // 是否是加急订单 1-普通 2-加急
		};
	}

	async componentDidMount() {
		let shop = await storageUtil.get('shop');
		if (!shop) {
			this.props.navigation.navigate('LoginScreen');
			return Toast.warning('请登录!');
		}
		let { navigation } = this.props;
		let boxid = navigation.getParam('boxid', ''),
			cabinetId = navigation.getParam('cabinetId', '');
		Request.get('/clothing/getByShopid', { shopid: shop.id }).then(res => {
			let data = res.data || [];
			if (Array.isArray(data) && data.length !== 0) {
				data.forEach(item => (item.num = 0));
			}
			this.setState({ data: data || [], boxid, cabinetId });
		});
	}

	// 查询衣物
	async onSearchClothing() {
		try {
			this.setState({ loadingVisible: true });
			let shop = await storageUtil.get('shop');
			if (!shop) {
				this.props.navigation.navigate('LoginScreen');
				return Toast.warning('请登录!');
			}
			let { navigation } = this.props;
			let boxid = navigation.getParam('boxid', ''),
				cabinetId = navigation.getParam('cabinetId', '');
			let res = await Request.get('/clothing/getByShopid', { shopid: shop.id });
			let data = res.data || [];
			if (Array.isArray(data) && data.length !== 0) {
				data.forEach(item => (item.num = 0));
			}
			this.setState({ data: data || [], boxid, cabinetId, loadingVisible: false });
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	// 订单加急
	async urgencyClick(flag) {
		if (flag === 1) {
			Message.warning('普通订单', '店员将会在一至三日内取货，请耐心等待');
		}
		if (flag === 2) {
			Message.warning('加急订单', '店员将会在当日收取衣物，另外收取衣物总费用的50%作为加急费用');
		}
		this.setState({ urgency: flag }, () => {
			this.onCountPrice();
		});
	}

	// 点击确定的时候
	onSureClothing() {
		let { remark = '', totalPrice = 0, data, boxid, cabinetId, urgency } = this.state;
		let selectGoods = data.filter(item => item.num !== 0);
		Alert.alert(
			'提示',
			'该价格仅供参考,最终价格由店员确认',
			[
				{
					text: '确定',
					onPress: () => {
						this.props.navigation.navigate('CabinetScreen', {
							boxid,
							cabinetId,
							remark: remark,
							goods: selectGoods,
							totalPrice: totalPrice,
							urgency: urgency,
						});
					},
				},
			],
			{ cancelable: false },
		);
	}

	// 减少衣物
	onSubCloth(id) {
		let { data } = this.state;
		let goods = data.filter(item => item.id === id)[0];
		if (goods.num < 1) {
			return;
		}
		goods.num--;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 增加衣物
	onAddCloth(id) {
		let { data } = this.state;
		let goods = data.filter(item => item.id === id)[0];
		goods.num++;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 结算价格
	onCountPrice() {
		let { data, urgency } = this.state;
		let totalPrice = 0;
		data.map(item => {
			totalPrice += Number(item.price * item.num);
		});
		totalPrice = Number(totalPrice).toFixed(2);
		let urgencyMoney = 0.0;
		if (urgency === 2) {
			urgencyMoney = Number(totalPrice * 1.5).toFixed(2);
		}
		this.setState({ totalPrice, urgencyMoney });
	}

	render() {
		const { navigation } = this.props;
		let { data, totalPrice, loadingVisible, urgency, urgencyMoney } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="计算洗衣费用" navigation={navigation} />
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						<View style={styles.content_title}>
							<Text>洗衣费用计算（仅供参考）</Text>
						</View>
						<View style={styles.content_clothing}>
							{data &&
								data.map((item, index) => {
									return (
										<GoodsItem
											key={index}
											id={item.id}
											num={item.num}
											name={item.name}
											source={item.url}
											price={item.price}
											onSubCloth={this.onSubCloth.bind(this)}
											onAddCloth={this.onAddCloth.bind(this)}
										/>
									);
								})}
						</View>
						<View style={styles.content_title}>
							<Text>订单加急</Text>
						</View>
						<View style={styles.urgency}>
							<TouchableOpacity style={styles.urgency_content} onPress={this.urgencyClick.bind(this, 1)}>
								<FastImage
									style={styles.img}
									source={
										urgency === 1
											? require('../../img/public/check_box_select.png')
											: require('../../img/public/check_box_no_select.png')
									}
								/>
								<Text style={styles.img_des}>普通订单</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.urgency_content} onPress={this.urgencyClick.bind(this, 2)}>
								<FastImage
									style={styles.img}
									source={
										urgency === 2
											? require('../../img/public/check_box_select.png')
											: require('../../img/public/check_box_no_select.png')
									}
								/>
								<Text style={styles.img_des}>加急订单</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.content_title}>
							<Text>备注信息</Text>
						</View>
						<View style={styles.content_input}>
							<TextInput
								multiline
								maxLength={100}
								autoComplete="off"
								keyboardType="default"
								selectionColor="#fb9bcd"
								placeholderTextColor="#bfbfbf"
								style={styles.message_desc_input}
								placeholder="MOVING洗衣店为您尽心服务!"
								onChangeText={value => this.setState({ remark: value })}
							/>
						</View>
					</ScrollView>
					<View style={styles.footer}>
						<View style={styles.footer_left}>
							<View style={styles.footer_left_content}>
								<Text style={styles.footer_left_content_text}>预计所需: ￥</Text>
							</View>
							<View style={styles.footer_right_content}>
								<Text style={styles.footer_right_content_text}>{urgency === 1 ? totalPrice : urgencyMoney}</Text>
							</View>
						</View>
						<TouchableOpacity style={styles.footer_right} onPress={this.onSureClothing.bind(this)}>
							<Text style={styles.footer_right_text}>确定</Text>
						</TouchableOpacity>
					</View>
					<Loading visible={loadingVisible} />
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
	},
	content: {
		flex: 1,
		margin: 10,
	},
	urgency: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 5,
	},
	urgency_content: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 35,
	},
	img: {
		height: 18,
		width: 18,
		// marginTop: -2,
	},
	img_des: {
		marginLeft: 5,
		marginRight: 10,
		color: '#333',
		fontSize: 14,
	},
	content_title: {
		height: 20,
		justifyContent: 'center',
		paddingLeft: 10,
		borderLeftColor: '#fb9dd0',
		borderLeftWidth: 3,
	},
	content_clothing: {
		marginBottom: 20,
	},
	message_desc_input: {
		height: 100,
		width: width - 20,
		fontSize: 16,
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		borderColor: '#cdcdcd',
		borderWidth: 0.5,
		borderRadius: 5,
	},
	content_input: {
		marginVertical: 20,
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		borderTopColor: '#fb9dd0',
		borderTopWidth: 0.5,
	},
	footer_left: {
		flex: 1,
		paddingLeft: 10,
		justifyContent: 'center',
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
	footer_left_content: {
		width: 82,
		justifyContent: 'center',
	},
	footer_left_content_text: {
		fontSize: 14,
		color: '#333',
	},
	footer_right_content: {
		flex: 1,
		justifyContent: 'center',
	},
	footer_right_content_text: {
		fontSize: 28,
		color: '#fb9dd0',
		fontWeight: '600',
		marginTop: -5,
	},
	footer_right: {
		width: 100,
		height: '100%',
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer_right_text: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '900',
	},
});
