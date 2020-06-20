const complateHours = (hour, minutes) => {
	if (hour < 10) {
		hour = `0${hour}:${minutes}`;
	}
	if (hour >= 10) {
		hour = `${hour}:${minutes}`;
	}
	return hour;
};

export const getDayHours = () => {
	let data = [];
	for (let i = 9; i < 18; i++) {
		data.push(complateHours(i, '00'));
		data.push(complateHours(i, '30'));
	}
	return data;
};
