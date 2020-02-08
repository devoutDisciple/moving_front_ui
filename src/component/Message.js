import {Alert} from 'react-native';

export default {
    warning: (title, message) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: '确定',
                },
            ],
            {cancelable: false},
        );
    },
};
