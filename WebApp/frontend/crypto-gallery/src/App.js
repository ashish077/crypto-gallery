import './css/App.css';
import Banner from './components/Banner';
import Itemlist from './components/item_list';
import React , {useState,useEffect} from 'react'
import './css/item_list.css'

function App() {

  let [painting, setPainting] = useState([]);

  // 3. Create out useEffect function
  function makeAPICall () {
    try {
      const response=fetch("http://localhost:4000", {mode:'no-cors'});
      console.log(response);
      const paint =  response.json();
      return paint;
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {   
    fetch("http://localhost:4000")
    .then(response => response.json())
    .then(data => 
         {
          setPainting(data);
         });

    },[]);
  
  return (
    <div className="App">
      {/*Banner will have the heading of the marketplace */}
      <Banner/>
      {/*populate a item list of all the paintings using desc from reading a json */}
      <Itemlist className="itemList" painting={painting}/>
    </div>
  );
}

export default App;
