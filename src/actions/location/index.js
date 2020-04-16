import * as types from "../actionTypes";

export function setLocation(data) {
    return {
        type: types.SET_LOCATION,
        data
    };
}
