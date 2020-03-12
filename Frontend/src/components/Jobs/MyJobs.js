import { DataScroller } from 'primereact/datascroller';
import React, { Component } from 'react';
import axios from 'axios';

import { Card } from 'primereact/card';
import StudentNavBar from '../Account/StudentNavbar';
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Image } from 'react-bootstrap';


var renderedOutput;
class MyJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allJobs: [],
            i: 0
        };

    }


    componentWillMount() {

        axios.defaults.withCredentials = true;
        var jobsToShow = [];
        const data = {
            StudentIdData: JSON.parse(localStorage.getItem("loggedInUser")).StudentId
        }
        axios.post('http://localhost:3001/get-my-jobs', data)
            .then(response => {
                jobsToShow = JSON.stringify(response.data.jobs);
                localStorage.setItem('Jobs', jobsToShow);
                this.setState({

                    allJobs: JSON.parse(localStorage.getItem("Jobs"))
                })

            });

    }

    onRegister = (e) => {
        var newArr = this.state.allJobs;
        e.preventDefault();
        e.stopPropagation();
        console.log({ e });

        const eve_comp = e.currentTarget.title.split("##");
        localStorage.setItem("Job_Id", eve_comp[1]);
        localStorage.setItem("CompanyId", eve_comp[0]);

        // console.log('Register for ', newArr[eve_comp[1]]);
        window.open('/register-event', '_self');
    }

    onApplyFilter = (e) =>{
        e.preventDefault();
        const data = {
            StudentIdData: JSON.parse(localStorage.getItem("loggedInUser")).StudentId,
            ApplicationStatusData: e.currentTarget.title,
        }
        var jobstoShow = [];
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/filter-application-status-query', data)
            .then(response => {
                jobstoShow = JSON.stringify(response.data.jobs);
                localStorage.setItem("FilterAppJobs", jobstoShow);
                this.setState({
                    allJobs : JSON.parse(localStorage.getItem("FilterAppJobs"))
                })
            });
    }

    showEvent = (e) => {
        var newArr = this.state.allJobs;
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
                                    <h3>{item.title}</h3>
                                    <div className="col-md-1"></div>

                                </div>
                                <div className="row">
                                    <h6>{item.location}</h6>
                                </div>
                                <div className="row">
                                    {/* <h6>{item.event_date}</h6> */}
                                    <h6>{new Date(item.app_deadline).getMonth() + '/' + new Date(item.app_deadline).getDate() + '/' + new Date(item.app_deadline).getFullYear()}</h6>
                                </div>
                                <div className="row">
                                    <h6>{item.job_category}</h6>
                                </div>
                                <Button title={item.company_id + "##" + item.job_id} onClick={this.onRegister} label="View" />
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
                    <Navbar.Brand href="/my-events">My Events</Navbar.Brand>
                </Navbar>

                <div className="row my-4">
                    <div className="col-md-3 my-4"></div>
                    <Card title="" >
                        <Form inline className="mx-4 my-2">
                            <FormControl type="text" style={{ width: '700px' }} placeholder="Search" className="mr-sm-2" />
                            <Button label="Search" className="p-button-rounded p-button-secondary" />
                        </Form>
                        <div className="row">
                            <div className="mx-2"></div>
                            <Button onClick={this.onApplyFilter} title="pending" label="Pending" className="p-button-rounded p-button-secondary mx-2" />
                            <Button onClick={this.onApplyFilter} title="reviewed" label="Reviewed" className="p-button-rounded p-button-secondary mx-2" />
                            <Button onClick={this.onApplyFilter} title="declined" label="Declined" className="p-button-rounded p-button-secondary mx-2" />
                            {/* <Button onClick={this.onApplyFilter} title="on-campus" label="On-Campus" className="p-button-rounded p-button-secondary mx-2" /> */}

                        </div>
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

export default MyJobs;