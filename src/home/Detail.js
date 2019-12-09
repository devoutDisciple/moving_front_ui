/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';

class DetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Hello!',
    };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>这是详情页</Text>
            </View>
        );
    }
}
DetailScreen.navigationOptions = {
    title: 'Hello!',
};

export default DetailScreen;
