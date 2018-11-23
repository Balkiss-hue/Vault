// @flow
import React, { Component } from 'react';
import { Text, View, BackHandler, Alert, StatusBar, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Button, Icon, Toast, Label, ToastAndroid } from "native-base";
import styles from "./styles";
import axios from "axios";
import SplashScreen from "react-native-splash-screen";
import TouchID from 'react-native-touch-id'

type Props = {};
export default class Login extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            btnClicked: false,
            phone: "",
            password: "",
            biometricType: null
        };
    }
    optionalConfigObject = {
        title: "Authentication Required", // Android
        color: "#e00606", // Android,
        fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
    }



    componentDidMount() {
        SplashScreen.hide();

        TouchID.isSupported()
            .then(biometryType => {
                this.setState({ biometryType });
                console.log(biometryType)
            })

    }

    clickHandler() {
        TouchID.isSupported()
            .then(authenticate)
            .catch(error => {
                Alert.alert('TouchID not supported');
                console.log(error)
            });
    }

    async _login(navigate) {
        if (this.state.email != "" && this.state.password != "") {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `http://172.20.10.6:3000/user/login`;
            try {
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: {
                        'phone': this.state.phone,
                        'password': this.state.password
                    },
                    url
                }
                const data = await axios(options)
                this.setState({ btnClicked: !this.state.btnClicked, password: "" });
                console.log(data);
                Alert.alert('Success', JSON.stringify(data.data.message))
                navigate("Dashboard", { details: data.data });
            } catch (e) {
                console.log(e);
                //Alert.alert('Failed', JSON.stringify(e.response.data.message))
                Alert.alert('Failed', 'Network Error, Kindly Connect to internet');
                this.setState({ btnClicked: !this.state.btnClicked, password: "" });
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
                <StatusBar
                    backgroundColor="#263238"
                    barStyle="light-content"
                />
                <Container style={styles.container}>
                    <View style={{ justifyContent: "center", flex: 1, }}>
                        <Text style={{ fontSize: 100, fontWeight: "400", color: "#263238" }}>V<Icon name='lock' style={{ fontSize: 70, color: '#263238' }} />ult</Text>
                    </View>
                    <View style={{ flex: 2, width: "60%", justifyContent: "center" }}>
                        <Form style={{ justifyContent: "space-between", }}>

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
                                    keyboardType="numbers-and-punctuation"
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
                                <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>Forgot your password?</Text>
                            </Button>
                        </View>

                        <TouchableHighlight
                            style={styles.btn}
                            onPress={this.clickHandler}
                            underlayColor="#0380BE"
                            activeOpacity={1}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: '600'
                            }}>
                                {`Authenticate with ${this.state.biometryType}`}
                            </Text>
                        </TouchableHighlight>

                    </View>
                    <View style={{ justifyContent: "flex-end", flex: 0.1 }}>
                        <Button transparent
                            onPress={() => this.register()}>
                            <Text style={styles.linkTxt}>NEW HERE?  <Text style={{ color: "#263238", fontWeight: "bold", fontSize: 14 }}>REGISTER!!!</Text></Text>
                        </Button>
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}
function authenticate() {
    return TouchID.authenticate()
        .then(success => {
            Alert.alert('Authenticated Successfully');
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.message);
        });
}