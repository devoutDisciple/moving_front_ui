import * as RNLocalize from 'react-native-localize';
import zh from './zh';
import en from './en';
let locals = RNLocalize.getLocales();
let language = zh;
if (locals && Array.isArray(locals) && locals[0] && locals[0].languageCode) {
	if (locals[0].languageCode === 'zh') {
		language = zh;
	} else {
		language = en;
	}
}
language = zh;
export default language;
