import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AddButton from "../components/AddButton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Svg, { Path, Rect } from "react-native-svg";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import Chapter from "../components/Chapter";
import chapters from "../utils/chapters";
import ModalChapter from "../components/ModalChapter";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const Cover = ({ props, route, handleEditBooks }) => {
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    route.params.setSelectedImage(pickerResult.uri);
  };

  return (
    <View style={styles.book}>
      <View style={styles.bookIcon}>
        <Svg
          width={44}
          height={44}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M8.25 38.5a4.125 4.125 0 014.125-4.125H35.75V5.5H12.375A4.125 4.125 0 008.25 9.625V38.5zM8.25 38.5v1.375H33"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect x={21} y={15} width={3} height={13} rx={1.5} fill="#000" />
          <Rect
            x={29}
            y={20}
            width={3}
            height={13}
            rx={1.5}
            transform="rotate(90 29 20)"
            fill="#000"
          />
        </Svg>
      </View>
      <AddButton
        title="Select Cover"
        pickImage={openImagePickerAsync}
        toggleModal={() => {}}
        handleEditBooks={route.params.handleEditBooks}     
      />
    </View>
  );
};

const UtilityButtons = ({ title, buttonEdit, deleteBook, clearBooks }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonEdit, deleteBook]}
      onPress={clearBooks}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const DeleteButton = ({ props, clear }) => {
  return (
    <TouchableOpacity style={styles.delete} onPress={clear}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Svg
          width={18}
          height={18}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M15.187 3.938H2.812M7.313 7.313v4.5M10.688 7.313v4.5M6.188 1.688h5.625M14.062 3.938v10.687a.562.562 0 01-.562.563h-9a.562.562 0 01-.563-.563V3.937"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={styles.deleteText}>DELETE</Text>
      </View>
    </TouchableOpacity>
  );
};

const AddChapter = ({ props, toggleModalChapter }) => {
  return (
    <TouchableOpacity style={styles.addChapter} onPress={toggleModalChapter}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Svg
          width={13}
          height={13}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Rect x={5} width={3} height={13} rx={1.5} fill="#fff" />
          <Rect
            x={13}
            y={5}
            width={3}
            height={13}
            rx={1.5}
            transform="rotate(90 13 5)"
            fill="#fff"
          />
        </Svg>
        <Text style={[styles.deleteText, { color: "#fff" }]}>ADD CHAPTER</Text>
      </View>
    </TouchableOpacity>
  );
};

const AddBookScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [isModalChapterVisible, setIsModalChapterVisible] = useState(false);
  const [initialChapters, setInitialChapters] = useState(chapters[0].files);
  //const [newChapters, setNewChapters] = useState(initialChapters);
  const [ready, setReady] = useState(false);

  const toggleModalChapter = () => {
    setIsModalChapterVisible(!isModalChapterVisible);
  };

  const handleAddchapter = () => {
    const newTodos = [
      ...initialChapters,
      {
        name: title,
        id: `${
          (initialChapters[initialChapters.length - 1] &&
            parseInt(initialChapters[initialChapters.length - 1].id) + 1) ||
          1
        }`,
      },
    ];
    AsyncStorage.setItem("storedChapters", JSON.stringify(newTodos))
      .then(() => {
        setInitialChapters(newTodos);
        setTitle(null);
      })
      .catch((error) => console.log(error));
  };

  const loadChapters = () => {
    AsyncStorage.getItem("storedChapters")
      .then((data) => {
        if (data != null) {
          setInitialChapters(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));
  };

  const clear = () => {
    AsyncStorage.setItem("storedChapters", JSON.stringify([]))
      .then(() => {
        setInitialChapters([]);
      })
      .catch((error) => console.log(error));
  };

  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded && !ready) {
    return (
      <AppLoading
        startAsync={loadChapters}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.background, { backgroundColor: route.params.itemColor }]}
      >
        <Cover route={route} />
        <Text style={styles.title}>{route.params.itemTitle}</Text>
        <Text style={styles.author}>{route.params.itemAuthor}</Text>
        <View style={styles.entireButton}>
          <UtilityButtons
            title="DELETE BOOK"
            deleteBook={styles.deleteBook}
            clearBooks={route.params.clearBooks}
          />
          <View style={styles.separator}></View>
          <UtilityButtons
            title="EDIT"
            buttonEdit={styles.buttonEdit}
            clearBooks={() => {}}
          />
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={initialChapters}
        renderItem={({ item }) => <Chapter item={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />

      <ModalChapter
        isModalChapterVisible={isModalChapterVisible}
        toggleModalChapter={toggleModalChapter}
        title={title}
        setTitle={setTitle}
        handleAddchapter={handleAddchapter}
      />
      <View style={styles.footer}>
        <DeleteButton clear={clear} />
        <AddChapter toggleModalChapter={toggleModalChapter} />
      </View>
    </View>
  );
};

export default AddBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: "#008880",
    height: verticalScale(360),
  },
  book: {
    width: scale(86),
    height: verticalScale(123),
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    top: 96,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: scale(86),
    height: verticalScale(133),
    borderRadius: 4,
  },
  bookIcon: {
    top: 33,
    alignSelf: "center",
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 24,
    alignSelf: "center",
    top: 120,
    color: "#fff",
  },
  author: {
    fontFamily: "DMSans_700Bold",
    fontSize: 16,
    alignSelf: "center",
    top: 120,
    color: "#fff",
  },
  entireButton: {
    flexDirection: "row",
    alignSelf: "center",
    top: verticalScale(166),
  },
  button: {
    backgroundColor: "#282536",
    width: scale(132),
    height: verticalScale(48),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonEdit: {
    borderTopRightRadius: 12,
    borderBottomEndRadius: 12,
    //marginRight: 48,
  },
  deleteBook: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textButton: {
    color: "#fff",
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    alignSelf: "center",
  },
  separator: {
    width: 2,
    height: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  footer: {
    //flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    //alignSelf: "center",
  },
  delete: {
    position: "absolute",
    bottom: 0,
    marginLeft: 56,
    width: scale(115),
    height: verticalScale(36),
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",

    // alignSelf: 'center'
  },
  deleteText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 12,
    marginLeft: 8,
  },
  addChapter: {
    position: "absolute",
    bottom: 0,
    //alignSelf: 'flex-end',
    width: scale(115),
    height: verticalScale(36),
    backgroundColor: "#282536",
    borderRadius: 6,
    justifyContent: "center",
    marginLeft: 230,
  },
  list: {
    top: verticalScale(60),
    marginBottom: 150,
  },
});
