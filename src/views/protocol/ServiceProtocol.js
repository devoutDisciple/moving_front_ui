import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonHeader from '@/component/CommonHeader';
import { ScrollView } from 'react-native-gesture-handler';
import SafeViewComponent from '@/component/SafeViewComponent';

export default class ShopRecord extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { navigation } = this.props;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="服务协议" navigation={navigation} />
					<ScrollView style={styles.container_text} showsVerticalScrollIndicator={false}>
						<View style={styles.member_detail_content}>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;该协议用于规范所有使用MOVING洗衣软件的用户，使用该软件，须遵循以下相关条例
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;1：所有用于购买会员以及余额充值赠送的资金不予退还（如遇特殊情况，请与广州锐动洗衣有限公司协商解决，最后结果以广州锐动洗衣有限公司处理结果为准）。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;2：MOVING洗衣柜的使用费用，支付完成之后不予退还，请知悉。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;3：使用MOVING洗衣柜时，请自觉遵守软件提示相关信息，如果使用过程中造成洗衣柜人为损坏，我们将依法进行法律维权。
							</Text>
							<Text style={styles.member_detail_content_text}>&emsp;&emsp;本协议最终解释权归广州锐动洗衣有限公司所有</Text>
						</View>
					</ScrollView>
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
	container_text: {
		flex: 1,
	},
	member_detail_content: {
		margin: 10,
		shadowColor: 'green',
		shadowOffset: {
			width: 18,
			height: 20,
		},
	},
	member_detail_content_text: {
		fontSize: 13,
		lineHeight: 18,
		color: '#8a8a8a',
		marginBottom: 10,
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
