
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import Navbar from './Navbar';
import SignUp from './SignUp';
import {Card} from 'primereact/card';
import Popup from 'react-popup';
import Background from '../Background/Background';
import { connect } from "react-redux";
import axios from 'axios';
// import { profileAction } from '../../actions/profileAction'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import { fetchprofileAction } from '../../actions/profileAction'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EmailId: JSON.parse(localStorage.getItem("loggedInUser")).EmailId,
            data : null,
            editable:false,
            flag : 1,
            journey : '',
            education: ''
        };
        this.getData.bind(this);
        this.journeyChangeHandler.bind(this);
    }
    
    handleJourneyEdit = async (e) => {
        e.preventDefault();
        // console.log('Helloooo');
        this.setState({
            editable : true
        });
        // const journeyNew = prompt('Please Update Journey: ');
        // console.log('Woaaah', journeyNew);
        // this.props.fetchprofileAction({
        //     ...this.state,
        //     journey: journeyNew 
        // })

        // console.log('JOURNEY', this.state.journey);
        // this.setState({
        //     editable : false
        // });
    }
    
    saveData(){
        // axios.post('http://localhost:3001/saveData', data)
        //     .then((response) => {
        //         console.log(response.data);
        //         var newData = response.data;
        //         this.setState({
        //             journey: newData.journey
        //         })
    
        //     }); 
        console.log(this.state.journey);
    }

    journeyChangeHandler = (e) => {
        this.setState({
            journey: e.target.value
        })
        console.log(this.state.journey);
    }
    
    componentDidMount(){
        this.setState({
            flag : 2
        })
        // this.props.fetchprofileAction((JSON.parse(localStorage.getItem("loggedInUser"))).EmailId);
        this.getData();
    }
    async getData() {
        if(this.state.flag == 1){
            const data = {
                EmailIdData : this.state.EmailId,
            }
            axios.post('http://localhost:3001/getProfileData', data)
            .then((response) => {
                console.log(response.data);
                var newData = response.data;
                this.setState({
                    journey: newData.journey
                })
    
            }); 

            await this.props.fetchprofileAction({
                journey: this.state.journey,
            });

        }    
    }

    render() {
        let style = {width: "148px"}
        const header = (
            <img alt="Card" src='showcase/resources/demo/images/usercard.png'/>
        );
        const footer = (
            <span>
                <Button label="Save" icon="pi pi-check"/>
                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary"/>
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
                    <Card title="Simple Card" style={{display: 'inline-block',marginTop: '30px', marginLeft: '210px', width: '304px', height: '280px'}}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="My Journey" style={{display: 'inline-block', verticalAlign:'top', marginTop:'30px', marginLeft: '30px', width: '494px', height: '580px'}}>
                    <Button active='true' icon="pi pi-pencil" onClick={this.handleJourneyEdit} style={{position: 'absolute', left:'990px', top:'120px'}} />
                        <div contentEditable={this.state.editable} onChange={this.journeyChangeHandler}> {this.state.journey}</div>
                       {this.state.editable ? 
                       <div>
                       <Button active='true' label="Cancel" className="p-button-danger" onClick={this.handleJourneyEdit} style={{position: 'absolute', left:'730px', top:'620px'}} /> 
                        <Button active='true' onClick={this.saveData} label='Save' onClick={this.handleJourneyEdit} style={{position: 'absolute', left:'650px', top:'620px'}} /> </div> :
                       null
                    } 
                    </Card>

                    <Card title="Advanced Card" subTitle="Subtitle" style={{position:'absolute', top:'380px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '304px', height: '580px'}} className="ui-card-shadow" footer={footer} header={header}>
                        <div contentEditable="true">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>


                    <Card title="Education" style={{position:'absolute', left:'340px', top:'680px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '484px', height: '580px'}}> 
                    <Button icon="pi pi-pencil" style={{position:'absolute', left:'440px', bottom:'535px'}} />
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="Advanced Card" subTitle="Subtitle" style={{position:'absolute', top:'980px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '304px', height: '580px'}} className="ui-card-shadow" footer={footer} header={header}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="Work & Volunteer Experience" style={{position:'absolute', left:'340px', top:'1280px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '484px', height: '580px'}}>
                    <Button icon="pi pi-pencil" style={{position:'absolute', left:'440px', bottom:'535px'}} />
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="Advanced Card" subTitle="Subtitle" style={{position:'absolute', top:'1580px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '304px', height: '580px'}} className="ui-card-shadow" footer={footer} header={header}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="Organizations & Extracurriculars" style={{position:'absolute', left:'340px', top:'1880px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '484px', height: '580px'}}>
                    <Button icon="pi pi-pencil" float='right' />
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>
                    
                    
                    <br/><br/>

                    
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