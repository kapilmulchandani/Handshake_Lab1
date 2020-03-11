
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputTextarea } from 'primereact/inputtextarea';
import '../../styles/profile.css';
import React, { Component } from 'react';
import { Card } from 'primereact/card';

import axios from 'axios';

import PropTypes from 'prop-types'

import Image from 'react-bootstrap/Image'

import CompanyNavbar from '../Company/CompanyNavbar';
// import profilePic from '/logo192.png';

class StudentProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: localStorage.getItem("student_id"),
            EmailId: '',
            data: null,
            flag: 1,
            journey: '',
            education: '',
            workExp: '',
            orgAchieve: '',
            skills: '',
            mobile_number: 0,
            file: null

        };
        this.getData.bind(this);
        this.onEdit.bind(this);
    }
    //EmailId, City, DOB, Journey, Education, WorkExp, OrgAchieve, Skills, Mobile_Number

    onEdit = (e) => {
        console.log({ target: e.target.name })
        console.log({ target: e })
        this.setState({
            [e.target.name]: true
        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({
            editable: true,
            [e.target.name]: e.target.value
        })
    }


    onProfilePicChange = (e) => {
        this.setState({ file: e.target.files[0] });
    }

    onProfilePicSave = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }


    componentDidMount() {

        this.setState({

            flag: 2
        })
        console.log(this.state.student_id);
        this.getData();
    }

    getData = (e) => {
        if (this.state.flag == 1) {
            const data = {
                StudentIdData: this.state.student_id
            }
            axios.post('http://10.0.0.251:3001/getStudentProfileData', data)
                .then((response) => {
                    console.log(response.data);
                    var newData = response.data;
                    this.setState({
                        journey: newData.journey,
                        education: newData.education,
                        workExp: newData.workExp,
                        orgAchieve: newData.orgAchieve,
                        skills: newData.skills,
                        mobile_number: newData.mobile_number
                    })

                });

        }
    }

    render() {
        console.log({ state: this.state })
        let style = { width: "148px" }
        return (
            <div>
                {/* <Background /> */}
                <CompanyNavbar />
                <div className="content-section introduction">
                </div>
                {/* {localStorage.getItem("loggedInUser") ? this.setState({ EmailId: localStorage.getItem("loggedInUser") }): ''} */}
                <div className="content-section implementation">
                    <Card title="" style={{ display: 'inline-block', marginTop: '30px', marginLeft: '210px', width: '304px', height: '280px' }}>
                        <div>
                        <Image src={'/logo192.png'} roundedCircle='true' />
                            <form onSubmit={this.onProfilePicSave}>
                                <input type="file" accept="image/jpeg, image/png" name="myImage" onChange={this.onProfilePicChange} />
                                {/* <button type="submit">Upload</button> */}
                            </form>
                        </div>
                    </Card>

                    <Card title="" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '30px', marginLeft: '30px', width: '494px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>My Journey</strong></h5>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="journey" rows={20} cols={55}  disabled value={this.state.journey} autoResize={true}></InputTextarea>
                        </div>
                    </Card>


                    <Card title="" style={{ position: 'absolute', top: '380px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '580px' }}>
                    </Card>


                    <Card title="" style={{ position: 'absolute', left: '340px', top: '680px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '580px' }}>
                        {/* <Button active='true' name="educationeditable" onClick={this.onEdit} icon="pi pi-pencil" style={{ position: 'absolute', left: '440px', top: '5px' }} /> */}
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Education</strong></h5>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="education" rows={20} cols={55} disabled value={this.state.education} autoResize={true}></InputTextarea>
                        </div>
                    </Card>

                    <Card title="Skills" subTitle="Subtitle" style={{ position: 'absolute', top: '980px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '580px' }}>
                        <div>{this.state.skills}</div>
                    </Card>

                    <Card title="" style={{ position: 'absolute', left: '340px', top: '1280px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Work & Volunteer Experience</strong></h5>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="workExp" rows={20} cols={55} disabled value={this.state.workExp} autoResize={true}></InputTextarea>
                        </div>
                    </Card>

                    <Card title="" style={{ position: 'absolute', left: '340px', top: '1880px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Organizations & Extracurriculars</strong></h5>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="orgAchieve" rows={20} cols={55}  disabled value={this.state.orgAchieve} autoResize={true}></InputTextarea>
                        </div>
                    </Card>


                    <br /><br />


                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return { journey: state.journey };
//   };
// const UpdatedProfile = connect(mapStateToProps)(Profile);

export default StudentProfileView;