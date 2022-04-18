import React from 'react'
import Item from './Item'

function Itemlist({paintings, onClick}) {
  return (
    <div className="itemList">
      {  
        paintings.map(item=>(<Item key={item.id} item={item} onClick={()=> onClick(item)}/>))
      }
    </div>
  )
}

export default Itemlist   