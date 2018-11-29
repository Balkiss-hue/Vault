// @flow
import React, { Component } from 'react';
import { Text, View, Alert, FlatList,Linking , StatusBar, ActivityIndicator, WebView, BackHandler, ScrollView } from 'react-native';
import { Container, Header, Content, Right, Body, Button, Icon, Card, CardItem, Title, Left, Subtitle, List, ListItem, Thumbnail, Fab } from "native-base";
import styles from "./styles";
import axios from 'axios';

type Props = {};
export default class Dashboard extends Component<Props, State> {

    static navigationOptions = {
        drawerIcon: (<Icon name="home" />)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }
    
    onBackButtonPressAndroid = () => {
        Alert.alert(
            'Cancel',
            'Are you sure you want to go back',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.props.navigation.goBack(null) } },
            ],
            { cancelable: false }
        )
        return true;
    };

    async componentWillMount() {
        this._getList();
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
        console.log(this.props)
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this._getList() });
    }

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isFetching: false
        };
        this.onBackButtonPressAndroid = this.onBackButtonPressAndroid.bind(this);
    }

    async _getList() {
        const load = {
            userId: this.props.navigation.state.params.details.userId,
            token: this.props.navigation.state.params.details.token,
            name: this.props.navigation.state.params.details.username
        }
        let url = `https://rnvault.herokuapp.com/files/user/` + load.userId;

        try {
            const options = {
                method: 'GET',
                headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + load.token + '' },
                url
            }
            const data = await axios(options)
            console.log(data.data.file);
            this.setState({ files: data.data.fileInfo, isFetching: false });
            console.log(this.state.files)
        } catch (e) {
            console.log(e)
        }
    }

    async _accessItem(item) {
        this.props.navigation.navigate('FileDetails', { load: item })
    }


    uploadTostore() {

    }



    render() {
        // let load = Object.values(this.state.files);
     
        return (
            <Container style={styles.container}>
                <StatusBar
                backgroundColor="#263238"
                barStyle="light-content"
                />
                <Header style={styles.header}>
                    <Body style={{ marginLeft: 10 }}>
                        <Title>Welcome {this.props.navigation.state.params.details.username}</Title>
                        <Subtitle>Dashboard</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <ScrollView 
                style={{flex:1}}
                 onRefresh={() => this.onRefresh()}
                 refreshing={this.state.isFetching}>
                    <Content padder>
                    <FlatList
                        data={this.state.files}
                        renderItem={({ item }) => {
                            return (
                                <View style={{}}>
                                    <Card>
                                        <CardItem thumbnail onPress={() => { this._accessItem(item) }}>
                                            <Left>
                                                <Body>
                                                    <Text onPress={() => { this._accessItem(item) }}>{item.fileName}</Text>
                                                    <Text note>{item.fileSize}KB</Text>
                                                </Body>
                                            </Left>
                                            <Right>
                                                <Button transparent
                                                    onPress={() => Linking.openURL('https://rnvault.herokuapp.com/' + item.filePath + '')}>
                                                    <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>View</Text>
                                                </Button>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </View>
                            );
                        }}
                        keyExtractor={item => item._id}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                    >
                    </FlatList>
                </Content>
                </ScrollView> 
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#263238" }}
                    position="bottomLeft"
                    onPress={() => this.props.navigation.navigate('Addfiles', { userId: this.props.navigation.state.params.details.userId })}>
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}

