import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Svg, { Path } from "react-native-svg";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import Favorite from "../screens/FavoriteScreen";
import Settings from "../screens/SettingsScreen";
import AddBookScreen from "../screens/AddBookScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AddBookScreen" component={AddBookScreen} />
    </Stack.Navigator>
  );
};

const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoriteScreen" component={Favorite} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={Settings} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Tab.Navigator

      barStyle={{
        //position: 'absolute',
        backgroundColor: "#191822",
        height: 56,
        overflow: 'hidden',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: <Text style={styles.homeText}>Home</Text>,
          headerShown: false,
          tabBarIcon: ({ props, focused }) => {
            const color = focused ? "#fff" : "#A4A4A4";
            return (
              <Svg
                style={{top: 2}}
                width={15}
                height={16}
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
              >
                <Path
                  d="M13.792 6.193L7.428.173A.623.623 0 007 0a.623.623 0 00-.429.172L.208 6.193a.662.662 0 00-.208.49v7.655c0 .175.067.344.186.468.12.124.282.194.45.194h12.728c.168 0 .33-.07.45-.194a.676.676 0 00.186-.468V6.684a.685.685 0 00-.208-.49z"
                  fill={color}
                />
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        options={{
          tabBarLabel: <Text style={styles.homeText}>Favorite</Text>,
          headerShown: false,
          tabBarIcon: ({ props, focused }) => {
            const color = focused ? "#fff" : "#A4A4A4";
            return (
              <Svg
                style={{top: 2}}
                width={12}
                height={16}
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
              >
                <Path
                  d="M12 16l-6-3.333L0 16V.667A.667.667 0 01.667 0h10.666A.667.667 0 0112 .667V16z"
                  fill={color}
                />
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: <Text style={styles.homeText}>Settings</Text>,
          headerShown: false,
          tabBarIcon: ({ props, focused }) => {
            const color = focused ? "#fff" : "#A4A4A4";
            return (
              <Svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.53 11.858a7.18 7.18 0 00.055-.858c0-.297-.022-.583-.066-.858l1.859-1.452a.455.455 0 00.11-.561l-1.76-3.047a.447.447 0 00-.54-.198L15 5.764a6.445 6.445 0 00-1.485-.858l-.33-2.332a.44.44 0 00-.44-.374h-3.52a.428.428 0 00-.43.374l-.33 2.332a6.617 6.617 0 00-1.484.858l-2.19-.88a.435.435 0 00-.538.198l-1.76 3.047a.426.426 0 00.11.561l1.859 1.452a5.529 5.529 0 00-.077.858c0 .286.022.583.066.858L2.59 13.31a.455.455 0 00-.11.561l1.76 3.047c.11.198.342.264.54.198l2.189-.88c.462.352.946.638 1.485.858l.33 2.332c.044.22.22.374.44.374h3.52a.42.42 0 00.429-.374l.33-2.332a6.617 6.617 0 001.485-.858l2.189.88c.198.077.429 0 .539-.198l1.76-3.047a.426.426 0 00-.11-.561l-1.837-1.452zM10.985 14.3a3.31 3.31 0 01-3.3-3.3 3.31 3.31 0 013.3-3.3 3.31 3.31 0 013.3 3.3 3.31 3.31 0 01-3.3 3.3z"
                  fill={color}
                />
              </Svg>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  homeText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
    
  },
});
