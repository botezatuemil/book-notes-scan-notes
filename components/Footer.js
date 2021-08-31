import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import slides from "../utils/slides";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from '@react-navigation/native';

const Footer = ({scrollTo, props}) => {
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerSkip} onPress={() => navigation.navigate('AppStack')}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerNext} onPress={scrollTo}>
        <Text style={styles.next}>Next</Text>
        <Svg
          width={25}
          height={16}
          viewBox="0 0 25 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M15 3l5 5-5 5"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path d="M0 8a1 1 0 011-1h18v2H1a1 1 0 01-1-1z" fill="#000" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerSkip: {
    top: -verticalScale(170),
    marginLeft: 36,
  },
  containerNext: {
    top: -verticalScale(170),
    alignSelf: "flex-end",
    marginRight: 36,
    flexDirection: 'row',
  },
  next: {
    top: -3,
    fontFamily: "DMSans_500Medium",
    color: "black",
    fontSize: 14,
    marginRight: 12,
  },
  skip: {
   
    fontFamily: "DMSans_500Medium",
    color: "black",
    fontSize: 14,
  },
});
