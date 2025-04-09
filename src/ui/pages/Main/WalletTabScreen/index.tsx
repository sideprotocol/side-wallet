import { useEffect, useState } from 'react';

import { AddressFlagType, CHAINS_ENUM, SIDE_HUB_URL, SIDE_STATION_URL } from '@/shared/constant';
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
        classname={'smooth-scroll fadeIn-page'}
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
              window.open(`${SIDE_STATION_URL}`, '_blank');
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="21" height="21" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.0485 5.24033V14.1562C16.0479 14.7471 15.8128 15.3137 15.3949 15.7316C14.9771 16.1494 14.4105 16.3845 13.8196 16.3851H4.90372C2.19971 16.3851 4.1793e-08 14.184 0 11.4814V5.24033C0 2.53772 2.2011 0.336617 4.90372 0.336617H11.1448C13.8488 0.336617 16.0485 2.53772 16.0485 5.24033ZM13.8196 19.9515H4.90372C2.19971 19.9515 4.1793e-08 22.1526 0 24.8552V31.0963C0 33.7989 2.19971 36 4.90372 36H11.1448C13.8474 36 16.0485 33.7989 16.0485 31.0963V22.1804C16.0479 21.5895 15.8128 21.0229 15.3949 20.6051C14.9771 20.1872 14.4105 19.9521 13.8196 19.9515ZM30.7597 19.9515H21.8438C21.2529 19.9521 20.6863 20.1872 20.2684 20.6051C19.8506 21.0229 19.6155 21.5895 19.6149 22.1804V31.0963C19.6149 33.7989 21.816 36 24.5186 36H30.7597C33.4623 36 35.6634 33.7989 35.6634 31.0963V24.8552C35.6634 22.1526 33.4637 19.9515 30.7597 19.9515ZM26.063 16.07C26.4813 16.4874 27.0482 16.7218 27.6391 16.7218C28.2301 16.7218 28.7969 16.4874 29.2153 16.07L35.3483 9.93703C35.7656 9.51866 36 8.95183 36 8.36088C36 7.76993 35.7656 7.2031 35.3483 6.78472L29.2153 0.651737C28.7969 0.234382 28.2301 0 27.6391 0C27.0482 0 26.4813 0.234382 26.063 0.651737L19.93 6.78472C19.5126 7.2031 19.2782 7.76993 19.2782 8.36088C19.2782 8.95183 19.5126 9.51866 19.93 9.93703L26.063 16.07Z"
                  fill="white"
                />
                <mask
                  id="mask0_22821_11473"
                  style={{
                    maskType: 'alpha'
                  }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="36"
                  height="36">
                  <path
                    d="M16.0485 5.24033V14.1562C16.0479 14.7471 15.8128 15.3137 15.3949 15.7316C14.9771 16.1494 14.4105 16.3845 13.8196 16.3851H4.90372C2.19971 16.3851 4.1793e-08 14.184 0 11.4814V5.24033C0 2.53772 2.2011 0.336617 4.90372 0.336617H11.1448C13.8488 0.336617 16.0485 2.53772 16.0485 5.24033ZM13.8196 19.9515H4.90372C2.19971 19.9515 4.1793e-08 22.1526 0 24.8552V31.0963C0 33.7989 2.19971 36 4.90372 36H11.1448C13.8474 36 16.0485 33.7989 16.0485 31.0963V22.1804C16.0479 21.5895 15.8128 21.0229 15.3949 20.6051C14.9771 20.1872 14.4105 19.9521 13.8196 19.9515ZM30.7597 19.9515H21.8438C21.2529 19.9521 20.6863 20.1872 20.2684 20.6051C19.8506 21.0229 19.6155 21.5895 19.6149 22.1804V31.0963C19.6149 33.7989 21.816 36 24.5186 36H30.7597C33.4623 36 35.6634 33.7989 35.6634 31.0963V24.8552C35.6634 22.1526 33.4637 19.9515 30.7597 19.9515ZM26.063 16.07C26.4813 16.4874 27.0482 16.7218 27.6391 16.7218C28.2301 16.7218 28.7969 16.4874 29.2153 16.07L35.3483 9.93703C35.7656 9.51866 36 8.95183 36 8.36088C36 7.76993 35.7656 7.2031 35.3483 6.78472L29.2153 0.651737C28.7969 0.234382 28.2301 0 27.6391 0C27.0482 0 26.4813 0.234382 26.063 0.651737L19.93 6.78472C19.5126 7.2031 19.2782 7.76993 19.2782 8.36088C19.2782 8.95183 19.5126 9.51866 19.93 9.93703L26.063 16.07Z"
                    fill="url(#paint0_linear_22821_11473)"
                  />
                </mask>
                <g mask="url(#mask0_22821_11473)">
                  <path opacity="0.7" d="M41.0625 41.3438L-0.281249 0L-4.5 41.3438H41.0625Z" fill="white" />
                </g>
                <circle cx="27.5625" cy="8.4375" r="8.4375" fill="white" />
                <defs>
                  <linearGradient
                    id="paint0_linear_22821_11473"
                    x1="9.5625"
                    y1="-0.84375"
                    x2="24.375"
                    y2="39.375"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#68FFF1" />
                    <stop offset="0.493101" stopColor="#00BABA" />
                    <stop offset="1" stopColor="#00C2EC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">
              Station
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(`${SIDE_HUB_URL}`, '_blank');
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
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">Hub</div>
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
            <div className="text-[#fff]/80 group-hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]">
              Mempool
            </div>
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
