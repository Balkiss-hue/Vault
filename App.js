// @flow
import React from "react";
import { Root } from "native-base";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import Login from "./src/screen/Login/LoginScreen";
import Dashboard from "./src/screen/Dashboard/DashboardScreen";
import Token from "./src/screen/Token/TokenScreen";
import Register from "./src/screen/Register/RegisterScreen";


const Drawer = createDrawerNavigator(
	{
		Dashboard: { screen: Dashboard },
	}
);

const App = createStackNavigator(
  {
    Login: { screen: Login },
    Token: { screen: Token},
    Dashboard: { screen: Dashboard},
    Drawer: { screen: Drawer },
    Register: { screen: Register}
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
    
    },
  }
);

export default () =>
  <Root>
    <App />
  </Root>;