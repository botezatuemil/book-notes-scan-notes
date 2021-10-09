import React, {useState} from "react";
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

import Svg, { Path } from "react-native-svg";

const Header = ({ isEditing, setIsEditing, }) => {
  return (
    <View>
      <TouchableOpacity style={styles.editMode} onPress={() => setIsEditing(!isEditing)}>
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

      <TouchableOpacity style={styles.search}>
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

      <TouchableOpacity style={styles.menuDots}>
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

const TextComponent = ({ title, isEditing, setIsEditing, text, setText }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {
        isEditing ? (
          <TextInput 
            placeholder="Write your text..."
            placeholderTextColor="#000"
            multiline={true}
            style={styles.textInput}
            value={text}
            onChangeText={(txt) => setText(txt)}
            //onSubmitEditing={() => setIsEditing(false)}
          />
        ) : (
          <Text style={styles.notes} onPress={() => setIsEditing(true)}>
            {text}
          </Text>
        )
      }
    </View>
  );
};

const WritingScreen = ({ route }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

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
      <Header 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <TextComponent 
        title={route.params.title} 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        text={text} 
        setText={setText} 
      />
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
    top: 100,
    marginLeft: 36,
    top: verticalScale(40),
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
    color: '#000',
    top: verticalScale(96),
    marginLeft: 36,
    marginRight: 36,
    fontFamily:'DMSans_500Medium'
  },
  textInput: {
    top: verticalScale(96),
    color: '#000',
    marginLeft: 36,
    marginRight: 36,
    fontFamily:'DMSans_500Medium'
  }
});
