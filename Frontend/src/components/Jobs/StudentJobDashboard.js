import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import StudentNavbar from '../Account/StudentNavbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import {Button} from 'primereact/button';

class StudentJobDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StudentNavbar />
                <br />
                <Card title="" style={{ marginTop: '30px', marginLeft: '210px', width: '1104px', height: '160px' }}>
                    <Form inline className="mx-4 my-2">
                        <FormControl type="text" style={{ width: '700px' }} placeholder="Search" className="mr-sm-2" />
                        <Button label="Search" className="p-button-rounded p-button-secondary" />
                    </Form>
                    <div className="row">
                        <div className="mx-2"></div>
                        <Button label="Full-Time Job" className="p-button-rounded p-button-secondary mx-2" />
                        <Button label="Part-Time" className="p-button-rounded p-button-secondary mx-2" />
                        <Button label="Internship" className="p-button-rounded p-button-secondary mx-2" />
                        <Button label="On-Campus" className="p-button-rounded p-button-secondary mx-2" />

                    </div>
                </Card>
            </div>
        );
    }
}

export default StudentJobDashboard;