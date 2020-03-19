import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';
import companyLoginReducer from './companyLoginReducer';
import searchResultsReducer from './searchResultsReducer';


export default combineReducers({
    
    loginReducer: loginReducer,
    profileReducer: profileReducer,
    companyLoginReducer: companyLoginReducer,
    searchResultsReducer: searchResultsReducer
    
})