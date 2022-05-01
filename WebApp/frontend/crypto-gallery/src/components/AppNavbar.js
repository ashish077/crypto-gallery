import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import getConnection  from './connection.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPalette,faPaintBrush } from '@fortawesome/free-solid-svg-icons';
export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.contract = {};
        this.provider = {};
        getConnection().then(({provider, contract}, err) => {
            this.contract = contract;
            this.provider = provider;
            console.log(this.contract);
            console.log(this.provider);
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async handleRegister() {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const currentAddress = addressArray[0];
          console.log(currentAddress);
        } catch (err) {
          console.log("Exception occurred while trying to fetch current metamask address.");
        }
        
        const cryptocontract = this.contract;
        const register = await cryptocontract.register()
        .catch(function(e){
          console.log("Exception while trying to register.");
        });
    } 

    render() {
        return <div className='appnavbar'>
            <Navbar bg="light" variant="light">
                <NavbarBrand tag={Link} to={"/"} style={{margin: '.5rem', color: '#000000', fontSize: '40px', fontFamily:"fantasy"}}>
                    Crypto Gallery <FontAwesomeIcon icon={faPalette} />
                    <FontAwesomeIcon icon={faPaintBrush} />
                    </NavbarBrand>
                    <div className="float-left">
                        <Button color="dark" tag={Link} to={'/art/new'} style={{ margin: '.5rem' }}>Add Art</Button>
                        <Button color="dark" onClick={this.handleRegister} style={{ margin: '.5rem' }}>Register</Button>
                    </div>
            </Navbar>
        </div>;
        
    }
}