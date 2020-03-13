import { DataScroller } from 'primereact/datascroller';
import React, { Component } from 'react';
import axios from 'axios';
import DataScrollerSubmenu from './DataScrollerSubmenu';
import { Card } from 'primereact/card';
import StudentNavBar from '../Account/StudentNavbar';
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import getURL from '../../actions/url';

var renderedOutput;
class EventsViewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEvents: [],
            i: 0,
            searchText: ''
        };

    }


    componentWillMount() {

        axios.defaults.withCredentials = true;
        var eventsToShow = [];
        axios.get(getURL('get-events'))
            .then(response => {
                eventsToShow = JSON.stringify(response.data.events);
                localStorage.setItem('Events', eventsToShow);
                this.setState({

                    allEvents: JSON.parse(localStorage.getItem("Events"))
                })

            });

    }

    onSearch = (e) => {
        e.preventDefault();

        const data = {
            SearchTextData: this.state.searchText,
        }
        var eventsToShow = [];
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/searchEventsQuery', data)
            .then(response => {
                eventsToShow = JSON.stringify(response.data.events);
                localStorage.setItem("SearchEvents", eventsToShow);
                this.setState({
                    allEvents : JSON.parse(localStorage.getItem("SearchEvents"))
                })
            });
    }
    onChangeHandler = (e) => {
        this.setState({
            searchText : e.currentTarget.value
        });
    }

    onRegister = (e) => {
        var newArr = this.state.allEvents;
        e.preventDefault();
        e.stopPropagation();
        console.log({e});
        
        const eve_comp = e.currentTarget.title.split("##");
        localStorage.setItem("Event_Id",eve_comp[1] );
        localStorage.setItem("CompanyId",eve_comp[0] );
        console.log('Register for ', newArr[eve_comp[1]-1]);
       
            window.open('/register-event', '_self');        
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
                                <Image src={'/amazon.png'} style={{ width: '200px', height: '180px' }} roundedCircle='true' />
                            </div>
                            <div className="col-md-7 mx-5">
                                <div className="row">
                                    <h3>{item.event_name}</h3>
                                </div>
                                <div className="row">
                                    <h6>{item.event_location}</h6>
                                </div>
                                <div className="row">
                                    {/* <h6>{item.event_date}</h6> */}
                                    <h6>{new Date(item.event_date).getMonth() + '/' + new Date(item.event_date).getDate() + '/' + new Date(item.event_date).getFullYear()}</h6>
                                </div>
                                <div className="row">
                                    <h6>{item.event_time}</h6>
                                </div>
                                <div className="row">
                                <Button className="my-1" title={item.company_id+"##"+item.event_id}  onClick={this.onRegister} label="Register" />
                                </div>
                                
                            </div>
                        </div>
                    </Card>
                </div>
            </div>)
    }

    render() {

        return (
            <div>
                <StudentNavBar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="#home">Upcoming Events</Navbar.Brand>
                    
                    <Navbar.Brand style={{position:'absolute', right:0}} href="/my-events">My Events</Navbar.Brand>
                </Navbar>

                <div className="row my-4">
                    <div className="col-md-3 my-4"></div>
                    <Card title="" >
                        <Form inline className="mx-4 my-2">
                            <FormControl onChange={this.onChangeHandler} type="text" style={{ width: '700px' }} placeholder="Search" className="mr-sm-2" />
                            <Button onClick={this.onSearch} label="Search" className="p-button-rounded p-button-secondary" />
                    </Form>
                    </Card>
                </div>
                {/* <Card title="" style={{ display: 'inline-block', marginTop: '230px', marginLeft: '210px', width: '304px', height: '280px' }}>
                    <div>
                        <form onSubmit={this.onProfilePicSave}>
                            <input type="file" accept="image/jpg, image/png" name="myImage" onChange={this.onProfilePicChange} />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </Card> */}
                {this.showEvent()}
                {renderedOutput}
            </div>
        )
    }
}

export default EventsViewCard;