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
                
                 
                </div>
            </div>
        )
    }
}

export default SignUp;