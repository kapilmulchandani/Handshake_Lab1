import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './LandingPage/Home';
import SignUp from './Account/SignUp';
import Profile from './Account/Profile';
import Navbar from './Account/Navbar';

class Main extends Component {
    render(){

        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Home}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/profile" component={Profile}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;