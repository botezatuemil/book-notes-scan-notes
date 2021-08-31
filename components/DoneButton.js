import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useNavigation } from '@react-navigation/native';


const DoneButton = () => {
  const navigation = useNavigation();

  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('AppStack')}>
      <Text style={styles.text}>Get Started</Text>
    </TouchableOpacity>
  );
};

export default DoneButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -scale(200),
    backgroundColor: '#282536',
    alignItems: 'center',
    height: 41,
    width: windowWidth / 1.2,
    borderRadius: 20,
    alignSelf: 'center'
  },
  text: {
      fontFamily: 'DMSans_700Bold',
      fontSize: 16,
      color: '#fff',
      top: scale(8),
   }
});
