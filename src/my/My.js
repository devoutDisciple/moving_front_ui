/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image} from 'react-native';
import {Button, Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

//图片选择器参数设置
const options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册图片',
    // customButtons: [{name: '自定义', title: '自定义图片'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class MyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
        };
    }
    componentDidMount() {}

    choosePic() {
        console.log(123);
        ImagePicker.showImagePicker(options, response => {
            console.log(response, 11);
            if (response.didCancel) {
                console.log('用户取消了选择！');
            } else if (response.error) {
                alert('ImagePicker发生错误：' + response.error);
            } else if (response.customButton) {
                alert('自定义按钮点击：' + response.customButton);
            } else {
                let source = {uri: response.uri};
                this.setState({
                    avatarSource: source,
                });
            }
        });
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
                <Image source={this.state.avatarSource} />
            </View>
        );
    }
}
