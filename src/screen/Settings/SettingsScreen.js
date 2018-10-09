// @flow
import React, { Component } from 'react';
import { Text, View, } from 'react-native';
import {  Container, Content, List, ListItem,Button,  Icon, Left, Body, Right, Switch } from "native-base";
import styles from "./styles";

type Props = {};
export default class Settings extends Component<Props, State> {

    static navigationOptions = {
        drawerIcon: (<Icon name="settings" />)
    }


    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="plane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Airplane Mode</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="wifi" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Wi-Fi</Text>
                        </Body>
                        <Right>
                            <Text>GeekyAnts</Text>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="finger-print" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>fingerprint</Text>
                        </Body>
                        <Right>
                            <Text>On</Text>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

