import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import '../../styles/searchresults.css';

var studentsArray;

class Searchresults extends Component {
    constructor(props) {
        super(props);
        this.state = { //state is by default an object
            // students: [ 
            //     { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            //     { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            //     { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            //     { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
            // ]
            students: JSON.parse(localStorage.getItem("searchResults"))
        }
    }

    renderTableData() {
        // var movies2 = JSON.parse(retrievedData);
        studentsArray = this.state.students['searchData']
        console.log(studentsArray);
        return studentsArray.map((studentsArray, index) => {
            const { student_id, email_id, first_name, last_name, skills, college_name } = studentsArray //destructuring
            return (
                <tr key={student_id} onClick={this.renderTableHeader}>
                    <td >{student_id}</td>
                    <td>{email_id}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{college_name}</td>
                    <td>{skills.substring(1, skills.length - 1)}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        studentsArray = this.state.students['searchData']
        let header = Object.keys(studentsArray[0])
         return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        }) 
    }

    render() {
        return (
            <div>
                <Navbar bg="primary" color="black" variant="dark">
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#home">Home</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="/company-profile">Profile</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#pricing">Jobs</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#hello">Events</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="/student-search">Search</Nav.Link>
                    </Nav>
                </Navbar>
                <h1 id='title'>React Dynamic Table</h1>
                <table id='students'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Searchresults;