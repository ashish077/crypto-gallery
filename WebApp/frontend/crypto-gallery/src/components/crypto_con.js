import { ethers, Contract } from "ethers";
import CryptogalleryV1 from '../contracts/CryptogalleryV1.json';

const getConnection=()=>
    new Promise((resolve,reject)=>{
        window.addEventListener('load',async () =>{
            if(window.ethereum)
            {
                await window.ethereum.enable();
                const provider=new ethers.providers.Web3Provider(window.ethereum);
                const signer=provider.getSigner();
                const contract = new Contract(
                    CryptogalleryV1.networks[window.ethereum.networkVersion].address,
                    CryptogalleryV1.abi,
                    signer
                );
                resolve({provider, contract});    
            }
            resolve({provider:undefined, contract: undefined
            });
        });
    }


    );

    export default getConnection;
