import React, { Component } from 'react';
import CompanyNavbar from '../Company/CompanyNavbar';
import { Navbar } from 'react-bootstrap';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Image } from 'react-bootstrap';
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import getURL from '../../actions/url.js';

var renderedOutput;
class EventRegistrations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEvents: [],
            i: 0
        };
    }

    componentWillMount() {

        axios.defaults.withCredentials = true;
        var eventsToShow = [];
        const data = {
            CompanyIdData: JSON.parse(localStorage.getItem("loggedInCompany")).CompanyId
        }
        axios.post(getURL("get-company-events"), data)
            .then(response => {
                eventsToShow = JSON.stringify(response.data.events);
                localStorage.setItem('CompanyEvents', eventsToShow);
                this.setState({

                    allEvents: JSON.parse(localStorage.getItem("CompanyEvents"))
                })

            });

    }

    onView = (e) => {
        var newArr = this.state.allEvents;
        e.preventDefault();
        e.stopPropagation();
        console.log({ e });

        const eve_comp = e.currentTarget.title.split("##");
        localStorage.setItem("Event_Id", eve_comp[1]);
        localStorage.setItem("CompanyId", eve_comp[0]);
        debugger;
        console.log('Register for ', newArr[eve_comp[1]]);
        window.open('/registrations-received', '_self');
    }

    showEvent = (e) => {
        var newArr = this.state.allEvents;
        console.log(newArr);

        // var EventDateString = eventDate.getFullYear() + '-' + ('0' + (eventDate.getMonth() + 1)).slice(-2) + '-' + ('0' + eventDate.getDate()).slice(-2);

        renderedOutput = newArr.map(item =>
            <div>
                <div className="row my-4">
                    <div className="col-md-3 my-4"></div>
                    <Card title="" style={{ display: 'inline-block', width: '804px', height: '200px' }}>
                        <div className="row">
                            <div className="col-md-3">
                                <Image src={'/' + item.company_id + '.png'} style={{ width: '200px', height: '180px' }} roundedCircle='true' />
                            </div>
                            <div className="col-md-7 mx-5">
                                <div className="row">
                                    <h3>{item.event_name}</h3>
                                    <div className="col-md-1"></div>

                                </div>
                                <div className="row">
                                    <h6>Location : {item.event_location}</h6>
                                </div>
                                <div className="row">
                                    {/* <h6>{item.event_date}</h6> */}
                                    <h6>Date : {new Date(item.event_date).getMonth() + '/' + new Date(item.event_date).getDate() + '/' + new Date(item.event_date).getFullYear()}</h6>
                                </div>
                                <div className="row">
                                    <h6>Eligibility : {item.event_eligibility}</h6>
                                </div>
                                <Button title={item.company_id + "##" + item.event_id} onClick={this.onView} label="View" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>)
    }

    render() {
        return (
            <div>
                <CompanyNavbar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="/events-posting">Post A Event</Navbar.Brand>
                    <Navbar.Brand href="/event-registrations">My Events</Navbar.Brand>
                </Navbar>

                <div className="row my-4">
                    <div className="col-md-3 my-4"></div>
                    <Card title="" >
                        <Form inline className="mx-4 my-2">
                            <FormControl type="text" style={{ width: '700px' }} placeholder="Search" className="mr-sm-2" />
                            <Button label="Search" className="p-button-rounded p-button-secondary" />
                        </Form>
                    </Card>
                </div>
                {this.showEvent()}
                {renderedOutput}
            </div>
        )
    }
}

export default EventRegistrations;