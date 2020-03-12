import React, { Component } from 'react';
import CompanyNavbar from './CompanyNavbar';
import { Navbar } from 'react-bootstrap';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Image } from 'react-bootstrap';
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Document, Page } from "react-pdf";
import { Dropdown } from 'primereact/dropdown';

import Popup from '../Account/Popup';
import ViewResume from '../Account/ViewResume';

var renderedOutput;
class CompanyApplicationsReceived extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allStudents: [],
            i: 0,
            isOpen: false,
            showButton: false,
            jobCategory: ''
        };


    }

    openPopup = () => {
        this.setState({
            isOpen: true
        });
    }

    closePopup = () => {
        this.setState({
            isOpen: false
        });
    }


    componentWillMount() {

        axios.defaults.withCredentials = true;
        var studentsToShow = [];
        const data = {
            CompanyIdData: JSON.parse(localStorage.getItem("loggedInCompany")).CompanyId,
            JobIdData: JSON.parse(localStorage.getItem('Job_Id'))
        }
        axios.post('http://localhost:3001/get-applications', data)
            .then(response => {
                studentsToShow = JSON.stringify(response.data.students);
                localStorage.setItem('Students', studentsToShow);
                this.setState({

                    allStudents: JSON.parse(localStorage.getItem("Students"))
                })

            });

    }

    onView = (e) => {
        var newArr = this.state.allStudents;
        e.preventDefault();
        e.stopPropagation();
        console.log({ e });

        const eve_comp = e.currentTarget.title.split("##");
        localStorage.setItem("Job_Id", eve_comp[1]);
        localStorage.setItem("CompanyId", eve_comp[0]);
        debugger;
        console.log('Register for ', newArr[eve_comp[1]]);
        window.open('/register-event', '_self');
    }

    onUpdate = (e) => {
        e.preventDefault();
        const eve_comp = e.currentTarget.title.split("##");
        localStorage.setItem("Job_Id", eve_comp[1]);
        localStorage.setItem("CompanyId", eve_comp[0]);

        const data = {
            JobIdData: eve_comp[1],
            CompanyIdData: eve_comp[0],
            StudentIdData: eve_comp[2],
            ApplicationStatusData: this.state.jobCategory
        };
        axios.post('http://localhost:3001/update-status', data)
            .then(response => {
                if (response.data === 'Successful_Insertion') {
                    alert('Updated Successfully');
                }

            });
    }

    showEvent = (e) => {
        var newArr = this.state.allStudents;
        console.log(newArr);
        const jobCategories = [
            { label: "Pending", value: 'pending' },
            { label: "Reviewed", value: 'reviewed' },
            { label: "Declined", value: 'declined' }
        ];

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
                                    <h3>{item.first_name} {item.last_name}</h3>
                                    <div className="col-md-1"></div>

                                </div>
                                <div className="row">
                                    <h6><strong>College Name </strong>: {item.college_name}</h6>
                                </div>
                                <div className="row">
                                    {/* <h6>{item.event_date}</h6> */}
                                    {/* <h6>{new Date(item.app_deadline).getMonth() + '/' + new Date(item.app_deadline).getDate() + '/' + new Date(item.app_deadline).getFullYear()}</h6> */}
                                    <h6><strong>Major </strong> : {item.major}</h6>
                                </div>
                                <div className="row">
                                    {/* <h6>{item.application_status}</h6> */}
                                    <Dropdown value={this.state.jobCategory != '' ? this.state.jobCategory : item.application_status} options={jobCategories} name="jobCategory" onChange={(e) => { this.setState({ jobCategory: e.target.value, showButton: true }) }} />

                                </div>

                                <Button className="my-2" title={item.company_id + "##" + item.job_id} onClick={this.onView} label="View Profile" />
                                {this.state.showButton ?
                                    <Button className="my-2 mx-2" title={item.company_id + "##" + item.job_id + "##" + item.student_id} onClick={this.onUpdate} label="Update" />
                                    : null
                                }
                                <Button className="mx-2" title={item.company_id + "##" + item.job_id} style={{ position: 'absolute', top: 0, right: 0 }} onClick={this.openPopup} label="View Resume" />
                            </div>
                        </div>
                    </Card>
                </div>
                <Popup show={this.state.isOpen}
                    onClose={this.closePopup}>
                    <div>
                        <ViewResume />
                    </div>
                </Popup>
            </div>)
    }

    render() {

        return (
            <div>
                <CompanyNavbar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="/company-job-posting">Post A Job</Navbar.Brand>
                    <Navbar.Brand href="/company-jobs">Applications Received</Navbar.Brand>
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

export default CompanyApplicationsReceived;