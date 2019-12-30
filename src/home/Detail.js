/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class DetailScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Home',
    // };

    static navigationOptions = ({navigation, navigationOptions}) => {
        console.log(navigation, navigationOptions, 222);
        const {params} = navigation.state;
        return {
            title: 'hello',
            /* These values are used instead of the shared configuration! */
        };
    };

    goOrder() {
        console.log(this.props, 99);
        const {navigation} = this.props;
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({routeName: 'Order'})],
        // });
        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('Order');
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>这是详情页</Text>
                <Button title="去到详情页" onPress={this.goOrder.bind(this)} />
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
