// @flow
import React, { Component } from 'react';
import { Text, View, BackHandler, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content,Label, Form, Item, Input, Spinner, Button, Icon, Toast, ToastAndroid } from "native-base";
import styles from "./styles";

import axios from "axios";


type Props = {};
export default class Login extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            btnClicked: false,
            email: "",
            name: "",
            password: ""
        };
    }


    async proceed() {
        if (this.state.email != "" && this.state.password != "") {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `http://httpbin.org/post`
            try {
                const data = await axios.post(url,{
                    email: this.state.email,
                    password: this.state.password
                })
                this.setState({ btnClicked: !this.state.btnClicked });
                console.log(data);
                this.props.navigation.navigate("Token");
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

    forgot() {
        alert("not avaliable");
    }

    register() {
        alert("coming soon");
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Container style={styles.container}>
                    <View style={{ justifyContent: "center", flex: 1, }}>
                        <Text style={{ fontSize: 70, fontWeight: "400", color: "#424242" }}>V<Icon name='lock' style={{ fontSize: 50, color: "#424242" }} />ult</Text>
                    </View>

                    <View style={{ flex: 1, width: "80%" }}>
                        <Form style={{ justifyContent: "space-between" }}>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='person' style={{ color: '#424242' }} />
                                <Label>Fullname</Label>
                                <Input
                                    placeholderTextColor="#424242"
                                    keyboardType="default"
                                    style={{ color: "#424242" }}
                                    onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                            </Item>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='mail' style={{ color: '#424242' }} />
                                <Label>Email</Label>
                                <Input
                                    placeholderTextColor="#424242"
                                    keyboardType="email-address"
                                    style={{ color: "#424242" }}
                                    onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                            </Item>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='keypad' style={{ color: '#424242' }} />
                                <Label>Phone number</Label>
                                <Input
                                    placeholderTextColor="#424242"
                                    keyboardType="phone-pad"
                                    style={{ color: "#424242" }}
                                    onChangeText={(phone) => this.setState({ phone })} value={this.state.phone} />
                            </Item>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='lock' style={{ color: '#424242' }} />
                                <Label>Password</Label>
                                <Input
                                    placeholderTextColor="#424242"
                                    secureTextEntry={true}
                                    style={{ color: "#424242" }}
                                    onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                            </Item>

                        </Form>

                        {this.state.btnClicked ? <Spinner color="#263238" /> :
                            <Button block
                                style={styles.btn}
                                onPress={() => this.proceed()}>
                                <Text style={styles.btnText}> REGISTER </Text>
                            </Button>}
                    </View>
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}