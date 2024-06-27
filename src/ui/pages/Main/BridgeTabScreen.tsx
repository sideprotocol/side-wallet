import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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


export default function SettingsTabScreen() {
  const navigate = useNavigate();
  //
  // const networkType = useNetworkType();
  //
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
          {/*<InitBalance></InitBalance>*/}

          <Column full relative>
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
                }}
              >
                <Image size={36} src={'/images/icons/btc.svg'} />
                <span style={{
                  fontSize: '14px'
                }}>Bitcoin Signet</span>
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
                }}
              >
                <Icon icon={'swap-down-icon'}></Icon>
                {/*{!hoverExchange ? <ExchangeDefaultSVG color="black" /> : <ExchangeSVG />}*/}
              </div>
            </Row>

            <Row>
              <Column full
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
                  }}
                >
                  <Image size={36} src={'/images/icons/btc.svg'} />
                  <span style={{
                    fontSize: '14px'
                  }}>Bitcoin Signet</span>
                </Row>

              </Column>
            </Row>

            <Row mt={'md'}>
              <Column full
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
                    Send
                  </div>
                </Row>

                <Row itemsCenter rounded={true} style={{
                  height: '50px',
                  background: '#09090A',
                }} full>
                  <Row
                    itemsCenter
                    gap={'zero'}
                    style={{
                      height: '50px',
                      borderRadius: '100px',
                      padding: '20px 10px'
                    }}
                  >
                    <Image size={36} src={'/images/icons/btc.svg'} />
                    <span style={{
                      fontSize: '14px'
                    }}>BTC</span>
                  </Row>
                </Row>

              </Column>
            </Row>

            <Row mt={'md'}>
              <Column full
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
                    Amount
                  </div>
                </Row>

                <Row relative itemsCenter rounded={true} style={{
                  height: '50px',
                  background: '#09090A',
                }} full>
                  <Row
                    full
                    itemsCenter
                    gap={'zero'}
                    style={{
                      height: '50px',
                      borderRadius: '100px',
                      padding: '20px 10px'
                    }}
                  >
                    <CoinInput
                      size={14}
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
                    <div style={{
                      padding: '8px',
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#0DD4C3',
                      fontSize: '14px',
                      background: 'rgba(13, 212, 195, 0.10)'
                    }}>
                      Max
                    </div>
                  </Row>
                </Row>

              </Column>
            </Row>

            {/*<ConfirmButton />*/}
            <Row mt={'xl'} full>
              <Button full text="Bridge"
                      preset="primary"
                      onClick={async () => {
                        alert('Bridge');
                      }} />
            </Row>

            {/*{showValidDetail && <SwapDetail />}*/}

          </Column>
        </Row>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
