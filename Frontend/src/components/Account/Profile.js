
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

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    handleJourneyEdit = (e) => {
        e.preventDefault();
        console.log('Helloooo');
        const enteredName = prompt('Please enter your name');
        // Popup.alert('I am alert, nice to meet you');
        // Popup.plugins().prompt('', 'Type your name', function (value) {
        //     Popup.alert('You typed: ' + value);
        // });
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
                <Navbar />
                <div className="content-section introduction">
                </div>

                <div className="content-section implementation">
                    <Card title="Simple Card" style={{display: 'inline-block',marginTop: '30px', marginLeft: '210px', width: '304px', height: '280px'}}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="My Journey" style={{display: 'inline-block', verticalAlign:'top', marginTop:'30px', marginLeft: '30px', width: '494px', height: '580px'}}>
                    <Button icon="pi pi-pencil" onClick={this.handleJourneyEdit} style={{position: 'absolute', left:'990px', top:'120px'}} />
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>
                    </Card>

                    <Card title="Advanced Card" subTitle="Subtitle" style={{position:'absolute', top:'380px', float: 'left', marginTop:'30px', marginLeft: '210px', width: '304px', height: '580px'}} className="ui-card-shadow" footer={footer} header={header}>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
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

export default Profile;