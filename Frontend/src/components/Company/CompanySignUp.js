import React, { Component } from 'react';
import '../../styles/signup.css';
import axios from 'axios';
import handshakeSignUp from '../Account/handshakeSignUp.png';
import getURL from '../../actions/url.js';

//create the Navbar Component
// function mapStateToProps(store) {
//     return {
//         signupSuccess:store.account.signupSuccess,
//         signupMessage:store.account.signupMessage,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         signup: (data) => dispatch(signup(data)),
//     };
// }

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: "",
            location: "",
            emailid: "",
            password: ""
        }
    }


    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    submitLogin = (e) => {
        e.preventDefault();
        // this.props.signup(data);
        console.log(this.state);
        const data = {
            CompanyNameData: this.state.company_name,
            LocationData: this.state.location,
            EmailIdData: this.state.emailid,
            PasswordData: this.state.password
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(getURL("companysignup"), data)
            .then(response => {
                console.log("Status Code Create : ", response.data);
                if (response.data === 'Successful_Insertion') {
                    window.open('/login', "_self");
                }

            });

    }


    render() {

        // console.log(cookie);
        return (
            <div class="row">
                {/* <span class="style__feature-image___39s0A" role="img" aria-label="Two students having a conversation next to a stairwell"></span> */}
                <br />

                <div class="left-half" className="col-md-4">
                    <img src={handshakeSignUp}></img>
                </div>
                <div class="right-half" className="col-md-8">
                    <div style={{position:'absolute', top:0, right:20}}>
                        Are you a Student?
                        <b><a href="/signup"> Sign up here.</a></b>
                    </div>
                    <h1 class="style_heading" >Let's find your potential candidates</h1>

                    <div class="style__text">Join Handshake's community of students, <br></br>schools, and employers to find best employees,<br></br> land a job, and more.
                    </div>

                    <form class="signUpForm" action='action_page.php' style={{ border: '1px', color: 'solid #ccc' }}>
                        <div class="containerNew">

                            <label><b>Company Name</b></label> <br />
                            <input name = "company_name" class="companyName" onChange={this.onChangeHandler} type="text" placeholder="Company Name" required /> <br />
                            
                            <label for="location"><b>Location</b></label><br />
                            <input name="location" type="text" onChange={this.onChangeHandler} placeholder="Location" required /><br />

                            <label for="email"><b>Email</b></label><br />
                            <input type="text" onChange={this.onChangeHandler} placeholder="Enter Email" name="emailid" required /><br />

                            <label for="psw"><b>Password</b></label><br />
                            <input type="password" onChange={this.onChangeHandler} placeholder="Enter Password" name="password" required /><br />

                            <div class="clearfix">
                                <button type="button" class="cancelbtn">Cancel</button>
                                <button type="submit" onClick={this.submitLogin} class="signupbtn">Sign Up</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default SignUp;
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);