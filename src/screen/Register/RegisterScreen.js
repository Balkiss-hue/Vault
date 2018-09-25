// @flow
import React, { Component } from 'react';
import { Text, View, BackHandler, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Container, Header, Content, Form, Item, Input, Spinner, Button, Icon, Toast, ToastAndroid } from "native-base";
import styles from "./styles";


type Props = {};
export default class Login extends Component<Props, State> {

    constructor(props) {
        super(props);
        
        this.state = {
            btnClick: false,
            email: "", 
            name: "",
            password: ""
        };
    }


    proceed() {
        if (this.state.email != "" && this.state.password != "") {
            this.setState({ btnClick: this.state.btnClick });
            this.props.navigation.navigate("Token");
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
                        <Text style={{ fontSize: 50, fontWeight: "400", color: "white" }}>V<Icon name='lock' style={{ fontSize: 50, color: 'red' }} />ult</Text>
                    </View>

                    <View style={{ flex: 1, width: "80%" }}>
                        <Form style={{ justifyContent: "space-between" }}>

                            <Item regular style={styles.input}>
                                <Icon name='person' style={{ color: 'white' }} />
                                <Input placeholder="Fullname"
                                    placeholderTextColor="white"
                                    keyboardType="default"
                                    style={{ color: "white" }}
                                    onChangeText={(name) => this.setState({ name })} value={this.state.name} />
                            </Item>

                            <Item regular style={styles.input}>
                                <Icon name='mail' style={{ color: 'white' }} />
                                <Input placeholder="Email"
                                    placeholderTextColor="white"
                                    keyboardType="email-address"
                                    style={{ color: "white" }}
                                    onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                            </Item>

                            <Item regular style={styles.input}>
                                <Icon name='keypad' style={{ color: 'white' }} />
                                <Input placeholder="Phone number"
                                    placeholderTextColor="white"
                                    keyboardType="phone-pad"
                                    style={{ color: "white" }}
                                    onChangeText={(phone) => this.setState({ phone })} value={this.state.phone} />
                            </Item>

                            <Item regular style={styles.input}>
                                <Icon name='lock' style={{ color: 'white' }} />
                                <Input placeholder="Password"
                                    placeholderTextColor="white"
                                    secureTextEntry={true}
                                    style={{ color: "white" }}
                                    onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                            </Item>


                            {this.state.btnClick ? <Spinner color="red" /> :
                                <Button block danger
                                    onPress={() => this.proceed()}>
                                    <Text style={styles.btnText}> Register </Text>
                                </Button>}
                        </Form>
                        
                    </View>
                    <View style={{ justifyContent: "flex-end", flex: 1 }}>
                        
                    </View>
                </Container>
            </KeyboardAwareScrollView>
        );
    }
}