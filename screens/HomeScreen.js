import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";

import { LogBox } from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Svg, { Path, Rect } from "react-native-svg";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import Book from "../components/Book";
import images from "../utils/images";
import AddButton from "../components/AddButton";
import ModalComponent from "../components/ModalComponent";

import AsyncStorage from "@react-native-async-storage/async-storage";

//LogBox.ignoreAllLogs();

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [books, setBooks] = useState(images);
  const [titleBook, setTitleBook] = useState("");
  const [authorBook, setAuthorBook] = useState("");
  const [color, setColor] = useState("");
  const [ready, setReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bookEdit, setBookEdit] = useState(null);
  

  const SearchBar = ({ props }) => {
    return (
      <View style={styles.search}>
        <TextInput
          placeholder="Find a book"
          placeholderTextColor="#B4B4B4"
          style={{
            color: "#fff",
            fontFamily: "DMSans_500Medium",
            marginLeft: 38,
            position: "absolute",
            width: scale(264),
          }}
        />

        <Svg
          style={{ marginLeft: 12 }}
          width={16}
          height={16}
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.604 9.35h-.65l-.23-.222a5.324 5.324 0 001.29-3.48 5.347 5.347 0 10-5.346 5.348 5.324 5.324 0 003.48-1.292l.222.23v.65l4.113 4.105 1.226-1.226-4.105-4.113zm-4.936 0a3.697 3.697 0 01-3.702-3.702 3.697 3.697 0 013.702-3.702A3.697 3.697 0 019.37 5.648 3.697 3.697 0 015.668 9.35z"
            fill="#B4B4B4"
          />
        </Svg>
      </View>
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const AddBookButton = ({ props }) => {
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
          title="ADD BOOK"
          toggleModal={toggleModal}
          pickImage={() => {}}
          handleAddBook={() => {}}
          handleEditBooks={() => {}}
          bookEdit={() => {}}
          setBookEdit={() => {}}
        />
      </View>
    );
  };

  const handleAddBook = () => {
    const newBook = [
      ...books,
      {
        title: titleBook,
        author: authorBook,
        color: color,
        id: `${
          (books[books.length - 1] &&
            parseInt(books[books.length - 1].id) + 1) ||
          1
        }`,
        image: null,
      },
    ];
    AsyncStorage.setItem("storedBooks", JSON.stringify(newBook))
      .then(() => {
        setBooks(newBook);
        setTitleBook("");
        setAuthorBook("");
        setSelectedImage(null);
      })
      .catch((error) => console.log(error));
  };

  const loadBooks = () => {
    AsyncStorage.getItem("storedBooks")
      .then((data) => {
        setBooks(JSON.parse(data));
      })
      .catch((error) => console.log(error));
  };

  const clearBooks = () => {
    AsyncStorage.setItem("storedBooks", JSON.stringify([]))
      .then(() => {
        setBooks([]);
      })
      .catch((error) => console.log(error));
  };

 
  const handleTriggerEdit = (item) => {

  };

  const handleEditBooks = (item) => {
    const newBook = [...books];

    const bookIndex = books.findIndex((book) => book.id === item.id);
    newBook.splice(bookIndex, 1, item);
    
    //console.log(bookIndex);

    AsyncStorage.setItem("storedBooks", JSON.stringify(newBook))
      .then(() => {
        setBooks(newBook);
        //setBookEdit(null);
        setSelectedImage(null);
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
        startAsync={loadBooks}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <Text style={styles.header}>Your</Text>
      <Text style={styles.headerBold}>Bookshelf</Text>
      <SearchBar />

      <Image
        source={require("../assets/screen/books.png")}
        style={styles.image}
      />
      <View style={styles.headerReading}>
        <Text style={styles.headerReadingLeft}>You're reading</Text>
        <TouchableOpacity>
          <Text style={styles.headerReadingRight}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: scale(230), height: verticalScale(320) }}>
          <FlatList
            contentContainerStyle={{ marginLeft: 8 }}
            data={books}
            renderItem={({ item }) => (
              <Book
                item={item}
                navigation={navigation}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                clearBooks={clearBooks}
                handleAddBook={handleAddBook}
                handleEditBooks={handleEditBooks}
                handleTriggerEdit={handleTriggerEdit}
                bookEdit={bookEdit}
                setBookEdit={setBookEdit}
                
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            removeClippedSubviews={false}
          />
        </View>
        <AddBookButton />
      </View>

      <ModalComponent
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        titleModal="Create a book"
        form2="Author"
        save="Create"
        navigation={navigation}
        titleBook={titleBook}
        setTitleBook={setTitleBook}
        authorBook={authorBook}
        setAuthorBook={setAuthorBook}
        setColor={setColor}
        handleAddBook={handleAddBook}
        books={books}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    //height: 800,
    //width: 200,
    //flex: 1
  },
  header: {
    fontFamily: "DMSans_500Medium",
    fontSize: 24,
    marginLeft: 32,
    top: 45,
  },
  headerBold: {
    fontFamily: "DMSans_700Bold",
    fontSize: 24,
    marginLeft: 32,
    top: 50,
  },
  search: {
    top: 100,
    backgroundColor: "#282536",
    width: scale(264),
    height: verticalScale(36),
    alignSelf: "center",
    borderRadius: 9,
    justifyContent: "center",
  },
  image: {
    width: scale(296),
    height: verticalScale(195),
    alignSelf: "center",
    borderRadius: 21,
    resizeMode: "contain",
    top: 138,
  },
  headerReading: {
    flexDirection: "row",
    top: 154,
    justifyContent: "space-between",
  },
  headerReadingLeft: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    marginLeft: 32,
  },
  headerReadingRight: {
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    alignSelf: "flex-end",
    marginRight: 32,
    top: 4,
  },
  book: {
    width: scale(86),
    height: verticalScale(123),
    borderRadius: 4,
    backgroundColor: "#C4C4C4",
    top: 178,
    marginLeft: 20,
  },
  bookIcon: {
    top: 33,
    alignSelf: "center",
  },
});
