
import React, { useState, useEffect, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import SplashScreen from 'react-native-splash-screen'

import { useSelector, useDispatch } from "react-redux";

import { STRING } from "../constant/";
import * as actions from '../actions'

import SignInStack from './SignInStack'
import SignOutStack from './SignOutStack'

export default function RootNavigator() {
    const [initializing, setInitializing] = useState(true)
    const [isSignIn, setIsSignIn] = useState(true)
    const dispatch = useDispatch()

    let loginToken = useSelector(state => state.authReducers.loginToken);

    useEffect(() => {
        const getLoginToken = async () => {
            await AsyncStorage.getItem(STRING.LOGIN_TOKEN).
                then((userToken) => {
                    dispatch(actions.Auth.setLoginToken(userToken));
                    setInitializing(false)
                    SplashScreen.hide()

                    if (userToken) {
                        setIsSignIn(true)
                    } else {
                        setIsSignIn(true)
                    }
                });
        };

        getLocation = async () => {

            Geolocation.getCurrentPosition(
                (position) => {
                    console.log("position", position.coords);
                    dispatch(actions.Location.setLocation(position.coords))
                },
                (error) => {
                    console.log("error", error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
            );
        }

        getLoginToken();
        getLocation();
    }, []);

    if (initializing) {
        return null
    }

    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                {loginToken ? (
                    <Stack.Screen name="SignInStack" component={SignInStack} options={{
                        animationTypeForReplace: isSignIn ? 'push' : 'pop',
                    }} />
                ) : (
                        <Stack.Screen name="SignOutStack" component={SignOutStack} options={{
                            // animationTypeForReplace: 'push'
                        }} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}