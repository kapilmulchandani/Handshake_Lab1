import { COMPANY_LOGIN_SUCCESS, COMPANY_LOGIN_FAIL } from './types'
import axios from 'axios';
import getURL from './url.js';

export const companyLoginAction = (credential) =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("logging in")
        response = await axios.post(getURL("company-login"), credential);
        console.log("Login response");
        console.log(response);
        localStorage.setItem("loggedInCompany", JSON.stringify({
            EmailId: response.data.EmailId,
            CompanyId: response.data.CompanyId
        }));
        dispatch({
            type: COMPANY_LOGIN_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: COMPANY_LOGIN_FAIL,
            payload: error
        })
    }
    resolve()});
}