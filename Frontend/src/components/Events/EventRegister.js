import React, { Component } from 'react';
import StudentNavBar from '../Account/StudentNavbar';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Button } from 'primereact/button';
import axios from 'axios';
import getURL from '../../actions/url.js';

var events = []
events = JSON.parse(localStorage.getItem("Events"));
var eventId = localStorage.getItem("Event_Id");
var StudentMajor;
var i;
var EventMajor;

class EventRegister extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(document.referrer);
        
        for (i = 0; i < events.length; i++) {
            if (events[i].event_id == eventId) {
                EventMajor = events[i].event_eligibility;
                break;
            }
        }
        console.log(EventMajor);
        axios.defaults.withCredentials = true;
        const data = {
            StudentIdData: JSON.parse(localStorage.getItem("loggedInUser")).StudentId
        };
        axios.post(getURL("get-major"), data)
            .then(response => {
                console.log('REsponse', response.data.StudentMajor[0].major);
                StudentMajor = response.data.StudentMajor[0].major;
                localStorage.setItem('StudentMajor', StudentMajor);
            });


    }

    onRSVP = (e) => {
        e.preventDefault();
        var compId = localStorage.getItem("CompanyId");
        StudentMajor = localStorage.getItem('StudentMajor');
        if (EventMajor == 'All' || EventMajor == StudentMajor) {
            axios.defaults.withCredentials = true;
            var eventsToShow = [];
            const data = {
                EventIdData: eventId,
                CompanyIdData: compId,
                StudentIdData: JSON.parse(localStorage.getItem("loggedInUser")).StudentId
            };
            axios.post(getURL("register-event"), data)
                .then(response => {
                    if (response.data === 'Successful_Insertion') {
                        window.open('/my-events', "_self");
                    }
                });
        }

        else{
            alert('This event is not for '+StudentMajor+' students');
        }
    }
    render() {
        return (
            <div>
                <StudentNavBar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="#home">Registration Details</Navbar.Brand>
                    <Navbar.Brand style={{ position: 'absolute', right: 0 }} href="/my-events">My Events</Navbar.Brand>
                </Navbar>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 mx-2 my-4">
                        <Card className="my-4" Title="" style={{ width: '' }}>
                            <div className="row">
                                <Image src={'/' + events[i].event_title + '.jpg'} style={{ marginLeft: '70px', width: '450px' }} />
                            </div>
                        </Card>
                        <div className="row">
                            <Card Title="" style={{ width: '650px' }}>

                                <div className="row">
                                    <div className="col-md-2"></div>
                                    {events[i].event_description}

                                </div>

                            </Card>
                            {(document.referrer != 'http://localhost:3000/my-events') ?
                                <Button className='mx-4' onClick={this.onRSVP} label="RSVP" /> : null
                            }


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventRegister;