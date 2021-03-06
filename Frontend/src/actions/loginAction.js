import { LOGIN_SUCCESS, LOGIN_FAIL } from './types'
import axios from 'axios';
import getURL from './url.js';

export const loginAction = (credential) =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("logging in")
        response = await axios.post(getURL("login"), credential);
        console.log("Login response");
        console.log(response);
        localStorage.setItem("loggedInUser", JSON.stringify({
            EmailId: response.data.EmailId,
            StudentId: response.data.StudentId
        }));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
    resolve()});
}