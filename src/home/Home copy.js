/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button, TouchableOpacity, alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTitle: 'moving',
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.state.params.customAction({
                                hello: 'world',
                            })
                        }>
                        <View
                            style={{
                                width: 150,
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignSelf: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon
                                style={{width: 20, marginTop: 3}}
                                name="enviromento"
                                size={16}
                                color="#333"
                            />
                            <Text style={{flex: 1, marginTop: 2}}>
                                广州一号洗衣店
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            },
            headerLeftContainerStyle: {
                padding: 10,
            },
            headerRight: () => {
                return (
                    <Icon
                        style={{width: 20, marginTop: 3}}
                        name="aliwangwang-o1"
                        size={16}
                        color="#333"
                    />
                );
            },
            headerRightContainerStyle: {
                padding: 10,
            },
            headerBackTitle: '返回',
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
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
        const {setParams} = this.props.navigation;
        setParams({customAction: () => this.tempAction()});
    }

    tempAction() {
        let navigation = this.props.navigation;
        console.log(navigation, 11);
        console.log(navigation.state.params, 9091);
        console.log(navigation.getParam('hello'), 6789);
        console.log(
            '在导航栏按钮上调用Component内中的函数，因为static修饰的函数为静态函数，内部不能使用this',
        );
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
                {/* <Icon type="down" /> */}

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
