import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './LandingPage/Home';
// import SignUp from './SignUp/SignUp';

class Main extends Component {
    render(){

        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Home}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;