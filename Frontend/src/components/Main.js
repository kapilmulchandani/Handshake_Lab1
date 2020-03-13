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
import EventsViewCard from './Events/EventsViewCard';
import EventRegister from './Events/EventRegister';
import MyEvents from './Events/MyEvents';
import MyJobs from './Jobs/MyJobs';
import JobApply from './Jobs/JobApply';
import CompanyJobs from './Company/CompanyJobs';
import CompanyApplicationsReceived from './Company/CompanyApplicationsReceived';
import ViewResume from './Account/ViewResume';
import StudentProfileView from './Account/StudentProfileView';
import EventRegistrations from './Events/EventRegistrations';
import EventRegistrationReceived from './Events/EventRegistrationReceived';

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
                <Route exact path="/view-events" component={EventsViewCard} />
                <Route exact path="/register-event" component={EventRegister} />
                <Route exact path="/my-events" component={MyEvents} />
                <Route exact path="/my-jobs" component={MyJobs} />
                <Route exact path="/job-apply" component={JobApply} />
                <Route exact path="/company-jobs" component={CompanyJobs} />
                <Route exact path="/applications-received" component={CompanyApplicationsReceived} />
                <Route exact path="/view-resume" component={ViewResume} />
                <Route exact path="/student-profile-view" component={StudentProfileView} />
                <Route exact path="/event-registrations" component={EventRegistrations} />
                <Route exact path="/registrations-received" component={EventRegistrationReceived} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;