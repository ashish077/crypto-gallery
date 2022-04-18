
import React from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import '../css/item.css'

function Item({item}) {
  function checkSold(){
    if(item.sold==="true"){
           return (<h2 style={{color:"red"}}>SOLD OUT</h2>);
    }
    else
    {
      return (<Button variant="primary" className="buy btn btn-success" >Buy</Button>); 
    }
  }
  return (
   
    <Card style={{ width: '18rem', height: '25rem' }}>
      <Card.Img variant="top" src={item.src}  alt={item.title}/>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        {/*<Button variant="primary" className="buy btn btn-success" >Buy</Button>*/}
        {checkSold()}
      </Card.Body>

    </Card>
  )
}

export default Item