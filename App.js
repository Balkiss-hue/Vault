// @flow
import React from "react";
import { Root } from "native-base";
import { StatusBar } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Login from "./src/screen/Login/LoginScreen";
import Dashboard from "./src/screen/Dashboard/DashboardScreen";
import Token from "./src/screen/Token/TokenScreen";
import Register from "./src/screen/Register/RegisterScreen";



const App = StackNavigator(
  {
    Login: { screen: Login },
    Token: { screen: Token},
    Dashboard: { screen: Dashboard},
    Register: { screen: Register}
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <StatusBar
     backgroundColor="black"
     barStyle="light-content"
   />
    <App />
  </Root>;