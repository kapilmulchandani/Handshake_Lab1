import {
    GET_PROFILE, UPDATE_PROFILE,
    // USER_AUTH_FAIL, CHANGE_TO_OWNER_SUCCESS
} from '../actions/types';

const initialState = {
    profileDataResponse: {
        firstname: "",
        lastname: "",
        journey: "",
        city: "",
        education: "",
        workExp: "",
        OrgAchieve: "",
        languages: "",
        Skills: "",
        phone: "",
    }
}

export default function (state = initialState, action) {
    var profile = null;
    switch (action.type) {
        case GET_PROFILE:
            profile = {
                ...state.profileDataResponse,
                ...action.payload.data,
            }
            return {
                ...state,
                profile
            }

        case UPDATE_PROFILE:
            console.log("Fail:")
            console.log({ payload: action.payload });
            var profile = null;
            profile = {
                ...state.profileDataResponse,
                ...action.payload.data,
            }
            return {
                ...state,
                profile
            }
        // case USER_AUTH_FAIL:
        //     return initialState;// reseting state on AUTH failure on routes other than login
        default: return state;
    }
}