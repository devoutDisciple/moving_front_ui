/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'react-native';

export default class HomeScreen extends React.Component {
    componentDidMount() {
        // fetch('http://localhost:8888/hello', {
        //     method: 'GET',
        // }).then(res => {
        //     console.log(res);
        //     res.json().then(hello => {
        //         console.log(hello);
        //     });
        // });
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>这是主页</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Detail')}
                />
            </View>
        );
    }
}
