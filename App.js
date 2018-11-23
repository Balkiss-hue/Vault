// @flow
import React from "react";
import { Text } from "react-native";
import { Root, Container, Header, Body, Icon, Content } from "native-base";
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, DrawerItems } from "react-navigation";
import Login from "./src/screen/Login/LoginScreen";
import Dashboard from "./src/screen/Dashboard/DashboardScreen";
import Token from "./src/screen/Token/TokenScreen";
import Register from "./src/screen/Register/RegisterScreen";
import Settings from "./src/screen/Settings/SettingsScreen";
import Addfiles from "./src/screen/Addfiles/AddfilesScreen";
import FileDetails from "./src/screen/FileDetails/FileDetailsScreen";
import ViewFile from "./src/screen/ViewFile/ViewFileScreen"








const CustomDrawerComponent = (props) => (
  <Container>
    <Header style={{height:200, backgroundColor: "#263238"}}>
      <Body style={{alignItems: 'center',}}>
        <Icon style={{fontSize:70, color:"white"}} name="lock" />
        <Text style={{ fontSize:20, color:"white" }}>Vault</Text>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>
  </Container>
);

const Drawer = createDrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    Settings: { screen: Settings },
    // Addfiles: { screen: Addfiles }
  }, {
    drawerPosition: "left",
    initialRouteName: "Dashboard",
    contentComponent: CustomDrawerComponent,
    drawerWidth: 300,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

const Stack = createStackNavigator(
  {

    Login: { screen: Login },
    Token: { screen: Token },
    Dashboard: { screen: Drawer },
    Register: { screen: Register },
    Addfiles: { screen: Addfiles },
    FileDetails: { screen : FileDetails },
    ViewFile: { screen : ViewFile }
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {

    },
  }
);

const App = createSwitchNavigator(
  {
    first: Stack,
    second: Drawer
  }
)

export default () =>
  <Root>
    <App />
  </Root>;

