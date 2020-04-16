import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

import * as API from "../../api";
import * as types from "../../actions/actionTypes";
import { Loading } from '../../actions'
import { STRING } from "../../constant";
import { saveToStorage, removeFromStorage } from "../../utils";

export function signIn(params) {
    return async (dispatch, getState) => {
        dispatch(Loading.showLoading());

        await API.AUTH.signIn(params)
            .then(response => {
                dispatch(Loading.hideLoading());

                setTimeout(() => {
                    dispatch(handleResponse(response, () => {
                        let { params } = response;

                        saveToStorage(STRING.LOGIN_TOKEN, params.loginToken);
                        saveToStorage(STRING.USER_PROFILE, params.name);
                        dispatch(setLoginToken(params.loginToken))
                    }))
                }, 700);
            })
            .catch(error => {
                dispatch(Loading.hideLoading());
                console.log("err action.auth.signIn", error);
            });
    };
}

export function signOut() {
    return async (dispatch, getState) => {
        dispatch(Loading.showLoading());

        const login_token = await AsyncStorage.getItem(STRING.LOGIN_TOKEN)
        let params = {
            loginToken: login_token
        }

        await API.AUTH.signOut(params)
            .then(response => {
                dispatch(Loading.hideLoading());

                setTimeout(() => {
                    dispatch(handleResponse(response, () => {
                        dispatch(navToSignInScreen())
                    }))
                }, 500);
            })
            .catch(error => {
                dispatch(Loading.hideLoading());
                console.log("err action.auth.signOut", error);
            });
    };
}

export function getUserData() {
    return async (dispatch, getState) => {

        const login_token = await AsyncStorage.getItem(STRING.LOGIN_TOKEN)
        let params = {
            loginToken: login_token
        }

        await API.AUTH.getUserData(params)
            .then(response => {

                dispatch(handleResponse(response, () => {
                    let { params } = response;
                    dispatch(setUserData(params.userInfo))
                }))
            })
            .catch(error => {
                console.log("err action.auth.getUserData", error);
            });
    };
}

function handleResponse(response, onSuccess) {
    return async (dispatch, getState) => {
        let { ok } = response;
        console.log(response)
        if (ok === "true") {
            onSuccess();

        } else if (response.message == 'Session Expired') {
            let { message } = response;
            Alert.alert(message, "Please sign in again", [
                {
                    text: 'Ok', onPress: () => {
                        dispatch(navToSignInScreen())
                    }
                }
            ], { cancelable: false })

        } else {
            let { message } = response;
            Alert.alert("Failed", message);
        }
    };
}

export function setUserData(data) {
    return {
        type: types.SET_USER_DATA,
        data
    }
}

export function setLoginToken(data) {
    return {
        type: types.SET_LOGIN_TOKEN,
        data
    }
}

export function navToSignInScreen() {
    return async (dispatch, getState) => {
        removeFromStorage(STRING.LOGIN_TOKEN)
        dispatch(setLoginToken(null))
    }
}