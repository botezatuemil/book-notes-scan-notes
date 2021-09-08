import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const ModalChapter = ({ isModalChapterVisible, toggleModalChapter, title, setTitle, handleAddchapter, counter, setCounter }) => {


  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Modal isVisible={isModalChapterVisible}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Title"
            defaultValue={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <TouchableOpacity style={styles.save} onPress={() => {toggleModalChapter(); handleAddchapter(); setCounter((counter+1).toString())}}>
          <Text style={styles.textSave}>Create</Text>
        </TouchableOpacity>

        
      </View>
    </Modal>
  );
};

export default ModalChapter;

const styles = StyleSheet.create({
  container: {
    width: scale(228),
    height: verticalScale(113),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 7,
  },
  form: {
    top: 24,
    width: scale(196),
    height: verticalScale(27),
    borderRadius: 4,
    backgroundColor: "#F8F7FB",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    justifyContent: "center",
  },
  textInput: {
    marginLeft: 12,
    fontFamily: "DMSans_700Bold",
  },
  save: {
    backgroundColor: '#000',
    width: scale(56),
    height: verticalScale(24),
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    top: 50
  },
  textSave: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'DMSans_700Bold',
    alignSelf: 'center'
  },
});
