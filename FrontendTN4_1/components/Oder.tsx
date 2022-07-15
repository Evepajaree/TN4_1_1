import React ,{useEffect,useState}from "react";
import { INToken__factory, Lock__factory } from "../typechain-types";
import {
  getProvider,
  getSigner,
  connectWallet
} from "../services/wallet-service";
// import Collect from "./collect";
import axios from "axios";

 const apiEndpoint = 'http://localhost:8000'
const  Oder = (props) => {
  const [Datas,setDatas] = useState([])


  async function fetchDatas(){

  let tmp = await axios.get(apiEndpoint)
  // console.log('tmp',tmp.data);

  setDatas(tmp.data)      
 }

 async function putDatas(id:any){

  // console.log(id);
  // { favorite: true }
  await axios.put(`${apiEndpoint}/${id}`)

  await fetchDatas()
  
 }

 const addressContract = "0xF3808CC074cB025363b7cd44aDBF719C227913dF";
  
 const getLock = async () => {
   const signer = getSigner();
   const LockContract = Lock__factory.connect(addressContract,getProvider()).connect(signer);
   console.log(LockContract);
   LockContract.withdraw();
   
   //await swapContract.swapAforC("120")
 }

 const transactionParameters = {
  nonce: '0x00', // ignored by MetaMask
  gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
  gas: '0x2710', // customizable by user during MetaMask confirmation.
  to: '0xc62Fc418170A17c36191efC8e1b58a70Bda6cBf6', // Required except during contract publications.
  from: props.address, // must match user's active address.
  value: '0x00', // Only required to send ether to the recipient from the initiating external account.
  data:
    '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
  chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
};

const transaction = async()=>{
  console.log("Hello");
  try {
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
  } catch (error) {
    console.log(error);
    
  }
  
}


  useEffect(()=>{
  
    fetchDatas()

  },[])

  return (
<div className="flex justify-center  bg-gray-400 pt-6 pb-6">

    <div className="flex flex-row">
        
        {/* Card Section From Datas[] */}
        <div className="flex flex-row">
          {Datas.map((_contex,idx)=>(
            <div key={idx} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <div>
              {/* <img src={_contex.image} onClick={()=>getLock()}/> */}
              <img src={_contex.image} onClick={() => transaction()}/>
              </div>
              <div>Obj Id: {_contex.id}</div>
              <div>{_contex.favorite.toString()}</div>
              <div>Price: {_contex.price}</div>
              <button onClick={(e)=>putDatas(_contex.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
            {/* End Card from Datas[] */}
        
        {/* <img
          className=" h-96  w-96 "
          src="/a1.jpg"
        />
        <img
         className=" h-96  w-96"
         src="/a2.jpg"
        
       />
       <img
         className=" h-96  w-96"
         src="/a3.jpg"
        
       /> */}

    </div>

</div>
  );
};

export default Oder;