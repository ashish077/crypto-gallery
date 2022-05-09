import { ethers, Contract } from "ethers";

const getBlockchain= () =>
    new Promise((resolve,reject) =>{
        window.addEventListener('load',async => {
            if (window.etherium)
            {
                await window.etherium.enable();
                const provider= new ethers.providers.Web3Provider(window.etherium);
                const signer=provider.getSigner();

                const paymentContract=new Contract(paymentContract.networks[window.etherium.networkVersion],
                    paymentContract.abi,
                    signer
                    );
                
                resolve({provider,paymentContract});
                resolve({provider:undefined, paymentContract:undefined});
            }
        });
    });

    export default getBlockchain;