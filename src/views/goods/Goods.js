import React from 'react';
import moment from 'moment';
import GoodsItem from './GoodsItem';
import RadioItem from './RadioItem';
import Request from '@/util/Request';
import Toast from '@/component/Toast';
import storageUtil from '@/util/Storage';
import Message from '@/component/Message';
import Loading from '@/component/Loading';
import FastImage from '@/component/FastImage';
import SelectTab from './SelectTab';
import CommonHeader from '@/component/CommonHeader';
import SafeViewComponent from '@/component/SafeViewComponent';
import { Text, View, StyleSheet, ScrollView, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default class Goods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			shopDetail: {},
			defaultAddress: '',
			userDetail: {},
			totalPrice: 0.0,
			remark: '',
			boxid: '',
			order_type: '',
			cabinetId: '',
			loadingVisible: false,
			send_status: 2,
			tabList: [], // 衣物分类
			selectId: '', // 选择衣物的id
			urgencyMoney: 0.0, // 加急后的费用
			thursdayMoney: 0.0, // 会员日初始价格
			urgency: 1, // 是否是加急订单 1-普通 2-加急
			isThursday: moment(new Date().getTime()).day() === 4,
		};
	}

	async componentDidMount() {
		await this.getShopDetail();
		await this.getClothingType();
	}

	// 当参数含有flash的时候会进行刷新
	async UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.navigation && nextProps.navigation.state.params.flash) {
			await this.sendStatusClick(1);
		}
	}

	// 获取商店信息详情
	async getShopDetail() {
		let shop = await storageUtil.get('shop');
		let user = await storageUtil.get('user');
		if (!shop || !user) {
			this.props.navigation.navigate('LoginScreen');
			return Toast.warning('请登录!');
		}
		let { navigation } = this.props;
		let boxid = navigation.getParam('boxid', ''),
			cabinetId = navigation.getParam('cabinetId', ''),
			order_type = navigation.getParam('order_type', '');
		this.setState({ shopDetail: shop, userDetail: user, boxid, cabinetId, order_type });
	}

	// 获取衣物分类
	async getClothingType() {
		let shop = await storageUtil.get('shop');
		let res = await Request.get('/clothing_type/getByShopid', { shopid: shop.id });
		let tabList = res.data || [],
			selectId = '';
		if (tabList && tabList[0] && tabList[0].id) {
			selectId = tabList[0].id;
		}
		this.setState({ tabList: tabList || [], selectId }, () => {
			this.onSearchClothing(selectId);
		});
	}

	// 根据分类，查询衣物
	async onSearchClothing(selectId) {
		try {
			this.setState({ loadingVisible: true });
			let shop = await storageUtil.get('shop');
			let res = await Request.get('/clothing/getByShopid', { shopid: shop.id, type: selectId });
			let data = res.data || [];
			if (Array.isArray(data) && data.length !== 0) {
				data.forEach(item => {
					item.num = 0;
					item.show = item.typeid === selectId;
				});
			}
			this.setState({ data: data || [], loadingVisible: false });
		} catch (error) {
			this.setState({ loadingVisible: false });
		}
	}

	// 选择衣物分类
	onSelectClothingType(selectId) {
		let { data } = this.state;
		data.forEach(item => {
			console.log(item.typeid, selectId);
			item.show = item.typeid === selectId;
		});
		this.setState({ data: data || [], selectId });
	}

	// 订单加急
	async urgencyClick(flag) {
		if (flag === 1) {
			Message.warning('普通订单', '店员将会在一至三日内取货，请耐心等待');
		}
		if (flag === 2) {
			Message.warning('加急订单', '店员将会在一天内收取衣物，另外收取衣物总费用的50%作为加急费用');
		}
		this.setState({ urgency: flag }, () => {
			this.onCountPrice();
		});
	}

	// 派送方式改变
	async sendStatusClick(flag) {
		try {
			let { navigation } = this.props;
			let { userDetail } = this.state;
			// 如果是派送到洗衣柜
			if (flag === 1) {
				let res = await Request.get('/address/getAllByUserid', { userid: userDetail.id });
				let addressList = res.data;
				console.log(Array.isArray(addressList));
				if (!addressList || !Array.isArray(addressList) || addressList.length === 0) {
					return Message.confirm('提示', '未选择默认地址，请选择', () => {
						navigation.navigate('MyAddressScreen');
					});
				}
				let defaultAddress = addressList.filter(item => item.is_defalut === 2)[0];
				if (!defaultAddress) {
					return Message.confirm('提示', '未选择默认地址，请选择', () => {
						navigation.navigate('MyAddressScreen');
					});
				}
				this.setState({
					defaultAddress: `${defaultAddress.area} ${defaultAddress.street} ${defaultAddress.username} ${defaultAddress.phone}`,
				});
			}
			this.setState({ send_status: flag });
		} catch (error) {
			console.log(error);
		}
	}

	// 当在店铺下单，录入订单
	async addOrderByShopInput() {
		let { data, totalPrice, remark, urgency, send_status } = this.state,
			selectGoods = [],
			{ navigation } = this.props;
		let shop = await storageUtil.get('shop');
		let user = await storageUtil.get('user');
		if (data && Array.isArray(data)) {
			data.forEach(item => {
				if (item.num !== 0) {
					selectGoods.push({ id: item.id, name: item.name, price: item.price, num: item.num });
				}
			});
		}
		this.setState({ loadingVisible: true });
		let res = await Request.post('/order/addByShopInput', {
			shopid: shop.id,
			userid: user.id,
			goods: JSON.stringify(selectGoods || []),
			money: totalPrice,
			desc: remark,
			urgency: urgency,
			send_status: send_status,
		});
		this.setState({ loadingVisible: false });
		if (res && res.data === 'success') {
			Toast.success('下单成功, 待店员确认衣物价格');
			return navigation.navigate('HomeScreen');
		}
	}

	// 点击确定的时候
	onSureClothing() {
		let { remark = '', totalPrice = 0, data, boxid, cabinetId, urgency, order_type } = this.state;
		let selectGoods = [];
		if (data && Array.isArray(data)) {
			data.forEach(item => {
				if (item.num !== 0) {
					selectGoods.push({ id: item.id, name: item.name, price: item.price, num: item.num });
				}
			});
		}
		Message.confirm('提示', '该价格仅供参考,最终价格由店员确认', () => {
			// 店铺内下单
			if (order_type && order_type === 'shop_order') {
				this.addOrderByShopInput();
				return;
			}
			this.props.navigation.navigate('CabinetScreen', {
				boxid,
				cabinetId,
				remark: remark,
				goods: selectGoods,
				totalPrice: totalPrice,
				urgency: urgency,
			});
		});
	}

	// 减少衣物
	onSubCloth(id) {
		let data = this.state.data;
		let goods = data.filter(item => item.id === id)[0];
		if (goods.num < 1) {
			return;
		}
		goods.num--;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 增加衣物
	onAddCloth(id) {
		let data = this.state.data;
		let goods = data.filter(item => item.id === id)[0];
		goods.num++;
		this.setState({ data }, () => this.onCountPrice());
	}

	// 结算价格
	onCountPrice() {
		let { urgency, isThursday } = this.state;
		let data = this.state.data;
		let totalPrice = 0;
		data.map(item => {
			totalPrice += Number(item.price * item.num);
		});
		totalPrice = Number(totalPrice).toFixed(2);
		let urgencyMoney = 0.0,
			thursdayMoney = 0.0;
		// 是否加急
		if (urgency === 2) {
			urgencyMoney = Number(totalPrice * 1.5).toFixed(2);
		}
		// 是否是周四会员日
		if (isThursday) {
			if (urgency === 2) {
				thursdayMoney = Number(urgencyMoney * 0.85).toFixed(2);
			} else {
				thursdayMoney = Number(totalPrice * 0.85).toFixed(2);
			}
		}
		this.setState({ totalPrice, urgencyMoney, thursdayMoney });
	}

	render() {
		const { navigation } = this.props;
		let {
			data,
			totalPrice,
			loadingVisible,
			urgency,
			urgencyMoney,
			isThursday,
			order_type,
			shopDetail,
			send_status,
			thursdayMoney,
			defaultAddress,
			tabList,
			selectId,
		} = this.state;
		let flag = order_type && order_type === 'shop_order';
		let notEmpty = data.filter(item => item.typeid === selectId);
		return (
			<SafeViewComponent>
				<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<CommonHeader title={flag ? '店内下单' : '计算洗衣费用'} navigation={navigation} />
					<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
						{flag ? (
							<>
								<View style={styles.content_title}>
									<Text>当前店铺</Text>
								</View>
								<View style={styles.shop_name}>
									<Text style={styles.shop_name_text}>店铺名称: {shopDetail.name}</Text>
								</View>
								<View style={styles.content_title}>
									<Text>取衣方式</Text>
								</View>
								<View style={styles.urgency}>
									<RadioItem select={send_status === 2} onPress={this.sendStatusClick.bind(this, 2)} text="自取" />
									<RadioItem select={send_status === 1} onPress={this.sendStatusClick.bind(this, 1)} text="洗衣柜" />
								</View>
								{send_status === 1 && defaultAddress ? (
									<View style={styles.address}>
										<Text style={styles.address_text}>默认收货地址: {defaultAddress}</Text>
										<TouchableOpacity
											style={styles.address_icon}
											onPress={() => navigation.navigate('MyAddressScreen')}
										>
											<FastImage style={styles.address_icon_img} source={require('@/asserts/home/edit.png')} />
										</TouchableOpacity>
									</View>
								) : null}
							</>
						) : null}
						<View style={styles.content_title}>
							<Text>洗衣费用计算（仅供参考）</Text>
						</View>
						<SelectTab tabList={tabList} selectId={selectId} onSelectClothingType={this.onSelectClothingType.bind(this)} />
						<View style={styles.content_clothing}>
							{notEmpty && notEmpty.length !== 0 ? (
								data.map((item, index) => {
									if (item.show) {
										return (
											<GoodsItem
												key={item.id}
												id={item.id}
												num={item.num}
												name={item.name}
												source={item.url}
												price={item.price}
												onSubCloth={this.onSubCloth.bind(this)}
												onAddCloth={this.onAddCloth.bind(this)}
											/>
										);
									}
								})
							) : (
								<View style={styles.empty_clothing}>
									<Text style={styles.empty_clothing_text}>该类衣物暂不支持清洗</Text>
								</View>
							)}
						</View>
						<View style={styles.content_title}>
							<Text>订单加急</Text>
						</View>
						<View style={styles.urgency}>
							<RadioItem select={urgency === 1} onPress={this.urgencyClick.bind(this, 1)} text="普通订单" />
							<RadioItem select={urgency === 2} onPress={this.urgencyClick.bind(this, 2)} text="加急订单" />
						</View>
						<View style={styles.content_title}>
							<Text>备注信息</Text>
						</View>
						<View style={styles.content_input}>
							<TextInput
								multiline
								maxLength={100}
								autoComplete="off"
								blurOnSubmit={true}
								returnKeyType="done"
								keyboardType="default"
								textAlignVertical="top"
								selectionColor="#fb9bcd"
								placeholderTextColor="#bfbfbf"
								style={styles.message_desc_input}
								underlineColorAndroid="transparent"
								placeholder="MOVING洗衣为您尽心服务!"
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
								<Text style={styles.footer_right_content_text}>
									{isThursday ? thursdayMoney : urgency === 1 ? totalPrice : urgencyMoney}
								</Text>
								{isThursday && <Text style={styles.footer_tip_content_text}>(周四85折优惠)</Text>}
							</View>
						</View>
						<TouchableOpacity style={styles.footer_right} onPress={this.onSureClothing.bind(this)}>
							<Text style={styles.footer_right_text}>确定</Text>
						</TouchableOpacity>
					</View>
					<Loading visible={loadingVisible} />
				</KeyboardAvoidingView>
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
		marginVertical: 5,
	},
	urgency_content: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 35,
	},
	address: {
		minHeight: 25,
		marginBottom: 10,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 5,
		justifyContent: 'flex-start',
	},
	address_text: {
		flex: 1,
		fontSize: 12,
		lineHeight: 20,
		color: '#8a8a8a',
	},
	address_icon: {
		width: 30,
		alignItems: 'flex-end',
	},
	address_icon_img: {
		height: 18,
		width: 18,
	},
	shop_name: {
		height: 50,
		justifyContent: 'center',
		paddingLeft: 10,
	},
	shop_name_text: {
		color: '#333',
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
	empty_clothing: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_clothing_text: {
		fontSize: 14,
		color: '#bfbfbf',
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	footer_right_content_text: {
		fontSize: 28,
		color: '#fb9dd0',
		fontWeight: '600',
		marginTop: -5,
	},
	footer_tip_content_text: {
		flex: 1,
		fontSize: 12,
		marginLeft: 4,
		color: '#8a8a8a',
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
