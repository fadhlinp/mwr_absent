
import React, { useState, useEffect, createContext } from 'react'
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
    const dispatch = useDispatch()

    let loginToken = useSelector(state => state.authReducers.loginToken);

    useEffect(() => {
        const getLoginToken = async () => {
            await AsyncStorage.getItem(STRING.LOGIN_TOKEN).
                then((userToken) => {
                    dispatch(actions.Auth.setLoginToken(userToken));
                    setInitializing(false)
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
    } else {
        useEffect(() => {
            SplashScreen.hide()
        })

        return loginToken ? (
            <SignInStack />
        ) : (
                <SignOutStack />
            )
    }
}