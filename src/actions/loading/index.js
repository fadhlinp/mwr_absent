import { AsyncStorage, Alert } from "react-native";
import * as types from "../actionTypes";

export function showLoading() {
    return {
        type: types.SHOW_LOADING,
        data: true
    };
}

export function hideLoading() {
    return {
        type: types.HIDE_LOADING,
        data: false
    };
}
