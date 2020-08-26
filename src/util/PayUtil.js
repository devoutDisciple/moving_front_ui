import * as WeChat from 'react-native-wechat-lib';
import Request from './Request';
import config from '../config/config';

export default {
	// 微信支付
	payMoneyByWeChat: ({ money, desc, ...rest }) => {
		return new Promise(async (resolve, reject) => {
			try {
				let isWXAppInstalled = await WeChat.isWXAppInstalled();
				if (!isWXAppInstalled) {
					return reject('未下载微信');
				}
				let result = await Request.post('/pay/payOrderByWechat', { money: money, desc: desc, ...rest });
				console.log(result, 9898);
				let data = result.data;
				let params = {
					appId: config.appid,
					partnerId: config.partnerId, // 商家向财付通申请的商家ID
					prepayId: data.prepay_id, // 预支付订单ID
					nonceStr: data.nonceStr, // 随机串
					timeStamp: data.timeStamp, // 时间戳
					package: data.package, // 商家根据财付通文档填写的数据和签名
					sign: data.newSign, // 商家根据微信开放平台文档对数据做的签名
				};
				// 第三步，调起微信客户端支付
				WeChat.pay(params)
					.then(response => {
						let errorCode = Number(response.errCode);
						if (errorCode === 0) {
							return resolve('success');
						} else {
							return reject('response.errStr');
						}
					})
					.catch(error => {
						console.log(error);
						let errorCode = Number(error.code);
						if (errorCode === -2) {
							return reject('已取消支付');
						} else {
							return reject('支付失败');
						}
					});
			} catch (error) {
				return reject('系统开小差了，请稍后重试');
			}
		});
	},
};
