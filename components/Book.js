import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const Book = () => {
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
      <Image
        source={require("../assets/icons/atomichabits.png")}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Atomic Habits</Text>
        <Text style={styles.author}>James Clear</Text>
      </View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    top: 178,
    marginLeft: 32,
  },
  image: {
    width: scale(86),
    height: verticalScale(129),
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontFamily: "DMSans_500Medium",
  },
  author: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
  },
});
