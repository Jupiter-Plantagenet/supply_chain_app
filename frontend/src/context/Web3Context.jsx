import React, { createContext, useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import SupplyChainArtifact from '@artifacts/contracts/SupplyChain.sol/SupplyChain.json';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const prov = new BrowserProvider(window.ethereum);
      setProvider(prov);
    } else console.warn('MetaMask not detected');
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.warn('MetaMask not detected');
      return;
    }
    const address = import.meta.env.VITE_CONTRACT_ADDRESS;
    if (!address) {
      console.error('VITE_CONTRACT_ADDRESS is undefined');
      return;
    }
    try {
      const prov = new BrowserProvider(window.ethereum);
      setProvider(prov);
      const accounts = await prov.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      const signer = await prov.getSigner();
      const instance = new Contract(address, SupplyChainArtifact.abi, signer);
      setContract(instance);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Web3Context.Provider value={{ account, provider, contract, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};
