import React, { createContext, useContext } from 'react';

const WalletContext = createContext(null);

export interface IWalletConfig {
  children: React.ReactNode;
  chains: [];
}

const WalletConfig: React.FC<IWalletConfig> = ({ children, chains }) => {
  return <div>{children}</div>;
};

export default WalletConfig;

export const useWalletContext = () => useContext(WalletContext)!;

// side1z7rxu9z3szqc8sgr6zawr5sycqe9ugrzq6k0jn
