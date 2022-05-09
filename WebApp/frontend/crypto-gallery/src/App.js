import React, { Component} from 'react';
import './css/App.css';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AddArt from './components/AddArt';
import AppNavbar from './components/AppNavbar';
import getConnection  from './components/connection.js';
import CryptogalleryV2 from './contracts/CryptogalleryV2.json';
import ERC20CARAT from './contracts/ERC20CARAT.json';

class App extends Component{
  async componentWillMount() {
    await this.getWeb3Connection()
  }
  
  async getWeb3Connection(){
    if(window.ethereum){
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      // window.addressArray = await web3.eth.getAccounts();
      const netId = await web3.eth.net.getId();
      if(CryptogalleryV2.networks[netId]){
        const contract = web3.eth.Contract(
          CryptogalleryV2.abi,
          CryptogalleryV2.networks[netId].address
        );
        window.contract = contract;
        const tokenContract = new web3.eth.Contract(ERC20CARAT.abi, ERC20CARAT.networks[netId].address);
        window.tokenContract = tokenContract;
        // console.log("Initial Address: " + window.addressArray[0]);
      }
      else{
        return(
          <h1>Contract not found in network.</h1>
        );
      }
    }
    else{
      return(
        <h1>Please Install Metamask to Interact</h1>
      );
    }
  }

  render(){
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
}

export default App;