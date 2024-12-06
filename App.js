import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen ";
import HomeScreen from "./HomeScreen ";
import SignUpScreen from "./SignUpScreen";
import Intro from "./Intro";
import VoiceRecordingApp from "./VoiceRecordingApp";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="voice">
        <Stack.Screen name="voice" component={VoiceRecordingApp} />
        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
