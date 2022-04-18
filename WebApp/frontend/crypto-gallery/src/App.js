import React, { Component} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AddArt from './components/AddArt';
import AppNavbar from './components/AppNavbar';

function App(){
  if(typeof window.ethereum ==='undefined')
    {
      return(
        <h1>Please Install Metamask to Interact</h1>
      );
  }
  return (
    <Router>
      <AppNavbar/>
      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/art/new' component={AddArt}/>
        {/* <Route path='/register' component={Home}/> */}
      </Switch>
    </Router>
  )
}

export default App;