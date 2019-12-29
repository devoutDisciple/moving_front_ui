/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTitle: 'moving',
            headerRight: () => {
                return <Text>234</Text>;
            },
            headerLeft: () => {
                return <Text>123</Text>;
            },
            headerBackTitle: '返回',
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
            },
            headerLeftContainerStyle: {
                color: 'red',
                padding: 10,
            },
            headerRightContainerStyle: {
                color: 'red',
                padding: 10,
            },
            // 整个标题的样式
            headerStyle: {
                shadowColor: '#505050',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.3,
            },
        };
    };
    componentDidMount() {
        console.log(this.props, 6789);
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
                    onPress={() =>
                        this.props.navigation.navigate('DetailScreen')
                    }
                />
                <Button
                    title="Go to test"
                    onPress={() =>
                        this.props.navigation.navigate('DetailScreen2')
                    }
                />
            </View>
        );
    }
}

export default HomeScreen;
