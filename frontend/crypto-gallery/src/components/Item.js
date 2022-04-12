
import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/item.css'

function Item({item}) {
  
  return (
    <div className="card" >
  
                
                    <a href="#">
                        
                    <img src={"http://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-04.jpg"} alt={"Chocolate filled boller"}/>
                       
                        <div className="card-content">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <button className="buy btn btn-success" >Buy</button>
                        </div>
                    </a>
                

     </div>
  
  )
}

export default Item