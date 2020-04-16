import * as types from "../../actions/actionTypes";

export function getUserData(state = {
    "isAdmin": "",
    "lastLogin": "",
    "name": "",
    "nik": "",
    "positionUser": "",
    "userId": ""
}, action) {
    switch (action.type) {
        case types.SET_USER_DATA:
            return action.data;
        default:
            return state;
    }
}

export function getLoginToken(state = null, action) {
    switch (action.type) {
        case types.SET_LOGIN_TOKEN:
            return action.data;
        default:
            return state;
    }
}