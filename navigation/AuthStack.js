import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from "../screens/OnboardingScreen"; 
import HomeScreen from "../screens/HomeScreen";
import AppStack from "./AppStack";

const Stack = createStackNavigator();

const AuthStack = () => {

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Onboarding";
  } else {
    routeName = "AppStack";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{header: () => null}} />
        <Stack.Screen name="AppStack" component={AppStack} options={{header: () => null}} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
