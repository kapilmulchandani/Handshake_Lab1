
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { journeyData } from "../../js/actions/index";

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
        };
    }

    componentDidMount() {
        // this.props.journeyData({ data});
        axios.get('http://localhost:3001/getProfileData')
            .then(response => {
                console.log("data got =", response.data);
                
                if (response.data === 'Login_Successful') {
                    window.open('/profile', "_self");
                }
                var data  = response.data;
                this.setState({ data });

            });
            

        // fetch('https://localhost:3001/getProfileData')
        //   .then(response => response.json())
        //   .then(data => this.setState({ data }));
        console.log(this.state.data);
      }
    

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      journeyData: journey => dispatch(journeyData(journey))
    };
  }
const backgroundObject = connect(null, mapDispatchToProps)(Background);
export default Background;