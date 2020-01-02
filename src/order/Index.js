/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import Allorder from './AllOrder';
import WatingOrder from './WatingOrder';
import ProcessOrder from './ProcessOrder';
import EvaluateOrder from './EvaluateOrder';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageIndex: 2,
        };
    }

    componentDidMount() {}

    // 改变tab的时候
    changeTab(data) {
        console.log(data);
        this.setState({
            currentPageIndex: data.i + 1,
        });
    }

    render() {
        let {currentPageIndex} = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    tabBarActiveTextColor="#54b974"
                    tabBarInactiveTextColor="#333"
                    style={{marginTop: 20}}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#54b974',
                        borderRadius: 3,
                    }}
                    initialPage={1}
                    onChangeTab={this.changeTab.bind(this)}
                    renderTabBar={() => <DefaultTabBar />}>
                    <Text tabLabel="全部" />
                    <Text tabLabel="待支付" />
                    <Text tabLabel="进行中" />
                    <Text tabLabel="带点评" />
                </ScrollableTabView>
                {currentPageIndex === 1 && <Allorder />}
                {currentPageIndex === 2 && <WatingOrder />}
                {currentPageIndex === 3 && <ProcessOrder />}
                {currentPageIndex === 4 && <EvaluateOrder />}
            </View>
        );
    }
}
