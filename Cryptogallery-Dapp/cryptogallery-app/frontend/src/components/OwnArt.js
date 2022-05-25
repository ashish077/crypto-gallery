import React, { useState ,useEffect} from 'react'
import Item from './Item'
import CryptogalleryV2 from '../contracts/CryptogalleryV2.json';
import { ethers, Contract } from "ethers";

 function OwnArt() {

  const [painting,setPainting]=useState([]);
  
  useEffect( async () => {
    //get connection
    console.log("inside use effect of OwnArt");
    //fetch paintings
    const currentAddress =   await window.web3.eth.getAccounts();
    const currentOwner=currentAddress[0];

    fetch("http://localhost:4000")
    .then(response => response.json())
    .then(data => {console.log("inside owned art");
                   
                   console.log(data);
                   const ownPaintings=data.filter(x=>x.owner==currentOwner);
                   setPainting(ownPaintings);
                   console.log(ownPaintings)});
      
        
    
  }, [])
  
  
  return (
    <div className="itemList">
      {
     painting.map(item=>(<Item key={item.id} item={item} />))
      }
    </div>
  )
}

export default OwnArt   