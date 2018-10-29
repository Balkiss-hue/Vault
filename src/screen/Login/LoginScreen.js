// @flow
import React, { Component } from 'react';
import { Text, View, BackHandler, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Button, Icon, Toast, Label, ToastAndroid } from "native-base";
import styles from "./styles";
import axios from "axios";


type Props = {};
export default class Login extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            btnClicked: false,
            phone: "",
            password: ""
        };
    }

   async _login(navigate) {
        if (this.state.phone != "" && this.state.password != "") {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `http://httpbin.org/post`;
            try {
                const data = await axios.post(url,{
                    phone: this.state.phone,
                    password: this.state.password
                })
                this.setState({ btnClicked: !this.state.btnClicked, password: ""  });
                console.log(data);
                navigate("Dashboard");
            } catch (e) {
                console.log(e);
                Alert.alert('Failed', 'Network Error, Kindly Connect to internet');
                this.setState({ btnClicked: !this.state.btnClicked, password: ""  });
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
        Alert.alert("not avaliable");
    }

    register() {
        this.props.navigation.navigate("Register");
    }

    render() {
        let { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <Container style={styles.container}>
                    <View style={{ justifyContent: "center", flex: 1, }}>
                        <Text style={{ fontSize: 100, fontWeight: "400", color: "#263238" }}>V<Icon name='lock' style={{ fontSize: 70, color: '#263238' }} />ult</Text>
                    </View>

                    <View style={{ flex: 2, width: "80%", justifyContent: "center" }}>
                        <Form style={{ justifyContent: "space-between", }}>

                            <Item floatingLabel style={styles.input}>
                                <Icon name='keypad' style={{ color: '#424242' }} />
                                <Label>Phone</Label>
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
                        <View style={{ alignContent: "center", justifyContent: "center" }}>
                            {this.state.btnClicked ? <Spinner color="#263238" /> :
                                <Button block
                                    style={styles.btn}
                                    onPress={() => this._login(navigate)}>
                                    <Text style={styles.btnText}> LOG IN </Text>
                                </Button>}
                            <Button transparent
                                onPress={() => this.forgot()}>
                                <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 16 }}>Forgot your password?</Text>
                            </Button>
                        </View>

                    </View>
                    <View style={{ justifyContent: "flex-end", flex: 0.1 }}>
                        <Button transparent
                            onPress={() => this.register()}>
                            <Text style={styles.linkTxt}>NEW HERE?  <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 16 }}>REGISTER!!!</Text></Text>
                        </Button>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}