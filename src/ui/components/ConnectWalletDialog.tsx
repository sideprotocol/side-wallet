// import { Box, DialogContent, Typography } from "@mui/material";

import { IWalletItem, useWalletContext } from "./WalletContext";
import { createWallet, writeClient, writeWallet } from "./WalletConnect/Wallet";
import { useState, useContext } from "react";
// import * as BridgeStore from "@/stores/BridgeStore";
import SideDialog from "@/components/SideDialog";
import { globalContext } from "@/context";
// import { LoadingButton } from "@/components/UI/Button";

interface IConnectWalletDialog {}

const ConnectWalletDialog: React.FC<IConnectWalletDialog> = () => {
  const {
    connectModal,
    setConnectModal,
    curChain,
    wallets,
    curWallet,
    setCurWallet,
    setClient,
    client,
    connectChainId,
    setConnectChainId,
    getSingleAccount,
  } = useWalletContext();

  const [sending, setSending] = useState<boolean>(false);
  const [connectError, setConnectError] = useState<string>();
  const [bridgeWallet, setBridgeWallet] = useState<IWalletItem | null>(null); // 跨链桥wallet
  // const bridgeStore = BridgeStore.useBridgeStore();
  // const { isH5 } = useContext(globalContext);

  async function handleOnConnect() {
    try {
      setSending(true);
      setConnectError("");
      const wa = createWallet(
        curWallet.name,
        {
          chainId: curChain.chainID,
          hdPath: curChain.hdPath,
          prefix: curChain.prefix,
        },
        curChain
      );

      const result = await wa.getAccounts();

      if (result.length > 0) {
        const [first] = result;

        const connected = {
          wallet: curWallet.name,
          ...first,
          ...curChain,
        };
        // bridge
        if (client?.address && connectChainId) {
          // if (bridgeStore.currentConnect === "from") {
          //   const address = await getSingleAccount(bridgeStore.fromChain!, bridgeWallet!);
          //   BridgeStore.setFromAddress(address);
          //   BridgeStore.setFromWallet(bridgeWallet);
          // } else if (bridgeStore.currentConnect === "to") {
          //   const address = await getSingleAccount(bridgeStore.toChain!, bridgeWallet!);
          //   BridgeStore.setToAddress(address);
          //   BridgeStore.setToWallet(bridgeWallet);
          // }
        } else {
          setClient(connected);
          writeWallet(curWallet);
          writeClient({ connected, hdPath: curChain.hdPath });
        }
        setConnectModal(false);
        setTimeout(() => {
          setConnectChainId(undefined);
          setBridgeWallet(null);
        });
      }
    } catch (e) {
      const err = e as unknown as Error;
      setConnectError(err.message);
    } finally {
      setSending(false);
    }
  }

  const filterWallets = connectChainId ? wallets.filter((item) => item.supportChain.includes(connectChainId!)) : wallets;

  return (
    <SideDialog
      footer={null}
      open={connectModal}
      onClose={() => {
        setConnectModal(false);
        setTimeout(() => {
          setConnectChainId(undefined);
          setBridgeWallet(null);
        });
      }}
      sx={{
        ".MuiPaper-root": {
          borderRadius: "24px",
          width: "400px",
        },
      }}
      title="Connect Wallet"
    >
      <div
        style={{
          padding: "0 0 24px",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
          }}
        >
          {filterWallets.map((item) => {
            const isActive = item.name == curWallet.name || item.name === bridgeWallet?.name;
            return (
              <div
                key={item.name}
                onClick={() => {
                  if (!client?.address) {
                    setCurWallet(item);
                  }
                  if (connectChainId) {
                    setBridgeWallet(item);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: "14px",
                  marginBottom: "2px",
                  padding: "9px 16px",
                  cursor: "pointer",
                  color: "#fff",
                  bgcolor: isActive ? "#EAEAEA" : "transparent",
                  border: `1px solid ${isActive ? "black" : "transparent"}`,
                  ":hover": {
                    bgcolor: "#EAEAEA",
                  },
                }}
              >
                <img
                  src={item.logo}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "12px",
                  }}
                />
                <div
                  style={{
                    textAlign: "left",
                    flex: 1,
                    color: "#000",
                    fontWeight: 700,
                  }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ paddingBottom: "12px", fontSize: "14px", color: "red" }}>{connectError}</div>

        <LoadingButton themetype="primary" fullWidth disabled={sending} loading={sending} onClick={handleOnConnect}>
          Connect
        </LoadingButton>
      </div>
    </SideDialog>
  );
};

export default ConnectWalletDialog;
