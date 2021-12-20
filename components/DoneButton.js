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

import { getAuth, signInAnonymously, onAuthStateChanged  } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {app, db} from '../firebase';
import firebase from 'firebase/compat';

const authentificate = () => {
  const auth = getAuth();
  signInAnonymously(auth)

  .then(() => {
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
}

const getId = () => {

  authentificate();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  
    if (user) {
    AsyncStorage.setItem("id", JSON.stringify(user.uid))
    .then(() => {
      //setUserID(currentUserId)
    })
    .catch((error) => console.log(error));

    firebase.firestore();
    db.collection('users')
    .doc(user.uid)
    .set({
        userId: user.uid
    })
    .catch(function(error) {
      console.log(error)
    })
  } else {
    // User is signed out
    // ...
  }
  });

}


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
    <TouchableOpacity style={styles.container} onPress={() => {navigation.navigate('AppStack'); getId()}}>
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
