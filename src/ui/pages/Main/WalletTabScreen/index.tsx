import { useEffect, useState } from 'react';

import { AddressFlagType, CHAINS_ENUM } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { ButtonGroup, Column, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { DisableUnconfirmedsPopover } from '@/ui/components/DisableUnconfirmedPopover';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { NoticePopover } from '@/ui/components/NoticePopover';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import { useGetAccountBalanceByUSD } from '@/ui/hooks/useGetBalance';
import { useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useRuneListV2 } from '@/ui/state/bridge/hook';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useBlockstreamUrl, useSkipVersionCallback, useVersionInfo, useWalletConfig } from '@/ui/state/settings/hooks';
import { useAssetTabKey } from '@/ui/state/ui/hooks';
import { fontSizes } from '@/ui/theme/font';
import { getTruncate, useWallet } from '@/ui/utils';

import { BuyBTCModal } from '../../BuyBTC/BuyBTCModal';
import { useNavigate } from '../../MainRoute';
import MainHeader from '../MainHeader';
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

  // const runeAndBtcTokens = useRuneAndBtcBalances();
  const { tokens: runeList } = useRuneListV2();
  // console.log(`runeList: `, runeList);
  return (
    <Layout
      style={{
        minHeight: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px'
      }}
    >
      <MainHeader title={''} />
      <Column
        classname={'smooth-scroll'}
        style={{
          flex: 1,
          gap: '0px',
          overflow: 'auto',
          cursor: 'pointer'
        }}
      >
        <Row
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          justifyCenter
          style={{
            marginTop: '36px',
            gap: '12px',
            alignItems: 'center'
          }}
        >
          {balanceVisible ? (
            <Row
              justifyCenter
              style={{
                gap: 0
                // alignItems: 'flex-end'
              }}
            >
              <Text
                text="$"
                style={{
                  fontSize: '38px',
                  fontWeight: 400,
                  lineHeight: '32px'
                }}
              />
              <Text
                text={String(getTruncate(accountBalanceByUSD, 2)).split('.')[0]}
                style={{
                  fontSize: '38px',
                  fontWeight: 500,
                  lineHeight: '32px'
                }}
              />
              <Text
                color={'white_muted'}
                text={`.${String(getTruncate(accountBalanceByUSD, 2)).split('.')[1]}`}
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
                top: '6px'
              }}
            />
          )}

          <span
            style={{
              display: 'inline-box',
              width: isHoveredMoney ? '20px' : '0',
              opacity: isHoveredMoney ? 1 : 0,
              transition: 'all 0.2s ease-in'
            }}
            onClick={() => setBalanceVisible(!balanceVisible)}
          >
            <Image src={balanceVisible ? '/images/icons/eye-off-2.svg' : '/images/icons/eye-white.svg'} size={20} />
          </span>
        </Row>

        <Row
          style={{
            justifyContent: 'center',
            gap: '50px',
            marginTop: '20px'
          }}
        >
          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              navigate('SelectNetworkScreen', { type: 'receive' });
            }}
          >
            {/*<Image src="/images/icons/main/recevie-icon.svg" size={fontSizes.xxxl} />*/}
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1E1E1F] group-hover:bg-[#404045] transition">
              <Image
                src={
                  '/images/icons/main/recevie-icon.svg' // Default image source
                }
                size={fontSizes.md}
                className="" // Hide the default image on hover
              />
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">
              Receive
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              navigate('SelectNetworkScreen', { type: 'send' });
            }}
          >
            <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center bg-[#1E1E1F] group-hover:bg-[#404045] transition">
              <Image
                src={
                  '/images/icons/main/send-icon.svg' // Default image source
                }
                size={fontSizes.md}
                className="" // Hide the default image on hover
              />
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">Send</div>
          </div>
        </Row>

        <Row
          style={{
            marginTop: '20px',
            marginBottom: '20px'
          }}
          justifyCenter
        >
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
            onChange={(value, index) => {
              const tab = value as CHAINS_ENUM;
              setCurrentTab(tab);
              // console.log(`value: `, value, tab, index);
              // dispatch(uiActions.updateAssetTabScreen({ assetTabKey: index as unknown as AssetTabKey }));
            }}
            value={currentTab}
          />
        </Row>

        <Column
          style={{
            padding: '0 16px',
            marginBottom: '20px',
            gap: '0px'
          }}
        >
          {currentTab === CHAINS_ENUM.SIDE ? (
            <SideTokenList balanceVisible={balanceVisible} />
          ) : (
            <BtcTokenList balanceVisible={balanceVisible} runeAndBtcTokens={runeList} />
          )}
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
      {/*{!versionInfo.skipped && (*/}
      {/*  <UpgradePopover*/}
      {/*    onClose={() => {*/}
      {/*      skipVersion(versionInfo.newVersion);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}

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
