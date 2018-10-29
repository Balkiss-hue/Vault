// @flow
import React, { Component } from 'react';
import { Text, View, Alert, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Right, Body, Button, Icon, Card, CardItem, Title, Left, Subtitle, List, ListItem, Thumbnail, Fab } from "native-base";
import styles from "./styles";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

type Props = {};
export default class Dashboard extends Component<Props, State> {

    static navigationOptions = {
        drawerIcon: (<Icon name="home" />)
    }

    showPicker() {
        // iPhone/Android
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            // Android
             if(res != null){
                console.log(
                    res.uri,
                    res.type, // mime type
                    res.fileName,
                    res.fileSize
                );
                Alert.alert('upload successfull', res.fileName);
            } else {
                console.log(error)
            }
        });
    }
    
    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    // }

    // componentWillMount() {
    //     BackHandler.removeEventListener();
    // }
    // onBackButtonPressAndroid = () => {
    //     Alert.alert(
    //         'Cancel',
    //         'Are you sure you want to go back',
    //         [
    //             { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //             { text: 'OK', onPress: () => { BackHandler.exitApp() } },
    //         ],
    //         { cancelable: false }
    //     )
    //     return true;
    // };


    constructor(props) {
        super(props);
        this.state = {
            files: {}
        };
    }



    render() {
        let load = Object.values(this.state.files);
        return (
            <Container style={styles.container}>
                <StatusBar
                    backgroundColor="#263238"
                    barStyle="light-content"
                />
                <Header style={styles.header}>
                    <Body style={{ marginLeft: 10 }}>
                        <Title>Welcome Attasiem</Title>
                        <Subtitle>Dashboard</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()} >
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <FlatList
                        data={load}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{}}>
                                    {console.log(load)}
                                    <List>
                                        <ListItem>
                                            <Body>
                                                <Text>{item}</Text>
                                            </Body>
                                        </ListItem>
                                    </List>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => item}
                    >
                    </FlatList>
                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#263238" }}
                    position="bottomRight"
                    onPress={() => this.showPicker()}>
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}

