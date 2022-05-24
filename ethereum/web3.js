import Web3 from "web3";
import {infuraProjectId} from '../.env' 

let web3

if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){

    // we are in the browser and metamask is running
    window.ethereum.request({ method: "eth_requestAccounts" });

    web3 = new Web3(window.ethereum);

}else{

    // we are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(infuraProjectId)
    
    web3 = new Web3(provider);

}
 
export default web3;