import { GET_PROFILE, UPDATE_PROFILE } from './types'
import axios from 'axios';
import getURL from './url.js';

export const fetchprofileAction = (email) =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("Getting Data");
        response = await axios.post(getURL("getProfileData"), {EmailId: email});
        console.log("Profile response");
        console.log(response);
        // localStorage.setItem("loggedInUser", JSON.stringify({
        //     EmailId: response.data.EmailId,
        // }));
        dispatch({
            type: GET_PROFILE,
            payload: response
        })
    } catch (error) {
        console.log(error);
    }
    resolve()});
}
