// @flow
import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Login from "./src/screen/Login/LoginScreen";
import Dashboard from "./src/screen/Dashboard/DashboardScreen";
import Token from "./src/screen/Token/TokenScreen";



const App = StackNavigator(
  {
    Login: { screen: Login },
    Token: { screen: Token},
    Dashboard: { screen: Dashboard}
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;