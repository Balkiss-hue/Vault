// @flow
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Item, Input, Icon, Toast, Form, Button } from "native-base";
import styles from "./styles";


type Props = {};
export default class Token extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text >To get started, edit App.js</Text>

                <Button rounded onPress={() => this.props.navigation.navigate("Dashboard")} style={styles.btn} >
                    <Text style={styles.btnText}>All fine, Proceed</Text>
                </Button>
            </View>
        );
    }
}