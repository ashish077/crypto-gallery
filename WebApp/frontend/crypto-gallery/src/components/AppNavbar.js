import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <div className='appnavbar'>
            <Navbar bg="light" variant="light">
                <NavbarBrand tag={Link} to={"/"} style={{margin: '.5rem', color: '#000000', fontSize: '40px', fontFamily:"fantasy"}}>Crypto Gallery</NavbarBrand>
                    <div className="float-left">
                        <Button color="dark" tag={Link} to={'/art/new'} style={{ margin: '.5rem' }}>Add Art</Button>
                        <Button color="dark" tag={Link} to={'/register'} style={{ margin: '.5rem' }}>Register</Button>
                    </div>
            </Navbar>
        </div>;
        
    }
}