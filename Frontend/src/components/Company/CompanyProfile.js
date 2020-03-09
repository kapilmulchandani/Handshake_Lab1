import React, { Component } from 'react';
import axios from 'axios';
import CompanyNavbar from './CompanyNavbar';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        let Id = JSON.parse(localStorage.getItem('loggedInCompany'))['CompanyId'];
        this.state = {
            company_id: Id,
            company_name: '',
            location: '',
            emailid: '',
            description: '',
            contact_info: '',
            locationEditable: false,
            descriptionEditable: false,
            contactInfoEditable: false,
        }
    }

    onEdit = (e) => {
        this.setState({
            [e.target.name] : true
        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({
            editable: true,
            [e.target.name]: e.target.value
        })
    }

    saveData = (e) => {
        // this.handleJourneyEdit();
        const data = {
            CompanyIdData : this.state.company_id,
            CompanyNameData : this.state.company_name,
            EmailIdData: this.state.emailid,
            LocationData: this.state.location,
            DescriptionData: this.state.description,
            ContactInfoData: this.state.contact_info
        }
        axios.post('http://localhost:3001/save-company-profile', data)
            .then((response) => {
                // console.log(response.data);

            });

        this.setState({
            [e.target.name]: false
        });
        console.log(e.target.name);
        console.log(this.state);
        debugger
        // console.log(this.state.journey);
    }

    cancelButton = (e) => {
        this.setState({
            locationEditable: false,
            descriptionEditable: false,
            contactInfoEditable: false,
        });
        this.forceUpdate();
    }

    componentDidMount() {
        const data = {
            CompanyIdData: this.state.company_id
        }

        axios.post('http://localhost:3001/getCompanyProfileData', data)
            .then((response) => {
                console.log(response.data);
                var newData = response.data;
                this.setState({
                    company_name: newData.CompanyName,
                    location: newData.CompanyLocation,
                    emailid: newData.CompanyEmailId,
                    description: newData.CompanyDescription,
                    contact_info: newData.CompanyContactInfo
                })

            });
        console.log('Comp', this.state);
    }

    render() {
        return (
            <div>
                <CompanyNavbar />
                <div className="content-section implementation">
                    <Card title="" style={{ display: 'inline-block', marginTop: '30px', marginLeft: '210px', width: '304px', height: '280px' }}>
                        <div>
                            <Image src={'/logo192.png'} roundedCircle='true' />
                            <form onSubmit={this.onProfilePicSave}>
                                <input type="file" accept="image/jpg, image/png" name="myImage" onChange={this.onProfilePicChange} />
                                <button type="submit">Upload</button>
                            </form>
                        </div>
                    </Card>

                    <Card title="" style={{ display: 'inline-block', verticalAlign: 'top', marginTop: '30px', marginLeft: '30px', width: '494px', height: '580px' }}>
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Company Description</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="descriptionEditable" onClick={this.onEdit}></input>
                                </label>
                            </div>

                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="description" rows={20} cols={55} onChange={this.handleEdit} disabled={(this.state.descriptionEditable) ? "" : "disabled"} value={this.state.description} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.descriptionEditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button variant="primary" name="descriptionEditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
                                <Button variant="danger" onClick={this.cancelButton} className="col-3 m-1" size="sm">Cancel</Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>


                    <Card title="" style={{ position: 'absolute', top: '380px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '304px', height: '240px' }}>
                    <div className="row">
                            <div className="col-9">
                                <h5><strong>Location</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="locationEditable" onClick={this.onEdit}></input>
                                </label>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="location" rows={5} cols={55} onChange={this.handleEdit} disabled={(this.state.locationEditable) ? "" : "disabled"} value={this.state.location} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.locationEditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button variant="primary" name="locationEditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
                                <Button variant="danger" onClick={this.cancelButton} className="col-3 m-1" size="sm">Cancel</Button>
                                <div className="col-3"></div>
                            </div> : null
                        }
                    </Card>


                    <Card title="" style={{ position: 'absolute', left: '340px', top: '680px', float: 'left', marginTop: '30px', marginLeft: '210px', width: '484px', height: '250px' }}>
                        {/* <Button active='true' name="educationeditable" onClick={this.onEdit} icon="pi pi-pencil" style={{ position: 'absolute', left: '440px', top: '5px' }} /> */}
                        <div className="row">
                            <div className="col-9">
                                <h5><strong>Contact Information</strong></h5>
                            </div>
                            <div className="col-3">
                                <label id="edit-photo" className="btn btn-default btn-icon-circle" title="" type="button" placeholder="">
                                    <i className="material-icons blue006">edit</i>
                                    <input type="button" id="profile-input" className="d-none" name="contactInfoEditable" onClick={this.onEdit}></input>
                                </label>
                            </div>
                        </div>
                        <div className='mx-3 mb-3 row'>
                            <InputTextarea name="contact_info" rows={5} cols={55} onChange={this.handleEdit} disabled={(this.state.contactInfoEditable) ? "" : "disabled"} value={this.state.contact_info} autoResize={true}></InputTextarea>
                        </div>
                        {this.state.contactInfoEditable ?
                            <div className="row">
                                <div className="col-3"></div>
                                <Button variant="primary" name="contactInfoEditable" onClick={this.saveData} className="col-3 m-1" size="sm">Save</Button>
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
export default CompanyProfile;