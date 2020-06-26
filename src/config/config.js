let flag = true; // true - 线上环境
// let flag = false; //  false-线下环境
export default {
	baseUrl: flag ? 'http://47.107.43.166:3001' : 'http://127.0.01:3001',
	AppStoreId: '1518058596',
	currentVersion: '2.0.0', // 目前版本
	sercurity_code_time: 60, //验证码的过期时间
	pickCommonConfig: {
		pickerConfirmBtnText: '确认',
		pickerCancelBtnText: '取消',
		pickerTitleText: '',
		pickerConfirmBtnColor: [251, 156, 206, 1],
		pickerCancelBtnColor: [196, 199, 206, 1],
		pickerTitleColor: [251, 156, 206, 1],
	},
	appid: 'wxcf235c09083c777a', // 微信开放平台申请的appid
	partnerId: '1582660231', // 微信支付的商家后台id
	package: 'com.moving.dry.cleaner', // 商家根据财付通文档填写的数据和签名
	map_key_IOS: 'c0ec8c9c3924a698ca4e89099a2bed27', // 高德地图ios的key
	map_key_android: '2f9deb208364c088f3154ca2ee5a7bf3', // 高德地图安卓的key

	PAY_MONEY_FOR_BALANCE: [
		{
			pay: 1000,
			given: 400,
		},
		{
			pay: 600,
			given: 200,
		},
		{
			pay: 500,
			given: 150,
		},
		{
			pay: 200,
			given: 30,
		},
	],
};
