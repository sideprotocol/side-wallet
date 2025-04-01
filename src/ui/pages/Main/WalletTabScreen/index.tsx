import { useEffect, useState } from 'react';

import { AddressFlagType, CHAINS_ENUM, SIDE_STATION_URL } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { ButtonGroup, Column, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { DisableUnconfirmedsPopover } from '@/ui/components/DisableUnconfirmedPopover';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { NoticePopover } from '@/ui/components/NoticePopover';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import useGetAccountBalanceByUSD from '@/ui/hooks/useGetAccountBalanceByUSD';
import { useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useBlockstreamUrl } from '@/ui/state/settings/hooks';
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
  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();

  const wallet = useWallet();
  const [connected, setConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState<CHAINS_ENUM>(CHAINS_ENUM.SIDE);
  const dispatch = useAppDispatch();
  const accountBalanceByUSD = useGetAccountBalanceByUSD();

  const [showSafeNotice, setShowSafeNotice] = useState(false);
  const [showDisableUnconfirmedUtxoNotice, setShowDisableUnconfirmedUtxoNotice] = useState(false);

  const addressSummary = useAddressSummary();

  const blockStreamUrl = useBlockstreamUrl();

  // console.log(`balanceList: `, balanceList);
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

  const [buyBtcModalVisible, setBuyBtcModalVisible] = useState(false);
  const [isHoveredMoney, setIsHoveredMoney] = useState(false);
  const handleMouseOver = () => {
    setIsHoveredMoney(true);
  };

  const handleMouseLeave = () => {
    setIsHoveredMoney(false);
  };

  return (
    <Layout
      style={{
        minHeight: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px'
      }}>
      <MainHeader title={''} />
      <Column
        classname={'smooth-scroll'}
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
            alignItems: 'center'
          }}>
          {balanceVisible ? (
            <Row
              justifyCenter
              style={{
                gap: 0
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
                text={getTruncate(accountBalanceByUSD.split('.')[0], 0)}
                style={{
                  fontSize: '38px',
                  fontWeight: 500,
                  lineHeight: '32px'
                }}
              />
              <Text
                color={'white_muted'}
                text={`.${accountBalanceByUSD.split('.')[1]}`}
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
            onClick={() => setBalanceVisible(!balanceVisible)}>
            <Image src={balanceVisible ? '/images/icons/eye-off-2.svg' : '/images/icons/eye-white.svg'} size={20} />
          </span>
        </Row>

        <Row
          style={{
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}>
          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              navigate('SelectAddressScreen');
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <Image
                src={
                  '/images/icons/main/recevie-icon.svg' // Default image source
                }
                size={fontSizes.xl}
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
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <Image
                src={
                  '/images/icons/main/send-icon.svg' // Default image source
                }
                size={fontSizes.xxl}
                className="" // Hide the default image on hover
              />
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">Send</div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(`${SIDE_STATION_URL}/staking`, '_blank');
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.25796 3.66659C10.4153 2.5325 12.0003 1.83325 13.7487 1.83325C17.2925 1.83325 20.1654 4.70609 20.1654 8.24992C20.1654 9.99831 19.4661 11.5834 18.332 12.7407M14.6654 13.7499C14.6654 17.2937 11.7925 20.1666 8.2487 20.1666C4.70487 20.1666 1.83203 17.2937 1.83203 13.7499C1.83203 10.2061 4.70487 7.33325 8.2487 7.33325C11.7925 7.33325 14.6654 10.2061 14.6654 13.7499Z"
                  stroke="white"
                  strokeWidth="1.83333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">Stake</div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(`${SIDE_STATION_URL}/explorer`, '_blank');
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 9.99634C0 4.47549 4.47525 0.000244141 9.99609 0.000244141C15.5169 0.000244141 19.9922 4.47549 19.9922 9.99634C19.9922 15.5172 15.5169 19.9924 9.99609 19.9924C4.47525 19.9924 0 15.5172 0 9.99634Z"
                  fill="white"
                />
                <path
                  d="M14.2398 5.75517C14.371 5.88642 14.463 6.05159 14.5057 6.23219C14.5483 6.4128 14.5398 6.60171 14.4812 6.77777L12.7144 12.0792C12.6653 12.2264 12.5826 12.3602 12.4729 12.47C12.3631 12.5797 12.2294 12.6624 12.0821 12.7115L6.78069 14.4783C6.60456 14.537 6.41556 14.5455 6.23486 14.5029C6.05416 14.4602 5.88891 14.3681 5.75762 14.2368C5.62634 14.1055 5.53421 13.9403 5.49157 13.7596C5.44892 13.5789 5.45745 13.3899 5.51619 13.2138L7.28349 7.91283C7.33257 7.76559 7.41525 7.63181 7.52499 7.52207C7.63473 7.41233 7.76851 7.32965 7.91575 7.28057L13.2172 5.51327C13.3933 5.45468 13.5822 5.44628 13.7628 5.48901C13.9434 5.53173 14.1086 5.62389 14.2398 5.75517ZM9.02182 9.01889L8.0452 11.9497L10.9756 10.9726L11.9527 8.04228L9.02231 9.01939L9.02182 9.01889Z"
                  fill="#09090A"
                />
              </svg>
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">View</div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(blockStreamUrl, '_blank');
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.1635 17.674C20.1635 19.0643 19.0423 20.1868 17.6536 20.1868H2.50998C1.12112 20.1868 0 19.0643 0 17.674V2.51309C0 1.12265 1.12949 0.000244141 2.50998 0.000244141H17.6536C19.0423 0.000244141 20.1635 1.12265 20.1635 2.51309V17.674Z"
                  fill="white"
                />
                <path
                  opacity="0.3"
                  d="M0 10.1187V17.6739C0 19.0643 1.12949 20.1867 2.51834 20.1867H17.6536C19.0423 20.1867 20.1719 19.0643 20.1719 17.6739V10.1187H0Z"
                  fill="#1E1E1F"
                />
                <path
                  opacity="0.3"
                  d="M17.7701 17.4895C17.7701 17.7993 17.5609 18.0507 17.3016 18.0507H14.6912C14.4318 18.0507 14.2227 17.7993 14.2227 17.4895V2.69719C14.2227 2.38728 14.4318 2.13599 14.6912 2.13599H17.3016C17.5609 2.13599 17.7701 2.38728 17.7701 2.69719V17.4895Z"
                  fill="#09090A"
                />
              </svg>
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">View</div>
          </div>
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
          }}>
          {currentTab === CHAINS_ENUM.SIDE ? (
            <SideTokenList balanceVisible={balanceVisible} />
          ) : (
            <BtcTokenList balanceVisible={balanceVisible} />
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
