import * as types from "../../actions/actionTypes";

export function isLoading(state = false, action) {
    switch (action.type) {
        case types.SHOW_LOADING:
            return action.data;
        case types.HIDE_LOADING:
            return action.data;
        default:
            return state;
    }
}
