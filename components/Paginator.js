import React from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

import { windowHeight, windowWidth } from "../utils/Dimensions";

const Paginator = ({data, scrollX}) => {
    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * windowWidth, i * windowWidth, (i + 1) * windowWidth];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 16, 8],
                    extrapolate: 'clamp', 
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View style={[styles.dot, {width: dotWidth, opacity}]} key={i.toString()}/>
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 10,
        top: -windowHeight / 5,
        alignSelf: 'center',
    },
    dot: {
        height: 8,
        borderRadius: 8,
        backgroundColor: '#493d8a',
        marginHorizontal: 8,
        width: 8,
    }
})
