export const INIT_BOX_STATE = {
	INIT_BOX_STATE: [
		{
			id: 'smallBox',
			title: '叠柜',
			desc: '限重一公斤',
			normalImg: require('@/asserts/public/express_little.png'),
			activeImg: require('@/asserts/public/express_little_active.png'),
			empty: 0,
			used: 0,
		},
		{
			id: 'middleBox',
			title: '挂柜',
			desc: '限重三公斤',
			normalImg: require('@/asserts/public/express_middle.png'),
			activeImg: require('@/asserts/public/express_middle_acitve.png'),
			empty: 0,
			used: 0,
		},
	],
};

export const EXPRESS_LIST = [
	{
		id: 'smallBox',
		title: '小格口',
		desc: '限重一公斤',
		normalImg: require('@/asserts/public/express_little.png'),
		activeImg: require('@/asserts/public/express_little_active.png'),
	},
	{
		id: 'middleBox',
		title: '中格口',
		desc: '限重三公斤',
		normalImg: require('@/asserts/public/express_middle.png'),
		activeImg: require('@/asserts/public/express_middle_acitve.png'),
	},
	{
		id: 'bigBox',
		title: '大格口',
		desc: '限重五公斤',
		normalImg: require('@/asserts/public/express_big.png'),
		activeImg: require('@/asserts/public/express_big_active.png'),
	},
];
