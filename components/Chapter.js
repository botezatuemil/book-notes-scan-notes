import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const Chapter = ({ item }) => {
  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <TouchableOpacity style={styles.container}>
      <Text numberOfLines={1} style={styles.textInput}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  container: {
    width: scale(264),
    height: verticalScale(48),
    backgroundColor: "#FDFDFD",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textInput: {
    marginLeft: 16,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12
  },
});
