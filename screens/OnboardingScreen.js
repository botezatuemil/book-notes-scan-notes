import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { windowHeight, windowWidth } from "../utils/Dimensions";

import Onboarding from "react-native-onboarding-swiper";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import slides from "../utils/slides";
import OnboardingItem from "../components/OnboardingItem";

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const Skip = () => {
    return (
      <TouchableOpacity>
        <Text>Skip</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
     <View style={{flex: 3}}>
     <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={32}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        ref={slidesRef}
      />
     </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
