import React from 'react';
import SugItem from './SugItem';
import Screen from '@/util/Screen';
import Request from '@/util/Request';
import Storage from '@/util/Storage';
import Toast from '@/component/Toast';
import CommonHeader from '@/component/CommonHeader';
import SafeViewComponent from '@/component/SafeViewComponent';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

export default class Suggestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: ['安全问题：密码, 隐私, 欺诈等', '产品建议：用的不爽, 我有建议', '功能异常：功能故障或不可用', '其他问题'],
			activeIndex: 0, // 默认的选择
			value: '',
		};
	}

	componentDidMount() {}

	async onSubmit() {
		let user = await Storage.get('user');
		let { activeIndex, value, data } = this.state;
		let params = {
			userid: user.id,
			option: data[activeIndex],
			desc: value,
		};
		let result = await Request.post('/options/add', params);
		if (result.data === 'success') {
			Toast.success('感谢您的宝贵意见,我们将尽快给您反馈');
		}
	}

	render() {
		const { navigation } = this.props,
			{ data, activeIndex } = this.state;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="意见反馈" navigation={navigation} />
					<ScrollView style={styles.suggest} showsVerticalScrollIndicator={false}>
						<View style={styles.suggest_title}>
							<Text style={{ fontSize: 13, color: '#8a8a8a' }}>请选择您想反馈的问题点</Text>
						</View>
						<View style={styles.suggest_content}>
							{data.map((item, index) => {
								return (
									<SugItem
										key={index}
										text={item}
										onPress={() => this.setState({ activeIndex: index })}
										active={activeIndex === index}
									/>
								);
							})}
						</View>
						<View style={styles.suggest_title}>
							<Text style={{ fontSize: 13, color: '#8a8a8a' }}>请补充详细问题和建议</Text>
						</View>
						<TextInput
							multiline
							maxLength={200}
							blurOnSubmit={true}
							returnKeyType="done"
							keyboardType="default"
							textAlignVertical="top"
							style={styles.suggest_input}
							underlineColorAndroid="transparent"
							onChangeText={value => this.setState({ value })}
							placeholder="请描述您使用此软件遇到的问题和意见(200字以内)"
						/>
					</ScrollView>
					<TouchableOpacity style={styles.bottom_btn} onPress={this.onSubmit.bind(this)}>
						<Text style={styles.bottom_btn_text}>提交</Text>
					</TouchableOpacity>
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
	suggest: {
		flex: 1,
	},
	suggest_title: {
		height: 30,
		backgroundColor: '#f2f3f7',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	suggest_content: {
		paddingHorizontal: 10,
	},
	suggest_input: {
		height: 150,
		borderColor: '#dbdbdb',
		borderWidth: 0.5,
		marginHorizontal: 10,
		marginVertical: 5,
		textAlignVertical: 'top',
		padding: 5,
	},
	bottom_btn: {
		height: 50,
		width: Screen.width - 40,
		marginLeft: 20,
		backgroundColor: '#fb9dd0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		borderRadius: 50,
	},
	bottom_btn_text: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '800',
	},
});
