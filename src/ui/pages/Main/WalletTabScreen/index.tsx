import { useEffect, useState } from 'react';

import { AddressFlagType, CHAINS_ENUM, KEYRING_TYPE } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { ButtonGroup, Column, Footer, Header, Image, Layout, Row, Text } from '@/ui/components';
import { DisableUnconfirmedsPopover } from '@/ui/components/DisableUnconfirmedPopover';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { NoticePopover } from '@/ui/components/NoticePopover';
import { UpgradePopover } from '@/ui/components/UpgradePopover';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import { useGetAccountBalanceByUSD } from '@/ui/hooks/useGetBalance';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useBlockstreamUrl, useSkipVersionCallback, useVersionInfo, useWalletConfig } from '@/ui/state/settings/hooks';
import { useAssetTabKey } from '@/ui/state/ui/hooks';
import { fontSizes } from '@/ui/theme/font';
// import walletLogo from '/images/logo/wallet-logo.png';
import { getTruncate, useWallet } from '@/ui/utils';

import { BuyBTCModal } from '../../BuyBTC/BuyBTCModal';
import { useNavigate } from '../../MainRoute';
import BtcTokenList from './BtcTokenList';
import SideTokenList from './SideTokenList';

export default function WalletTabScreen() {
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const { accountBalanceByUSD } = useGetAccountBalanceByUSD();

  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();

  const wallet = useWallet();
  const [connected, setConnected] = useState(false);

  const dispatch = useAppDispatch();
  const assetTabKey = useAssetTabKey();

  const skipVersion = useSkipVersionCallback();

  const walletConfig = useWalletConfig();
  const versionInfo = useVersionInfo();

  const [showSafeNotice, setShowSafeNotice] = useState(false);
  const [showDisableUnconfirmedUtxoNotice, setShowDisableUnconfirmedUtxoNotice] = useState(false);

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

  const [currentTab, setCurrentTab] = useState<CHAINS_ENUM>(CHAINS_ENUM.SIDE);
  const blockstreamUrl = useBlockstreamUrl();

  const [buyBtcModalVisible, setBuyBtcModalVisible] = useState(false);
  const [isHoveredMoney, setIsHoveredMoney] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHoveredMoney(true);
  };

  const handleMouseLeave = () => {
    setIsHoveredMoney(false);
  };
  return (
    <Layout style={{
      minHeight: '600px',
      height: '600px',
    }}>
      <Header
        LeftComponent={
          // connected ? (
          //   <Row
          //     itemsCenter
          //     onClick={() => {
          //       navigate('ConnectedSitesScreen');
          //     }}>
          //     <Text text="·" color="green" size="xxl" />
          //     <Text text="Dapp Connected" size="xxs" />
          //   </Row>
          // ) : (
          //   <Image src="/images/logo/wallet-logo-white.svg" size={fontSizes.xxl} />
          // )
          <>
            <Image onClick={() => {
              navigate('SettingsTabScreen');
            }} src="/images/icons/main/menu-icon.svg" size={fontSizes.xxl} />
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
        //   // navigate('SettingsTabScreen');
        // }}
      />
      <Column
        classname={''}
        style={{
          flex: 1,
          gap: '0px',
          overflow: 'auto',
          cursor: 'pointer'
        }}>
        <Row
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          justifyCenter
          style={{
            marginTop: '36px',
            gap: '12px',
            alignItems: 'flex-end'
          }}>
          {balanceVisible ? (
            <Row
              justifyCenter
              style={{
                gap: 0,
                // alignItems: 'flex-end'
              }}>
              <Text
                text="$"
                style={{
                  fontSize: '38px',
                  fontWeight: 400,
                  lineHeight: '32px'
                }}
              />
              <Text
                text={getTruncate(accountBalanceByUSD, 2)}
                style={{
                  fontSize: '38px',
                  fontWeight: 500,
                  lineHeight: '32px'
                }}
              />
            </Row>
          ) : (
            <Text
              text="******"
              style={{
                fontSize: '38px',
                fontWeight: 500,
                lineHeight: '32px',
                position: 'relative',
                top: '12px',
              }}
            />
          )}

          <span  style={{
            display: 'inline-box',
            width: isHoveredMoney ? '20px' : '0',
            opacity: isHoveredMoney ? 1 : 0,
            transition: 'all 0.3s ease-in',
          }} onClick={() => setBalanceVisible(!balanceVisible)}>
            <Image src={ balanceVisible ? '/images/icons/eye-off-2.svg' : '/images/icons/eye-white.svg'} size={20} />
          </span>
        </Row>

        <Row
          style={{
            justifyContent: 'center',
            gap: '50px',
            marginTop: '20px'
          }}>
          <Column
            onClick={() => {
              navigate('SelectNetworkScreen', { type: 'receive' });
            }}
            itemsCenter>
            <Image src="/images/icons/main/recevie-icon.svg" size={fontSizes.xxxl} />
            <Text
              text="Receive"
              style={{
                color: '#fff',
                fontSize: '14px',
                lineHeight: '17px',
                opacity: 0.8
              }}
            />
          </Column>

          <Column
            onClick={() => {
              navigate('SelectNetworkScreen', { type: 'send' });
            }}
            itemsCenter>
            <Image src="/images/icons/main/send-icon.svg" size={fontSizes.xxxl} />
            <Text
              text="Send"
              style={{
                color: '#fff',
                fontSize: '14px',
                lineHeight: '17px',
                opacity: 0.8
              }}
            />
          </Column>

          {/* <Column
            onClick={() => {
              setBuyBtcModalVisible(true);
            }}
            itemsCenter>
            <Image src="/images/icons/main/buy-icon.svg" size={fontSizes.iconxLarge} />
            <Text
              text="Buy"
              style={{
                color: '#fff',
                fontSize: '14px',
                lineHeight: '17px',
                opacity: 0.8
              }}
            />
          </Column> */}
        </Row>

        <Row
          style={{
            marginTop: '20px',
            marginBottom: '20px'
          }}
          justifyCenter>
          <ButtonGroup
            size="big"
            rowProps={{
              justifyCenter: true
            }}
            list={[
              {
                key: CHAINS_ENUM.SIDE,
                label: 'Side Chain'
              },
              {
                key: CHAINS_ENUM.BTC,
                label: 'Bitcoin'
              }
            ]}
            onChange={(value) => {
              const tab = value as CHAINS_ENUM;
              setCurrentTab(tab);
            }}
            value={currentTab}
          />
        </Row>

        <Column
          style={{
            padding: '0 16px',
            marginBottom: '20px',
            gap: '0px'
          }}>
          {/*<Text*/}
          {/*  text="Tokens"*/}
          {/*  style={{*/}
          {/*    marginTop: '20px',*/}
          {/*    marginBottom: '20px',*/}
          {/*    fontSize: '16px',*/}
          {/*    fontWeight: 600*/}
          {/*  }}*/}
          {/*/>*/}
          {currentTab === CHAINS_ENUM.SIDE ? <SideTokenList /> : <BtcTokenList />}
        </Column>
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
      <Footer px="zero" py="zero">
        <NavTabBar tab="home" />
      </Footer>
    </Layout>
  );
}
