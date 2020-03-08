import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import CompanyNavbar from './CompanyNavbar';
import { Button } from 'primereact/button';
import '../../styles/jobPosting.css';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

class CompanyJobPosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobId: '',
            companyId: 0,
            jobTitle: '',
            postingData: '',
            applicationDeadline: '',
            location: '',
            salary: '',
            jobDescription: '',
            jobCategory: ''
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

        let applicationDate = this.state.applicationDeadline;
        var MyDate = new Date();

        var MyDateString = MyDate.getFullYear() + '-'
            + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);


        var ApplicationDateString = applicationDate.getFullYear() + '-'
            + ('0' + (applicationDate.getMonth() + 1)).slice(-2) + '-' + ('0' + applicationDate.getDate()).slice(-2);

        const data = {
            CompanyIdData: company_id_no,
            JobIdData: this.state.jobId,
            JobTitleData: this.state.jobTitle,
            PostingDateData: MyDateString,
            ApplicationDeadlineData: ApplicationDateString,
            LocationData: this.state.location,
            SalaryData: this.state.salary,
            JobDescriptionData: this.state.jobDescription,
            JobCategoryData: this.state.jobCategory
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/post-job', data)
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
                <div className="row" style={{ backgroundColor: '#0f1035', fontFamily: 'Times New Roman', fontSize: 40, color: 'white', fontWeight: 'bold', height: '250px' }}>
                    Hi! How are You!
                </div>
                <div className="row" style={{ justifyContent: 'center' }}>
                    Post a Job here .
                </div>
                <form action="">
                    <div className="row" >
                        <div className="col-md-1"></div>
                        <label><b>Job ID</b></label> <br />
                        <div className="col-md-3"></div>
                        <label><b>Job Title</b></label> <br />
                        <div className="col-md-3"></div>
                        <label><b>Application Deadline</b></label> <br />
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <input type="number" name="jobId" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        <input type="text" name="jobTitle" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        {/* <input type="date" name="applicationDeadline" onChange={this.onChangeHandler} /> */}
                        <Calendar value={this.state.applicationDeadline} onChange={(e) => this.setState({ applicationDeadline: e.value })} />

                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <label><b>Location</b></label> <br />
                        <div className="col-md-3"></div>
                        <label><b>Salary</b></label> <br />
                        <div className="col-md-3"></div>
                        <label><b>Job Description</b></label> <br />

                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <input type="text" name="location" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        <input type="text" name="salary" onChange={this.onChangeHandler} />
                        <div className="col-md-1"></div>
                        <input class="jobDescription" type="text" name="jobDescription" onChange={this.onChangeHandler} />
                    </div>
                    <div className="row">

                        <div className="col-md-1" style={{ display: 'inline-block' }}></div>
                        <label><b>Job Category : </b></label> <br />
                        <div className="col-md-2">
                            <Dropdown value={this.state.jobCategory} options={jobCategories} name="jobCategory" onChange={(e) => { this.setState({ jobCategory: e.target.value }) }} />
                        </div>
                    </div>
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

export default CompanyJobPosting;