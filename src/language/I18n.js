import I18n from 'react-native-i18n';
import zh from './zh';
import en from './en';

// I18n.locale = 'zh';
I18n.locale = 'zh';

I18n.fallbacks = true;

I18n.translations = {
	en,
	zh,
};

console.log(I18n, 888);
export default I18n;
