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

                <div class="style__text">Join Handshake's community of students, <br></br>schools, and employers to find internships,<br></br> land a job, and more.</div>
                               
                </div>
            </div>
        )
    }
}

export default SignUp;