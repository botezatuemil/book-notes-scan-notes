import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const Book = ({navigation, item}) => {
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
      {item.image != null ? (
      <TouchableOpacity onPress={() => navigation.navigate('AddBookScreen')}>
        <Image
          source={item.image}
          style={styles.image}
        />
      </TouchableOpacity>
      ) : (
          <View style={[styles.image, {backgroundColor: '#C4C4C4', }]}>
            <TouchableOpacity>
              
            </TouchableOpacity>
          </View>
      )
     }

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
      </View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    top: 178,
    marginLeft: 24,
  },
  image: {
    width: scale(86),
    height: verticalScale(129),
    borderRadius: 4
  },
  textContainer: {
    width: 105
  },
  title: {
    fontFamily: "DMSans_500Medium",
  },
  author: {
    fontFamily: "DMSans_500Medium",
    fontSize: 10,
  },
});
