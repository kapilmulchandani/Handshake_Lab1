import React, { Component } from 'react';
import '../../styles/signup.css';
import handshakeSignUp from './handshakeSignUp.png';
import axios from 'axios';
import { Button } from 'primereact/button';
import getURL from '../../actions/url.js';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            college_name: "",
            emailid: "",
            password: "",
            major: ""
        }
    }


    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitLogin = (e) => {
        e.preventDefault();
        // this.props.signup(data);

        const data = {
            FirstNameData: this.state.first_name,
            LastNameData: this.state.last_name,
            CollegeData: this.state.college_name,
            EmailIdData: this.state.emailid,
            PasswordData: this.state.password,
            MajorData: this.state.major
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(getURL("signup"), data)
            .then(response => {
                console.log("Status Code Create : ", response.data);
                if (response.data === 'Successful_Insertion') {
                    window.open('/login', "_self");
                }

            });

    }

    cancelClick = (e) =>{
        e.preventDefault();
        window.open('\\', "_self")
    }

    render() {

        // console.log(cookie);
        return (
            <div class="row">
                {/* <span class="style__feature-image___39s0A" role="img" aria-label="Two students having a conversation next to a stairwell"></span> */}
                <br />

                <div class="left-half" className="col-md-4">
                    <img class="imgHandshake" src={handshakeSignUp}></img>
                </div>
                <div class="right-half" className="col-md-8">
                    <div style={{position:'absolute', top:0, right:20}}>
                        Are you a company?
                        <b><a href="/company-signup"> Sign up here.</a></b>
                    </div>
                    <h1 class="style_heading" >Let's find your next job</h1>

                    <div class="style__text">Join Handshake's community of students, <br></br>schools, and employers to find internships,<br></br> land a job, and more.
                    </div>

                    <form class="signUpForm" action='action_page.php' style={{ border: '1px', color: 'solid #ccc' }}>
                        <div class="containerNew">

                            <label for="firstName"><b>First Name</b></label> <br />
                            <input class="firstName" name="first_name" onChange={this.onChangeHandler} type="text" placeholder="First Name" name="first_name" required /> <br />

                            <label class="labelLastName" for="lastName"><b>Last Name</b></label> <br />
                            <input class="lastName" name="last_name" onChange={this.onChangeHandler} type="text" placeholder="Last Name" name="last_name" required /> <br />

                            <label for="college"><b>College</b></label><br />
                            <input type="text" name="college_name" onChange={this.onChangeHandler} placeholder="College" name="college_name" required /><br />
                            
                            <label for="major"><b>Major</b></label><br />
                            <input type="text" name="major" onChange={this.onChangeHandler} placeholder="Major" name="major" required /><br />

                            <label for="email"><b>Email</b></label><br />
                            <input type="text" name="emailid" onChange={this.onChangeHandler} placeholder="Enter Email" name="emailid" required /><br />

                            <label for="psw"><b>Password</b></label><br />
                            <input type="password" name="password" onChange={this.onChangeHandler} placeholder="Enter Password" name="password" required /><br />


                            <div className="mx-2 row">
                                
                                <Button className="mx-1" label="Cancel" onClick={this.cancelClick} />
                                <div className="mx-2"></div>
                                <Button label="Sign Up" onClick={this.submitLogin} class="signupbtn"></Button>
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