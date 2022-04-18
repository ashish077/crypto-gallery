
import React, {useState} from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import '../css/item.css'
import getConnection  from './connection.js';
import { ethers, providers } from 'ethers';

function Item({item, onClick}) {
  // let [cryptocontract, setContract] = useState(undefined);
  // getConnection().then(({provider, contract}, err) => {
  //   setContract(contract);
  //   console.log(cryptocontract);
  // });
  

  return (
    <Card style={{ width: '18rem', height: '30rem' }}>
      <Card.Img variant="top" src={item.src}  alt={item.title}/>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}          
        </Card.Text>
        <Card.Text>
          {item.price + ' ' + 'ETHER'}
        </Card.Text>
        <Card.Text>
          {'Owner' + ' ' + item.price}
        </Card.Text>
        {/* <Card.Text>
          <Button variant="primary" className="buy btn btn-success" >Buy</Button>
        </Card.Text> */}
        <Button variant="primary" onClick={onClick} className="buy btn btn-success" >Buy</Button>
      </Card.Body>

    </Card>
  )
}

export default Item