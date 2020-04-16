import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { s, vs } from 'react-native-size-matters';

import { useSelector, useDispatch } from "react-redux";

import * as CONSTANT from "../constant";

import HomeScreen from './HomeScreen';
import History from './HistoryScreen';
import MapsScreen from './MapsScreen';
import CameraScreen from './CameraScreen';
import SubmitScreen from './SubmitScreen';

function getCurrentHours() {
    let timeServer = useSelector(state => state.attendanceReducers.timeServer);
    let hh = timeServer.time.split(":")[0]

    return Number(hh)
}

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => {



    return (
        <HomeStack.Navigator initialRouteName='MWR'>
            <HomeStack.Screen name='MWR' component={HomeScreen} options={{
                headerStyle: {
                    backgroundColor: CONSTANT.STYLE.COLOR.MWR_RED
                },
                headerTintColor: 'white',
                headerTitleStyle: styles.headerStyle,
                headerTitleAlign: 'left',
                headerLeft: () => (

                    <TouchableOpacity onPress={() => { navigation.toggleDrawer() }}>
                        <Image
                            source={CONSTANT.IMAGE_URL.MENU}
                            style={{
                                paddingLeft: s(30),
                                width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MENU).width * 0.03),
                                height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MENU).height * 0.03),
                                resizeMode: "contain"
                            }}
                        />
                    </TouchableOpacity>
                )
            }} />

            <HomeStack.Screen name='History' component={History} options={{
                headerStyle: {
                    backgroundColor: CONSTANT.STYLE.COLOR.MWR_RED
                },
                headerTintColor: 'white',
                headerTitleStyle: styles.headerStyle,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false
            }} />

            <HomeStack.Screen name='Maps' component={MapsScreen} options={{
                headerStyle: {
                    backgroundColor: CONSTANT.STYLE.COLOR.MWR_RED
                },
                headerTintColor: 'white',
                headerTitleStyle: styles.headerStyle,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false
            }} />

            <HomeStack.Screen name='Camera' component={CameraScreen} options={{
                headerStyle: {
                    backgroundColor: CONSTANT.STYLE.COLOR.MWR_RED
                },
                title: 'Take Photo',
                headerTintColor: 'white',
                headerTitleStyle: styles.headerStyle,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false
            }} />

            <HomeStack.Screen name='Submit' component={SubmitScreen} options={{
                headerStyle: {
                    backgroundColor: CONSTANT.STYLE.COLOR.MWR_RED
                },
                title: getCurrentHours() > 11 ? 'Check Out' : 'Check In',
                headerTintColor: 'white',
                headerTitleStyle: styles.headerStyle,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false
            }} />
        </HomeStack.Navigator>
    )
}

export default ({ navigation }) => {

    return (
        <HomeStackScreen navigation={navigation} />
    )
};

const styles = StyleSheet.create({

    headerStyle: {
        fontSize: CONSTANT.STYLE.SIZE.TITLE,
        fontFamily: 'OpenSans-Bold'
    },
})