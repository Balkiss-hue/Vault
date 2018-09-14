// @flow
import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
            password: ""
        };
    }

    proceed() {
        if(this.state.email != "" && this.state.password != "")
        {
            this.setState({ btnClick: this.state.btnClick });
            this.props.navigation.navigate("Token");
        }else {
            Toast.show({
                text: 'Kindly fill all fields!',
                buttonText: 'Okay',
                duration: 3000,
                position: "top"
              });
          }

    }

    forgot(){
        alert("not avaliable");
    }

    register(){
        alert("coming soon");
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Container style={styles.container}>
                <View style={{ justifyContent: "center", flex: 1, }}>
                    <Text style={{ fontSize: 50, fontWeight: "400", color: "white" }}>V<Icon name='lock' style={{ fontSize: 50, color: 'red' }} />ult</Text>
                </View>

                <View style={{ flex: 1, width: "70%" }}>
                    <Form style={{ justifyContent: "space-between" }}>

                        <Item regular style={styles.input}>
                            <Icon name='person' style={{ color: 'white' }} />
                            <Input placeholder="Email"
                                placeholderTextColor="white"
                                keyboardType="email-address"
                                style={{ color: "white" }}
                                onChangeText={(email) => this.setState({ email })} value={this.state.email} />
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
                                <Text style={styles.btnText}> proceed </Text>
                            </Button>}
                    </Form>
                    <Button transparent>
                        <Text style={styles.linkTxt}>Forgot your password press here!!!</Text>
                    </Button>
                </View>
                <View style={{ justifyContent: "flex-end", flex: 1 }}>
                    <Button transparent>
                        <Text style={styles.linkTxt}>new here?  touch to Register!!!</Text>
                    </Button>
                </View>
            </Container>
            </KeyboardAwareScrollView>
        );
    }
}