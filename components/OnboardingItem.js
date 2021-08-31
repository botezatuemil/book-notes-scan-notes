import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import slides from '../utils/slides'
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

const OnboardingItem = ({item}) => {

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
            <Image style={styles.image} source={item.image}/>
            <View style={{backgroundColor: item.color}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitles}>{item.subtitles}</Text>
            </View> 
        </View>
    )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    image: {
        width: windowWidth,
        height: windowHeight,
    },
    title: {
        fontFamily: 'DMSans_700Bold',
        textAlign: 'center',
        fontSize: 20,
        top: -verticalScale(300)
    },
    subtitles: {
        fontFamily: 'DMSans_500Medium',
        textAlign: 'center',
        fontSize: 12,
        top: -verticalScale(276)
    }
})
