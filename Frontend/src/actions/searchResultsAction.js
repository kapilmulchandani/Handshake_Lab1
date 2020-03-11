import { RESULT_SUCCESS, RESULT_FAIL } from './types'
import axios from 'axios';
import getURL from './url.js';

export const searchResultsAction = (credentials) =>  (dispatch) => {
    return new Promise( async (resolve, reject)=>{
    axios.defaults.withCredentials = true;
    let response = null;
    try {
        console.log("logging in")
        response = await axios.post(getURL("search-students"), credentials);
        console.log("Search Results response");
        console.log(response);
        // localStorage.setItem("loggedInUser", JSON.stringify({
        //     EmailId: response.data.EmailId,
        // }));

        localStorage.setItem("searchResults", JSON.stringify({
            searchData : response.data.testData
        }))
        dispatch({
            type: RESULT_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: RESULT_FAIL,
            payload: error
        })
    }
    resolve()});
}