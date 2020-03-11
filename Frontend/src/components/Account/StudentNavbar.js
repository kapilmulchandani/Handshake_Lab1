import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

import { Redirect } from 'react-router';

class StudentNavbar extends Component {

   constructor(props) {
      super(props);

      this.state = {
      };
      this.logout = this.logout.bind(this);
   }

   logout = (e) => {
      localStorage.clear();
      this.setState({})
   }

   render() {

      return (
         <div>
            <div className="content-section implementation">
               {localStorage.getItem("loggedInUser") || localStorage.getItem("loggedInCompany") ? "" : <Redirect to="/" />}
               {/* <Menubar model={this.state.items} >
                        <InputText placeholder="Search" type="text"/>
                        <Button label="Logout" icon="pi pi-power-off" onClick={this.logout} style={{marginLeft:3}} />
                    </Menubar> */}

               <Navbar bg="primary" color="black" variant="dark">
               {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
               <Nav className="mr-auto">
                     <Nav.Link style={{ fontWeight:'bold', fontSize:18}} href="#home">Home</Nav.Link>
                     <Nav.Link style={{ fontWeight:'bold', fontSize:18}} href="/company-profile">Profile</Nav.Link>
                     <Nav.Link style={{ fontWeight:'bold', fontSize:18}} href="/company-job-posting">Jobs</Nav.Link>
                     <Nav.Link style={{ fontWeight:'bold', fontSize:18}} href="#hello">Events</Nav.Link>
                     <Nav.Link style={{ fontWeight:'bold', fontSize:18}} href="/student-search">Search</Nav.Link>
                  </Nav>
               </Navbar>

            </div>
         </div>
      );
   }
}

export default StudentNavbar;