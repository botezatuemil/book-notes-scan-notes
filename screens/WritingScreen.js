import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path } from "react-native-svg";

import { app, db } from "../firebase";
import firebase from "firebase/compat";
import "firebase/compat/storage";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
//import ImagePicker from "react-native-image-crop-picker";

import ModalColor from "../components/ModalColor";

const Header = ({ isEditing, setIsEditing, handleUpdate }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.editMode}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Svg
          width={21}
          height={21}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M10.5 13.125H7.875V10.5l7.875-7.875 2.625 2.625-7.875 7.875zM13.781 4.594l2.625 2.625"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M17.719 9.844v7.219a.656.656 0 01-.657.656H3.938a.656.656 0 01-.656-.657V3.938a.656.656 0 01.656-.656h7.22"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <TouchableOpacity style={styles.search} onPress={() => {}}>
        <Svg
          width={15}
          height={15}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.604 9.35h-.65l-.23-.222a5.324 5.324 0 001.29-3.48 5.347 5.347 0 10-5.346 5.348 5.324 5.324 0 003.48-1.292l.222.23v.65l4.113 4.105 1.226-1.226-4.105-4.113zm-4.936 0a3.697 3.697 0 01-3.702-3.702 3.697 3.697 0 013.702-3.702A3.697 3.697 0 019.37 5.648 3.697 3.697 0 015.668 9.35z"
            fill="#000"
          />
        </Svg>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuDots} onPress={handleUpdate}>
        <Svg
          width={24}
          height={24}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M12 13.125a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM12 7.125a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM12 19.125a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
            fill="#000"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const TextComponent = ({
  title,
  isEditing,
  setIsEditing,
  setContent,
  content,
  handleUpdate,
  color,
  setColor,
}) => {
  return (
    <View style={{ flex: 1, paddingTop: verticalScale(60) }}>
      <KeyboardAwareScrollView
        //contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: verticalScale(80),
        }}
      >
        <Text style={styles.title}>{title}</Text>
        {isEditing ? (
          <TextInput
            placeholder="Write your text..."
            placeholderTextColor="#000"
            multiline={true}
            style={[styles.textInput, {color: color}]}
            value={content}
            onChangeText={(txt) => setContent(txt)}
            onSubmitEditing={() => handleUpdate()}
            selectable={true}
          />
        ) : (
          <Text
            style={[styles.notes, {color: color}]}
            onPress={() => setIsEditing(true)}
            selectable={true}
          >
            {content}
          </Text>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

const ActionButtons = ({ color, setColor }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);


  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      if (pickerResult.cancelled === true) {
        return;
      }

      setSelectedImage({ localUri: pickerResult.uri });
      console.log(selectedImage)
      //await recognizeTextFromImage(selectedImage.localUri);
    } catch (err) {
      if (err.message !== "User cancelled image selection") {
        console.error(err);
      }
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <ModalColor
        isModalVisible={isModalVisible}
        color={color}
        setColor={setColor}
      />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.textSize} onPress={toggleModal}>
          <Svg
            width={18}
            height={18}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M9 3.937v10.125M3.375 6.187v-2.25h11.25v2.25M6.75 14.062h4.5"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textColor} onPress={toggleModal}>
          <Svg
            width={19}
            height={19}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M0 15.833h19V19H0v-3.167Z"
              fill="#fff"
              fillOpacity={0.36}
            />
            <Path
              d="M8.708 2.375 4.354 13.458h1.782l.886-2.375h4.948l.887 2.375h1.781L10.292 2.375H8.708ZM7.616 9.5 9.5 4.489 11.384 9.5H7.616Z"
              fill="#fff"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textAlign}>
          <Svg
            width={19}
            height={19}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M2.375 16.625h14.25v-1.583H2.375v1.583Zm0-3.167h14.25v-1.583H2.375v1.583Zm0-3.166h14.25V8.708H2.375v1.584Zm0-3.167h14.25V5.542H2.375v1.583Zm0-4.75v1.583h14.25V2.375H2.375Z"
              fill="#fff"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity style={styles.attach}>
          <Svg
            width={19}
            height={19}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M13.063 4.75v9.104a3.166 3.166 0 1 1-6.334 0V3.958a1.98 1.98 0 0 1 3.959 0v8.313a.794.794 0 0 1-.792.791.794.794 0 0 1-.792-.791V4.75H7.917v7.52a1.98 1.98 0 0 0 3.958 0V3.959a3.166 3.166 0 1 0-6.333 0v9.896a4.352 4.352 0 0 0 4.354 4.354 4.352 4.352 0 0 0 4.354-4.354V4.75h-1.187Z"
              fill="#fff"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity style={styles.camera} onPress={recognizeFromCamera}>
          <Svg
            width={19}
            height={19}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M15.438 15.438H3.562a1.187 1.187 0 0 1-1.187-1.188V5.937A1.188 1.188 0 0 1 3.563 4.75h2.374l1.188-1.781h4.75l1.187 1.781h2.376a1.188 1.188 0 0 1 1.187 1.188v8.312a1.188 1.188 0 0 1-1.188 1.188Z"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M9.5 12.469a2.672 2.672 0 1 0 0-5.344 2.672 2.672 0 0 0 0 5.344Z"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </>
  );
};

