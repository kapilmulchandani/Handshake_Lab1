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
        this.state = {
            selectedFile: null,
            studentId: 0
        }
    }

    componentWillMount() {
        console.log(document.referrer);

        for (i = 0; i < jobs.length; i++) {
            if (jobs[i].job_id == jobId && jobs[i].company_id == CompanyId) {
                // EventMajor = events[i].event_eligibility;
                break;
            }
        }


    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            studentId: JSON.parse(localStorage.getItem("loggedInUser")).StudentId
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile);
        console.log(data);
        axios.post(getURL("upload"), data)
            .then(res => { // then print response status
                console.log(res.statusText)
                alert('Resume Uploaded Successfully');
            });
        // receive two    parameter endpoint url ,form data
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
            ApplicationStatusData: 'pending'
        };
        axios.post(getURL("apply-job"), data)
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
                                <Image src={'/' + jobs[i].company_id + '-cover.jpg'} style={{ marginLeft: '70px', width: '450px' }} />
                            </div>
                        </Card>
                        <div className="row">
                            <Card Title="" style={{ width: '650px' }}>

                                <div className="row">
                                    <div className="col-md-2"></div>
                                    {jobs[i].job_description}

                                </div>

                            </Card>
                            <div className="col-md-3 mx-2">
                                <h5> <strong>Upload Resume</strong></h5>
                                <input type="file" name="file" onChange={this.onChangeHandler} />
                            
                                <Button className="my-2" label="Upload" onClick={this.onClickHandler}></Button>
                            </div>
                        </div>
                        <div className="mx-3 my-3 row">
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