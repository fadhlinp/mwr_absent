import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'

import * as API from "../../api";
import * as actions from "../../actions";
import * as types from "../../actions/actionTypes";
import { Loading } from '../../actions'
import { STRING } from "../../constant"

export function getTodayAttendance() {
    return async (dispatch, getState) => {

        const login_token = await AsyncStorage.getItem(STRING.LOGIN_TOKEN)
        let params = {
            loginToken: login_token
        }

        await API.ATTENDANCE.getTodayAttendance(params)
            .then(response => {
                dispatch(handleResponse(response, () => {
                    let { params } = response;
                    dispatch(setTodayAttendance(params))
                }))
            })
            .catch(error => {
                console.log("err action.attendance.getTodayAttendance", error);
            });
    };
}

export function getHistoryData() {
    return async (dispatch, getState) => {
        dispatch(Loading.showLoading());

        const login_token = await AsyncStorage.getItem(STRING.LOGIN_TOKEN)
        let params = {
            loginToken: login_token,
            month: '',
            year: ''
        }

        await API.ATTENDANCE.getHistoryData(params)
            .then(response => {
                dispatch(Loading.hideLoading());

                setTimeout(() => {

                    dispatch(handleResponse(response, () => {
                        let { params } = response;
                        dispatch(setAttendanceHistory(params.listAbsen))
                    }))

                }, 500);
            })
            .catch(error => {
                dispatch(Loading.hideLoading());
                console.log("err action.attendance.getHistoryData", error);
            });
    };
}

export function getTimeServer() {
    return async (dispatch, getState) => {

        let params = {}

        await API.ATTENDANCE.getTimeServer(params)
            .then(response => {

                dispatch(handleResponse(response, () => {
                    let { params } = response;
                    dispatch(setTimeServer(params))
                }))
            })
            .catch(error => {
                console.log("err action.attendance.getTimeServer", error);
            });
    };
}

function handleResponse(response, onSuccess) {
    return async (dispatch, getState) => {
        let { ok } = response;

        if (ok === "true") {
            onSuccess();

        } else {
            let { message } = response;
            if (message == 'Session Expired') {
                Alert.alert(message, "Please sign in again");
                dispatch(actions.Auth.navToSignInScreen)
            } else {
                Alert.alert("Failed", message);
            }
        }
    };
}

function setTodayAttendance(data) {
    return {
        type: types.SET_TODAY_ATTENDANCE,
        data
    }
}

function setAttendanceHistory(data) {
    return {
        type: types.SET_ATTENDANCE_HISTORY,
        data
    }
}

function setTimeServer(data) {
    return {
        type: types.SET_TIME_SERVER,
        data
    }
}