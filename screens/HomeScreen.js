import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacityBase,
} from "react-native";

import { windowHeight, windowWidth } from "../utils/Dimensions";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Svg, { Path } from "react-native-svg";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const HomeScreen = ({ navigation }) => {
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

  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
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
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
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
    flexDirection: 'row',
    top: 154,
    justifyContent: 'space-between'
  },
  headerReadingLeft: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    marginLeft: 32,
  },
  headerReadingRight: {
    fontFamily: "DMSans_700Bold",
    fontSize: 14,
    alignSelf:"flex-end",
    marginRight: 32,
    top:4
  }
});
