export const INIT_BOX_STATE = {
	INIT_BOX_STATE: {
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
};

export const EXPRESS_LIST = [
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
];
