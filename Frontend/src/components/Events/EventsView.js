import { DataScroller } from 'primereact/datascroller';
import React, { Component } from 'react';
import axios from 'axios';
import DataScrollerSubmenu from './DataScrollerSubmenu';

class EventsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEvents: []
        };
        this.eventsTemplate = this.eventsTemplate.bind(this);
    }

    getEventsData = (e) => {
        // this.props.signup(data);
        console.log(this.state);

        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.get('http://localhost:3001/get-events')
            .then(response => {
                // console.log(response.data.events);
                debugger;
                this.setState({
                    allEvents: response.data.events
                })

            });
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        console.log(this.state);

        axios.defaults.withCredentials = true;

        //make a post request with the user data
        axios.get('http://localhost:3001/get-events')
            .then(response => {
                console.log(response.data.events);
                debugger;
                this.setState({
                    allEvents: response.data.events[0]
                })

            });
            console.log('AFTER', this.state);
    }

    eventsTemplate(event) {
        if (!event) {
            return;
        }
        console.log('WOAAAh', this.state.allEvents.event_name);
        return (
            <div className="event-details">
                <div>
                    {/* <img src={'showcase/resources/demo/images/car/${car.brand}.png'} alt={car.brand}/> */}
                    <div className="p-grid">
                        <div className="p-col-12">Title: <b>{this.state.allEvents.event_name}</b></div>
                        <div className="p-col-12">Description: <b>{this.state.allEvents.event_description}</b></div>
                        <div className="p-col-12">Date: <b>{this.state.allEvents.event_date}</b></div>
                        <div className="p-col-12">Time: <b>{this.state.allEvents.event_time}</b></div>
                        <div className="p-col-12">Location: <b>{this.state.allEvents.event_location}</b></div>
                        <div className="p-col-12">Eligibility: <b>{this.state.allEvents.event_eligibility}</b></div>
                    </div>
                </div>
            </div>
        )

    }

    render() {
        return (
            <div>
                {/* <DataScrollerSubmenu /> */}
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataScroller</h1>
                        <p>DataScroller displays data with on demand loading using scroll.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    Demo is at the bottom of this page.
                </div>

                <div className="content-section implementation">
                    <DataScroller value={this.state.allEvents} itemTemplate={this.eventsTemplate}
                        rows={10} buffer={0.4} header="List of Events" />
                </div>
            </div>
        )
    }
}

export default EventsView;