// @flow
import React, { Component } from 'react';
import { Text, View, Alert, FlatList, StatusBar } from 'react-native';
import { Container, Header, Content, Right, Body, Button, Icon, Card, CardItem, Title, Left, Subtitle, List, ListItem, Thumbnail, Fab } from "native-base";
import styles from "./styles";


type Props = {};
export default class Dashboard extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            files: ["My CV.doc", "android.mkv", "TERM project.pdf", "images.jpg", "mya Tv.tv", "seriesa.ep", "TERMa project.pdf", "imagesa.jpg", "my Tvd.tv", "seriesf.ep"],
            active: 'true'
        };
    }
    static navigationOptions = {
        drawerLabel: 'Home'
    };
    back() {
        this.props.navigation.goBack();
    }
    signout() {
        Alert.alert(
            'Cancel',
            'Are you sure you want to go back',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => { this.props.navigation.goBack() } },
            ],
            { cancelable: false }
        )
    }
    menu() {
        this.props.navigation.navigate("DrawerOpen");
    }

    render() {
        return (
            <Container style={styles.container}>
                <StatusBar
                    backgroundColor="#263238"
                    barStyle="light-content"
                />
                <Header style={styles.header}>
                    <Left>
                        <Button transparent
                            onPress={() => this.back()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{}}>
                        <Title>Welcome Attasiem</Title>
                        <Subtitle>Dashboard</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <FlatList
                        data={this.state.files}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ padding: 6 }}>
                                    <List>
                                        <ListItem thumbnail>
                                            <Left>
                                                <Thumbnail square source={{ uri: 'Image URL' }} />
                                            </Left>
                                            <Body>
                                                <Text>Attasiem</Text>
                                                <Text note numberOfLines={1}>{item}</Text>
                                            </Body>
                                            <Right>
                                                <Button transparent>
                                                    <Text>View</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    </List>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => item}
                    >
                    </FlatList>
                </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#263238" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}
