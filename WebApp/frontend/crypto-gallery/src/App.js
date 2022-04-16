import './css/App.css';
import Banner from './components/Banner';
import Itemlist from './components/item_list';
import React , {useState,useEffect} from 'react'
import './css/item_list.css'
import getConnection  from './components/crypto_con';

function App() {

  let [painting, setPainting] = useState([]);

 

  useEffect(() => {   
    
    //connect to metamask
    const init= async ()=>{
      const {provider}=await getConnection();
    }
    init();

    fetch("http://localhost:4000")
    .then(response =>response.json())
    .then(data => 
         {
           
           setPainting(data);
          
         });

        },[painting]);
    
    if(typeof window.etherium==='undefined')
    {
      return(
        <h1>Please Install etherium to Interact</h1>
      );
    }
  
    const handleClick= async (i)=>{
       
      //call the update sold field for i
    
      const response= await fetch(`http://localhost:4000/`+ i,{method: 'PATCH'})
     
      //if response is ok then call the contract to make the transaction with the address and amount
     

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
