import React from 'react'
import Item from './Item'

function Itemlist({painting}) {
 {/*
  const handleClick = (i) => {
     
      console.log("inside handleClick");
      item=item.filter(item => item.id!==i);
      console.log(item);

  
  };
*/}

  return (
    <div className="itemList">
      {  
        painting.map(item=>(<Item key={item.id} item={item} />))
      }
    </div>
  )
}

export default Itemlist   