import * as types from "../../actions/actionTypes";

export function getConnectionStatus(state = true, action) {
    switch (action.type) {
        case types.SET_CONNECTION_STATUS:
            return action.data;
        default:
            return state;
    }
}
