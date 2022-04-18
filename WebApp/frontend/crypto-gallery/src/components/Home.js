import React, { Component, useState,useEffect  } from 'react';
import '../css/App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container, ButtonGroup} from 'reactstrap';
import '../css/item_list.css';
import Banner from './Banner';
import Itemlist from './item_list';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {paintings: []};
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

    render() {
        const {paintings} = this.state;

        return (
            <div>
            
              <Container fluid>
              
                <div className="Paintings">
                  {/*populate a item list of all the paintings using desc from reading a json */}
                  <Itemlist className="itemList" paintings={paintings}/>
                </div>
              </Container>
            </div>
        );
    }
}

export default Home;