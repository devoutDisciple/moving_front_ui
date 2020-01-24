import Toast from 'react-native-root-toast';
const toast = {
    show: title => {
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
};
export default toast;
