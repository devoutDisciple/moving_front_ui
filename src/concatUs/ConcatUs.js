/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Config from '../config/config';
import CommonHeader from '../component/CommonHeader';
import CommonSylte from '../style/common';
import FastImage from '../component/FastImage';
import SafeViewComponent from '../component/SafeViewComponent';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
const { width } = Dimensions.get('window');

export default class ConcatUs extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		const { navigation } = this.props;
		return (
			<SafeViewComponent>
				<View style={styles.container}>
					<CommonHeader title="关于我们" navigation={navigation} />

					<ScrollView style={styles.text_content} showsVerticalScrollIndicator={false}>
						<View style={styles.logo_container}>
							<FastImage
								style={styles.logo}
								source={{
									uri: `${Config.baseUrl}/logo.jpg`,
								}}
							/>
						</View>
						<View style={styles.detail_common_title}>
							<Text style={{ fontSize: 16, color: '#333' }}>MOVING 简介</Text>
						</View>
						<Text style={styles.text_item}>
							&emsp;&emsp;MOVING洗衣店是MOVING集团旗下的洗护品牌-集团旗下有智能健身，智能超市，智能洗衣，公务机。
						</Text>
						<Text style={styles.text_item}>
							&emsp;&emsp;我们MOVING DRY
							CLEANERS洗衣店将引用5G智慧时代推出“线上洗衣”实现智慧管理，无接触收送衣服。更贴近消费者，让消费者更舒心，更方便。
						</Text>
						<Text style={styles.text_item_weight}>&emsp;&ensp;WE WORK HARD FOR YOUR BEAUTIFUL</Text>
						<Text style={styles.text_item_weight}>&emsp;&ensp;-MORE COMFORTABLE</Text>
						<Text style={styles.text_item_weight}>&emsp;&ensp;-MORE PROFESSIONAL</Text>
						<Text style={styles.text_item_weight}>&emsp;&ensp;-MORE CONSIDERATE</Text>

						<View style={styles.detail_common_title}>
							<Text style={{ fontSize: 16, color: '#333' }}>联系我们</Text>
						</View>
						<Text style={styles.text_item}>&emsp;公司名称：广州锐动洗衣有限公司</Text>
						<Text style={styles.text_item}>&emsp;公司地址：广州市花都区新雅街清布1队中心路8号首层</Text>
					</ScrollView>
				</View>
			</SafeViewComponent>
		);
	}
}

const styles = StyleSheet.create({
	detail_common_title: CommonSylte.detail_common_title,
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	logo_container: {
		width: '100%',
		height: 0.5 * width,
		overflow: 'hidden',
	},
	logo: {
		width: width,
		height: 0.62 * width,
	},
	text_content: {
		padding: 10,
		flex: 1,
		paddingBottom: 20,
	},
	text_item: {
		fontSize: 13,
		lineHeight: 18,
		color: '#8a8a8a',
		marginBottom: 10,
	},
	text_item_bottom: {
		fontSize: 13,
		lineHeight: 18,
		color: '#8a8a8a',
		marginBottom: 20,
	},
	text_item_weight: {
		fontSize: 16,
		marginBottom: 10,
	},
});
