import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { KEYRING_TYPE, SIDE_CHAINID_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { Column, Content, Footer, Header, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { Icon } from '@/ui/components/Icon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useBtcBalance } from '@/ui/state/bridge/hook';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { fontSizes } from '@/ui/theme/font';
import { useWallet } from '@/ui/utils';

import { SIDE_CHAINID_MAINNET } from '../../../shared/constant/index';
import { useBridge } from '../../state/bridge/hook';

export default function BridgeTabScreen() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const currentKeyring = useCurrentKeyring();
  const wallet = useWallet();

  const { bridgeAmount, from, to, balance, loading } = useBridgeStore();

  useBtcBalance();

  const { bridge } = useBridge();

  const networkType = useNetworkType();

  const chainId = networkType === NetworkType.MAINNET ? SIDE_CHAINID_MAINNET : SIDE_CHAINID_TESTNET;

  const disabled =
    !bridgeAmount || Number(bridgeAmount) === 0 || BigNumber(bridgeAmount || '0').gt(balance || '0') || loading;

  useEffect(() => {
    const chainId = networkType === NetworkType.MAINNET ? SIDE_CHAINID_MAINNET : SIDE_CHAINID_TESTNET;

    if (networkType === NetworkType.MAINNET) {
      bridgeStore.from = {
        id: chainId,
        name: 'SIDE devnet',
        logo: '/images/logo/wallet-logo-white.svg'
      };
      bridgeStore.to = {
        id: 'mainnet',
        name: 'Bitcoin',
        logo: '/images/icons/btc.svg'
      };
    } else {
      bridgeStore.from = {
        id: chainId,
        name: 'SIDE devnet',
        logo: '/images/logo/wallet-logo-white.svg'
      };
      bridgeStore.to = {
        id: 'LIVENET',
        name: 'Bitcoin Signet',
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
        <Row full relative rounded={true}>
          <Column full relative>
            <Column mt={'xl'} px={'xl'} py={'xl'} rounded={true} gap={'md'} bg={'swapBg'}>
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
                <Image size={36} src={from.logo} />
                <span
                  style={{
                    fontSize: '14px'
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
                onClick={() => {
                  const from = bridgeStore.from;
                  bridgeStore.from = to;
                  bridgeStore.to = from;
                }}>
                <Icon icon={'swap-down-icon'}></Icon>
              </div>
            </Row>

            <Row>
              <Column full px={'xl'} py={'xl'} rounded={true} gap={'md'} bg={'swapBg'}>
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
                  <Image size={36} src={to.logo} />
                  <span
                    style={{
                      fontSize: '14px'
                    }}>
                    {to.name}
                  </span>
                </Row>
              </Column>
            </Row>

            <Row mt={'md'}>
              <Column full px={'xl'} py={'xl'} rounded={true} gap={'md'} bg={'swapBg'}>
                <Row justifyBetween itemsCenter>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#7D7D7D'
                    }}>
                    Send
                  </div>
                </Row>

                <Row
                  itemsCenter
                  rounded={true}
                  style={{
                    height: '50px',
                    background: '#09090A'
                  }}
                  full>
                  <Row
                    itemsCenter
                    gap={'zero'}
                    style={{
                      height: '50px',
                      borderRadius: '100px',
                      padding: '20px 10px'
                    }}>
                    <Image size={36} src={'/images/img/btc_token.png'} />
                    <span
                      style={{
                        fontSize: '14px'
                      }}
                      className="ml-2">
                      BTC
                    </span>
                  </Row>
                </Row>
              </Column>
            </Row>

            <Row mt={'md'}>
              <Column full px={'xl'} py={'xl'} rounded={true} gap={'md'} bg={'swapBg'}>
                <Row justifyBetween itemsCenter>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#7D7D7D'
                    }}>
                    Amount
                  </div>
                </Row>

                <Row
                  relative
                  itemsCenter
                  rounded={true}
                  style={{
                    height: '50px',
                    background: '#09090A'
                  }}
                  full>
                  <Row
                    full
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
                      style={{
                        padding: '8px',
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#0DD4C3',
                        fontSize: '14px',
                        background: 'rgba(13, 212, 195, 0.10)',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        bridgeStore.bridgeAmount = balance;
                      }}>
                      Max
                    </div>
                  </Row>
                </Row>
              </Column>
            </Row>

            {/*<ConfirmButton />*/}
            <Row mt={'xl'} full>
              <Button
                onClick={() => {
                  bridge();
                }}
                disabled={disabled}
                full
                text="Bridge"
                preset="primary"
              />
            </Row>
          </Column>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
