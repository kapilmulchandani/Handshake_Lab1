import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './LandingPage/Home';
import SignUp from './Account/SignUp';
import Profile from './Account/Profile';
import Navbar from './Account/Navbar';
import Login from './Account/Login';
import CompanySignUp from './Company/CompanySignUp';
import CompanyLogin from './Company/CompanyLogin';
import CompanyJobPosting from './Company/CompanyJobPosting';

class Main extends Component {
    render(){

        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/"  component={Home}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/company-signup" component={CompanySignUp} />
                <Route exact path="/company-login" component={CompanyLogin} />
                <Route exact path="/company-job-posting" component={CompanyJobPosting} />
                
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;