import React, { Component } from 'react';
import '../../styles/home.css';

//create the Navbar Component
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div class="left-half">
                    <img alt="Handshake logo image" height="42" src="https://handshake-production-cdn.joinhandshake.com/assets/logo-icon-2d294d9834da88f5fdf0ab747dd89fb15f8ab7c12a3e193294bab3d522d71a2c.svg">
                    </img>

                    <h1 class="marketing-title">
                        Get the job done  .
                        &nbsp;
                    </h1>

                    <div class="marketing-content">
                        <h3 class="titles">Students</h3>
                        <p>Launch the next step in your career.</p>
                        <h3 class="titles">Employers</h3>
                        <p>Hire the next generation of talent.</p>
                        <h3 class="titles">Career Centers</h3>
                        <p>Bring the best jobs to your students.</p>
                    </div>
                </div>
                <div class="right-half">

                    <div class="no-account">
                        No account?
            <b><a href="/signup">Sign up here.</a></b>
                    </div>
                    <img class="institution-logo" src="https://s3.amazonaws.com/handshake.production/app/public/assets/schools/122/original/hs-school-logo-data.?1559840573">
                    </img>
                    <h3 class="collegeName"> San Jose State University </h3>

                    <a title="San Jose State University users can sign in here." class="sso-button" data-bind="click: track_sso_click" href="/login"><div id="sso-name">San Jose State University Sign On</div>
                        <i class="fa fa-chevron-right"></i>
                    </a>
                </div>

            </div>
        )
    }
}

export default Home;