/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
// import ConnectWalletDialog from "./ConnectWalletDialog";
// import {
//   IChain,
//   IClient,
//   WalletName,
//   Wallets,
//   createWallet,
//   readChain,
//   readClient,
//   readWallet,
//   removeWallet,
//   writeChain,
//   writeClient,
// } from "./WalletConnect/Wallet";

// export interface IWalletItem {
//   name: WalletName;
//   logo: string;
//   supportChain: string[];
// }

// export interface IWalletContext {
//   connectModal: boolean;
//   setConnectModal: (open: boolean) => void;
//   curWallet: IWalletItem;
//   wallets: IWalletItem[];
//   setCurWallet: (item: IWalletItem) => void;
//   chains: IChain[];
//   curChain: IChain;
//   setCurChain: (item: IChain) => void;
//   client: IClient | undefined;
//   setClient: (item: IClient) => void;
//   disconnect: () => void;
//   connect: (item: IChain) => void;
//   getSingleAccount: (item: IChain, wallet?: IWalletItem) => Promise<string>;
//   connectChainId: string | undefined; // 即将要连接的链Id
//   setConnectChainId: (item: string | undefined) => void;
// }

const WalletContext = createContext(null);

export interface IWalletConfig {
  children: React.ReactNode;
  chains: [];
}

const WalletConfig: React.FC<IWalletConfig> = ({ children, chains }) => {
  const [connectModal, setConnectModal] = useState<boolean>(false);
  const [curWallet, setCurWallet] = useState<IWalletItem>(
    readWallet() || Wallets[0]
  );
  const [curChain, setCurChain] = useState<IChain>(readChain() || chains[0]);
  const [client, setClient] = useState<IClient>(readClient(curChain.hdPath));
  const [connectChainId, setConnectChainId] = useState<string | undefined>(
    undefined
  );

  // useEffect(() => {
  //   writeChain(curChain);
  // }, [curChain]);

  function reAccount() {
    connect(curChain);
  }
  useEffect(() => {
    if (client?.address) {
      const wa = createWallet(
        curWallet.name,
        {
          chainId: curChain.chainID,
          hdPath: curChain.hdPath,
          prefix: curChain.prefix,
        },
        curChain
      );

      wa.connectEventNamesOnWindow.forEach((item) => {
        if (
          [WalletName.MetamaskSnap, WalletName.Metamask].includes(
            curWallet.name
          )
        ) {
          // @ts-ignore
          window.ethereum.on(item, reAccount);
        } else {
          window.addEventListener(item, reAccount);
        }
      });

      return () => {
        wa.connectEventNamesOnWindow.forEach((item) => {
          if (
            [WalletName.MetamaskSnap, WalletName.Metamask].includes(
              curWallet.name
            )
          ) {
            // @ts-ignore
            window.ethereum.removeListener(item, reAccount);
          } else {
            window.removeEventListener(item, reAccount);
          }
        });
      };
    }
  }, [curWallet, curChain]);

  function disconnect() {
    removeWallet(curChain.hdPath);
    setClient({} as IClient);
  }

  async function getSingleAccount(item: IChain, wallet?: IWalletItem) {
    let _wallet = curWallet;
    if (wallet) {
      _wallet = wallet;
    }
    const wa = createWallet(
      _wallet.name,
      {
        chainId: item.chainID,
        hdPath: item.hdPath,
        prefix: item.prefix,
      },
      item
    );

    const result = await wa.getAccounts();
    return result?.[0].address || "";
  }

  async function connect(item: IChain) {
    try {
      if (!client?.address) {
        setCurChain(item);
        setConnectModal(true);
        return;
      }

      const wa = createWallet(
        curWallet.name,
        {
          chainId: item.chainID,
          hdPath: item.hdPath,
          prefix: item.prefix,
        },
        item
      );

      const result = await wa.getAccounts();

      if (result.length > 0) {
        const [first] = result;

        const connected = {
          wallet: curWallet.name,
          ...first,
          ...item,
        };

        setClient(connected);

        writeClient({ connected, hdPath: item.hdPath });
        setConnectModal(false);

        setCurChain(item);
      }
    } catch (e) {
      const err = e as unknown as Error;
      console.log(err);
    }
  }

  return (
    // <WalletContext.Provider
    //   value={{
    //     connectModal,
    //     setConnectModal,
    //     wallets: Wallets,
    //     curWallet,
    //     setCurWallet,
    //     chains,
    //     curChain,
    //     setCurChain,
    //     client,
    //     setClient,
    //     disconnect,
    //     connect,
    //     getSingleAccount,
    //     connectChainId,
    //     setConnectChainId,
    //   }}
    // >
    //   {children}
    //   {/*<ConnectWalletDialog />*/}
    // </WalletContext.Provider>
    <div>
      {children}
    </div>
  );
};

export default WalletConfig;

export const useWalletContext = () => useContext(WalletContext)!;

// side1z7rxu9z3szqc8sgr6zawr5sycqe9ugrzq6k0jn
