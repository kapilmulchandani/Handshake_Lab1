import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import profileReducer from './profileReducer';


export default combineReducers({
    
    loginReducer: loginReducer,
    profileReducer: profileReducer
    
})