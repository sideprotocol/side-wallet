import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { KEYRING_TYPE } from '@/shared/constant';
import LoadingIcon from '@/ui/assets/icons/loading.svg';
import { Column, Content, Footer, Header, Image, Layout, Row } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { Icon } from '@/ui/components/Icon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import SwapSelectToken from '@/ui/components/Swap/SwapSelectToken';
import SwapDetail from '@/ui/components/Swap/detail';
import TokenCurrent from '@/ui/components/TokenCurrent';
import { SWAP_ASSETS } from '@/ui/constants';
import { IAsset } from '@/ui/constants/assets';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import useGetAllPools from '@/ui/hooks/useGetAllPools';
import useSwap from '@/ui/hooks/useSwap';
import useSwapSimulation from '@/ui/hooks/useSwapSimulation';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { swapStore, useSwapStore } from '@/ui/stores/SwapStore';
import { fontSizes } from '@/ui/theme/font';
import { useWallet } from '@/ui/utils';
import { removeStartZero } from '@/ui/utils/format';
import { findAssetIcon } from '@/ui/utils/swap';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Coin } from '@cosmjs/stargate';

const InitBalance = () => {
  const currentAccount = useCurrentAccount();
  // const { client: curClient, curChain } = useWalletContext();

  const { reloadDataTrigger } = useSwapStore();

  const getBalance = async (asset: IAsset) => {
    if (!currentAccount?.address) {
      return {
        available: '0',
        raw: '0'
      };
    }

    const client = await CosmWasmClient.connect('https://testnet-rpc.side.one');

    console.log('currentAccount?.address, asset.base: ', currentAccount?.address, asset.base);
    const balance = await client.getBalance(currentAccount?.address, asset.base);

    console.log('client: ', client);
    console.log('client: ', balance);
    return {
      available: BigNumber(balance?.amount || '0')
        .div(BigNumber(10).pow(asset.exponent))
        .toFixed(),
      raw: balance.amount
    };
  };

  const getBalancesAll = async () => {
    console.log('SWAP_ASSETS.assets: ', SWAP_ASSETS.assets);
    const balances = await Promise.all(SWAP_ASSETS.assets.map((asset) => getBalance(asset)));
    swapStore.balances = balances.reduce((acc, cur, index) => {
      return {
        ...acc,
        [SWAP_ASSETS.assets[index].base]: cur
      };
    }, {});
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

const NativeBalance = () => {
  const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

  const { swapLoading, swapPair, balances, swapRouteResult } = useSwapStore();
  const currentAccount = useCurrentAccount();
  const connected = !!currentAccount?.address && swapPair?.native.denom;

  const validNativeInput = BigNumber(swapPair?.native?.amount || 0).gt(0) && swapPair?.native?.denom;

  const nativeBalance = balances[swapPair?.native?.denom || '']?.available || '0';

  const assetNativeIcon = findAssetIcon(swapPair?.native);

  function insufficientBalance() {
    return BigNumber(swapPair.native.amount || '0').gt(balances?.[swapPair.native?.denom || '']?.available || 0);
  }

  const priceImpact = swapRouteResult.priceImpact;

  const priceImpactRaw = BigNumber(priceImpact).div(100);
  const isDisabled = () => {
    return (
      insufficientBalance() ||
      !swapStore.swapPair.native?.amount ||
      !swapStore.swapPair.remote?.amount ||
      parseFloat(swapStore.swapPair.native?.amount) <= 0 ||
      parseFloat(swapStore.swapPair.remote?.amount) <= 0 ||
      swapLoading ||
      BigNumber(priceImpactRaw || '0').gt(0.5)
    );
  };
  const nativePrice = (
    new BigNumber(!swapPair?.native?.amount ? 0 : swapPair?.native?.amount).multipliedBy(
      unitPriceMap[assetNativeIcon?.coingecko_id || '']?.usd || '0'
    ) || 0
  )
    .toFixed(8, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, '');
  const newValue = SWAP_ASSETS.assets.find((asset) => asset.base === swapStore.swapPair['native']?.denom);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
      {/*{validNativeInput ? (*/}
      {/*  <div>*/}
      {/*    ${nativePrice == 'NaN' ? '0' : BigNumber(nativePrice).toFormat()}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div></div>*/}
      {/*)}*/}
      <div />

      {connected && (
        <div className={' gap-[3px] flex items-center cursor-pointer'} style={{}}>
          <Icon icon={'wallet-icon'} size={14} color={!isDisabled() ? 'white' : 'search_icon'}></Icon>
          <div
            style={{
              color: 'rgb(125, 125, 125)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            {' '}
            {/*<WalletIcon></WalletIcon>*/}
            {BigNumber(nativeBalance)
              .toFormat(assetNativeIcon?.precision || 8, BigNumber.ROUND_CEIL)
              .replace(/\.?0+$/, '')}
            &nbsp;
            <div
              className={'text-[#0DD4C3] text-[14px] hover:text-[#0DD4C3]/80'}
              onClick={() => {
                swapStore.swapPair['native'] = {
                  ...swapPair['native'],
                  amount: nativeBalance
                };
              }}>
              Max
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NativePrice = () => {
  const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

  const { swapPair, balances } = useSwapStore();
  const currentAccount = useCurrentAccount();

  const validNativeInput = BigNumber(swapPair?.native?.amount || 0).gt(0) && swapPair?.native?.denom;
  const assetNativeIcon = findAssetIcon(swapPair?.native);

  const nativePrice = (
    new BigNumber(!swapPair?.native?.amount ? 0 : swapPair?.native?.amount).multipliedBy(
      unitPriceMap[assetNativeIcon?.coingecko_id || '']?.usd || '0'
    ) || 0
  )
    .toFixed(8, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, '');

  return (
    <>
      {validNativeInput ? (
        <div
          style={{
            fontSize: '12px',
            color: 'rgb(125, 125, 125)'
          }}>
          ${nativePrice == 'NaN' ? '0' : BigNumber(nativePrice).toFormat()}
        </div>
      ) : (
        <div
          style={{
            height: '22px'
          }}></div>
      )}
    </>
  );
};

const RemoteBalance = () => {
  const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

  const { swapPair, balances } = useSwapStore();
  const currentAccount = useCurrentAccount();
  // const { client } = useWalletContext();

  const connected = !!currentAccount?.address && swapPair?.remote.denom;

  const validRemoteInput = BigNumber(swapPair?.remote?.amount || 0).gt(0) && swapPair?.native?.denom;

  const remoteBalance = balances[swapPair?.remote?.denom || '']?.available || '0';

  const assetRemoteIcon = findAssetIcon(swapPair?.remote);

  const remotePrice = (
    new BigNumber(!swapPair?.remote?.amount ? 0 : swapPair?.remote?.amount).multipliedBy(
      unitPriceMap[assetRemoteIcon?.coingecko_id || '']?.usd || '0'
    ) || 0
  )
    .toFixed(8, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, '');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
      <div />
      {/*{validRemoteInput ? (*/}
      {/*  <div style={{ color: 'rgb(125, 125, 125)', fontSize: '14px' }}>${remotePrice == 'NaN' ? '0' : BigNumber(remotePrice).toFormat()}</div>*/}
      {/*) : (*/}
      {/*  <div style={{*/}
      {/*    height: '22px'*/}
      {/*  }}></div>*/}
      {/*)}*/}

      {connected && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}>
          <Icon icon={'wallet-icon'} size={14} color={'search_icon'}></Icon>
          <div
            style={{
              color: 'rgb(125, 125, 125)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            {' '}
            {/*<WalletIcon></WalletIcon>*/}
            {BigNumber(remoteBalance)
              .toFormat(assetRemoteIcon?.precision || 8, BigNumber.ROUND_CEIL)
              .replace(/\.?0+$/, '')}
          </div>
          <div
            style={{
              color: '#16EDD6',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '13px',
              marginLeft: '6px',
              cursor: 'pointer'
            }}
            onClick={() => {
              return;
            }}></div>
        </div>
      )}
    </div>
  );
};

const RemotePrice = () => {
  const unitPriceMap = JSON.parse(localStorage.getItem('unitPriceMap') || '{}');

  const { swapPair, balances } = useSwapStore();
  const currentAccount = useCurrentAccount();

  const validNativeInput = BigNumber(swapPair?.native?.amount || 0).gt(0) && swapPair?.native?.denom;
  const assetNativeIcon = findAssetIcon(swapPair?.native);

  const nativePrice = (
    new BigNumber(!swapPair?.native?.amount ? 0 : swapPair?.native?.amount).multipliedBy(
      unitPriceMap[assetNativeIcon?.coingecko_id || '']?.usd || '0'
    ) || 0
  )
    .toFixed(8, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, '');
  const remoteBalance = balances[swapPair?.remote?.denom || '']?.available || '0.00';

  return (
    <>
      {validNativeInput ? (
        <div
          style={{
            fontSize: '12px',
            color: 'rgb(125, 125, 125)'
          }}>
          ${nativePrice == 'NaN' ? '0.00' : BigNumber(remoteBalance)?.toFormat(2)}
        </div>
      ) : (
        <div
          style={{
            height: '22px'
          }}></div>
      )}
    </>
  );
};

const NativeInput = () => {
  const { swapPair } = useSwapStore();
  const currentAccount = useCurrentAccount();
  // const { curChain } = useWalletContext();
  if (!currentAccount?.address) return;
  const debouncedChange = useDebouncedCallback((value) => {
    swapStore.swapPair['native'] = {
      amount: value,
      denom: swapStore.swapPair['native'].denom
    };
    console.log('swapStore.swapPair: ', swapStore.swapPair);
  }, 500);

  return (
    <CoinInput
      size={36}
      coin={swapPair?.native}
      onChange={(value) => {
        debouncedChange(value);
      }}
    />
  );
};

const RemoteInput = () => {
  const { swapPair } = useSwapStore();
  const currentAccount = useCurrentAccount();
  return (
    <CoinInput
      size={36}
      coin={swapPair?.remote}
      readOnly
      color={swapStore.swapPair['remote'].denom ? 'white' : 'rgb(125, 125, 125)'}
      onChange={(value) => {
        if (!currentAccount?.address) return;
        swapStore.swapPair['remote'] = {
          amount: removeStartZero(value),
          denom: swapStore.swapPair['remote'].denom
        };
      }}
    />
  );
};

function LoadingIndicator() {
  return <img className="loading-obj" src={LoadingIcon} width={26} height={26} alt={'Loading'} />;
}

const ConfirmButton = () => {
  // const { client, setConnectModal } = useWalletContext();
  const currentAccount = useCurrentAccount();
  // const notConnected = !currentAccount || !currentAccount?.address;

  const { swap } = useSwap();

  const { swapLoading, swapPair, balances, swapRouteResult } = useSwapStore();

  const priceImpact = swapRouteResult.priceImpact;

  const priceImpactRaw = BigNumber(priceImpact).div(100);

  function insufficientBalance() {
    return BigNumber(swapPair.native.amount || '0').gt(balances?.[swapPair.native?.denom || '']?.available || 0);
  }

  const isDisabled = () => {
    return (
      insufficientBalance() ||
      !swapStore.swapPair.native?.amount ||
      !swapStore.swapPair.remote?.amount ||
      parseFloat(swapStore.swapPair.native?.amount) <= 0 ||
      parseFloat(swapStore.swapPair.remote?.amount) <= 0 ||
      swapLoading ||
      BigNumber(priceImpactRaw || '0').gt(0.5)
    );
  };

  const buttonText =
    !swapPair?.native?.denom || !swapPair?.remote?.denom
      ? 'Select a token'
      : BigNumber(swapPair?.native?.amount).eq(0)
      ? 'Enter an amount'
      : insufficientBalance()
      ? 'Insufficient Amount'
      : BigNumber(priceImpactRaw).gt(0.5)
      ? 'Price Impact >50%'
      : swapLoading
      ? ''
      : 'Swap';
  return (
    <Button
      full
      text={buttonText}
      preset="primary"
      disabled={isDisabled()}
      icon={swapLoading ? 'loading' : undefined}
      onClick={async () => {
        if (!isDisabled()) {
          swap();
        }
      }}
    />
  );
};

export default function SwapTabScreen() {
  // const { swapPair, balances } = useSwapStore();
  const {
    tokenModalShow,
    balances,
    swapRouteResult,
    hoverExchange,
    swapPair,
    responseLoading,
    modalTokenType,
    searchTokenValue,
    showValidDetail
  } = useSwapStore();
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);
  const currentKeyring = useCurrentKeyring();

  useSwapSimulation();
  useGetAllPools();
  // const networkType = useNetworkType();
  // const isInTab = useExtensionIsInTab();
  const validResult =
    swapPair?.native?.denom &&
    swapPair?.remote?.denom &&
    BigNumber(swapPair?.native?.amount || 0).gt(0) &&
    BigNumber(swapPair?.remote?.amount || 0).gt(0) &&
    swapPair.remote.denom !== swapPair.native.denom &&
    !responseLoading &&
    swapRouteResult?.pools?.length &&
    swapRouteResult?.pools?.length > 0;
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swapStore.showValidDetail = validResult;
  }, [validResult]);

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

  return (
    <>
      <Layout
        style={{
          display: !tokenModalShow ? 'flex' : 'none!important'
        }}>
        <Header
          LeftComponent={
            <>
              <Image
                onClick={() => {
                  navigate('/settings');
                }}
                src="/images/icons/main/menu-icon.svg"
                size={fontSizes.xxl}
              />
            </>
          }
          title={
            currentKeyring.type === KEYRING_TYPE.HdKeyring || currentKeyring.type === KEYRING_TYPE.KeystoneKeyring ? (
              <AccountSelect />
            ) : (
              ''
            )
          }
          // RightComponent={<Image src="/images/icons/main/menu-icon.svg" size={fontSizes.xxl} />}
          RightComponent={''}
          // onClickRight={() => {
          //   navigate('/settings');
          // }}
        />
        <Content classname={'hide-scrollbar'}>
          <InitBalance></InitBalance>

          <Column
            relative
            style={{
              gap: '6px'
            }}>
            {/*<div style={{*/}
            {/*  position: 'relative',*/}
            {/*  top: 26,*/}
            {/*  left: 10,*/}
            {/*  fontWeight: 700,*/}
            {/*}}>*/}
            {/*  Swap*/}
            {/*</div>*/}
            <Column mt={'max'} px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  From
                </div>

                <NativeBalance />
              </Row>

              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '20px 0px'
                }}>
                <NativeInput />

                <TokenCurrent
                  value={swapPair.native}
                  setShow={() => {
                    swapStore.tokenModalShow = true;
                    swapStore.modalTokenType = 'native';
                  }}
                />
              </Row>

              <NativePrice />
            </Column>
            <Row
              relative
              style={{
                top: 0
              }}>
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
                  swapStore.hoverExchange = true;
                }}
                onMouseLeave={() => {
                  swapStore.hoverExchange = false;
                }}
                onClick={() => {
                  const nativePair = swapStore.swapPair.native;

                  const remotePair = swapStore.swapPair.remote;

                  swapStore.swapPair.native = {
                    ...remotePair,
                    amount: '1'
                  };

                  swapStore.swapPair.remote = {
                    ...nativePair,
                    amount: ''
                  };
                }}>
                <Icon size={hoverExchange ? 22 : 11} icon={hoverExchange ? 'swap-down-hover' : 'swap-down-icon'}></Icon>
                {/*{!hoverExchange ? <ExchangeDefaultSVG color="black" /> : <ExchangeSVG />}*/}
              </div>
            </Row>

            <Column mt={'zero'} px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  To
                </div>
                <RemoteBalance />
              </Row>

              <Row
                itemsCenter
                justifyBetween
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '20px 0px',
                  gap: '5px'
                }}>
                <RemoteInput />

                <TokenCurrent
                  value={swapPair.remote}
                  setShow={() => {
                    swapStore.modalTokenType = 'remote';
                    swapStore.tokenModalShow = true;
                  }}
                />
              </Row>

              <RemotePrice />
            </Column>

            <Row mt={'xl'} full>
              <ConfirmButton />
            </Row>
            {showValidDetail && (
              <div className={'mt-[16px] mb-[32px] rounded-[8px] bg-[#1E1E1F]'}>
                <div className="px-[16px] py-[14px]">
                  <SwapDetail />
                </div>
              </div>
            )}
          </Column>
        </Content>
        <Footer px="zero" py="zero">
          <NavTabBar tab="swap" />
        </Footer>
      </Layout>
      <SwapSelectToken
        open={tokenModalShow}
        onClose={() => (swapStore.tokenModalShow = false)}
        onSelect={(token: Coin) => {
          swapStore.swapPair[modalTokenType as 'native' | 'remote'] = {
            ...token,
            amount: modalTokenType === 'remote' ? '' : '1'
          };
          swapStore.tokenModalShow = false;
        }}
        assetsList={SWAP_ASSETS.assets}
        popularList={SWAP_ASSETS.assets}
        onSearch={(value: string) => {
          swapStore.searchTokenValue = value;
        }}
        searchValue={searchTokenValue}
        curTokenDenom={swapPair[modalTokenType as 'native' | 'remote']?.denom}
      />
    </>
  );
}
