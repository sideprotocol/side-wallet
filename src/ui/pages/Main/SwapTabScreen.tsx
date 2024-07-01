import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { KEYRING_TYPE } from '@/shared/constant';
import { Column, Content, Footer, Header, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { Icon } from '@/ui/components/Icon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { SWAP_ASSETS } from '@/ui/constants';
import { IAsset } from '@/ui/constants/assets';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { swapStore, useSwapStore } from '@/ui/stores/SwapStore';
import { fontSizes } from '@/ui/theme/font';
import { useWallet } from '@/ui/utils';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import useGetAllPools from '@/ui/hooks/useGetAllPools';

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
        raw: '0'
      };
    }

    const client = await CosmWasmClient.connect('https://testnet-rpc.side.one');

    console.log(`currentAccount?.address, asset.base: `, currentAccount?.address, asset.base);
    const balance = await client.getBalance(currentAccount?.address, asset.base);

    console.log(`client: `, client);
    console.log(`client: `, balance);
    return {
      available: BigNumber(balance?.amount || '0')
        .div(BigNumber(10).pow(asset.exponent))
        .toFixed(),
      raw: balance.amount
    };
  };

  // useGetAllPools();
  const getBalancesAll = async () => {
    console.log(`SWAP_ASSETS.assets: `, SWAP_ASSETS.assets);
    const balances = await Promise.all(SWAP_ASSETS.assets.map((asset) => getBalance(asset)));
    const balancesObject = balances.reduce((acc, cur, index) => {
      return {
        ...acc,
        [SWAP_ASSETS.assets[index].base]: cur
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
  useGetAllPools();
  console.log(`swapPair, balances: `, swapPair, balances);
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
            <Image src="/images/logo/wallet-logo-white.svg" size={fontSizes.xxxl} />
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
        <InitBalance></InitBalance>
        <Column relative>
          <Column mt={'xl'} px={'xl'} py={'xl'} rounded={true} gap={'md'} bg={'swapBg'}>
            <Row justifyBetween itemsCenter>
              <div
                style={{
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
              }}>
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

          <Row relative>
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
                alignItems: 'center'
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
              }}>
              <Icon icon={'swap-down-icon'}></Icon>
              {/*{!hoverExchange ? <ExchangeDefaultSVG color="black" /> : <ExchangeSVG />}*/}
            </div>
          </Row>

          <Column px={'xl'} py={'xl'} rounded={true} gap={'md'} bg={'swapBg'}>
            <Row justifyBetween itemsCenter>
              <div
                style={{
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
              }}>
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
            <Button
              full
              text="Swap"
              preset="primary"
              onClick={async () => {
                // alert('Swap');

              }}
            />
          </Row>

          {/*{showValidDetail && <SwapDetail />}*/}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="swap" />
      </Footer>
    </Layout>
  );
}
