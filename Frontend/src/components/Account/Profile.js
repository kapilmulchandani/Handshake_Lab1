
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputTextarea } from 'primereact/inputtextarea';

import '../../styles/profile.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import Navbar from './Navbar';
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
import Button from 'react-bootstrap/Button';
// import profilePic from '/logo192.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmailId: JSON.parse(localStorage.getItem("loggedInUser")).EmailId,
            data: null,
            journeyeditable: false,
            educationeditable: false,
            workExpeditable: false,
            orgAchieveeditable: false,
            journeyeditable: false,
            flag: 1,
            journey: '',
            education: '',
            workExp: '',
            orgAchieve: '',
            skills: '',
            mobile_number: 99211,
            file: null

        };
        this.getData.bind(this);
        this.journeyChangeHandler.bind(this);
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

    // handleJourneyEdit = async (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         editable: true,
    //         journey: e.target.value
    //     });
    // }

    // handleEducationEdit = async (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         editable: true,
    //         education: e.target.value
    //     });
    // }

    // handleWorkExpEdit = async (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         editable: true,
    //         workExp: e.target.value
    //     });
    // }

    // handleOrgAchieveEdit = async (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         editable: true,
    //         orgAchieve: e.target.value
    //     });
    // }

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

    saveData = (e) => {
        // this.handleJourneyEdit();
        const data = {
            emailData: this.state.EmailId,
            journeyData: this.state.journey,
            educationData: this.state.education,
            workExpData: this.state.workExp,
            orgAchieveData: this.state.orgAchieve,
            skillsData: this.state.skills,
            mobile_numberData: this.state.mobile_number

        }
        axios.post('http://10.0.0.251:3001/save', data)
            .then((response) => {
                // console.log(response.data);

            });

        this.setState({
            [e.target.name]: false
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
            orgAchieveeditable: false
        });
        this.forceUpdate();
    }

    journeyChangeHandler = (e) => {
        this.setState({
            journey: e.target.textContent
        })
        console.log(this.state.journey);
    }

    componentDidMount() {
        this.setState({
            flag: 2
        })
        this.getData();
    }

    async getData() {
        if (this.state.flag == 1) {
            const data = {
                EmailIdData: this.state.EmailId,
            }
            axios.post('http://10.0.0.251:3001/getProfileData', data)
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
                <Navbar />
                <div className="content-section introduction">
                </div>
                {/* {localStorage.getItem("loggedInUser") ? this.setState({ EmailId: localStorage.getItem("loggedInUser") }): ''} */}
                <div className="content-section implementation">
                    <Card title="" style={{ display: 'inline-block', marginTop: '30px', marginLeft: '210px', width: '304px', height: '280px' }}>
                        <div>
                        <Image src={'/logo192.png'} roundedCircle='true' />
                            <form onSubmit={this.onProfilePicSave}>
                                <input type="file" accept="image/jpeg, image/png" name="myImage" onChange={this.onProfilePicChange} />
                                <button type="submit">Upload</button>
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
                                <Button variant="primary" name="journeyeditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
                                <Button variant="danger" onClick={this.cancelButton} className="col-3 m-1" size="sm">Cancel</Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>


                    <Card title="" style={{ position: 'absolute', top: '380px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '580px' }}>
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
                                <Button variant="primary" name="educationeditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
                                <Button variant="danger" onClick={this.cancelButton} className="col-3 m-1" size="sm">Cancel</Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>

                    <Card title="Skills" subTitle="Subtitle" style={{ position: 'absolute', top: '980px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '580px' }}>
                        <div>{this.state.skills}</div>
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
                                <Button variant="primary" name="workExpeditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
                                <Button variant="danger" onClick={this.cancelButton} className="col-3 m-1" size="sm">Cancel</Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>

                    <Card title="" subTitle="Subtitle" style={{ position: 'absolute', top: '1580px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '580px' }} className="ui-card-shadow" footer={footer} header={header}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
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
                                <Button variant="primary" name="orgAchieveeditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
                                <Button variant="danger" onClick={this.cancelButton} className="col-3 m-1" size="sm">Cancel</Button>
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