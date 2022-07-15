import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any; // TODO: find the type
  }
}

export const getEthereum = () => {
  if (typeof window.ethereum !== "undefined") {
    return window.ethereum;
  }
  return null;
};

export const getProvider = () => {
  const ethereum = getEthereum();
  if (ethereum) {
    return new ethers.providers.Web3Provider(getEthereum());
  }
  return null;
};
// export const getProvider = () => {
//   const url = "https://rinkeby.infura.io/v3/";
//   return new ethers.providers.JsonRpcProvider(url);
// };
export const getSigner = () => {
  const eth = getEthereum();
  const provider = new ethers.providers.Web3Provider(eth);
  return provider.getSigner();
};
export const connectWallet = () => {
  return getEthereum()?.request({
    method: "eth_requestAccounts",
  }) as Promise<string>;
};

export const getWalletAddress = () => {
  return getEthereum()?.selectedAddress as string;
};

export const getChainId = async () => {
  let tmp = await getEthereum()?.request({ method: "eth_chainId" }) as Promise<string>;
  console.log("tmp",tmp);
  
  return tmp
  // getEthereum()?.request({ method: "eth_chainId" }) as Promise<string>;
};

export const getBalance = (address: string) => {
  const provider = getProvider();
  return provider?.getBalance(address);
};
