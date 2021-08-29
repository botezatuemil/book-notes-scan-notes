import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Favorite from '../screens/Favorite';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    )
}

const FavoriteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavoriteScreen" component={Favorite} />
        </Stack.Navigator>
    )
}

const SettingsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SettingsScreen" component={Settings} />
        </Stack.Navigator>
    )
}

const AppStack = ({navigation}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStack}
            />
            <Tab.Screen
                name="Favorite"
                component={FavoriteStack}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsStack}
            />
        </Tab.Navigator>
        
    )
}

export default AppStack

const styles = StyleSheet.create({})

