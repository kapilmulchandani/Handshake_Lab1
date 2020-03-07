import React, { Component } from 'react';
import '../../styles/signup.css';
import handshakeSignUp from './handshakeSignUp.png';
import axios from 'axios';

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
            first_name: "",
            last_name: "",
            college_name: "",
            emailid: "",
            password: ""
        }
    }



    firstNameChangeHandler = (e) => {
        this.setState({
            first_name: e.target.value
        })
    }
    lastNameChangeHandler = (e) => {
        this.setState({
            last_name: e.target.value
        })
    }
    collegeChangeHandler = (e) => {
        this.setState({
            college_name: e.target.value
        })
    }
    emailIdChangeHandler = (e) => {
        this.setState({
            emailid: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
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
            PasswordData: this.state.password
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup', data)
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
                    {/* <img src={handshakeSignUp}></img> */}
                </div>
                <div class="right-half" className="col-md-8">
                    <div style={{position:'absolute', top:0, right:20}}>
                        Are you a company?
                        <b><a href="/signup"> Sign up here.</a></b>
                    </div>
                    <h1 class="style_heading" >Let's find your next job</h1>

                    <div class="style__text">Join Handshake's community of students, <br></br>schools, and employers to find internships,<br></br> land a job, and more.
                    </div>

                    <form class="signUpForm" action='action_page.php' style={{ border: '1px', color: 'solid #ccc' }}>
                        <div class="containerNew">

                            <label for="firstName"><b>First Name</b></label> <br />
                            <input class="firstName" onChange={this.firstNameChangeHandler} type="text" placeholder="First Name" name="firstName" required /> <br />

                            <label class="labelLastName" for="lastName"><b>Last Name</b></label> <br />
                            <input class="lastName" onChange={this.lastNameChangeHandler} type="text" placeholder="Last Name" name="lastName" required /> <br />

                            <label for="college"><b>College</b></label><br />
                            <input type="text" onChange={this.collegeChangeHandler} placeholder="College" name="college" required /><br />

                            <label for="email"><b>Email</b></label><br />
                            <input type="text" onChange={this.emailIdChangeHandler} placeholder="Enter Email" name="email" required /><br />

                            <label for="psw"><b>Password</b></label><br />
                            <input type="password" onChange={this.passwordChangeHandler} placeholder="Enter Password" name="psw" required /><br />

                            <label for="psw-repeat"><b>Repeat Password</b></label><br />
                            <input type="password" placeholder="Repeat Password" name="psw-repeat" required />

                            <div class="clearfix">
                                <button type="button" class="cancelbtn">Cancel</button>
                                <button type="submit" onClick={this.submitLogin} class="signupbtn">Sign Up</button>
                            </div>
                        </div>
                    </form>

                    {/* <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select" value="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </Form> */}

                </div>
            </div>
        )
    }
}

export default SignUp;
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);