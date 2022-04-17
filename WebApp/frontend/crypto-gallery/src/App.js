import './css/App.css';
import Banner from './components/Banner';
import Itemlist from './components/item_list';
import React , {useState,useEffect} from 'react'
import './css/item_list.css'
import getConnection  from './components/crypto_con';
import { ethers, providers } from 'ethers';

function App() {

  let [painting, setPainting] = useState([]);
  let [cryptocontract, setContract] = useState(undefined); 

  useEffect(() => {   
    
    //connect to metamask
    const init= async ()=>{
      const {contract}=await getConnection();
      setContract(contract);
      console.log(contract);
    }
    init();

    fetch("http://localhost:4000")
    .then(response =>response.json())
    .then(data => 
         {
           
           setPainting(data);
          
         });

        },[painting]);
    if(typeof window.ethereum==='undefined')
    {
      return(
        <h1>Please Install Metamask to Interact</h1>
      );
    }
  
    const handleClick= async (item)=>{
      
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentAddress = addressArray[0];
        console.log(currentAddress);
      } catch (err) {
        console.log("Exception occurred while trying to fetch current metamask address.");
      }
      //call the update sold field for i
      console.log(item);
      console.log(String(ethers.utils.parseEther(String(item.amount))));
      
    
      
     
      //if response is ok then call the contract to make the transaction with the address and amount
      const buy = await cryptocontract.purchaseArt(parseInt(item.id), {value:String(ethers.utils.parseEther(String(item.amount)))})
      .catch(function(e){
        console.log("Exception");
      });
      if(buy !== undefined){
          await buy.wait()
          const response= await fetch(`http://localhost:4000/`+ item.id,{method: 'PATCH'});
      }
    } 
   
   return (
     
    <div className="App">
      {/*Banner will have the heading of the marketplace */}
      <Banner/>
      {/*populate a item list of all the paintings using desc from reading a json */}
      <Itemlist className="itemList" painting={painting} onClick={handleClick}/>
    </div>
  );
}

export default App;
