import React, { Component } from 'react';
import axios from 'axios';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
// import '../../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmailId: "",
            Password: ""
        }
    }

    emailIDChangeHandler = (e) => {
        this.setState({
            EmailId: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            Password: e.target.value
        })
    }


    submitLogin = (e) => {
        e.preventDefault();

        const data = {
            EmailIdData: this.state.EmailId,
            PasswordData: this.state.Password
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/Account/login', data)
            .then(response => {
                console.log("Status Code Create : ", response.data);
                if (response.data === 'Login_Successful') {
                    window.open('/profile', "_self");
                }

            });

    }

    render() {
        return (
            <div>
                <div class="okta-sign-in-header" style={{position: 'absolute', top:'100px', left: '1240px'}}>
                    <img src="https://ok2static.oktacdn.com/fs/bco/1/fs01heub3azJBMXWF0x7" class="auth-org-logo" alt="San Jose State University logo" />
                    <div data-type="beacon-container" class="beacon-container">
                    </div>
                    </div>
                        <span className="p-float-label" style={{position: 'absolute', top:'240px', left: '590px'}}>
                            <InputText id="float-input" type="text" size="30" value={this.state.EmailId} onChange={(e) => this.setState({EmailId: e.target.value})} />
                            <label htmlFor="float-input">Email-Id</label>
                        </span>
                        <span className="p-float-label" style={{position: 'absolute', top:'310px', left: '590px'}}>
                            <InputText id="float-input" type="password" size="30" value={this.state.Password} onChange={(e) => this.setState({Password: e.target.value})} />
                            <label htmlFor="float-input">Password</label>
                        </span>
                
                <Button label="Sign In" onClick={this.submitLogin} style={{position: 'absolute', top:'370px', left: '690px'}} />
                </div>
                )
            }
        
        }
        
export default Login;