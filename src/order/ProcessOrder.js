/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, FlatList} from 'react-native';
import Empty from './component/Empty';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(1);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    // data={[{key: 'a'}, {key: 'b'}]}
                    data={[]}
                    ListEmptyComponent={<Empty />}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        );
    }
}
