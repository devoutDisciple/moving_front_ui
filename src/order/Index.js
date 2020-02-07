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
            currentPageIndex: 1,
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
                <View
                    style={{
                        height: 50,
                        marginTop: 20,
                    }}>
                    <ScrollableTabView
                        tabBarActiveTextColor="#fb9dd0"
                        tabBarInactiveTextColor="#333"
                        tabBarUnderlineStyle={{
                            backgroundColor: '#fb9dd0',
                            borderWidth: 0,
                            borderRadius: 3,
                        }}
                        initialPage={0}
                        onChangeTab={this.changeTab.bind(this)}
                        renderTabBar={() => (
                            <DefaultTabBar containerWidth={100} />
                        )}>
                        <Text style={{height: 0}} tabLabel="全部" />
                        <Text style={{height: 0}} tabLabel="待支付" />
                        <Text style={{height: 0}} tabLabel="进行中" />
                        <Text style={{height: 0}} tabLabel="待点评" />
                    </ScrollableTabView>
                </View>
                {currentPageIndex === 1 && <Allorder />}
                {currentPageIndex === 2 && <WatingOrder />}
                {currentPageIndex === 3 && <ProcessOrder />}
                {currentPageIndex === 4 && <EvaluateOrder />}
            </View>
        );
    }
}
