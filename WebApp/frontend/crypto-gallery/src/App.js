import React, { Component} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AddArt from './components/AddArt';
import AppNavbar from './components/AppNavbar';

class App extends Component {
  render() {
    return (
        <Router>
          <AppNavbar/>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/art/new' component={AddArt}/>
            <Route path='/register' exact={true} component={Home}/>
          </Switch>
        </Router>
    )
  }
}

export default App;