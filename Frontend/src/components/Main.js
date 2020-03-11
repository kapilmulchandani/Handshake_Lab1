import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './LandingPage/Home';
import SignUp from './Account/SignUp';
import Profile from './Account/Profile';
import StudentProfile from './Account/StudentProfileView';
import StudentNavbar from './Account/StudentNavbar';
import Login from './Account/Login';
import CompanySignUp from './Company/CompanySignUp';
import CompanyLogin from './Company/CompanyLogin';
import CompanyJobPosting from './Company/CompanyJobPosting';
import CompanyProfile from './Company/CompanyProfile';
import StudentSearch from './Search/StudentSearch';
import Searchresults from './Search/Searchresults';
import StudentJobDashboard from './Jobs/StudentJobDashboard';
import EventsPosting from './Events/EventsPosting';
import EventsView from './Events/EventsView';

class Main extends Component {
    render(){

        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/"  component={Home}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/student-profile" component={StudentProfile}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/company-signup" component={CompanySignUp} />
                <Route exact path="/company-login" component={CompanyLogin} />
                <Route exact path="/company-job-posting" component={CompanyJobPosting} />
                <Route exact path="/events-posting" component={EventsPosting} />
                <Route exact path="/company-profile" component={CompanyProfile} />
                <Route exact path="/student-search" component={StudentSearch} />
                <Route exact path="/search-results" component={Searchresults} />
                <Route exact path="/student-job-dashboard" component={StudentJobDashboard} />
                <Route exact path="/view-events" component={EventsView} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;