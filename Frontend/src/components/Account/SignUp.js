import React,{Component} from 'react';
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

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            FirstName: "",
            LastName: "",
            College: "",
            EmailId: "",
            Password: ""
        }
    }

    

    firstNameChangeHandler = (e) => {
        this.setState({
            FirstName : e.target.value
        })
    }
    lastNameChangeHandler = (e) => {
        this.setState({
            LastName : e.target.value
        })
    }
    collegeChangeHandler = (e) => {
        this.setState({
            College : e.target.value
        })
    }
    emailIdChangeHandler = (e) => {
        this.setState({
            EmailId : e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            Password : e.target.value
        })
    }
    
    submitLogin = (e) => {
        e.preventDefault();
        // this.props.signup(data);

        const data = {
            FirstNameData : this.state.FirstName,
            LastNameData : this.state.LastName,
            CollegeData : this.state.College,
            EmailIdData : this.state.EmailId,
            PasswordData : this.state.Password
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/signup',data)
            .then(response => {
                console.log("Status Code Create : ",response.data);
                if(response.data === 'Successful_Insertion'){
                     window.open('/login', "_self");
                }

            });
        
    }


    render(){
        // console.log(cookie);
        return(
            <div>
                {/* <span class="style__feature-image___39s0A" role="img" aria-label="Two students having a conversation next to a stairwell"></span> */}
                <br/>
                
                <div class="left-half" >
                        <img class="signUpimage" src={handshakeSignUp}></img> 
                </div>
                <div class="right-half">
                <h1 class="style_heading">Let's find your next job</h1>

                <div class="style__text">Join Handshake's community of students, <br></br>schools, and employers to find internships,<br></br> land a job, and more.
                </div>

                <form class="signUpForm" action='action_page.php' style={{border:'1px' , color: 'solid #ccc'}}>
                    <div class="containerNew">
                        
                        {/* <hr /> */}
                        
                        <label for="firstName"><b>First Name</b></label> <br />
                        <input class="firstName" onChange = {this.firstNameChangeHandler} type="text" placeholder="First Name" name="firstName" required /> <br />

                        <label class="labelLastName" for="lastName"><b>Last Name</b></label> <br />
                        <input class="lastName" onChange = {this.lastNameChangeHandler} type="text" placeholder="Last Name" name="lastName" required /> <br />

                        <label for="college"><b>College</b></label><br />
                        <input type="text" onChange = {this.collegeChangeHandler} placeholder="College" name="college" required /><br />

                        <label for="email"><b>Email</b></label><br />
                        <input type="text" onChange = {this.emailIdChangeHandler} placeholder="Enter Email" name="email" required /><br />

                        <label for="psw"><b>Password</b></label><br />
                        <input type="password" onChange = {this.passwordChangeHandler} placeholder="Enter Password" name="psw" required /><br />

                        <label for="psw-repeat"><b>Repeat Password</b></label><br />
                        <input type="password" placeholder="Repeat Password" name="psw-repeat" required />

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