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
            email: "",
            password: ""
        };
    }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    // }

    // componentWillMount() {
    //     BackHandler.removeEventListener();
    // }

    onBackButtonPressAndroid = () => {
        Alert.alert(
            'Cancel',
            'Are you sure you want to go back',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { BackHandler.exitApp() } },
            ],
            { cancelable: false }
        )
        return true;
    };

   async proceed() {
        if (this.state.email != "" && this.state.password != "") {
            this.setState({ btnClicked: !this.state.btnClicked });
            let url = `http://httpbin.org/post`;
            // this.props.navigation.navigate("Dashboard");
            try {
                const data = await axios.post(url,{
                    email: this.state.email,
                    password: this.state.password
                })
                this.setState({ btnClicked: !this.state.btnClicked });
                console.log(data);
                this.props.navigation.navigate("Dashboard");
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
        this.props.navigation.navigate("Register");
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Container style={styles.container}>
                    <View style={{ justifyContent: "center", flex: 1, }}>
                        <Text style={{ fontSize: 100, fontWeight: "400", color: "#263238" }}>V<Icon name='lock' style={{ fontSize: 70, color: '#263238' }} />ult</Text>
                    </View>

                    <View style={{ flex: 2, width: "80%", justifyContent: "center" }}>
                        <Form style={{ justifyContent: "space-between", }}>

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
                                    onPress={() => this.proceed()}>
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