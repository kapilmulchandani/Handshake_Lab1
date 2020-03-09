import React, { Component } from 'react';
import { render } from 'react-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import { axios } from 'axios';
const KeyCodes = {
    comma: 188,
    enter: 13,
};
var skillsString;
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class StudentSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentFirstName: '',
            studentLastName: '',
            collegeName: '',
            skills: '',
            tags: [],
            suggestions: [
                { id: 'Java', text: 'Java' },
                { id: 'React', text: 'React' },
                { id: 'Python', text: 'Python' },
                { id: 'C', text: 'C' },
                { id: 'Javascript', text: 'Javascript' },
                { id: 'MySQL', text: 'MySQL' }
            ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagsToStringArray = this.handleTagsToStringArray.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    handleTagsToStringArray() {
        
        for (var i = 0; i < this.state.tags.length; i++) {
            console.log(this.state.tags[i].text);
            // var res = str1.concat(str2, str3);
            if (skillsString != null)
                skillsString = skillsString.concat(',', this.state.tags[i].text);
            else
                skillsString = this.state.tags[i].text;
            console.log(skillsString);
        }
    }



    handleSubmit = (e) => {
        this.handleTagsToStringArray();
        e.preventDefault();
        // this.props.signup(data);
        console.log(this.state);
        const data = {
            StudentFirstNameData: this.state.studentFirstName,
            StudentLastNameData: this.state.studentLastName,
            CollegeNameData: this.state.collegeName,
            SkillsData: skillsString
        }

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/search-students', data)
            .then(response => {
                console.log("Status Code Create : ", response.data);
                if (response.data === 'Successful_Insertion') {
                    window.open('/login', "_self");
                }

            });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>

                <Navbar bg="primary" color="black" variant="dark">
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Nav className="mr-auto">
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#home">Home</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="/company-profile">Profile</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#pricing">Jobs</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#hello">Events</Nav.Link>
                        <Nav.Link style={{ fontWeight: 'bold', fontSize: 18 }} href="#hellohi">Search</Nav.Link>
                    </Nav>
                </Navbar>
                <div className="row"> <br /></div>
                <div className="row" style={{ fontFamily: 'Times New Roman', fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                    <div className="col-md-1"></div>
                    <img src={'/student.jpg'} style={{ height: '400px', width: '1200px' }} />
                    {/* <Image src={'/logo192.png'} roundedCircle='true' /> */}
                    Hi! How are You!
                </div>
                <br />
                {/* <div className="row" style={{ clear: 'both' }}> */}

                <form onSubmit={this.handleSubmit}>

                    <div className="row">
                        <div className="col-md-1"></div>
                        <label> First Name: </label>
                        <div className="col-md-3"></div>
                        <label> Last Name: </label>
                        <div className="col-md-2"></div>
                        <label> College: </label>
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <input type="text" name="studentFirstName" value={this.state.studentFirstName} onChange={this.handleChange} />
                        <div className="col-md-1"></div>
                        {/* <label> Last Name: </label> */}
                        <input type="text" name="studentLastName" value={this.state.studentLastName} onChange={this.handleChange} />
                        <div className="col-md-1"></div>
                        {/* <label> College: </label> */}
                        <input type="text" name="collegeName" value={this.state.collegeName} onChange={this.handleChange} />

                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <label> Skills: </label>
                    </div>

                    <div className="row">
                        <div className="col-md-1"></div>
                        <ReactTags tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters} />
                    </div>

                    <div className="row">
                        <div className="col-md-1"></div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}
export default StudentSearch;