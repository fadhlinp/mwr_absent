import * as types from "../../actions/actionTypes";

export function setConnectionStatus(data) {
    return {
        type: types.SET_CONNECTION_STATUS,
        data
    };
}
