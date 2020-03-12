import React, { Component } from 'react';
import StudentNavBar from '../Account/StudentNavbar';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Button } from 'primereact/button';
import axios from 'axios';

var events = []
events = JSON.parse(localStorage.getItem("Events"));
var eventId = localStorage.getItem("Event_Id");

var i;
class EventRegister extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        for (i = 0; i < events.length; i++) {
            if (events[i].event_id == eventId) {
                break;
            }
        }
    }

    onRSVP = (e) =>{
        e.preventDefault();
        var compId = localStorage.getItem("CompanyId");
        axios.defaults.withCredentials = true;
        var eventsToShow = [];
        const data = {
            EventIdData : eventId,
            CompanyIdData : compId,
            StudentIdData : localStorage.getItem('student_id')
        };
        axios.post('http://localhost:3001/register-event', data)
            .then(response => {
                if (response.data === 'Successful_Insertion') {
                    window.open('/view-events', "_self");
                }
            });
    }
    render() {
        return (
            <div>
                <StudentNavBar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="#home">Registration Details</Navbar.Brand>
                    <Navbar.Brand style={{ position: 'absolute', right: 0 }} href="#home">My Events</Navbar.Brand>
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
                            <Button className='mx-4' onClick={this.onRSVP} label="RSVP" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventRegister;