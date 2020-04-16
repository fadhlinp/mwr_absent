import * as types from "../../actions/actionTypes";

export function getTodayAttendance(state = {
    "checkIn": "",
    "checkOut": ""
}, action) {
    switch (action.type) {
        case types.SET_TODAY_ATTENDANCE:
            return action.data;
        default:
            return state;
    }
}

export function getAttendanceHistory(state = [], action) {
    switch (action.type) {
        case types.SET_ATTENDANCE_HISTORY:
            return action.data;
        default:
            return state;
    }
}

export function getTimeServer(state = {
    date: "",
    time: ""
}, action) {
    switch (action.type) {
        case types.SET_TIME_SERVER:
            return action.data;
        default:
            return state;
    }
}