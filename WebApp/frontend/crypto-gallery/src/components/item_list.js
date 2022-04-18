import React from 'react'
import Item from './Item'

function Itemlist({paintings}) {
 

  return (
    <div className="itemList">
      {  
        paintings.map(item=>(<Item key={item.id} item={item} />))
      }
    </div>
  )
}

export default Itemlist   