import React, { Component } from 'react';
import './App.css';
import store from './store'
import { Provider } from 'react-redux'
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
