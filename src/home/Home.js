/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Swiper from './Swiper';
import Express from './Express';
import IconList from './IconList';
import Request from '../util/Request';
import config from '../config/config';
import Storage from '../util/Storage';
import Picker from 'react-native-picker';
import Loading from '../component/Loading';
import Message from '../component/Message';
import VersionDialog from '../component/VersionDialog';
import Icon from 'react-native-vector-icons/AntDesign';
import Spinner from 'react-native-spinkit';
import { Text, View, TouchableOpacity, ScrollView, Linking, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingVisible: false,
			shopList: [],
			shopid: '',
			versionSoftDialogVisible: false, // 非强制更新
			versionForceDialogVisible: false, // 强制更新
			previewModalVisible: false,
			swiperList: [],
		};
		this.locationClick = this.locationClick.bind(this);
		this.goAppStore = this.goAppStore.bind(this);
	}

	static navigationOptions = ({ navigation, navigationOptions }) => {
		// 自定义左右菜单
		return {
			headerTitle: 'MOVING洗衣',
			headerLeft: () => {
				return (
					<TouchableOpacity onPress={() => navigation.state.params.leftIconClick()}>
						<View
							style={{
								width: 150,
								flexDirection: 'row',
								alignItems: 'center',
								alignSelf: 'center',
								justifyContent: 'center',
							}}
						>
							<Icon style={{ width: 20, marginTop: 2 }} name="enviromento" size={16} color="#fb9dd0" />
							<Text style={{ flex: 1 }}>
								{navigation.state.params && navigation.state.params.title ? navigation.state.params.title : ''}
							</Text>
						</View>
					</TouchableOpacity>
				);
			},
			headerLeftContainerStyle: {
				padding: 10,
			},
			headerRight: () => {
				return (
					<TouchableOpacity onPress={() => navigation.state.params.rightIconClick()}>
						<Icon style={{ width: 20, marginTop: 2 }} name="customerservice" size={16} color="#fb9dd0" />
					</TouchableOpacity>
				);
			},
			headerRightContainerStyle: {
				padding: 10,
			},
			headerBackTitle: '返回',
			headerTitleStyle: {
				alignSelf: 'center',
				textAlign: 'center',
				flex: 1,
			},
			// 整个标题的样式
			headerStyle: {
				shadowColor: '#505050',
				shadowOffset: {
					width: 0,
					height: 3,
				},
				shadowOpacity: 0.3,
			},
		};
	};

	async componentDidMount() {
		const { setParams } = this.props.navigation;
		// 设置左右按钮的点击功能
		setParams({
			// 左侧按钮点击
			leftIconClick: () => this.locationClick(),
			// 右侧按钮点击
			rightIconClick: () => this.serviceClick(),
		});
		await this.getVersion();
		await this.getAllShop();
	}

	// 获取当前版本
	async getVersion() {
		let res = await Request.get('/version/getCurrentVersion');
		let versionDetail = res.data;
		if (versionDetail.version !== config.currentVersion) {
			if (versionDetail.force === 1) {
				this.setState({
					versionSoftDialogVisible: true,
				});
			}
			if (versionDetail.force === 2) {
				this.setState({
					versionForceDialogVisible: true,
				});
			}
		}
	}

	// 跳转到appstore进行更新
	goAppStore() {
		let url = `itms-apps://apps.apple.com/us/app/${config.AppStoreId}`;
		//后面有个APP_ID，
		Linking.canOpenURL(url)
			.then(supported => {
				if (supported) {
					Linking.openURL(url);
				} else {
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	// 获取所有商店信息
	async getAllShop() {
		this.setState({ loadingVisible: true });
		// 获取所有门店列表
		Request.get('/shop/all')
			.then(async res => {
				let data = res.data;
				let shop = await Storage.get('shop');
				// 如果没有缓存过商店
				if (!shop) {
					shop = (data && data[0]) || {};
					// 保存设置的商店
					await Storage.set('shop', shop);
				}
				this.setState({ shopList: data || [], shopid: shop.id }, () => {
					let { navigation } = this.props;
					navigation.navigate('HomeScreen', {
						title: shop.name || '',
					});
				});
			})
			.finally(() => {
				this.setState({ loadingVisible: false });
			});
	}

	// 位置点击
	locationClick() {
		let { shopList } = this.state,
			{ navigation } = this.props,
			pickData = [];
		if (Array.isArray(shopList)) {
			shopList.forEach(item => {
				pickData.push(item.name);
			});
		}
		Picker.init({
			...config.pickCommonConfig,
			pickerData: pickData,
			// selectedValue: ['广州3号洗衣店'],
			onPickerConfirm: async res => {
				let name = res[0];
				let selectShop = {};
				shopList.forEach(item => {
					if (name === item.name) {
						selectShop = item;
					}
				});
				this.setState({ shopid: selectShop.id }, async () => {
					await Storage.set('shop', selectShop);
					navigation.navigate('HomeScreen', {
						title: name || '',
					});
				});
			},
		});
		Picker.show();
	}

	// 点击客服按钮
	async serviceClick() {
		let shop = await Storage.get('shop');
		let tel = `tel:${shop.phone}`; // 目标电话
		Linking.canOpenURL(tel)
			.then(supported => {
				if (!supported) {
					Message.warning('商家电话', shop.phone);
				} else {
					return Linking.openURL(tel);
				}
			})
			.catch(error => console.log('tel error', error));
	}

	// 点击图片预览
	onShowPreviewModal(swiperList) {
		let list = [];
		if (Array.isArray(swiperList)) {
			swiperList.forEach(item => list.push({ url: `${config.baseUrl}/${item.url}` }));
		}
		this.setState({ previewModalVisible: true, swiperList: list });
	}

	render() {
		let { navigation } = this.props;
		let { loadingVisible, shopid, versionForceDialogVisible, versionSoftDialogVisible, swiperList, previewModalVisible } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1 }}>
					{/* 轮播图 */}
					<Swiper navigation={navigation} shopid={shopid} onShowPreviewModal={this.onShowPreviewModal.bind(this)} />
					{/* 图标选项 */}
					<IconList navigation={navigation} />
					{/* 快递柜子 */}
					<Express navigation={navigation} shopid={shopid} />
				</ScrollView>
				{/* 非强制版本 */}
				{versionSoftDialogVisible && (
					<VersionDialog
						title="版本更新"
						okText="立即更新"
						cancelText="取消更新"
						desc="有新版本更新,请更新至最新版本"
						onOk={this.goAppStore.bind(this)}
						onCancel={() => {
							this.setState({ versionSoftDialogVisible: false });
						}}
						cancelShow={true}
					/>
				)}
				{/* 强制更新版本 */}
				{versionForceDialogVisible && (
					<VersionDialog
						title="版本更新"
						okText="立即更新"
						desc="有新版本更新,请立即更新至最新版本"
						onOk={this.goAppStore.bind(this)}
						onCancel={() => {}}
						cancelShow={false}
					/>
				)}
				{previewModalVisible && (
					<Modal visible={true} transparent={true}>
						<ImageViewer
							imageUrls={swiperList}
							failImageSource="暂无图片信息"
							onClick={() => this.setState({ previewModalVisible: false })}
							loadingRender={() => <Spinner type="Bounce" color="#fb9bcd" />}
						/>
					</Modal>
				)}
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}
