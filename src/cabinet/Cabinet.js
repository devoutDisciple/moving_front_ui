/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Request from '../util/Request';
import Toast from '../component/Toast';
import CabinetItem from './CabinetItem';
import CommonSylte from '../style/common';
import CommonHeader from '../component/CommonHeader';
import { Text, View, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loading from '../component/Loading';

const { width } = Dimensions.get('window');

export default class OrderScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 'smallBox',
			loadingVisible: false,
			boxDetail: {
				smallBox: {
					empty: 0,
					used: 0,
				},
				middleBox: {
					empty: 0,
					used: 0,
				},
				bigBox: {
					empty: 0,
					used: 0,
				},
			},
			expressList: [
				{
					id: 'smallBox',
					title: '小格口',
					desc: '限重一公斤',
					normalImg: require('../../img/public/express_little.png'),
					activeImg: require('../../img/public/express_little_active.png'),
				},
				{
					id: 'middleBox',
					title: '中格口',
					desc: '限重三公斤',
					normalImg: require('../../img/public/express_middle.png'),
					activeImg: require('../../img/public/express_middle_acitve.png'),
				},
				{
					id: 'bigBox',
					title: '大格口',
					desc: '限重五公斤',
					normalImg: require('../../img/public/express_big.png'),
					activeImg: require('../../img/public/express_big_active.png'),
				},
			],
		};
		this.getParams = this.getParams.bind(this);
	}

	async componentDidMount() {
		await this.getState();
	}

	getParams() {
		let { navigation } = this.props;
		console.log(navigation);
		let boxid = navigation.getParam('boxid', ''),
			remark = navigation.getParam('remark', ''),
			totalPrice = navigation.getParam('totalPrice', '');
		return { boxid, remark, totalPrice };
	}

	getState() {
		let params = this.getParams();
		Request.get('/cabinet/getStateById', { boxid: params.boxid }).then(res => {
			console.log(res, 111);
			this.setState({
				boxDetail: res.data || {
					smallBox: {
						empty: 0,
						used: 0,
					},
					middleBox: {
						empty: 0,
						used: 0,
					},
					bigBox: {
						empty: 0,
						used: 0,
					},
				},
			});
		});
	}

	onPress(id) {
		this.setState({ active: id });
	}

	// 打开柜子
	onOpenCabinet() {
		let detail = this.getParams();
		this.setState({ loadingVisible: true }, () => {
			Request.post('/cabinet/open', { boxid: detail.boxid, type: this.state.active })
				.then(res => {
					if (res.data === 'success') {
						return Toast.success('柜子已打开, 请存放衣物!');
					}
					Toast.warning('网络错误');
				})
				.finally(() => this.setState({ loadingVisible: false }));
		});
	}

	render() {
		const { navigation } = this.props;
		let { active, expressList, boxDetail, loadingVisible } = this.state;
		return (
			<View style={{ flex: 1 }}>
				<CommonHeader title="选择柜口" navigation={navigation} />
				<ScrollView style={styles.cabinet}>
					<View style={styles.cabinet_item}>
						<View style={styles.detail_common_title}>
							<Text>幸福家园北门一号柜</Text>
						</View>
						<View style={styles.cabinet_item_content}>
							{expressList.map((item, index) => {
								return (
									<CabinetItem
										key={index}
										id={item.id}
										boxDetail={boxDetail}
										onPress={this.onPress.bind(this)}
										title={item.title}
										active={active === item.id}
										source={item.normalImg}
										acitveSource={item.activeImg}
										desc={item.desc}
									/>
								);
							})}
						</View>
					</View>
					<View style={styles.cabinet_tip}>
						<Text style={styles.cabinet_tip_text}>Tip: 柜子可免费存放三天,超出时间将收取费用</Text>
						<Text style={styles.cabinet_tip_text}>收到取衣通知后,请尽快取回您的衣物</Text>
						<Text style={styles.cabinet_tip_text}>谢谢配合!</Text>
					</View>
				</ScrollView>
				<TouchableOpacity style={styles.cabinet_item_bottom} onPress={this.onOpenCabinet.bind(this)}>
					<Text style={styles.cabinet_item_bottom_text}>打开柜子</Text>
				</TouchableOpacity>
				<Loading visible={loadingVisible} />
			</View>
		);
	}
}

let itemHeight = (width - 60) / 3 + 20;
const styles = StyleSheet.create({
	cabinet: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
	},
	detail_common_title: CommonSylte.detail_common_title,
	cabinet_item: {
		padding: 10,
		borderWidth: 0.5,
		borderColor: '#dbdbdb',
		marginBottom: 10,
	},
	cabinet_item_content: {
		flexDirection: 'row',
		height: itemHeight,
	},
	cabinet_item_bottom: {
		height: 50,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cabinet_item_bottom_text: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '800',
	},
	cabinet_tip: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cabinet_tip_text: {
		fontSize: 12,
		color: '#8a8a8a',
	},
});
