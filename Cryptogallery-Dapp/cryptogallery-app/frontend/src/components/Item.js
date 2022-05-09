
import React, {useState} from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import '../css/item.css'
import getConnection  from './connection.js';
import { ethers, providers } from 'ethers';

function Item({item, onClick}) {
  function checkSold(){
    if(item.sold==="true"){
           return (<h3 style={{color:"red"}}>SOLD OUT</h3>);
    }
    else
    {
      return (<Button variant="primary" onClick={onClick} className="buy btn btn-success" >Buy</Button>); 
    }
  }
  

  return (
    <Card style={{ width: '18rem', height: '35rem' }}>
      <Card.Img variant="top" src={item.src}  alt={item.title}/>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}          
        </Card.Text>
        <Card.Text>
          {item.price + ' ' + 'CARAT'}
        </Card.Text>
        <Card.Text>
          {item.owner != "" ? 'Owner' + ' ' + item.owner : ""}
        </Card.Text>
        {/* <Card.Text>
          <Button variant="primary" className="buy btn btn-success" >Buy</Button>
        </Card.Text> */}
        {/* <Button variant="primary" onClick={onClick} className="buy btn btn-success" >Buy</Button> */}
        {checkSold()}
      </Card.Body>

    </Card>
  )
}

export default Item