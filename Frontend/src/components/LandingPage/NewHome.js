import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//create the Navbar Component
class NewHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div class="left-half" style={{ backgroundColor:'#1569e0', float: 'left', width: '35%', height:'100%' }}>
                    <div className="row" style={{ position: 'absolute', top: 0, left: 0 }}>
                        <img class="handshake_img" alt="Handshake logo image" height="42" src="https://handshake-production-cdn.joinhandshake.com/assets/logo-icon-2d294d9834da88f5fdf0ab747dd89fb15f8ab7c12a3e193294bab3d522d71a2c.svg">
                        </img>
                    </div>
                    <div className="row">

                    </div>
                    <div className="row">
                        <h1 class="marketing-title">
                            Get the job done  .
                            &nbsp;
                        </h1>
                        <br />
                    </div>


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

                    <Link title="San Jose State University users can sign in here." class="sso-button" to="/login"><div id="sso-name">San Jose State University Sign On</div>
                        <i class="fa fa-chevron-right"></i>
                    </Link>
                </div>

            </div>
        )
    }
}

export default NewHome;