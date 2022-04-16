
import React from 'react'
import '../css/item.css'

function Item({item,onClick}) {
  
  function checkSold(){
    if(item.sold==="true"){
           return (<h2 style={{color:"red"}}>SOLD</h2>);
    }
    else
    {
      return ( <button className="buy btn btn-success" onClick={onClick} >Buy</button>); 
    }
  }
  return (
    <div className="card" >
  
                
                    <a href="#">
                        
                    <img src={"http://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-04.jpg"} alt={"Chocolate filled boller"}/>
                       
                        <div className="card-content">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h3>Price:{item.amount} eth</h3>
                             {checkSold()}
                           
                        </div>
                    </a>
                

     </div>
  
  )
}

export default Item