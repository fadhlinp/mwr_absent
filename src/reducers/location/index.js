import * as types from "../../actions/actionTypes";

export function getLocation(state = {
    latitude: -1.1706890033193293,
    longitude: 101.70649590595647
}, action) {
    switch (action.type) {
        case types.SET_LOCATION:
            return action.data;
        default:
            return state;
    }
}