const WritingScreen = ({ route, navigation }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);
  const [currentUserId, setUserID] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("");

  const loadId = () => {
    AsyncStorage.getItem("id")
      .then((data) => {
        setUserID(JSON.parse(data));
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = async () => {
    firebase.firestore();
    db.collection("users")
      .doc(currentUserId)
      .collection("books")
      .doc(route.params.titleBook.toString())
      .collection("chapters")
      .doc(route.params.titleChapter.toString())
      .update({
        content: content,
        color: color
      })
      .then(() => {
        console.log("User updated!");
        Alert.alert(
          "Image updated!",
          "Your profile has been successfully updated."
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchContent = async () => {
    try {
      const list = [];
      await firebase.firestore();
      await db
        .collection("users")
        .doc(currentUserId)
        .collection("books")
        .doc(route.params.titleBook.toString())
        .collection("chapters")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            if (doc.id === route.params.titleChapter) {
              const { content, color } = doc.data();
              setContent(content);
              color ? setColor(color) : "#000";
            }
          });
        });

      setRefresh(true);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [loading, navigation]);

  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded && !ready) {
    return (
      <AppLoading
        startAsync={loadId}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleUpdate={handleUpdate}
      />

      <TextComponent
        title={route.params.titleChapter}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setContent={setContent}
        content={content}
        handleUpdate={handleUpdate}
        color={color}
        setColor={setColor}
      />

      <ActionButtons color={color} setColor={setColor} />
    </View>
  );
};

export default WritingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontFamily: "DMSans_700Bold",
    color: "#000",
    //top: 100,
    marginLeft: 36,
    //top: verticalScale(10),
  },
  editMode: {
    top: verticalScale(45),
    marginLeft: 285,
  },
  search: {
    top: verticalScale(30),
    marginLeft: 320,
  },
  menuDots: {
    top: verticalScale(15),
    marginLeft: 350,
  },
  notes: {
    color: "#000",
    paddingTop: verticalScale(36),
    marginLeft: 36,
    marginRight: 36,
    fontFamily: "DMSans_500Medium",
  },
  textInput: {
    paddingTop: verticalScale(36),
    color: "#000",
    marginLeft: 36,
    marginRight: 36,
    fontFamily: "DMSans_500Medium",
  },
  actions: {
    position: "absolute",
    width: scale(206),
    height: verticalScale(36),
    alignSelf: "center",
    backgroundColor: "#282536",
    top: verticalScale(640),
    borderRadius: 23,
    justifyContent: "center",

    //marginBottom: 36
  },
  textColor: {
    position: "absolute",
    marginLeft: scale(56),
  },
  textSize: {
    position: "absolute",
    marginLeft: scale(24),
  },
  textAlign: {
    position: "absolute",
    marginLeft: scale(90),
  },
  attach: {
    position: "absolute",
    marginLeft: scale(128),
  },
  camera: {
    position: "absolute",
    marginLeft: scale(163),
  },
});
