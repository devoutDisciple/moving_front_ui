/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
const {width, height} = Dimensions.get('window');

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        let {visible} = this.props;
        if (visible) {
            return (
                <View style={styles.container}>
                    <Spinner
                        style={styles.spinner}
                        isVisible={visible || false}
                        size={50}
                        type="Bounce"
                        color="#fb9bcd"
                    />
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'rgba(222, 219, 220, 0.4)',
        left: 0,
        top: 0,
    },
    spinner: {
        position: 'absolute',
        left: width / 2 - 25,
        top: height / 2 - 25,
    },
});
