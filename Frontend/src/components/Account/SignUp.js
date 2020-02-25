import React,{Component} from 'react';
import '../../styles/signup.css';
import handshakeSignUp from './handshakeSignUp.png';

//create the Navbar Component
class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }


    submitLogin = (e) => {
        e.preventDefault();
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

                <form action='action_page.php' style={{border:'1px' , color: 'solid #ccc'}}>
                    <div class="containerNew">
                        
                        {/* <hr /> */}

                        <label for="firstName"><b>First Name</b></label><br />
                        <input type="text" placeholder="First Name" name="firstName" required /> <br />

                        <label for="lastName"><b>Last Name</b></label> <br />
                        <input type="text" placeholder="Last Name" name="lastName" required /> <br />

                        <label for="sjsuID"><b>SJSU ID</b></label><br />
                        <input type="number" placeholder="Enter SJSU ID" name="sjsuID" required /><br />

                        <label for="major"><b>Major</b></label><br />
                        <input type="text" placeholder="Major" name="major" required /><br />

                        <label for="email"><b>Email</b></label><br />
                        <input type="text" placeholder="Enter Email" name="email" required /><br />

                        <label for="psw"><b>Password</b></label><br />
                        <input type="password" placeholder="Enter Password" name="psw" required /><br />

                        <label for="psw-repeat"><b>Repeat Password</b></label><br />
                        <input type="password" placeholder="Repeat Password" name="psw-repeat" required />

                        <div class="clearfix">
                        <button type="button" class="cancelbtn">Cancel</button>
                        <button type="submit" class="signupbtn">Sign Up</button>
                        </div>
                    </div>
                </form>                               
                </div>
            </div>
        )
    }
}

export default SignUp;