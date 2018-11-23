// @flow
import React, { Component } from 'react';
import { Text, View, Alert, StatusBar, WebView } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Title, Button, Icon, Toast, Label, ToastAndroid, Card, CardItem, Body, Left, Image, Thumbnail, Right } from "native-base";
import styles from "./styles";
import RNFetchBlob from 'rn-fetch-blob'
import axios from "axios";


type Props = {};
export default class FileDetails extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            btnClicked: false,
            path: this.props.navigation.state.params.load.filelPath
        };
    }

    componentWillMount() {
        console.log(this.props, this.state.path)
    }

    _download(uri) {

        const { config, fs } = RNFetchBlob
        let date = new Date()
        let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
        console.log(fs.dirs, uri)
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: true,
                path: PictureDir + "/downloads", // this is the path where your downloaded file will live in
                description: 'Downloading image.'
            }
        }
        config(options).fetch('GET', 'https://rnvault.herokuapp.com/' + uri + '').then((res) => {
            // do some magic here
            console.log(res)
            Alert.alert("Downloaded", "file downloaded to storage at  " + res.path())
        })
    }

    _delete() {

    }

    render() {
        let uri = this.props.navigation.state.params.load.filePath
        return (
            <Container style={styles.container}>
                <StatusBar
                backgroundColor="#263238"
                barStyle="light-content"
                />
                <Header style={styles.header}>
                    <Body style={{ marginLeft: 10 }}>
                        <Title>File information</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon name="arrow-back" />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 2 }}>
                    <WebView
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        startInLoadingState={true}
                        source={{ uri: 'https://rnvault.herokuapp.com/' + uri + '' }}
                        style={{ marginTop: 5 }}
                    />
                </View>

                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>{this.props.navigation.state.params.load.fileName}</Text>
                                    <Text note>{this.props.navigation.state.params.load.fileSize}</Text>
                                    <Text note>{this.props.navigation.state.params.load.fileType}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                </View>


                <View style={{ alignContent: "center", justifyContent: "center" , alignSelf: "center", width: "60%"}}>
                    {this.state.btnClicked ? <Spinner color="#263238" /> :
                        <Button block
                            style={styles.btn}
                            onPress={() => this._download(uri)}>
                            <Text style={styles.btnText}> DOWNLOAD</Text>
                        </Button>}

                    {this.state.btnClicked ? <Spinner color="#263238" /> :
                        <Button block
                            style={styles.btn}
                            onPress={() => this._delete()}>
                            <Text style={styles.btnText}> DELETE </Text>
                        </Button>}

                </View>


            </Container>

        );
    }
}