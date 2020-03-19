import { DataScroller } from 'primereact/datascroller';
import React, { Component } from 'react';
import axios from 'axios';
import DataScrollerSubmenu from './DataScrollerSubmenu';
import { Card } from 'primereact/card';
import getURL from '../../actions/url.js';

var firstEvent;
var statelessEvents;
class EventsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allEvents: [],
            i: 0
        };
        this.eventsTemplate = this.eventsTemplate.bind(this);
    }


    componentWillMount() {
        // console.log(this.state);

        axios.defaults.withCredentials = true;
        var eventsToShow = [];
        //make a post request with the user data
        axios.get(getURL("get-events"))
            .then(response => {
                // console.log('response-data', response.data.events);
                debugger;
                eventsToShow = JSON.stringify(response.data.events);
                localStorage.setItem('Events', eventsToShow);
                // console.log(eventsToShow);
                this.setState({
                    // allEvents: response.data.events[0]
                    // allEvents: [...this.state.allEvents, response.data.events]
                    allEvents: JSON.parse(localStorage.getItem("Events"))
                })

            });
        // console.log('AFTER', this.state.allEvents);
        // debugger;
    }

    eventsNewTemplate = (event) => {
        statelessEvents = this.state.allEvents;
        firstEvent = statelessEvents;
        console.log(firstEvent);
        if (firstEvent != null) {
            console.log(firstEvent[0]['event_name']);
            return (

                <div className="event-details">
                    <div>
                        {/* <img src={'showcase/resources/demo/images/car/${car.brand}.png'} alt={car.brand}/> */}
                        <div className="p-grid">
                            <div className="p-col-12">Title: <b>{firstEvent[0]['event_name']}</b></div>
                            <div className="p-col-12">Description: <b>{firstEvent[0]['event_description']}</b></div>
                            <div className="p-col-12">Date: <b>{firstEvent[0]['event_date']}</b></div>
                            <div className="p-col-12">Time: <b>{firstEvent[0]['event_time']}</b></div>
                            <div className="p-col-12">Location: <b>{firstEvent[0]['event_location']}</b></div>
                            <div className="p-col-12">Eligibility: <b>{firstEvent[0]['event_eligibility']}</b></div>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>

            )
        }

    }
    allEventTemplate(allEvent) {
        if (!allEvent) {
            return;
        }

        return (
            <div className="car-details">
                <div>
                    {/* <img src={'showcase/resources/demo/images/car/${car.brand}.png'} alt={car.brand}/> */}
                    <div className="p-grid">
                        <div className="p-col-12">Vin: <b>{allEvent.event_name}</b></div>
                        <div className="p-col-12">Year: <b>{allEvent.year}</b></div>
                        <div className="p-col-12">Brand: <b>{allEvent.brand}</b></div>
                        <div className="p-col-12">Color: <b>{allEvent.color}</b></div>
                    </div>
                </div>
            </div>
        );
    }

    eventsTemplate = (allEvent) => {
        statelessEvents = this.state.allEvents;
        firstEvent = statelessEvents;
        console.log(firstEvent);
        if (firstEvent != null) {
            console.log(firstEvent[0]['event_name']);
            return (

                <div className="event-details">
                    <div>
                        {/* <img src={'showcase/resources/demo/images/car/${car.brand}.png'} alt={car.brand}/> */}
                        <div className="p-grid">
                            <div className="p-col-12">Title: <b>{firstEvent['event_name']}</b></div>
                            <div className="p-col-12">Description: <b>{firstEvent[this.state.i]['event_description']}</b></div>
                            <div className="p-col-12">Date: <b>{firstEvent[this.state.i]['event_date']}</b></div>
                            <div className="p-col-12">Time: <b>{firstEvent[this.state.i]['event_time']}</b></div>
                            <div className="p-col-12">Location: <b>{firstEvent[this.state.i]['event_location']}</b></div>
                            <div className="p-col-12">Eligibility: <b>{firstEvent[this.state.i]['event_eligibility']}</b></div>
                        </div>
                    </div>
                    <br />
                    <br />
                    {/* {this.setState({
                        i: this.state.i + 1
                    })} */}
                </div>

            )
        }

    }

    render() {
        console.log('wow');
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
                    <DataScroller value={this.state.allEvents} itemTemplate={this.allEventTemplate}
                        rows={2} buffer={0.4} header="List of Events" />
                </div>
            </div>
        )
    }
}

export default EventsView;