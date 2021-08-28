import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { windowHeight, windowWidth } from "../utils/Dimensions";

import Onboarding from "react-native-onboarding-swiper";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import slides from "../utils/slides";
import OnboardingItem from "../components/OnboardingItem";

const OnboardingScreen = () => {

  const Skip = () => {
      return (
        <TouchableOpacity>
            <Text>Skip</Text>
        </TouchableOpacity>
      )
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
      />
      
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
