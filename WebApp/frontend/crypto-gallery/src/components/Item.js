
import React from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import '../css/item.css'

function Item({item}) {
  
  return (
    // <div className="card" >
    //   <a href="#">
    //     <img src={"http://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-04.jpg"} alt={"Chocolate filled boller"}/>
    //     <div className="card-content">
    //         <h3>{item.title}</h3>
    //         <p>{item.description}</p>
    //         <Button variant="primary" className="buy btn btn-success" >Buy</Button>        
    //     </div>
    //   </a>
    // </div>
    <Card style={{ width: '18rem', height: '25rem' }}>
      <Card.Img variant="top" src={item.src}  alt={item.title}/>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        {/* <ListGroup>
          <ListGroupItem>{item.price}</ListGroupItem>
          <ListGroupItem>{item.price}</ListGroupItem>
          <ListGroupItem>{item.price}</ListGroupItem>
        </ListGroup> */}
      </Card.Body>
      <Card.Body>
        <Button variant="primary" className="buy btn btn-success" >Buy</Button>
      </Card.Body>

    </Card>
  )
}

export default Item