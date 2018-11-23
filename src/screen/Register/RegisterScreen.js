// @flow
import React, { Component } from 'react';
import { Text, View, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Label, Form, Item, Input, Spinner, Button, Icon, Toast, ToastAndroid } from "native-base";
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
            password: "",
            phone: ""
        };
    }

   async _addToDatabase(navigate, userId, name, email, password, phone) {

        if (phone != "" && password != "" && email != "" && name != "") {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `https://rnvault.herokuapp.com/user/signup`;
            try {
                const options ={
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: {
                        'email': this.state.email,
                        'password': this.state.password,
                        'username': this.state.name,
                        'phone': this.state.phone
                    },
                    url
                }
                const data = await axios(options)
                this.setState({ btnClicked: !this.state.btnClicked, password: ""  });
                console.log(data);
                Alert.alert('Success', JSON.stringify(data.data.message))
                navigate("Token",{details: data.data});
            } catch (e) {
                console.log(e);
                Alert.alert('Failed', JSON.stringify(e.response.data.message))
                //Alert.alert('Failed', 'Network Error, Kindly Connect to internet');
                this.setState({ btnClicked: !this.state.btnClicked, password: ""  });
            }
        }else {
            Toast.show({
                text: 'Kindly fill all fields!',
                buttonText: 'Okay',
                duration: 3000,
                position: "bottom"
            });
        }



    }

    render() {
        let { navigate } = this.props.navigation;

        return (
            <KeyboardAwareScrollView>
                <StatusBar
                backgroundColor="#263238"
                barStyle="light-content"
                />
                <Container style={styles.container}>
                    <View style={{ justifyContent: "center", flex: 1, }}>
                        <Text style={{ fontSize: 70, fontWeight: "400", color: "#424242" }}>V<Icon name='lock' style={{ fontSize: 50, color: "#424242" }} />ult</Text>
                    </View>

                    <View style={{ flex: 1, width: "60%" }}>
                        <Form style={{ justifyContent: "space-between" }}>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='person' style={{ color: '#424242' }} />
                                <Label>Username</Label>
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

                        {this.state.btnClicked ?  <Spinner color="#263238" /> :
                            <Button block
                                style={styles.btn}
                                onPress={() => this._addToDatabase(navigate, this.state.phone, this.state.name, this.state.email, this.state.password, this.state.phone)}>
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