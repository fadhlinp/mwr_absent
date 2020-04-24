import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

import * as API from "../../api";
import * as actions from "../../actions";
import { Loading } from '../../actions'
import { STRING } from "../../constant";

export function sendPhoto(uri, currentHours, onCallbackSuccess, navigation) {
    return async (dispatch, getState) => {
        dispatch(Loading.showLoading());

        await API.CheckIn.sendPhoto(uri)
            .then(response => {
                dispatch(handleResponse(response, () => {
                    let { params } = response;
                    dispatch(checkIn(params, currentHours, onCallbackSuccess, navigation))
                }))
            })
            .catch(error => {
                dispatch(Loading.hideLoading());
                console.log("err action.checkIn.sendPhoto", error);
            });
    };
}

export function checkIn(params, currentHours, onCallbackSuccess, navigation) {
    return async (dispatch, getState) => {

        let method = "checkInAbsen";
        if (currentHours > 11) {
            method = "checkOutAbsen"
        }

        const login_token = await AsyncStorage.getItem(STRING.LOGIN_TOKEN)
        let { latitude, longitude } = getState().locationReducers.currentLocation

        let params2 = {
            loginToken: login_token,
            latitude: Number(latitude),
            longitude: Number(longitude),
            foto: params.fileName
        }

        await API.CheckIn.checkIn(method, params2)
            .then(response => {
                dispatch(Loading.hideLoading());

                setTimeout(() => {

                    dispatch(handleResponse(response, () => {
                        let { params } = response;
                        let { checkIn, checkOut } = getState().attendanceReducers.todayAttendance
                        if (method == "checkInAbsen") {
                            if (checkIn == "") {
                                onCallbackSuccess(params.message)
                            } else {
                                Alert.alert("Failed", "Anda sudah check-in hari ini", [
                                    {
                                        text: 'Ok', onPress: () => navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'Home' }],
                                        })
                                    }
                                ], { cancelable: false })
                            }
                        } else {
                            if (checkOut == "") {
                                onCallbackSuccess(params.message)
                            } else {
                                Alert.alert("Failed", "Anda sudah check-out hari ini", [
                                    {
                                        text: 'Ok', onPress: () => navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'Home' }],
                                        })
                                    }
                                ], { cancelable: false })
                            }
                        }
                    }))

                }, 500);
            })
            .catch(error => {
                dispatch(Loading.hideLoading());
                console.log("err action.checkIn.checkIn", error);
            });
    };
}

function handleResponse(response, onSuccess) {
    return async (dispatch, getState) => {
        let { ok } = response;
        console.log("response", response)
        if (ok === "true") {
            onSuccess();

        } else {
            let { message } = response;
            if (message == 'Session Expired') {

                Alert.alert(message, "Please sign in again", [
                    {
                        text: 'Ok', onPress: () => {
                            dispatch(actions.Auth.navToSignInScreen())
                        }
                    }
                ], { cancelable: false })

            } else {
                Alert.alert("Failed", message);
            }
        }

    };
}