// @flow
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Button, Icon, Toast, ToastAndroid, Body, Left, Title } from "native-base";
import styles from "./styles";


type Props = {};
export default class Token extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            token: ""
        };
    }

    signout() {
        Alert.alert(
            'Cancel',
            'Are you sure you want to go back',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.props.navigation.goBack() } },
            ],
            { cancelable: false }
        )
    }

    proceed() {
        alert("THANKS");
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Container style={{ backgroundColor: "black" }}>
                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={() => this.signout()}>
                                <Icon name="arrow-back" style={{ color: 'red' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Token Verificaation</Title>
                        </Body>
                    </Header>

                    <View style={{ flex: 1, justifyContent: "center", width: "80%", alignSelf: "center" }}>
                        <Text style={styles.txt}>Please enter your 6 digit access token that was sent to your number</Text>
                        <Form>
                            <Item regular style={styles.input}>
                                <Icon name='keypad' style={{ color: 'white' }} />
                                <Input placeholder="verification token"
                                    placeholderTextColor="white"
                                    keyboardType="numeric"
                                    style={{ color: "white" }}
                                    onChangeText={(token) => this.setState({ token })} value={this.state.token} />
                            </Item>

                            {this.state.btnClick ? <Spinner color="red" /> :
                                <Button block danger
                                    onPress={() => this.proceed()}>
                                    <Text style={styles.btnText}> Validate </Text>
                                </Button>}
                        </Form>

                        <Button transparent>
                            <Text style={styles.linkTxt}>resend token touch here!!!</Text>
                        </Button>
                    </View>

                </Container>
            </KeyboardAwareScrollView>
        );
    }
}