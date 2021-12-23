import React, { useEffect, useState } from "react";
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
import chapters from "../utils/chapters";

const ModalComponent = ({
  isModalVisible,
  toggleModal,
  titleModal,
  form2,
  save,
  navigation={navigation},
  titleBook,
  setTitleBook,
  authorBook,
  setAuthorBook,
  setColor,
  submitBook
}) => {

  const [onFocusColor, setOnFocusColor] = useState([
    {
      id: 1,
      color: "#D75555",
      selected: false,
      borderColor: "rgba(215, 85, 85, 0.5)",
    },
    {
      id: 2,
      color: "#F0B57A",
      selected: false,
      borderColor: "rgba(240, 181, 122, 0.5)",
    },
    {
      id: 3,
      color: "#479B61",
      selected: false,
      borderColor: "rgba(71, 155, 97, 0.5)",
    },
    {
      id: 4,
      color: "#008880",
      selected: false,
      borderColor: "rgba(0, 136, 128, 0.5)",
    },
    {
      id: 5,
      color: "#4083A8",
      selected: false,
      borderColor: "rgba(64, 131, 168, 0.5)",
    },
    {
      id: 6,
      color: "#5250A8",
      selected: false,
      borderColor: "rgba(82, 80, 168, 0.5)",
    },
  ]);

  const onButtonClick = (item) => {
    let updatedState = onFocusColor.map((isOnFocusItem) => 
      isOnFocusItem.id === item.id
      ? {...isOnFocusItem, selected: true}
      : {...isOnFocusItem, selected: false} 
    )

    setOnFocusColor(updatedState);

    updatedState.map((isOnFocusItem) => {
      if(isOnFocusItem.selected === true) {
        setColor(isOnFocusItem.color)
      }
    })
  }

  const ChooseColor = () => {
    return (
      <View style={styles.colorSection}>
        <Text style={styles.textColor}>Color</Text>
        {onFocusColor.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => onButtonClick(item)} style={[styles.color, {backgroundColor: item.color, borderWidth: item.selected ? 2 : 0, borderColor: item.borderColor,}]}></TouchableOpacity>      
        ))}
      </View>
    )
  }

  const Form = ({ form2, titleBook, authorBook, setTitleBook, setAuthorBook}) => {
    const [titleValue, setTitleValue] = useState(`${titleBook}`)
    const [authorValue, setAuthorValue] = useState(`${authorBook}`)
   
    
    return (
      <>
        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            placeholder="Title"
            defaultValue={titleValue}
            onChangeText={(text) => setTitleValue(text)}
            onEndEditing={() => setTitleBook(titleValue)}
            
          />
        </View>

        <View style={[styles.form, {top: 76}]}>
          <TextInput
            style={styles.textInput}
            placeholder={form2}
            defaultValue={authorValue}
            onChangeText={(text) => {setAuthorValue(text);}} 
            onEndEditing={() => setAuthorBook(authorValue)}
          />
        </View>
      </>
    )
  }

  let [fontsLoaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>{titleModal}</Text>
        <ChooseColor />
        <Form 
          form2={form2}
          titleBook={titleBook}
          authorBook={authorBook}
          setTitleBook={setTitleBook}
          setAuthorBook={setAuthorBook}
         
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancel} onPress={toggleModal}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.save}
            onPress={() => {
              submitBook();
              toggleModal();
              //console.log(books)
            }}
          >
            <Text style={styles.textSave}>{save}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
    width: scale(228),
    height: verticalScale(231),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 7,
  },
  footer: {
    width: scale(228),
    backgroundColor: "#F8F7FB",
    height: verticalScale(56),
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    top: 120

  },
  save: {
    backgroundColor: '#000',
    width: scale(56),
    height: verticalScale(24),
    borderRadius: 3,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 16,
    marginLeft:8

  },
  textSave: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'DMSans_700Bold',
    alignSelf: 'center'
  },
  cancel: {
    backgroundColor: '#fff',
    width: scale(56),
    height: verticalScale(24),
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 96,
    borderRadius: 3,
    borderColor: '#BDBDBD',
    borderWidth: 1
  },
  textCancel: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'DMSans_700Bold',
    alignSelf: 'center'
  },
  title: {
    top: 16,
    marginLeft: 16,
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
  },
  colorSection: {
    flexDirection: 'row',
    top: 32,
    marginLeft: 16
  },
  textColor: {
    fontSize: 12,
    fontFamily: 'DMSans_500Medium',
    color: '#404040'
  },
  color: {
    width: 16,
    height: 16,
    marginLeft: 8,
    borderRadius: 14
  },
  form: {
    top: 64,
    width: scale(196),
    height: verticalScale(27),
    borderRadius: 4,  
    backgroundColor: '#F8F7FB',
    alignSelf:'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    justifyContent: 'center'
  },
  textInput: {
    marginLeft: 12, 
    fontFamily: 'DMSans_700Bold',
  }
});
