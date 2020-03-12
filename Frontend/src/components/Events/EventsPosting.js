import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CompanyNavbar from '../Company/CompanyNavbar';
import { Button } from 'primereact/button';
import '../../styles/jobPosting.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

class EventsPosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: '',
            eventDate: '',
            eventTitle: '',
            eventTime: '',
            eventLocation: '',
            eventEligibility: '',
            eventDescription: ''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitPost = (e) => {
        e.preventDefault();
        // this.props.signup(data);
        let items = JSON.parse(localStorage.getItem('loggedInCompany'));
        console.log('ITEMS ', items['CompanyId']);
        var company_id_no = items['CompanyId']

        let eventDate = this.state.eventDate;
        debugger;
        console.log(eventDate.getFullYear());
        console.log(('0' + (eventDate.getMonth() + 1)).slice(-2));
        console.log(('0' + eventDate.getDate()).slice(-2));
        // var EventDateString = eventDate.getFullYear() + '-'
        //     + ('0' + (eventDate.getMonth() + 1)).slice(-2) + '-' + ('0' + eventDate.getDate()).slice(-2);
        //Yyyy-MM-dd
        var EventDateString = eventDate.getFullYear() + '-' + ('0' + (eventDate.getMonth() + 1)).slice(-2) + '-' + ('0' + eventDate.getDate()).slice(-2);
        
        const data = {
            CompanyIdData: company_id_no,
            EventIdData: this.state.eventId,
            EventTitleData: this.state.eventTitle,
            EventDateData: EventDateString,
            EventTimeData: this.state.eventTime,
            EventLocationData: this.state.eventLocation,
            EventEligibilityData: this.state.eventEligibility,
            EventDescriptionData: this.state.eventDescription
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/post-event', data)
            .then(response => {
                console.log("Status Code Create : ", response.data);
                if (response.data === 'Successful_Insertion') {
                    alert('Saved Successfully');
                }

            });
    }

    clear = (e) => {

    }

    render() {
        const jobCategories = [
            { label: "Full Time", value: 'full-time' },
            { label: "Part Time", value: 'part-time' },
            { label: "Intern", value: 'intern' },
            { label: "On Campus", value: 'on-campus' }
        ];
        return (
            <div>
                <CompanyNavbar />
                <div className="row"></div>
                {/* <div className="row" style={{ backgroundColor: '#0f1035', fontFamily: 'Times New Roman', fontSize: 40, color: 'white', fontWeight: 'bold', height: '250px' }}> */}
                <br />
                
                <div className="row" style={{ backgroundColor: '', fontFamily: 'Times New Roman', fontSize: 40, color: 'white', fontWeight: 'bold', height: '250px' }}>
                
                <div className="col-md-2"></div>
                
                <img src={'/events.jpg'} style={{ height: '350px', width: '1000px' }} />
                </div>
                <br />
                <div className="my-5 row" style={{ justifyContent: 'center' }}>
                    Post a Job here .
                </div>
                <form action="">
                    <div className="row" >
                        <div className="col-md-1"></div>
                        <label><b>Event ID</b></label> <br />
                        <div className="col-md-2 mx-5"></div>
                        <label><b>Event Title</b></label> <br />
                        <div className="col-md-2 mx-5"></div>
                        <label><b>Event Date</b></label> <br />
                        <div className="col-md-2 mx-4"></div>
                        <label><b>Event Time</b></label> <br />
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <input type="number" name="eventId" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        <input type="text" name="eventTitle" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        {/* <input type="date" name="applicationDeadline" onChange={this.onChangeHandler} /> */}
                        <Calendar value={this.state.eventDate} onChange={(e) => this.setState({ eventDate: e.value })} />
                        <div className="col-md-1"></div>
                        <input type="time" name="eventTime" onChange={this.onChangeHandler} />

                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <label><b>Event Location</b></label> <br />
                        <div className="col-md-2 mx-3"></div>
                        <label><b>Event Description</b></label> <br />
                        <div className="col-md-2 mx-3"></div>
                        <label><b>Event Eligibility</b></label> <br />

                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <input type="text" name="eventLocation" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        <input type="text" name="eventDescription" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        <input class="jobDescription" type="text" name="eventEligibility" onChange={this.onChangeHandler} />
                    </div>
                    {/* <div className="row">

                        <div className="col-md-1" style={{ display: 'inline-block' }}></div>
                        <label><b>Job Category : </b></label> <br />
                        <div className="col-md-2">
                            <Dropdown value={this.state.jobCategory} options={jobCategories} name="jobCategory" onChange={(e) => { this.setState({ jobCategory: e.target.value }) }} />
                        </div>
                    </div> */}
                    <br />
                    <div className="row">

                        <div className="col-md-1"></div>
                        <Button className="mx-1" label="Post" onClick={this.submitPost} />
                        <Button label="Clear" onClick={this.clear} />
                    </div>

                </form>
            </div>
        );
    }
}

export default EventsPosting;