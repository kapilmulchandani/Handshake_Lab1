import {
    COMPANY_LOGIN_FAIL, COMPANY_LOGIN_SUCCESS,
    // USER_AUTH_FAIL, CHANGE_TO_OWNER_SUCCESS
} from '../actions/types';

const initialState = {
    companyLoginResponse: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case COMPANY_LOGIN_SUCCESS:
            return {
                ...state,
                companyLoginResponse: action.payload.data
            }
        case COMPANY_LOGIN_FAIL:
            console.log("Fail:")
            console.log({ payload: action.payload });
            return {
                ...state,
                companyLoginResponse: action.payload.response.data
            }
        // case USER_AUTH_FAIL:
        //     return initialState;// reseting state on AUTH failure on routes other than login
        default: return state;
    }
}