import React, { Component, useState,useEffect  } from 'react';
import '../css/App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, ButtonGroup, FormGroup, Input, Label} from 'reactstrap';
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
        this.airdrop = this.airdrop.bind(this);
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
      // const cryptocontract = window.contract;
      const currentAddress =  await window.web3.eth.getAccounts();
      // const buy = await cryptocontract.purchaseArt(parseInt(item.id), {value:String(ethers.utils.parseEther(String(item.price)))})
      const buy = await window.contract.methods.purchaseArt(parseInt(item.id)).send({from: currentAddress[0] , value: ethers.utils.parseEther(String(item.price))})
      .catch(function(e){
        console.log("Exception while trying to Buy Art." + e);
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

    async airdrop(){
      console.log("AirDrop details");
      console.log(this.toAddress.value);
      console.log(ethers.utils.parseEther(String(this.amount.value)));
    }

    render() {
        const {paintings} = this.state;

        return (
            <div>
            
              <Container fluid>
                <div id="airdrop" className='airdrop'>
                  <h3 style={{fontFamily:"fantasy"}}>Air Drop CARAT Token</h3>
                  <section className="table-content">
                    <form className="form-inline" onSubmit={(event) => {
                      event.preventDefault()
                      const toAddress = this.toAddress.value
                      const price = ethers.utils.parseEther(String(this.amount.value));
                      // this.props.transferFrom(this.props.account, toAddress, price)
                    }}>
                    <label htmlFor="toAddress" style={{padding:"5px", fontFamily:"fantasy"}}>To Address:</label>
                    <input type="text" placeholder="address"  ref={(input) => { this.toAddress = input }}
                      style={{padding:"5px", fontFamily:"fantasy"}} required="" id="toAddress" />
                    <label htmlFor="amount" style={{padding:"5px", fontFamily:"fantasy"}}>Amount:</label>
                      <input type="text" placeholder="Amount" 
                          required="" ref={(input) => { this.amount = input }} id="amount" style={{padding:"5px", fontFamily:"fantasy"}} />
                    <Button color="dark" onClick={this.airdrop} style={{ margin: '.5rem' }}>Send</Button>
                  </form> 
                  </section>  
                </div>
              
                <div className="Paintings">
                  {/*populate a item list of all the paintings using desc from reading a json */}
                  <h3 style={{fontFamily:"fantasy"}}>Paintings</h3>
                  <Itemlist className="itemList" paintings={paintings} onClick={this.handleBuy}/>
                </div>
              </Container>
            </div>
        );
    }
}

export default Home;