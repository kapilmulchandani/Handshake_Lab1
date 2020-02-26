import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import Navbar from './Navbar';
import SignUp from './SignUp';

class Profile extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>

            <div>
            {Navbar}
            <p>This is a paragraph.</p>
            <p>This is another paragraph.</p>
            </div>
            </div>

        );
    }
}

export default Profile;