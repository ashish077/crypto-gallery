import React from 'react'
import Item from './Item'

function Itemlist({painting,onClick}) {
  
  
  return (
   
    <div className="itemList">
      {   
       painting.map((item)=>(<Item key={item.id} item={item} onClick={()=> onClick(item)} />))

      }
    </div>
  )
}

export default Itemlist   