import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import StudentNavbar from '../Account/StudentNavbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import {Button} from 'primereact/button';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import getURL from '../../actions/url.js';

var renderedOutput;
class StudentJobDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allJobs: [],
            searchText: '',
            i: 0
        };
    }

    componentWillMount() {

        axios.defaults.withCredentials = true;
        var jobstoShow = [];
        axios.get(getURL('get-jobs'))
            .then(response => {
                jobstoShow = JSON.stringify(response.data.jobs);
                localStorage.setItem('Jobs', jobstoShow);
                this.setState({
                    allJobs: JSON.parse(localStorage.getItem("Jobs"))
                })

            });

    }

    onRegister = (e) => {
        var newArr = this.state.allJobs;
        e.preventDefault();
        e.stopPropagation();
        console.log({e});
        debugger;

        var j;
        const eve_comp = e.currentTarget.title.split("##");
        localStorage.setItem("Job_Id",eve_comp[1] );
        localStorage.setItem("CompanyId",eve_comp[0] );
        for(j = 0; j < newArr.length; j++){
            if(newArr[j].job_id == eve_comp[1] && newArr[j].company_id == eve_comp[0])
            break;
        }
        console.log('Register for ', newArr[j]);
       
            window.open('/job-apply', '_self');        
    }

    onChangeHandler = (e) => {
        this.setState({
            searchText : e.currentTarget.value
        });
    }

    onSearch = (e) => {
        e.preventDefault();

        const data = {
            SearchTextData: this.state.searchText,
        }
        var jobstoShow = [];
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(getURL("searchQuery"), data)
            .then(response => {
                jobstoShow = JSON.stringify(response.data.jobs);
                localStorage.setItem("SearchJobs", jobstoShow);
                this.setState({
                    allJobs : JSON.parse(localStorage.getItem("SearchJobs"))
                })
            });
    }

    onApplyFilter = (e) =>{
        e.preventDefault();
        const data = {
            CategoryData: e.currentTarget.title,
        }
        var jobstoShow = [];
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(getURL("filterQuery"), data)
            .then(response => {
                jobstoShow = JSON.stringify(response.data.jobs);
                localStorage.setItem("FilterJobs", jobstoShow);
                this.setState({
                    allJobs : JSON.parse(localStorage.getItem("FilterJobs"))
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
                    <div className="col-md-1 mx-5"></div>
                    <Card title="" style={{ display: 'inline-block', width: '804px', height: '200px' }}>
                        <div className="row">
                            <div className="col-md-3">
                                {console.log('I ', this.state.i)}
                                <Image src={'3.png'} style={{ width: '200px', height: '180px' }}  />
                            </div>
                            <div className="col-md-7 mx-5 my-4">
                                <div className="row">
                                    <h3>{item.title}</h3>
                                    <div className="col-md-1"></div>
                                    {/* <Button title={item.company_id+"##"+item.job_id} style={{ position:'absolute', top:0, right:0}} onClick={this.onRegister} label="Register" /> */}
                                </div>
                                <div className="row">
                                    <h6>Location : {item.location}</h6>
                                </div>
                                <div className="row">
                                    {/* <h6>{item.event_date}</h6> */}
                                    <h6>Application Deadline : {new Date(item.app_deadline).getMonth() + '/' + new Date(item.app_deadline).getDate() + '/' + new Date(item.app_deadline).getFullYear()}</h6>
                                </div>
                                <div className="row">
                                    <h6>Category : {item.job_category}</h6>
                                </div>
                                <div className="my-2 row">
                                    <Button title={item.company_id+"##"+item.job_id}  onClick={this.onRegister} label="Apply" />
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
                <StudentNavbar />
                <Navbar bg="dark" color="black" variant="dark">
                    <Navbar.Brand href="#home">Jobs Search</Navbar.Brand>
                    <Navbar.Brand style={{position:'absolute', right:0}} href="/my-jobs">My Jobs</Navbar.Brand>
                </Navbar>
                <br />
                <Card title="" style={{ marginTop: '30px', marginLeft: '210px', width: '1104px', height: '160px' }}>
                    <Form inline className="mx-4 my-2">
                        <FormControl onChange={this.onChangeHandler} type="text" style={{ width: '700px' }} placeholder="Search" className="mr-sm-2" />
                        <Button onClick={this.onSearch} label="Search" className="p-button-rounded p-button-secondary" />
                    </Form>
                    <div className="row">
                        <div className="mx-2"></div>
                        <Button onClick={this.onApplyFilter} title="full-time" label="Full-Time" className="p-button-rounded p-button-secondary mx-2" />
                        <Button onClick={this.onApplyFilter} title="part-time" label="Part-Time" className="p-button-rounded p-button-secondary mx-2" />
                        <Button onClick={this.onApplyFilter} title="intern" label="Internship" className="p-button-rounded p-button-secondary mx-2" />
                        <Button onClick={this.onApplyFilter} title="on-campus" label="On-Campus" className="p-button-rounded p-button-secondary mx-2" />

                    </div>
                </Card>
                {this.showEvent()}
                {renderedOutput}
            </div>
        );
    }
}

export default StudentJobDashboard;