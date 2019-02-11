import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Form from './Form/Form';
import SelectMode from './SelectMode/SelectMode';
import MainMenu from './MainMenu/MainMenu';

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
          <>
            <Route exact component={MainMenu} path="/" />
            <Route exact component={SelectMode} path="/mode-trans" />
            <Route exact component={Form} path="/form" />
          </>
      </BrowserRouter>
      
    );
  }
}

export default App;
