/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CommonHeader from '../component/CommonHeader';
import { ScrollView } from 'react-native-gesture-handler';
import SafeViewComponent from '../component/SafeViewComponent';

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
					<CommonHeader title="隐私政策" navigation={navigation} />
					<ScrollView style={styles.container_text} showsVerticalScrollIndicator={false}>
						<View style={styles.member_detail_content}>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;广告、分析服务类的授权合作伙伴。除非得到您的许可，否则我们不会将您的个人身份信息（指可以识别您身份的信息，例如姓名或电子邮箱，通过这些信息可以联系到您或识别您的身份）与提供广告、分析服务的合作伙伴分享。我们会向这些合作伙伴提供有关其广告覆盖面和有效性的信息，而不会提供您的个人身份信息，或者我们将这些信息进行汇总，以便它不会识别您个人。例如，只有在广告主同意遵守我们的广告发布准则后，我们才可能会告诉广告主他们广告的效果如何，或者有多少人看了他们广告或在看到广告后安装了应用，或者向这些合作伙伴提供不能识别个人身份的人口统计信息（例如“位于北京的25岁男性，喜欢软件开发”），帮助他们了解其受众或顾客。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与“服务”之间交换数据（如信用卡信息）时受
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;我们将定期更新并公开安全风险、个人信息安全影响评估等报告的有关内容。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
							</Text>
							<Text style={styles.member_detail_content_text}>
								&emsp;&emsp;在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
							</Text>
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
