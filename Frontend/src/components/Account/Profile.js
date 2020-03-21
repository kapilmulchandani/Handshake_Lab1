
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputTextarea } from 'primereact/inputtextarea';

import '../../styles/profile.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputText } from "primereact/inputtext";
import StudentNavbar from './StudentNavbar';
import SignUp from './SignUp';
import { Card } from 'primereact/card';
import Popup from 'react-popup';
import Background from '../Background/Background';
import { connect } from "react-redux";
import axios from 'axios';
// import { profileAction } from '../../actions/profileAction'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import { fetchprofileAction } from '../../actions/profileAction';
import Image from 'react-bootstrap/Image'
import { Button } from 'primereact/button';
// import profilePic from '/logo192.png';
import getURL from '../../actions/url.js';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmailId: JSON.parse(localStorage.getItem("loggedInUser")).EmailId,
            StudentId: JSON.parse(localStorage.getItem("loggedInUser")).StudentId,
            data: null,
            skillseditable: false,
            journeyeditable: false,
            educationeditable: false,
            workExpeditable: false,
            orgAchieveeditable: false,
            majorEditable: false,
            flag: 1,
            journey: '',
            education: '',
            workExp: '',
            orgAchieve: '',
            skills: '',
            mobile_number: 99211,
            major: '',
            profile_picture: '',
            selectedFile: null,
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
            // editable: true,
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
        axios.post(getURL("upload"), formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }

    saveData = (e) => {
        this.setState({
            [e.currentTarget.name]: false
        });
        // this.handleJourneyEdit();
        const data = {
            emailData: this.state.EmailId,
            journeyData: this.state.journey,
            educationData: this.state.education,
            workExpData: this.state.workExp,
            orgAchieveData: this.state.orgAchieve,
            skillsData: ','+this.state.skills+',',
            mobile_numberData: this.state.mobile_number,
            majorData: this.state.major

        }
        axios.post(getURL("save"), data)
            .then((response) => {
                // console.log(response.data);

            });

        

        console.log({ target: e.target.name });
        console.log({ target: e });
        debugger
        // console.log(this.state.journey);
    }

    cancelButton = (e) => {
        this.setState({
            journeyeditable: false,
            educationeditable: false,
            workExpeditable: false,
            orgAchieveeditable: false,
            skillseditable: false,
            majorEditable: false
        });
        this.forceUpdate();
    }

    componentDidMount() {
        this.setState({
            flag: 2
        })
        this.getData();
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            student_id: localStorage.getItem('loggedInUser').StudentId
        })
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile);
        axios.post(getURL("upload"), data)
            .then(res => { // then print response status
                console.log(res.statusText)
                
            });

            const dataNew = {
                FileNameData: this.state.selectedFile.name,
                StudentIdData: this.state.StudentId,
            }

            console.log(dataNew.FileNameData);

            axios.post(getURL("upload-profile-picture"), dataNew)
            .then(res => {
                alert('File Uploaded Successfully');
            });
        // receive two    parameter endpoint url ,form data
    }

    async getData() {
        if (this.state.flag == 1) {
            const data = {
                EmailIdData: this.state.EmailId
            }
            axios.post(getURL("getProfileData"), data)
                .then((response) => {
                    console.log(response.data);
                    var newData = response.data;
                    this.setState({
                        journey: newData.journey,
                        education: newData.education,
                        workExp: newData.workExp,
                        orgAchieve: newData.orgAchieve,
                        skills: newData.skills.substring(1, newData.skills.length-1),
                        // yourString.substring(1, yourString.length-1);
                        mobile_number: newData.mobile_number,
                        major: newData.major,
                        profile_picture: newData.profile_pic
                    })

                });
                
            await this.props.fetchprofileAction({
                journey: this.state.journey,
            });

        }
    }

    render() {
        console.log({ state: this.state })
        let style = { width: "148px" }
        const header = (
            <img alt="Card" src='showcase/resources/demo/images/usercard.png' />
        );
        const footer = (
            <span>
                <Button label="Save" icon="pi pi-check" />
                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" />
            </span>
        );
        return (
            <div>
                {/* <Background /> */}
                <StudentNavbar />
                <div className="content-section introduction">
                </div>
                {/* {localStorage.getItem("loggedInUser") ? this.setState({ EmailId: localStorage.getItem("loggedInUser") }): ''} */}
                <div className="content-section implementation">
                    <Card title="" style={{ display: 'inline-block', marginTop: '30px', marginLeft: '210px', width: '304px', height: '280px' }}>
                        <div>
                            {console.log(this.state.profile_picture)}
                            <Image src={'54.153.65.183/public/'+this.state.profile_picture} style={{width: '80px'}} />
                            <form onSubmit={this.onProfilePicSave}>
                                <input type="file" accept="image/jpg, image/png" name="myImage" onChange={this.onChangeHandler} />
                                <Button className="my-2" label="Upload" onClick={this.onClickHandler} />
                            </form>
                        </div>
                    </Card>

                    <Card title="" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '30px', marginLeft: '30px', width: '494px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>My Journey</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="journeyeditable" onClick={this.onEdit}></input>
                                </label>
                            </div>

                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="journey" rows={20} cols={55} onChange={this.handleEdit} disabled={(this.state.journeyeditable) ? "" : "disabled"} value={this.state.journey} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.journeyeditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button  name="journeyeditable" onClick={this.saveData} className="col-3 m-1" label="Save"></Button>
                                <Button  onClick={this.cancelButton} className="col-3 m-1" label="Cancel" ></Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>


                    <Card title="" style={{ position: 'absolute', top: '380px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '170px' }}>
                    <div className="row">
                            <div className="col-9">
                                <h5><strong>Major</strong></h5>
                            </div>
                            {/* <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="majorEditable" onClick={this.onEdit}></input>
                                </label>
                            </div> */}
                        </div>
                        <div className='mx-3 mb-3 my-2 row'>
                            <InputTextarea name="major" rows={2} cols={55} onChange={this.handleEdit} disabled={(this.state.majorEditable) ? "" : "disabled"} value={this.state.major} autoResize={true}></InputTextarea>
                        </div>
                        {/* {this.state.majorEditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button label="Save" name="majorEditable" onClick={this.saveData} className="mx-1"></Button>
                                <Button label="Cancel" onClick={this.cancelButton}  ></Button>
                                <div className="col-3"></div>
                            </div> : null
                        } */}
                    </Card>


                    <Card title="" style={{ position: 'absolute', left: '340px', top: '680px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '580px' }}>
                        {/* <Button active='true' name="educationeditable" onClick={this.onEdit} icon="pi pi-pencil" style={{ position: 'absolute', left: '440px', top: '5px' }} /> */}
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Education</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="educationeditable" onClick={this.onEdit}></input>
                                </label>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="education" rows={20} cols={55} onChange={this.handleEdit} disabled={(this.state.educationeditable) ? "" : "disabled"} value={this.state.education} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.educationeditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button  label ="Save" name="educationeditable" onClick={this.saveData} className="col-3 m-1" ></Button>
                                <Button label="Cancel" onClick={this.cancelButton} className="col-3 m-1" ></Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>

                    <Card title="" style={{ position: 'absolute', top: '580px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Skills</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="skillseditable" onClick={this.onEdit}></input>
                                </label>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="skills" rows={20} cols={55} onChange={this.handleEdit} disabled={(this.state.skillseditable) ? "" : "disabled"} value={this.state.skills} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.skillseditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button label="Save" name="skillseditable" onClick={this.saveData} className="mx-1"></Button>
                                <Button label="Cancel" onClick={this.cancelButton}  ></Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>

                    <Card title="" style={{ position: 'absolute', left: '340px', top: '1280px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Work & Volunteer Experience</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="workExpeditable" onClick={this.onEdit}></input>
                                </label>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="workExp" rows={20} cols={55} onChange={this.handleEdit} disabled={(this.state.workExpeditable) ? "" : "disabled"} value={this.state.workExp} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.workExpeditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button label="Save" name="workExpeditable" onClick={this.saveData} className="col-3 m-1" ></Button>
                                <Button label="Cancel" onClick={this.cancelButton} className="col-3 m-1" ></Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>

                    <Card title="" style={{ position: 'absolute', left: '340px', top: '1880px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Organizations & Extracurriculars</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="orgAchieveeditable" onClick={this.onEdit}></input>
                                </label>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="orgAchieve" rows={20} cols={55} onChange={this.handleEdit} disabled={(this.state.orgAchieveeditable) ? "" : "disabled"} value={this.state.orgAchieve} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.orgAchieveeditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button label="Save" name="orgAchieveeditable" onClick={this.saveData} className="col-3 m-1" ></Button>
                                <Button label="Cancel" onClick={this.cancelButton} className="col-3 m-1" ></Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>


                    <br /><br />


                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    profileDataResponse: state.profileReducer.profileDataResponse,
})

Profile.propTypes = {
    profileDataResponse: PropTypes.object.isRequired,
}
// const mapStateToProps = state => {
//     return { journey: state.journey };
//   };
// const UpdatedProfile = connect(mapStateToProps)(Profile);
export default connect(mapStateToProps, { fetchprofileAction })(Profile);
// export default Profile;