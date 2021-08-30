import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const HomeScreen = ({ navigation }) => {
  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your</Text>
      <Text style={styles.headerBold}>Bookshelf</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontFamily: "DMSans_500Medium",
    fontSize: 24,
    top: windowHeight / 14,
    marginLeft: 32
  },
  headerBold: {
    fontFamily: "DMSans_500Medium",
    fontSize: 24,
  },
});
