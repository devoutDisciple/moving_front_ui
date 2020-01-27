import Toast from 'react-native-root-toast';
const toast = {
    success: title => {
        Toast.show(title, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            backgroundColor: '#fb9bcd',
            hideOnPress: true,
            shadowColor: '#f9b3d8',
            delay: 0,
        });
    },
    error: title => {
        Toast.show(title, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            backgroundColor: 'red',
            hideOnPress: true,
            shadowColor: '#fba2a2',
            delay: 0,
        });
    },
    warning: title => {
        Toast.show(title, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            backgroundColor: '#faae15',
            hideOnPress: true,
            shadowColor: '#fde0a6',
            delay: 0,
        });
    },
};
export default toast;
