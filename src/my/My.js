/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
// import {Avatar} from 'react-native-elements';
import {Button, Avatar} from 'react-native-elements';

export default class MyScreen extends React.Component {
    componentDidMount() {}

    choosePic() {
        console.log(123);
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                }}>
                <Avatar
                    size="large"
                    rounded
                    source={{
                        uri:
                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                    onPress={this.choosePic.bind(this)}
                    activeOpacity={0.7}
                    // showEditButton={true}
                />
            </View>
        );
    }
}
