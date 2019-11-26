/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('./images/1.jpg')}
                style={{width: 30, height: 30}}
            />
        );
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerBackTitle: 'sssss',
        headerTruncatedBackTitle: 'to A',

        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() =>
                        this.props.navigation.navigate('Details', {
                            itemId: parseInt(Math.random() * 100) + 'ddd',
                            otherParam: 'anything you want here',
                        })
                    }
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Details',
    // };
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('itemId', 86),
            headerTitle: () => <LogoTitle />,
            headerRight: () => (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#333333">
                    hello
                </Button>
            ),
        };
    };
    render() {
        const {navigation} = this.props;
        console.log(navigation.getParam('itemId', 23));
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text>DetailsScreen</Text>
                <Button
                    title="Go to home... again"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
});

export default createAppContainer(AppNavigator);
