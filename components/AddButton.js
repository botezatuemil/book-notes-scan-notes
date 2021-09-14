import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const AddButton = ({
  title,
  pickImage,
  toggleModal,
  handleEditBooks,
}) => {
  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity
      style={styles.addBook}
      onPress={() => {
        toggleModal();
        pickImage();
        handleEditBooks();
      }}
    >
      <Text style={styles.addBookText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  addBook: {
    top: 41,
    backgroundColor: "#282536",
    //width: scale(67),
    //maxWidth: '90%',
    height: verticalScale(20),
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    padding: 12,
  },
  addBookText: {
    fontSize: 8,
    fontFamily: "DMSans_700Bold",
    color: "#fff",
    alignSelf: "center",
  },
});
