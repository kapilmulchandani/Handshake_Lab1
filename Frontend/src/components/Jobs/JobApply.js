import React, { Component } from 'react';
import StudentNavBar from '../Account/StudentNavbar';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Card } from 'primereact/card';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { Button } from 'primereact/button';
import axios from 'axios';

var jobs = []
jobs = JSON.parse(localStorage.getItem("Jobs"));
var jobId = localStorage.getItem("Job_Id");
var CompanyId = localStorage.getItem("CompanyId");
var StudentMajor;
var i;
var EventMajor;

class JobApply extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(document.referrer);
        
        for (i = 0; i < jobs.length; i++) {
            if (jobs[i].job_id == jobId && jobs[i].company_id == CompanyId) {
                // EventMajor = events[i].event_eligibility;
                break;
            }
        }
        // console.log(EventMajor);
        // axios.defaults.withCredentials = true;
        // const data = {
        //     StudentIdData: localStorage.getItem('student_id')
        // };
        // axios.post('http://localhost:3001/get-major', data)
        //     .then(response => {
        //         console.log('REsponse', response.data.StudentMajor[0].major);
        //         StudentMajor = response.data.StudentMajor[0].major;
        //         localStorage.setItem('StudentMajor', StudentMajor);
        //     });


    }

    onRSVP = (e) => {
        e.preventDefault();
        var compId = localStorage.getItem("CompanyId");
        // StudentMajor = localStorage.getItem('StudentMajor');
        // if (EventMajor == 'All' || EventMajor == StudentMajor) {
            axios.defaults.withCredentials = true;
            var eventsToShow = [];
            const data = {
                JobIdData: jobId,
                CompanyIdData: compId,
                StudentIdData: JSON.parse(localStorage.getItem("loggedInUser")).StudentId,
                ApplicationStatusData : 'pending'
            };
            axios.post('http://localhost:3001/apply-job', data)
                .then(response => {
                    if (response.data === 'Successful_Insertion') {
                        window.open('/my-jobs', "_self");
                    }
                });
        // }

        // else{
        //     alert('This event is not for '+StudentMajor+' students');
        // }
    }
    render() {
        return (
            <div>
                <StudentNavBar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="#home">Registration Details</Navbar.Brand>
                    <Navbar.Brand style={{ position: 'absolute', right: 0 }} href="/my-jobs">My Applications</Navbar.Brand>
                </Navbar>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 mx-2 my-4">
                        <Card className="my-4" Title="" style={{ width: '' }}>
                            <div className="row">
                                <Image src={'/' + jobs[i].company_id + '.jpg'} style={{ marginLeft: '70px', width: '450px' }} />
                            </div>
                        </Card>
                        <div className="row">
                            <Card Title="" style={{ width: '650px' }}>

                                <div className="row">
                                    <div className="col-md-2"></div>
                                    {jobs[i].job_description}

                                </div>

                            </Card>
                            {(document.referrer != 'http://localhost:3000/my-events') ?
                                <Button className='mx-4' onClick={this.onRSVP} label="Apply" /> : null
                            }


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobApply;