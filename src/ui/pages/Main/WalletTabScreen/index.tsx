import { Tooltip } from 'antd';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import { AddressFlagType, KEYRING_TYPE } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { checkAddressFlag } from '@/shared/utils';
import { Column, Content, Footer, Header, Image, Layout, Row, Text } from '@/ui/components';
import { DisableUnconfirmedsPopover } from '@/ui/components/DisableUnconfirmedPopover';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { NoticePopover } from '@/ui/components/NoticePopover';
import { UpgradePopover } from '@/ui/components/UpgradePopover';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useAccountBalance, useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import {
  useBlockstreamUrl,
  useNetworkType,
  useSkipVersionCallback,
  useVersionInfo,
  useWalletConfig
} from '@/ui/state/settings/hooks';
import { useFetchUtxosCallback, useSafeBalance } from '@/ui/state/transactions/hooks';
import { useAssetTabKey, useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { AssetTabKey } from '@/ui/state/ui/reducer';
import { fontSizes } from '@/ui/theme/font';
// import walletLogo from '/images/logo/wallet-logo.png';
import { amountToSatoshis, satoshisToAmount, useWallet } from '@/ui/utils';

import { BuyBTCModal } from '../../BuyBTC/BuyBTCModal';
import { useNavigate } from '../../MainRoute';
import { AtomicalsTab } from './AtomicalsTab';
import BtcTokenList from './BtcTokenList';
import { OrdinalsTab } from './OrdinalsTab';
import { RunesList } from './RunesList';
import SideTokenList from './SideTokenList';

const $noBreakStyle: CSSProperties = {
  whiteSpace: 'nowrap',
  wordBreak: 'keep-all'
};

interface Asset {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
}

export default function WalletTabScreen() {
  const navigate = useNavigate();

  const accountBalance = useAccountBalance();
  const networkType = useNetworkType();
  const isTestNetwork = networkType === NetworkType.TESTNET;

  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();
  const balanceValue = useMemo(() => {
    if (accountBalance.amount === '0') {
      return '--';
    } else {
      return accountBalance.amount;
    }
  }, [accountBalance.amount]);

  const wallet = useWallet();
  const [connected, setConnected] = useState(false);

  const dispatch = useAppDispatch();
  const assetTabKey = useAssetTabKey();

  const skipVersion = useSkipVersionCallback();

  const walletConfig = useWalletConfig();
  const versionInfo = useVersionInfo();

  const [showSafeNotice, setShowSafeNotice] = useState(false);
  const [showDisableUnconfirmedUtxoNotice, setShowDisableUnconfirmedUtxoNotice] = useState(false);

  const fetchUtxos = useFetchUtxosCallback();
  const ref = useRef<{ fetchedUtxo: { [key: string]: { loading: boolean } } }>({
    fetchedUtxo: {}
  });
  const [loadingFetch, setLoadingFetch] = useState(false);

  const safeBalance = useSafeBalance();
  const avaiableSatoshis = useMemo(() => {
    return amountToSatoshis(safeBalance);
  }, [safeBalance]);

  const totalSatoshis = amountToSatoshis(accountBalance.amount);
  const unavailableSatoshis = totalSatoshis - avaiableSatoshis;
  const avaiableAmount = safeBalance;
  const unavailableAmount = satoshisToAmount(unavailableSatoshis);
  const totalAmount = satoshisToAmount(totalSatoshis);

  const addressSummary = useAddressSummary();

  useEffect(() => {
    if (currentAccount.address === addressSummary.address) {
      if (addressSummary.arc20Count > 0 || addressSummary.runesCount > 0) {
        if (!checkAddressFlag(currentAccount.flag, AddressFlagType.CONFIRMED_UTXO_MODE)) {
          if (!checkAddressFlag(currentAccount.flag, AddressFlagType.DISABLE_AUTO_SWITCH_CONFIRMED)) {
            wallet.addAddressFlag(currentAccount, AddressFlagType.CONFIRMED_UTXO_MODE).then((account) => {
              dispatch(accountActions.setCurrent(account));
            });
            setShowDisableUnconfirmedUtxoNotice(true);
          }
        }
      }
    }
  }, [addressSummary, currentAccount]);

  useEffect(() => {
    const run = async () => {
      const show = await wallet.getShowSafeNotice();
      setShowSafeNotice(show);

      const activeTab = await getCurrentTab();
      if (!activeTab) return;
      const site = await wallet.getCurrentConnectedSite(activeTab.id);
      if (site) {
        setConnected(site.isConnected);
      }
    };
    run();
  }, []);

  const tabItems = [
    {
      key: AssetTabKey.ORDINALS,
      label: 'Ordinals',
      children: <OrdinalsTab />
    },
    {
      key: AssetTabKey.ATOMICALS,
      label: 'Atomicals',
      children: <AtomicalsTab />
    },
    {
      key: AssetTabKey.RUNES,
      label: 'Runes',
      children: <RunesList />
    }
  ];

  const [currentTab, setCurrentTab] = useState('side');
  const blockstreamUrl = useBlockstreamUrl();
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();

  const [buyBtcModalVisible, setBuyBtcModalVisible] = useState(false);
  const assets: Asset[] = [
    {
      icon: '/images/img/btc.png',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: '1',
      value: '1'
    }
  ];
  return (
    <Layout
      style={{
        backgroundColor: '#09090A'
      }}>
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
              style={{
                marginLeft: 10
              }}
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
          navigate('SettingsTabScreen');
        }}
      />

      {/*<Row justifyBetween>*/}
      {/*  /!*<Icon icon={'/images/logo/wallet-logo.png'} color="white" />*!/*/}
      {/*  {currentKeyring.type === KEYRING_TYPE.HdKeyring && <AccountSelect />}*/}
      {/*</Row>*/}

      <Content
        style={{
          backgroundColor: '#09090A'
        }}>
        <Column gap="xl">
          {/*{currentKeyring.type === KEYRING_TYPE.HdKeyring && <AccountSelect />}*/}
          {/*{currentKeyring.type === KEYRING_TYPE.KeystoneKeyring && <AccountSelect />}*/}
          {isTestNetwork && <Text text="Bitcoin Testnet activated." color="danger" textCenter />}

          {walletConfig.statusMessage && <Text text={walletConfig.statusMessage} color="danger" textCenter />}

          <Tooltip
            placement={'bottom'}
            title={
              !loadingFetch ? (
                <>
                  <Row justifyBetween>
                    <span style={$noBreakStyle}>{'Available '}</span>
                    <span style={$noBreakStyle}>{` ${avaiableAmount} BTC`}</span>
                  </Row>
                  <Row justifyBetween>
                    <span style={$noBreakStyle}>{'Unavailable '}</span>
                    <span style={$noBreakStyle}>{` ${unavailableAmount} BTC`}</span>
                  </Row>
                  <Row justifyBetween>
                    <span style={$noBreakStyle}>{'Total '}</span>
                    <span style={$noBreakStyle}>{` ${totalAmount} BTC`}</span>
                  </Row>
                </>
              ) : (
                <>
                  <Row justifyBetween>
                    <span style={$noBreakStyle}>{'Available '}</span>
                    <span style={$noBreakStyle}>{'loading...'}</span>
                  </Row>
                  <Row justifyBetween>
                    <span style={$noBreakStyle}>{'Unavailable '}</span>
                    <span style={$noBreakStyle}>{'loading...'}</span>
                  </Row>
                  <Row justifyBetween>
                    <span style={$noBreakStyle}>{'Total '}</span>
                    <span style={$noBreakStyle}>{` ${totalAmount} BTC`}</span>
                  </Row>
                </>
              )
            }
            onOpenChange={(v) => {
              if (!ref.current.fetchedUtxo[currentAccount.address]) {
                ref.current.fetchedUtxo[currentAccount.address] = { loading: true };
                setLoadingFetch(true);
                fetchUtxos().finally(() => {
                  ref.current.fetchedUtxo[currentAccount.address].loading = false;
                  setLoadingFetch(false);
                });
              }
            }}
            overlayStyle={{
              fontSize: fontSizes.xs
            }}>
            <div>
              <Text text={balanceValue + '  BTC'} preset="title-bold" textCenter size="xxxl" />
            </div>
          </Tooltip>
          <Row itemsCenter justifyCenter>
            <Row
              style={{
                width: '93%'
              }}
              justifyBetween>
              <Column
                onClick={() => {
                  navigate('SelectNetworkScreen');
                }}
                itemsCenter>
                <Image src="/images/icons/main/recevie-icon.svg" size={fontSizes.iconxLarge} />
                Receive
              </Column>

              <Column
                onClick={() => {
                  resetUiTxCreateScreen();
                  navigate('TxCreateScreen');
                }}
                itemsCenter>
                <Image src="/images/icons/main/send-icon.svg" size={fontSizes.iconxLarge} />
                Send
              </Column>

              <Column
                onClick={() => {
                  setBuyBtcModalVisible(true);
                }}
                itemsCenter>
                <Image src="/images/icons/main/buy-icon.svg" size={fontSizes.iconxLarge} />
                Buy
              </Column>
            </Row>
          </Row>

          <Row
            style={{
              margin: '20px 0'
            }}
            itemsCenter
            justifyCenter>
            <Row
              style={{
                width: '228px',
                borderRadius: '20px',
                backgroundColor: '#1E1E1F',
                fontSize: '14px'
              }}
              itemsCenter
              justifyCenter>
              <Row
                justifyCenter
                onClick={() => {
                  setCurrentTab('side');
                }}
                style={{
                  width: '114px',
                  borderRadius: '20px',
                  backgroundColor: currentTab === 'side' ? '#404045' : '',
                  padding: '10px 20px'
                }}>
                Side Chain
              </Row>
              <Row
                justifyCenter
                onClick={() => {
                  setCurrentTab('btc');
                }}
                style={{
                  width: '114px',
                  backgroundColor: currentTab === 'btc' ? '#404045' : '',
                  borderRadius: '20px',
                  padding: '10px 20px'
                }}>
                Bitcoin
              </Row>
            </Row>
          </Row>

          <Row
            onClick={() => {
              navigate('ConnectedSitesScreen');
            }}>
            <Text text="Tokens" size="xxl" />
          </Row>

          <Column justifyBetween>{currentTab === 'side' ? <SideTokenList /> : <BtcTokenList />}</Column>

          {/*<Tabs*/}
          {/*  size={'small'}*/}
          {/*  defaultActiveKey={assetTabKey as unknown as string}*/}
          {/*  activeKey={assetTabKey as unknown as string}*/}
          {/*  items={tabItems as unknown as any[]}*/}
          {/*  onTabClick={(key) => {*/}
          {/*    dispatch(uiActions.updateAssetTabScreen({ assetTabKey: key as unknown as AssetTabKey }));*/}
          {/*  }}*/}
          {/*/>*/}

          {/*{tabItems[assetTabKey].children}*/}
        </Column>

        {showSafeNotice && (
          <NoticePopover
            onClose={() => {
              wallet.setShowSafeNotice(false);
              setShowSafeNotice(false);
            }}
          />
        )}
        {!versionInfo.skipped && (
          <UpgradePopover
            onClose={() => {
              skipVersion(versionInfo.newVersion);
            }}
          />
        )}

        {showDisableUnconfirmedUtxoNotice && (
          <DisableUnconfirmedsPopover onClose={() => setShowDisableUnconfirmedUtxoNotice(false)} />
        )}
        {buyBtcModalVisible && (
          <BuyBTCModal
            onClose={() => {
              setBuyBtcModalVisible(false);
            }}
          />
        )}
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="home" />
      </Footer>
    </Layout>
  );
}
