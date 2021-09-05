import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const AddBookScreen = ({navigation}) => {
    

    return (
        <TouchableOpacity style={{top: 200}} onPress={() => {navigation.goBack(null)} }>
            <Text>add book screen</Text>
        </TouchableOpacity>
    )
}

export default AddBookScreen

const styles = StyleSheet.create({

})
