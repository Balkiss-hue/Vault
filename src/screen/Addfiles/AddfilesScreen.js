// @flow
import React, { Component } from 'react';
import { Text, View, Alert, FlatList, StatusBar } from 'react-native';
import { Container, Header, Content, Right, Body, Button, Icon, Card, CardItem, Title, Left, Subtitle, List, ListItem, Thumbnail, Fab } from "native-base";
import styles from "./styles";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';


type Props = {};
export default class Addfiles extends Component<Props, State> {

    static navigationOptions = {
        drawerIcon: (<Icon name="add" />)
    }


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _addToDatabase() {

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

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar
                    backgroundColor="#263238"
                    barStyle="light-content"
                />
                <Header style={styles.header}>
                    <Body style={{ marginLeft: 10 }}>
                        <Title>Add your file</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.goBack()} >
                            <Icon name="arrow-back" />
                        </Button>
                    </Right>
                </Header>

                <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
                    <Button block
                        style={styles.btn}
                        onPress={() => this.showPicker()}>
                        <Text style={styles.btnText}> upload </Text>
                    </Button>
                </View>

            </Container>
        );
    }
}

