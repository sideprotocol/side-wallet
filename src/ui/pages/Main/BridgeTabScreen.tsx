import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { SIDE_CHAINID_MAINNET, SIDE_CHAINID_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import BridgeSelectToken from '@/ui/components/Bridge/BridgeSelectToken';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { Icon } from '@/ui/components/Icon';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import { useGetSideBalanceList } from '@/ui/hooks/useGetBalance';
import MainHeader from '@/ui/pages/Main/MainHeader';
import services from '@/ui/services';
import { useAccountBalance, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridge, useRuneBalanceV2, useRuneBridge } from '@/ui/state/bridge/hook';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSafeBalance } from '@/ui/state/transactions/hooks';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { swapStore, useSwapStore } from '@/ui/stores/SwapStore';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

const MIN_SAT = '0.001';
export default function BridgeTabScreen() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const currentKeyring = useCurrentKeyring();
  const wallet = useWallet();

  const currentAccount = useCurrentAccount();
  const { balanceList: assets } = useGetSideBalanceList(currentAccount?.address);
  const { bridgeAmount, from, to, loading, selectTokenModalShow, base } = useBridgeStore();
  // safe btc balance
  const safeBalance = useSafeBalance();
  // const { data: assets } = useGetSideTokenList();
  const bridgeAsset = assets.find((a) => a.denom == base);

  const isBtcBridge = base === 'sat';

  // const runeBalance = useRuneBalance(base);
  const runeBalance = useRuneBalanceV2(base);

  const accountBalance = useAccountBalance();
  const btcBalance = accountBalance?.amount;
  const isDeposit = (to?.name || '').includes('Bitcoin');

  console.log('assets: ', assets, accountBalance);
  const lessThanMinSat = isBtcBridge && BigNumber(bridgeAmount).lt(MIN_SAT) && isDeposit;

  const balance = isBtcBridge ? btcBalance : runeBalance;

  useEffect(() => {
    bridgeStore.balance = balance;

    const init = async () => {
      // await bridgeStore.setBalance(balance);
      const _utxos = await services.unisat.getBTCUtxos({ address: currentAccount?.address });
      console.log('_utxos: ', _utxos);
    };
    init();
  }, [balance]);
  const { hoverExchange } = useSwapStore();
  const { bridge } = useBridge();

  const { bridge: bridgeRune } = useRuneBridge();

  const networkType = useNetworkType();

  console.log('bridgeAsset: ', bridgeAsset);
  // const chainId = networkType === NetworkType.MAINNET ? SIDE_CHAINID_MAINNET : SIDE_CHAINID_TESTNET;
  const chainId = networkType === NetworkType.TESTNET ? SIDE_CHAINID_TESTNET : SIDE_CHAINID_MAINNET;

  const disabled =
    !bridgeAmount ||
    Number(bridgeAmount) === 0 ||
    BigNumber(bridgeAmount || '0').gt(balance || '0') ||
    loading ||
    lessThanMinSat;

  useEffect(() => {
    // const chainId = networkType === NetworkType.MAINNET ? SIDE_CHAINID_MAINNET : SIDE_CHAINID_TESTNET;
    const chainId = networkType === NetworkType.TESTNET ? SIDE_CHAINID_TESTNET : SIDE_CHAINID_MAINNET;

    // if (networkType === NetworkType.MAINNET) {
    if (networkType === NetworkType.TESTNET) {
      bridgeStore.from = {
        id: 'LIVENET',
        name: 'Bitcoin Signet',
        logo: '/images/icons/btc.svg'
      };
      bridgeStore.to = {
        id: chainId,
        name: 'Side Chain',
        // logo: '/images/icons/btc.svg'
        logo: '/images/logo/wallet-logo-white-v2.png'
      };
    } else {
      bridgeStore.from = {
        id: chainId,
        name: 'SIDE devnet',
        logo: '/images/logo/wallet-logo-white-v2.svg'
      };
      bridgeStore.to = {
        id: 'mainnet',
        name: 'Bitcoin',
        logo: '/images/icons/btc.svg'
      };
    }
  }, [networkType, chainId]);

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
    <Layout>
      <MainHeader title={''} />
      <Content classname={'hide-scrollbar'}>
        <Row full relative rounded={true}>
          <Column
            full
            relative
            style={{
              gap: '5px'
            }}>
            <Column mt={'medium'} px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  From
                </div>
              </Row>

              <Row
                itemsCenter
                gap={'zero'}
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '10px 0px'
                }}>
                <Image size={28} src={from.logo} />
                <span
                  style={{
                    fontSize: '14px',
                    paddingLeft: '5px'
                  }}>
                  {from.name}
                </span>
              </Row>
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
                  swapStore.hoverExchange = true;
                }}
                onMouseLeave={() => {
                  swapStore.hoverExchange = false;
                }}
                onClick={() => {
                  const from = bridgeStore.from;
                  bridgeStore.from = to;
                  bridgeStore.to = from;
                }}>
                {/*<Icon icon={'swap-down-icon'}></Icon>*/}
                <Icon size={hoverExchange ? 22 : 11} icon={hoverExchange ? 'swap-down-hover' : 'swap-down-icon'}></Icon>
              </div>
            </Row>

            <Column px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  To
                </div>
              </Row>

              <Row
                itemsCenter
                gap={'zero'}
                style={{
                  height: '32px',
                  borderRadius: '100px',
                  padding: '10px 0px'
                }}>
                <Image size={28} src={to.logo} />
                <span
                  style={{
                    fontSize: '14px',
                    paddingLeft: '5px'
                  }}>
                  {to.name}
                </span>
              </Row>
            </Column>

            <Row justifyBetween itemsCenter mt={'smm'} px={'xl'} py={'medium'} rounded={true} gap={'md'} bg={'swapBg'}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#7D7D7D'
                }}>
                Transfer
              </div>

              <div className={'flex flex-col gap-[8px]'}>
                <div
                  className={'hover:bg-[#000]/70 bg-[#292828]/50 border-[1px] border-solid border-[#fff]/10 bg-[#000]'}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 8px',
                    cursor: 'pointer',
                    borderRadius: '24px',
                    minWidth: 'max-content'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // setShow(true);
                    bridgeStore.selectTokenModalShow = true;
                  }}>
                  <ImageIcon
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '4px',
                      borderRadius: '20px'
                    }}
                    url={bridgeAsset?.asset?.logo || bridgeAsset?.asset?.logo}
                  />
                  <div
                    style={{
                      fontSize: '14px',
                      paddingRight: '6px',
                      whiteSpace: 'nowrap',
                      maxWidth: '72px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}>
                    {bridgeAsset?.asset?.symbol || bridgeAsset?.asset?.symbol || bridgeAsset?.denom || 'Select Token'}
                  </div>
                  {/*<Icon type="" />*/}
                  <svg
                    style={{
                      width: '16px',
                      height: '16px',
                      flexShrink: '0'
                    }}>
                    <use xlinkHref={'#side-down'} />
                  </svg>
                </div>
              </div>
            </Row>

            <Column mt={'smm'} px={'xl'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  Amount
                </div>

                <div className={'flex gap-[5px] items-center'}>
                  <img className={'w-[14px] h-[14px]'} src={WalletIcon} alt="" />

                  <Text
                    size="sm"
                    style={
                      {
                        // paddingLeft: '3px'
                      }
                    }>
                    {balance}
                  </Text>
                </div>
              </Row>

              <Row
                relative
                itemsCenter
                rounded={true}
                style={{
                  height: '50px',
                  background: '#09090A'
                }}>
                <Row
                  itemsCenter
                  gap={'zero'}
                  style={{
                    height: '50px',
                    borderRadius: '100px',
                    padding: '20px 10px'
                  }}>
                  <CoinInput
                    size={14}
                    coin={{
                      amount: bridgeAmount,
                      denom: ''
                    }}
                    onChange={(value) => {
                      bridgeStore.bridgeAmount = value;
                    }}
                  />
                  <div
                    className={'hover:bg-[#0dd4c3]/10'}
                    style={{
                      padding: '8px',
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#0DD4C3',
                      fontSize: '14px',
                      // background: 'rgba(13, 212, 195, 0.10)',
                      background: '#0DD4C31A',
                      cursor: 'pointer',
                      borderRadius: '8px'
                    }}
                    onClick={() => {
                      bridgeStore.bridgeAmount = balance;
                    }}>
                    Max
                  </div>
                </Row>
              </Row>
            </Column>

            {/*<ConfirmButton />*/}
            <Row mt={'xl'} full>
              <Button
                onClick={() => {
                  if (base === 'sat') {
                    navigate('BridgeConfirmTabScreen');
                  } else {
                    bridgeRune();
                  }
                }}
                disabled={disabled}
                full
                text={lessThanMinSat ? 'Minimum amount is 0.001 BTC' : 'Bridge'}
                preset="primary"
              />
            </Row>
          </Column>
        </Row>

        <BridgeSelectToken
          open={selectTokenModalShow}
          onClose={() => {
            bridgeStore.selectTokenModalShow = false;
          }}
        />
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
