import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Svg, { Path, Rect } from "react-native-svg";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";


import ModalChapter from "../components/ModalChapter";
import * as ImagePicker from "expo-image-picker";
import Chapter from '../components/Chapter'

import {app, db} from '../firebase';
import firebase from 'firebase/compat';
import 'firebase/compat/storage'

import AsyncStorage from "@react-native-async-storage/async-storage";

const Cover = ( {userId, titleBook} ) => {

  const [selectedImage, setSelectedImage] = useState();
  
  console.log(userId)
  const uploadImage = async() => {

    if (selectedImage == null) {
        return null;
    }
    const response = await fetch(selectedImage.localUri)
    const blob = await response.blob();
    //var ref = app.storage().ref().child(new Date().toISOString());

    var filename = new Date().toISOString();
    const storageRef = app.storage().ref(`photos/${filename}`)
    const task = storageRef.put(blob);

    try {
        await task;
        const url = await storageRef.getDownloadURL();
        setSelectedImage(null);
        return url;
    } catch(e) {
        console.log(e);
        return null;
    }
        
  }

  const handleUpdate = async() => {
    let imgUrl = await uploadImage();

    firebase.firestore();
    db.collection('users')
    .doc(userId)
    .collection('books')
    .doc(titleBook)
    .update({
        image: imgUrl,
    })
    .then(() => {
        console.log('User updated!');
        Alert.alert(
            'Image updated!',
            'Your profile has been successfully updated.'
        )
    })
    .catch(function(error) {
      console.log(error)
    })
  }

  

  const SelectCover = ({ pickImage }) => {
    return (
      <TouchableOpacity
        style={[styles.addBook, { top: 41 }]}
        onPress={() => {
          pickImage();
        }}
      >
        <Text style={styles.addBookText}>Select Cover</Text>
      </TouchableOpacity>
    );
  };

  const UpdateImage = () => {
    return (
      <TouchableOpacity
        style={styles.addBook}
        onPress={() => {
          handleUpdate();
          setSelectedImage(null);
        }}
      >
        <Text style={styles.addBookText}>Update</Text>
      </TouchableOpacity>
    );
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
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
      <SelectCover pickImage={openImagePickerAsync} />

      {selectedImage != null ? <UpdateImage /> : <></>}
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


const AddBookScreen = ({navigation, route}) => {

  const [titleChapter, setTitleChapter] = useState("");
  const [isModalChapterVisible, setIsModalChapterVisible] = useState(false);
  const [initialChapters, setInitialChapters] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setUserID] = useState();
  const [chapters, setChapters] = useState();

  const loadId = () => {
    AsyncStorage.getItem("id")
      .then((data) => {
        setUserID(JSON.parse(data));
      })
      .catch((error) => console.log(error));
  };

  const submitChapter = async () => {

    firebase.firestore();
    db.collection('users')
    .doc(currentUserId)
    .collection('books')
    .doc((route.params.itemTitle).toString())
    .collection('chapters')
    .doc((titleChapter).toString())
    .set ({
      chapterTitle: titleChapter, 
      content: null
    })
    .then(() => {
        console.log('Chapter added!');
        Alert.alert(
            "Book published!",
            "Your image was successfully uploaded to the Firebase Storage"
        );     
    })
    .catch((error) => {
        console.log('Something went wrong', error)
    })
  }

  const fetchChapters = async() => {
    try {
      const list = [];
      await firebase.firestore();
      await db.collection('users')
      .doc(currentUserId)
      .collection('books')
      .doc((route.params.itemTitle).toString())
      .collection('chapters')
      .get()
      .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            const {chapterTitle, content} = doc.data();
            list.push({
              name: chapterTitle,      
            })
          })
      })
  
      setChapters(list);
      setRefresh(true);
  
      if(loading) {
        setLoading(false);
      }
  
    } catch(e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    fetchChapters();
    //navigation.addListener("focus", () => setLoading(!loading));
  }, [loading, navigation])


  const toggleModalChapter = () => {
    setIsModalChapterVisible(!isModalChapterVisible);
  };


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
      <View
        style={[styles.background, { backgroundColor: route.params.itemColor }]}
      >
        <Cover userId={currentUserId} titleBook={route.params.itemTitle}/>
        <Text style={styles.title}>{route.params.itemTitle}</Text>
        <Text style={styles.author}>{route.params.itemAuthor}</Text>
        <View style={styles.entireButton}>
          <UtilityButtons
            title="DELETE BOOK"
            deleteBook={styles.deleteBook}
          />
          <View style={styles.separator}></View>
          <UtilityButtons
            title="EDIT"
            buttonEdit={styles.buttonEdit}
          />
        </View>
      </View>

      <ModalChapter
        isModalChapterVisible={isModalChapterVisible}
        toggleModalChapter={toggleModalChapter}
        title={titleChapter}
        setTitle={setTitleChapter}
        submitChapter={submitChapter}
        
      />

      <FlatList
        style={styles.list}
        data={chapters}
        //extraData={refresh}
        renderItem={({ item }) => (
          <Chapter 
            item={item} 
            navigation={navigation} 
            titleBook={route.params.itemTitle}
                
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <DeleteButton/>
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
    color: 'rgba(255, 255, 255, 0.8)'
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
  addBook: {
    top: 45,
    backgroundColor: "#282536",
    height: verticalScale(20),
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    width: scale(67),
  },
  addBookText: {
    fontSize: 8,
    fontFamily: "DMSans_700Bold",
    color: "#fff",
    alignSelf: "center",
  },
});
