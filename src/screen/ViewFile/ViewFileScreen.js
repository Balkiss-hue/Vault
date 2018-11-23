// @flow
import React, { Component } from 'react';
import { Text, View, Alert, WebView } from 'react-native';
import { Container, Header, Content, } from "native-base";
// import styles from "./styles";

import axios from "axios";



type Props = {};
export default class ViewFile extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://rnvault.herokuapp.com/' + this.props.navigation.state.params.load + ''
        };
    }

    componentWillMount() {
        console.log(this.props)
    }

    onNavigationStateChange(navState) {
        var wb_url = navState.url;
        console.log(wb_url)
        var lastPart = wb_url.substr(wb_url.lastIndexOf('.') + 1);
        if (lastPart === "pdf" || lastPart === "doc" || lastPart === "docx") {
            this.setState({ url: 'http://docs.google.com/gview?embedded=true&url=' + navState.url})
        }
    }


    render() {
        return (
            <Container>
                <StatusBar
                backgroundColor="#263238"
                barStyle="light-content"
                />
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: this.state.url }}
                    style={{ marginTop: 20 }}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
            </Container>
        );
    }
}