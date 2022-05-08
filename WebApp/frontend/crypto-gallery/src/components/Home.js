import React, { Component, useState,useEffect  } from 'react';
import '../css/App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, ButtonGroup} from 'reactstrap';
import '../css/item_list.css';
import getConnection  from './connection.js';
import Itemlist from './item_list';
import { ethers, providers } from 'ethers';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {paintings: []};
        this.contract = {};
        this.provider = {};
        this.handleBuy = this.handleBuy.bind(this);
        // getConnection().then(({provider, contract}, err) => {
        //     this.contract = contract;
        //     this.provider = provider;
        // });
    }

    componentDidMount() {
        fetch("http://localhost:4000")
            .then(response => response.json())
            .then(data => this.setState({paintings: data}));
    }
    // let [paintings, setPaintings] = useState([]);
    // useEffect(() => {   
    //   fetch("http://localhost:4000")
    //   .then(response => response.json())
    //   .then(data => 
    //        {
    //         setPaintings(data);
    //        });
  
    //   },[]);

    async handleBuy(item){      
      // try {
      //   const addressArray = await window.ethereum.request({
      //     method: "eth_requestAccounts",
      //   });
      //   window.addressArray = addressArray;
      //   const currentAddress = addressArray[0];
      //   console.log(currentAddress);
      // } catch (err) {
      //   console.log("Exception occurred while trying to fetch current metamask address.");
      // }
      
      //if response is ok then call the contract to make the transaction with the address and amount
      // const cryptocontract = this.contract;
      const cryptocontract = window.contract;
      const currentAddress = window.addressArray[0];
      const buy = await cryptocontract.purchaseArt(parseInt(item.id), {value:String(ethers.utils.parseEther(String(item.price)))})
      .catch(function(e){
        console.log("Exception while trying to Buy Art.");
      });
      if(buy !== undefined){
          await buy.wait();
          await fetch('http://localhost:4000/'+item.id + '/'+ currentAddress,
          {
            method: 'PUT'
          }
          )
          .then(response => response.json())
          .then(data =>{
            this.setState({paintings: data});
          });
      }
    }

    render() {
        const {paintings} = this.state;

        return (
            <div>
            
              <Container fluid>
              
                <div className="Paintings">
                  {/*populate a item list of all the paintings using desc from reading a json */}
                  <Itemlist className="itemList" paintings={paintings} onClick={this.handleBuy}/>
                </div>
              </Container>
            </div>
        );
    }
}

export default Home;