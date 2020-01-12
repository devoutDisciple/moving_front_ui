/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import request from '../../util/request';

export default class OrderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: '',
        };
    }

    componentDidMount() {}

    // 点击上传图片
    uploadImg() {
        console.log(123);
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '图片库',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 600,
            maxHeight: 600,
            aspectX: 2,
            aspectY: 1,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton,
                );
            } else {
                const source = {uri: response.uri};
                console.log(response, 999);
                let data = new FormData();
                let file = response.uri.replace('file://', '');
                console.log(file, 333);
                let postData = {
                    uri: file,
                    type: 'application/octet-stream',
                    name: 'image.jpg',
                };
                data.append('file', response.data);
                request.post('/login/upload', data);
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

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
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: '#bfbfbf'}}>
                    这是设置页面
                </Text>
                <Button title="上传图片" onPress={this.uploadImg.bind(this)} />
                <Image
                    source={this.state.avatarSource}
                    style={{borderRadius: 75, width: 150, height: 150}}
                />
            </View>
        );
    }
}
