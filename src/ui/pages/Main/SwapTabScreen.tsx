import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { swapStore, useSwapStore } from "@/ui/stores/SwapStore";
import { ADDRESS_TYPES, KEYRING_TYPE, NETWORK_TYPES } from '@/shared/constant';
import { Card, Column, Content, Footer, Header, Layout, Row, Text, Image } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Button } from '@/ui/components/Button';
import { Icon, IconTypes } from '@/ui/components/Icon';
import { getCurrentTab, useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';
import { RightOutlined } from '@ant-design/icons';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { fontSizes } from '@/ui/theme/font';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { CoinInput } from '@/ui/components/CoinInput';
import { useWalletContext } from "@/ui/components/WalletContext";
import { SWAP_ASSETS } from "@/ui/constants";
import BigNumber from 'bignumber.js';
import { IAsset } from "@/ui/constants/assets";


const InitBalance = () => {
  const currentAccount = useCurrentAccount();
  // const { client: curClient, curChain } = useWalletContext();

  const { reloadDataTrigger } = useSwapStore();
  // console.log(`currentAccount: `, currentAccount);
  // debugger;

  const getBalance = async (asset: IAsset) => {
    if (!currentAccount?.address) {
      return {
        available: '0',
        raw: '0',
      };
    }

    const client = await CosmWasmClient.connect('https://devnet-rpc.side.one');

    const balance = await client.getBalance(currentAccount?.address, asset.base);

    console.log(`client: `, client);
    console.log(`client: `, balance);
    debugger;
    return {
      available: BigNumber(balance?.amount || '0')
        .div(BigNumber(10).pow(asset.exponent))
        .toFixed(),
      raw: balance.amount,
    };
  };

  const getBalancesAll = async () => {
    const balances = await Promise.all(SWAP_ASSETS.assets.map((asset) => getBalance(asset)));
    console.log(`balances: `, balances);
    debugger;
    const balancesObject = balances.reduce((acc, cur, index) => {
      return {
        ...acc,
        [SWAP_ASSETS.assets[index].base]: cur,
      };
    }, {});

    swapStore.balances = balancesObject;
  };

  useEffect(() => {
    if (!currentAccount?.address) {
      swapStore.balances = {};
      return;
    }
    getBalancesAll();
  }, [currentAccount?.address, reloadDataTrigger]);

  return <></>;
};

export default function SwapTabScreen() {
  const { swapPair, balances } = useSwapStore();
  const navigate = useNavigate();
  // const networkType = useNetworkType();
  // const isInTab = useExtensionIsInTab();
  //
  const [connected, setConnected] = useState(false);
  const currentKeyring = useCurrentKeyring();
  // const currentAccount = useCurrentAccount();
  const wallet = useWallet();
  useEffect(() => {
    const run = async () => {
      const res = await getCurrentTab();
      if (!res) return;
      const site = await wallet.getCurrentConnectedSite(res.id);
      if (site) {
        setConnected(site.isConnected);
      }
    };
    run();
  }, []);
  console.log(`swapPair, balances: `, swapPair, balances);
  debugger;
  return (
    <Layout>
      <Header
        LeftComponent={
          connected ? (
            <Row
              itemsCenter
              onClick={() => {
                navigate('ConnectedSitesScreen');
              }}>
              <Text text="·" color="green" size="xxl" />
              <Text text="Dapp Connected" size="xxs" />
            </Row>
          ) : (
            <Image
              src="/images/logo/wallet-logo-white.svg"
              size={fontSizes.xxxl}
            />
          )
        }
        title={
          currentKeyring.type === KEYRING_TYPE.HdKeyring || currentKeyring.type === KEYRING_TYPE.KeystoneKeyring ? (
            <AccountSelect />
          ) : (
            ''
          )
        }
        RightComponent={<Image src="/images/icons/main/menu-icon.svg" size={fontSizes.xxl} />}
        onClickRight={() => {
          navigate('/settings');
        }}
      />
      <Content>
        <Row
          full
          relative
          rounded={true}
        >
          <InitBalance></InitBalance>

          <Column relative>
            <Column
              mt={'xl'}
              px={'xl'}
              py={'xl'}
              rounded={true}
              gap={'md'}
              bg={'swapBg'}
            >
              <Row justifyBetween itemsCenter>
                <div style={{
                  fontSize: '12px',
                  color: '#7D7D7D'
                }}>
                  You provide
                </div>
              </Row>

              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '20px 0px'
                }}
              >
                {/*<NativeInput />*/}
                <CoinInput
                  coin={{
                    amount: 0
                  }}
                  onChange={(value) => {
                    // if (!curChain?.chainID) {
                    //   return;
                    // }
                    // swapStore.swapPair["remote"] = {
                    //   amount: removeStartZero(value),
                    //   denom: swapStore.swapPair["remote"].denom,
                    // };
                  }}
                />

                {/*<TokenCurrent*/}
                {/*  value={swapPair.native}*/}
                {/*  setShow={() => {*/}
                {/*    swapStore.tokenModalShow = true;*/}
                {/*    swapStore.modalTokenType = "native";*/}
                {/*  }}*/}
                {/*/>*/}
              </Row>

              {/*<NativeBalance></NativeBalance>*/}
            </Column>

            <Row
              relative
            >
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#1D1D1F',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '4px solid #414142',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onMouseEnter={() => {
                  // swapStore.hoverExchange = true;
                }}
                onMouseLeave={() => {
                  // swapStore.hoverExchange = false;
                }}
                onClick={() => {
                  // const nativePair = swapStore.swapPair.native;
                  //
                  // const remotePair = swapStore.swapPair.remote;
                  //
                  // swapStore.swapPair.native = {
                  //   ...remotePair,
                  //   amount: "1",
                  // };
                  //
                  // swapStore.swapPair.remote = {
                  //   ...nativePair,
                  //   amount: "",
                  // };
                }}
              >
                <Icon icon={'swap-down-icon'}></Icon>
                {/*{!hoverExchange ? <ExchangeDefaultSVG color="black" /> : <ExchangeSVG />}*/}
              </div>
            </Row>

            <Column
              px={'xl'}
              py={'xl'}
              rounded={true}
              gap={'md'}
              bg={'swapBg'}
            >
              <Row justifyBetween itemsCenter>
                <div style={{
                  fontSize: '12px',
                  color: '#7D7D7D'
                }}>
                  You get
                </div>
              </Row>

              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '20px 0px'
                }}
              >
                {/*<NativeInput />*/}
                <CoinInput
                  coin={{
                    amount: 0
                  }}
                  readOnly
                  onChange={(value) => {
                    // if (!curChain?.chainID) {
                    //   return;
                    // }
                    // swapStore.swapPair["remote"] = {
                    //   amount: removeStartZero(value),
                    //   denom: swapStore.swapPair["remote"].denom,
                    // };
                  }}
                />

                {/*<TokenCurrent*/}
                {/*  value={swapPair.native}*/}
                {/*  setShow={() => {*/}
                {/*    swapStore.tokenModalShow = true;*/}
                {/*    swapStore.modalTokenType = "native";*/}
                {/*  }}*/}
                {/*/>*/}
              </Row>

              {/*<NativeBalance></NativeBalance>*/}
            </Column>

            {/*<ConfirmButton />*/}
            <Row mt={'xl'} full>
              <Button full text="Swap"
                      preset="primary"
                      onClick={async () => {
                        alert('Swap');
                      }} />
            </Row>

            {/*{showValidDetail && <SwapDetail />}*/}

          </Column>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="swap" />
      </Footer>
    </Layout>
  );
}
