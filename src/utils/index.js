import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from "react-native";

export async function saveToStorage(key, loginToken) {
    try {
        await AsyncStorage.setItem(key, loginToken)
    } catch (e) {
        console.warn('saving error', e)
    }
}

export async function removeFromStorage(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.warn('remove error', e)
    }
}

export function handleResponse(response, onSuccess) {
    return async (dispatch, getState) => {
        let { ok } = response;
        console.log("response", response.params)
        if (ok === "true") {
            onSuccess();
        } else {
            let { message } = response;
            if (message == 'Session Expired') {
                // dispatch(setAttendanceHistory(params.listAbsen))
                // Alert.alert("", message);
            } else {
                Alert.alert("", message);
            }
        }
    };
}