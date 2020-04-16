import { combineReducers } from "redux";

import * as Attendance from './attendance'
import * as Auth from "./auth"
import * as Loading from "./loading"
import * as Location from './location'

export default reducers = combineReducers({
    authReducers: combineReducers({
        userData: Auth.getUserData,
        loginToken: Auth.getLoginToken
    }),
    loadingReducers: combineReducers({
        isLoading: Loading.isLoading
    }),
    attendanceReducers: combineReducers({
        todayAttendance: Attendance.getTodayAttendance,
        attendanceHistory: Attendance.getAttendanceHistory,
        timeServer: Attendance.getTimeServer
    }),
    locationReducers: combineReducers({
        currentLocation: Location.getLocation
    })
});
