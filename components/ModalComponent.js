import React, {useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const ModalComponent = ({navigation, isModalVisible, toggleModal, title, author, save }) => {

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <Text>Modal</Text>

        <View style={styles.footer}>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {navigation.navigate("AddBookScreen"); toggleModal()}}>
            <Text>{save}</Text>
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
    height: verticalScale(271),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 7
  },
  footer: {
    width: scale(228),
    backgroundColor: "#F8F7FB",
    height: verticalScale(56),
  
  }
});
