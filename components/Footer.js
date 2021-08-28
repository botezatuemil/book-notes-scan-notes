import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const Footer = ({data}) => {
  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      {data.id === 1 || data.id === 2 ? (
          <Text style={{top: -windowHeight / 7,}}>skip</Text>
      ) : (
          <Text style={{top: -windowHeight / 7,}}>next</Text>
      )
    }
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
