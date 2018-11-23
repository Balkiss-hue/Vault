// @flow
import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Button, Icon,Label, Toast, ToastAndroid, Body, Left, Title } from "native-base";
import styles from "./styles";

import axios from "axios";



type Props = {};
export default class Token extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            btnClicked: false
        };
    }

    componentWillMount(){
        console.log(this.props)
        console.log(this.props.navigation.state.params.details.details.phone)
    }

    

    async proceed() {
        if (this.state.token != "") {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `https://rnvault.herokuapp.com/user/verify`;
            try {
                const options ={
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: {
                        'phone': ''+this.props.navigation.state.params.details.details.phone+'',
                        'sms': this.state.token
                    },
                    url
                }
                const data = await axios(options)
                this.setState({ btnClicked: !this.state.btnClicked });
                console.log(data);
                this.props.navigation.navigate("Dashboard",{details: this.props.navigation.state.params.details});
            } catch (e) {
                console.log(e);
                Alert.alert('Failed', 'Network Error, Kindly Connect to internet');
                this.setState({ btnClicked: !this.state.btnClicked });
            }
        } else {
            Toast.show({
                text: 'Kindly fill all fields!',
                buttonText: 'Okay',
                duration: 3000,
                position: "top"
            });
        }

    }

    sendToken(){
        Alert.alert("Token sent!!")
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <StatusBar
                backgroundColor="#263238"
                barStyle="light-content"
                />
                <Container style={styles.container}>
                    <View style={{ flex: 1, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                        <Icon name="mail" style={{ fontSize: 50, color: '#263238' }} />
                        <Text style={{ fontSize: 30, color: '#424242' }}>Enter SMS Code</Text>
                    </View>
                    <View style={{ flex: 1, alignContent: "center", width: "70%", alignSelf: "center" }}>
                        <Text style={styles.txt}>Please check your phone and email you have recieved a message from us with your token</Text>
                        <Form>
                            <Item floatingLabel
                                style={styles.input}>
                                <Icon name='lock' style={{ color: '#424242' }} />
                                <Label>SMS code</Label>
                                <Input
                                    placeholderTextColor="#424242"
                                    keyboardType="numeric"
                                    style={{ color: "#424242" }}
                                    onChangeText={(token) => this.setState({ token })} value={this.state.token} />
                            </Item>

                            {this.state.btnClicked ? <Spinner color="#263238" /> :
                                <Button block
                                    style={styles.btn}
                                    onPress={() => this.proceed()}>
                                    <Text style={styles.btnText}> VALIDATE </Text>
                                </Button>}
                        </Form>
                    </View>
                    <View style={{ justifyContent: "flex-end", flex: 0.1, margin: 5 }}>
                        <Button transparent
                            onPress={() => this.sendToken()}>
                            <Text style={styles.linkTxt}>DIDN'T RECIEVE CODE</Text>
                        </Button>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}