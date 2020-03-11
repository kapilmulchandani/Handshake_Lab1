import {
    RESULT_FAIL, RESULT_SUCCESS,
    // USER_AUTH_FAIL, CHANGE_TO_OWNER_SUCCESS
} from '../actions/types';

const initialState = {
    searchResultsResponse: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESULT_SUCCESS:
            return {
                ...state,
                searchResultsResponse: action.payload.data
            }
        case RESULT_FAIL:
            console.log("Fail:")
            console.log({ payload: action.payload });
            return {
                ...state,
                searchResultsResponse: action.payload.response.data
            }
        // case USER_AUTH_FAIL:
        //     return initialState;// reseting state on AUTH failure on routes other than login
        default: return state;
    }
}