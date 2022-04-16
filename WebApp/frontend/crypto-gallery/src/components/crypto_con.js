import { ethers, Contract } from "ethers";

const getConnection=()=>
    new Promise((resolve,reject)=>{
        window.addEventListener('load',async () =>{
            if(window.etherium)
            {
                await window.etherium.enable();
                const provider=new ethers.providers.Web3Provider(window.etherium);
                const signer=provider.getSigner();
                console.log("inside connection");
                resolve({provider});    
            }
            resolve({provider:undefined
            });
        });
    }


    );

    export default getConnection;
