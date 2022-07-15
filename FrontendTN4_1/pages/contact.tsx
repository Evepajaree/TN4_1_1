import type { NextPage } from "next";
import * as ethers from "ethers";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
} from "../services/wallet-service";
import {
  getNetworkTokens,
} from "../constants/network-id";

import {formatUnits } from "ethers/lib/utils";
import { Token } from "../types/token.type";
import Bar from "../components/Bar";
import Shop from "../components/Shop";
import Tact  from "../components/Tact";



const Contact: NextPage = () => {
  
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
 

  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>(
    {}

    
  );

  const getTokenBalance = async (
    tokenAddress: string,
    ownerAddress: string
  ) => {
    const abi = ["function balanceOf(address owner) view returns (uint256)"];
    const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
    return contract.balanceOf(ownerAddress);
  };

  let test = "";
    if (address != null) {
      test = address.substring(0,4) + "..." + address.substring(38, 42);
    
    }


  const addTokenToWallet = async (token: Token) => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: token.address, // The address that the token is at.
            symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: token.decimals, // The number of decimals in the token
            image: token.imageUrl, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);

    const chainId = await getChainId();
    setNetwork(chainId);

 

    const tokenList = getNetworkTokens(chainId);

    // const tokenBalList = await Promise.all(
    //   // // tokenList.map((token) =>
    //   // //   // getTokenBalance(token.address, addr).then((res) =>
    //   // //   //   // formatUnits(res, token.decimals)
    //   // //   // )
    //   // )
    // );

    tokenList.forEach((token, i) => {
      // tokenBalances[token.symbol] = tokenBalList[i];
    });
    setTokenBalances({ ...tokenBalances });
  };

  useEffect(() => {
    loadAccountData();

    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);
      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      setNetwork(networkId);
      loadAccountData();
    };

    getEthereum()?.on("accountsChanged", handleAccountChange);
    getEthereum()?.on("accountsChanged", handleAccountChange);

    getEthereum()?.on("chainChanged", handleNetworkChange);
  }, []);

  return (
    <div className="bg-slate-300  h-screen ">
      {address ? (
  <div>
  <div className="flex flex-row-reverse p-4 bg-white">
  
        
        <div className="mx-4 ">
               <p  className="text-[#A2805D] flex justify-center py-2 px-4 rounded-lg  bg-[#DAC6A3] ">{test}</p>
          </div>
       

          <div className="mr-4">
            
            {getNetworkTokens(network).map((token) => (
              <div key={token.symbol} className="text-[#DAC6A3]  flex justify-center py-1 px-4 rounded-lg  bg-[#A2805D]">
                <div>
                  <img
                    onClick={() => addTokenToWallet(token)}
                    src={token.imageUrl}
                    className="w-8 h-8 mr-3 cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-center">
                    {tokenBalances[token.symbol] || 0} {token.symbol}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
         <Bar/>
         <Shop/>
         <Tact/>
        </div>
                
      ) : (
<div>
        <div className="flex flex-row-reverse p-4 bg-white ">
        <button
          type="button"
          className="text-white  py-2 px-4 rounded-lg  bg-[#A2805D] hover:bg-[#DAC6A3] shadow-lg shadow-[#A2805D] "
          onClick={connectWallet}
        >
          Connect
        </button>
       </div>
      

       <div> 
            <Bar/> 
           
            <Tact/>
       </div>

       

</div>        
      )}


    </div>
  );
};

export default Contact;
