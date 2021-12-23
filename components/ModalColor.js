import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import Modal from "react-native-modal";

const ModalColor = ({ isModalVisible, color, setColor }) => {
  const [onFocusColor, setOnFocusColor] = useState([
    {
      id: 1,
      color: "#D75555",
      selected: false,
      borderColor: "rgba(215, 85, 85, 0.5)",
      position: 'absolute',
      top: 48,
      marginLeft: 42,
    },
    {
      id: 2,
      color: "#F0B57A",
      selected: false,
      borderColor: "rgba(240, 181, 122, 0.5)",
      position: 'absolute',
      top: 48,
      marginLeft: 66,
    },
    {
      id: 3,
      color: "#479B61",
      selected: false,
      borderColor: "rgba(71, 155, 97, 0.5)",
      position: 'absolute',
      position: 'absolute',
      top: 48,
      marginLeft: 90,
    },
    {
      id: 4,
      color: "#008880",
      selected: false,
      borderColor: "rgba(0, 136, 128, 0.5)",
      position: 'absolute',
      top: 48,
      marginLeft: 114,
    },
    {
      id: 5,
      color: "#4083A8",
      selected: false,
      borderColor: "rgba(64, 131, 168, 0.5)",
      position: 'absolute',
      top: 48,
      marginLeft: 138,
    },
    {
      id: 6,
      color: "#5250A8",
      selected: false,
      borderColor: "rgba(82, 80, 168, 0.5)",
      position: 'absolute',
      top: 48,
      marginLeft: 162,
    },
  ]);

  const onButtonClick = (item) => {
    let updatedState = onFocusColor.map((isOnFocusItem) =>
      isOnFocusItem.id === item.id
        ? { ...isOnFocusItem, selected: true }
        : { ...isOnFocusItem, selected: false }
    );

    setOnFocusColor(updatedState);

    updatedState.map((isOnFocusItem) => {
      if (isOnFocusItem.selected === true) {
        setColor(isOnFocusItem.color);
      }
    });
  };

  return (
    <>
      {isModalVisible ? (
        <View style={styles.container}>
          <Text style={styles.text}>Font Color</Text>

          {onFocusColor.map((item) => (
         
              <TouchableOpacity
                key={item.id}
                onPress={() => onButtonClick(item)}
                style={[
                  styles.color,
                  {
                    backgroundColor: item.color,
                    borderWidth: item.selected ? 2 : 0,
                    borderColor: item.borderColor,
                    position: item.position,
                    top: item.top,
                    marginLeft: item.marginLeft,
                  },
                ]}
              ></TouchableOpacity>
          
          ))}
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default ModalColor;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    position: "absolute",
    width: scale(206),
    height: verticalScale(77),
    alignSelf: "center",
    backgroundColor: "#282536",
    top: verticalScale(540),
  },
  text: {
    color: "#fff",
    top: verticalScale(8),
    marginLeft: scale(8),
  },
  color: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
});
