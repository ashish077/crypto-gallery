
import React from 'react'
import Card from 'react-bootstrap/Card'
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
      <Card.Img variant="top" src={"http://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-04.jpg"}  alt={"Chocolate filled boller"}/>
      <Card.Body>
        <Card.Title>{item.title}e</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup> */}
      <Card.Body>
        <Button variant="primary" className="buy btn btn-success" >Buy</Button>
      </Card.Body>

    </Card>
  )
}

export default Item