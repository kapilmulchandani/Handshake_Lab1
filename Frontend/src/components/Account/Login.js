import React, { Component } from 'react';
import axios from 'axios';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { loginAction } from '../../actions/loginAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
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


    submitLogin = async (e) => {
        e.preventDefault();

        let msg = "";
        if (!this.state.EmailId) {
            msg += "Email Address is a required field.\n"
        }
        if (!this.state.Password) {
            msg += "Password is a required field.\n"
        }
        if (msg) {
            this.setState({
                errorMessage: msg
            })
        }
        else {
            await this.props.loginAction({
                EmailIdData: this.state.EmailId,
                PasswordData: this.state.Password
            });
            this.setState({
                errorMessage: ""
            })
        }

    }

    render() {
        let invalidCredentials = null;
        if (this.state.errorMessage) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.state.errorMessage}</p>
        } else if (false === this.props.loginResponse.success) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.props.loginResponse.message}</p>
        }
        return (
            <div>
                {localStorage.getItem("loggedInUser") ? <Redirect to="/profile" /> : ""}
                <div class="okta-sign-in-header" style={{position: 'absolute', top:'100px', left: '1240px'}}>
                    <img src="https://ok2static.oktacdn.com/fs/bco/1/fs01heub3azJBMXWF0x7" class="auth-org-logo" alt="San Jose State University logo" />
                    <div data-type="beacon-container" class="beacon-container">
                    </div>
                </div>
                <div>{invalidCredentials}</div>
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
        
const mapStateToProps = (state) => ({
    loginResponse: state.loginReducer.loginResponse,
})

Login.propTypes = {
    loginResponse: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { loginAction })(Login);