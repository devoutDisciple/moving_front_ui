export default {
	// 会员等级
	filterMemberStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = '普通用户';
				break;
			case 2:
				data = 'MOVING会员';
				break;
			case 3:
				data = 'MOVING PLUS 会员';
				break;
			default:
				data = '普通用户';
		}
		return data;
	},
	// 订单
	filterOrderStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = '待店员取货';
				break;
			case 2:
				data = '清洗中';
				break;
			case 3:
				data = '待付款';
				break;
			case 4:
				data = '待取货';
				break;
			case 5:
				data = '已完成';
				break;
			case 6:
				data = '待付款';
				break;
			case 7:
				data = '积分兑换';
				break;
			case 8:
				data = '预约成功';
				break;
			default:
				data = '待取货';
		}
		return data;
	},
	filterSendStatus: function(status) {
		let data = '';
		switch (Number(status)) {
			case 1:
				data = 'MOVING洗衣柜';
				break;
			case 2:
				data = '到店自取';
				break;
			default:
				data = 'MOVING洗衣柜';
		}
		return data;
	},
	// 支付方式
	filterPayType: status => {
		let data = '';
		switch (status) {
			case 'wechat':
				data = '微信';
				break;
			case 'alipay':
				data = '支付宝';
				break;
			case 'account':
				data = '余额支付';
				break;
			default:
				data = '--';
		}
		return data;
	},
	// 消费类型：1-订单支付(order) 2-上门取衣支付(clothing) 3-充值(recharge) 4-购买会员(member) 5:保存衣物收取一元(save_clothing)
	filterConsumeType: status => {
		let data = '';
		switch (status) {
			case 'order':
				data = '订单支付';
				break;
			case 'clothing':
				data = '上门取衣支付';
				break;
			case 'recharge':
				data = '充值';
				break;
			case 'member':
				data = '购买会员';
				break;
			case 'save_clothing':
				data = '使用洗衣柜';
				break;
			default:
				data = '--';
		}
		return data;
	},
};
