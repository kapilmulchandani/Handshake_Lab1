import React, { Component } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { companyLoginAction } from '../../actions/companyLoginAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Card } from 'primereact/card';
// import '../../styles/login.css';

class CompanyLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmailId: "",
            Password: ""
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
            await this.props.companyLoginAction({
                EmailIdData: this.state.EmailId,
                PasswordData: this.state.Password
            });
            this.setState({
                errorMessage: ""
            })
        }

    }

    cancelClick = (e) =>{
        e.preventDefault();
        window.open('\\', "_self")
    }


    render() {
        let invalidCredentials = null;
        if (this.state.errorMessage) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.state.errorMessage}</p>
        } else if (false === this.props.companyLoginResponse.success) {
            invalidCredentials = <p className="alert alert-danger error-message">{this.props.loginResponse.message}</p>
        }
        return (
            <div class="divMid" className="my-4 row" style={{ width: '400px', height:'400px', margin: 'auto' }}>
                 <div className="row" style={{ position:'relative', width: '400px', margin: 'auto' }}>
                    <img src="https://ok2static.oktacdn.com/fs/bco/1/fs01heub3azJBMXWF0x7" class="auth-org-logo" alt="San Jose State University logo" />   
                </div>

                <div className="row">
                <Card title="">
                    {localStorage.getItem("loggedInCompany") ? <Redirect to="/company-job-posting" /> : ""}
                    {/* <div className="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12 login-dashboard"> */}
                    <div className="col-md-7 col-md-offset-4  login-dashboard">
                       
                        <div className="row">
                            <div>{invalidCredentials}</div>
                        </div>

                        <form>
                            <div className="row">
                                <label htmlFor="float-input">Email-Id</label>
                                <InputText name="EmailId" id="float-input" type="text" size="30" value={this.state.EmailId} onChange={this.onChangeHandler} />

                            </div>
                            <div className="row">
                                <label htmlFor="float-input">Password</label>
                                <InputText name="Password" id="float-input" type="password" size="30" value={this.state.Password} onChange={this.onChangeHandler} />
                            </div>
                            <div className="row" >
                                Are you an Student? <b><a href="/login">Log In here.</a></b>
                            </div>
                            <br />
                            <div className="row">
                                <Button label="Sign In" onClick={this.submitLogin} />
                                <Button className="mx-1" label="Cancel" onClick={this.cancelClick} />
                            </div>
                        </form>
                    </div>
                </Card>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    companyLoginResponse: state.companyLoginReducer.companyLoginResponse,
})

CompanyLogin.propTypes = {
    companyLoginResponse: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { companyLoginAction })(CompanyLogin);