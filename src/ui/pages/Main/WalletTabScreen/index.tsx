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
              window.open(`${SIDE_STATION_URL}/stake`, '_blank');
            }}>
            <div className="w-[48px] h-[48px] rounded-xl flex items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.9377 14.9377C18.3603 14.4795 21 11.548 21 8C21 4.13401 17.866 1 14 1C10.452 1 7.52049 3.63967 7.06227 7.06227M15 14C15 17.866 11.866 21 8 21C4.13401 21 1 17.866 1 14C1 10.134 4.13401 7 8 7C11.866 7 15 10.134 15 14Z"
                  stroke="white"
                  strokeWidth="2"
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

        <Row my="xl" fullX itemsCenter justifyCenter gap="xl">
          <div
            className="flex items-center gap-[8px] group transition text-[#6c7080] hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]"
            onClick={() => {
              window.open(`${SIDE_HUB_URL}`, '_blank');
            }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 9.99634C0 4.47549 4.47525 0.000244141 9.99609 0.000244141C15.5169 0.000244141 19.9922 4.47549 19.9922 9.99634C19.9922 15.5172 15.5169 19.9924 9.99609 19.9924C4.47525 19.9924 0 15.5172 0 9.99634Z"
                fill="currentColor"
              />
              <path
                d="M14.2398 5.75517C14.371 5.88642 14.463 6.05159 14.5057 6.23219C14.5483 6.4128 14.5398 6.60171 14.4812 6.77777L12.7144 12.0792C12.6653 12.2264 12.5826 12.3602 12.4729 12.47C12.3631 12.5797 12.2294 12.6624 12.0821 12.7115L6.78069 14.4783C6.60456 14.537 6.41556 14.5455 6.23486 14.5029C6.05416 14.4602 5.88891 14.3681 5.75762 14.2368C5.62634 14.1055 5.53421 13.9403 5.49157 13.7596C5.44892 13.5789 5.45745 13.3899 5.51619 13.2138L7.28349 7.91283C7.33257 7.76559 7.41525 7.63181 7.52499 7.52207C7.63473 7.41233 7.76851 7.32965 7.91575 7.28057L13.2172 5.51327C13.3933 5.45468 13.5822 5.44628 13.7628 5.48901C13.9434 5.53173 14.1086 5.62389 14.2398 5.75517ZM9.02182 9.01889L8.0452 11.9497L10.9756 10.9726L11.9527 8.04228L9.02231 9.01939L9.02182 9.01889Z"
                fill="#09090A"
              />
            </svg>
            <div className="">Side Hub</div>
          </div>

          <div className="w-px h-4 bg-white bg-opacity-10"></div>

          <div
            className="flex  items-center gap-[8px] group transition text-[#6c7080] hover:text-[#fff] text-[14px] leading-[17px] font-[Saira]"
            onClick={() => {
              window.open(`${SIDE_STATION_URL}`, '_blank');
            }}>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.13239 2.82919V6.79163C7.13209 7.05426 7.02763 7.30605 6.84192 7.49177C6.65621 7.67748 6.40441 7.78194 6.14178 7.78223H2.17934C0.977608 7.78223 1.85739e-08 6.80401 0 5.60289V2.82919C0 1.62807 0.978227 0.649846 2.17934 0.649846H4.95305C6.15478 0.649846 7.13239 1.62807 7.13239 2.82919ZM6.14178 9.36721H2.17934C0.977608 9.36721 1.85739e-08 10.3454 0 11.5466V14.3203C0 15.5214 0.977608 16.4996 2.17934 16.4996H4.95305C6.15416 16.4996 7.13239 15.5214 7.13239 14.3203V10.3578C7.13209 10.0952 7.02763 9.84339 6.84192 9.65768C6.65621 9.47197 6.40441 9.36751 6.14178 9.36721ZM13.6704 9.36721H9.70797C9.44534 9.36751 9.19354 9.47197 9.00783 9.65768C8.82212 9.84339 8.71766 10.0952 8.71736 10.3578V14.3203C8.71736 15.5214 9.69559 16.4996 10.8967 16.4996H13.6704C14.8715 16.4996 15.8498 15.5214 15.8498 14.3203V11.5466C15.8498 10.3454 14.8721 9.36721 13.6704 9.36721ZM11.5831 7.64219C11.769 7.82767 12.0209 7.93184 12.2836 7.93184C12.5462 7.93184 12.7981 7.82767 12.984 7.64219L15.7097 4.91652C15.8952 4.73059 15.9994 4.47867 15.9994 4.21604C15.9994 3.95341 15.8952 3.70149 15.7097 3.51556L12.984 0.789893C12.7981 0.60441 12.5462 0.500244 12.2836 0.500244C12.0209 0.500244 11.769 0.60441 11.5831 0.789893L8.85741 3.51556C8.67193 3.70149 8.56776 3.95341 8.56776 4.21604C8.56776 4.47867 8.67193 4.73059 8.85741 4.91652L11.5831 7.64219Z"
                fill="currentColor"
              />
              <mask
                id="mask0_22916_12479"
                style={{
                  maskType: 'alpha'
                }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="17">
                <path
                  d="M7.13239 2.82919V6.79163C7.13209 7.05426 7.02763 7.30605 6.84192 7.49177C6.65621 7.67748 6.40441 7.78194 6.14178 7.78223H2.17934C0.977608 7.78223 1.85739e-08 6.80401 0 5.60289V2.82919C0 1.62807 0.978227 0.649846 2.17934 0.649846H4.95305C6.15478 0.649846 7.13239 1.62807 7.13239 2.82919ZM6.14178 9.36721H2.17934C0.977608 9.36721 1.85739e-08 10.3454 0 11.5466V14.3203C0 15.5214 0.977608 16.4996 2.17934 16.4996H4.95305C6.15416 16.4996 7.13239 15.5214 7.13239 14.3203V10.3578C7.13209 10.0952 7.02763 9.84339 6.84192 9.65768C6.65621 9.47197 6.40441 9.36751 6.14178 9.36721ZM13.6704 9.36721H9.70797C9.44534 9.36751 9.19354 9.47197 9.00783 9.65768C8.82212 9.84339 8.71766 10.0952 8.71736 10.3578V14.3203C8.71736 15.5214 9.69559 16.4996 10.8967 16.4996H13.6704C14.8715 16.4996 15.8498 15.5214 15.8498 14.3203V11.5466C15.8498 10.3454 14.8721 9.36721 13.6704 9.36721ZM11.5831 7.64219C11.769 7.82767 12.0209 7.93184 12.2836 7.93184C12.5462 7.93184 12.7981 7.82767 12.984 7.64219L15.7097 4.91652C15.8952 4.73059 15.9994 4.47867 15.9994 4.21604C15.9994 3.95341 15.8952 3.70149 15.7097 3.51556L12.984 0.789893C12.7981 0.60441 12.5462 0.500244 12.2836 0.500244C12.0209 0.500244 11.769 0.60441 11.5831 0.789893L8.85741 3.51556C8.67193 3.70149 8.56776 3.95341 8.56776 4.21604C8.56776 4.47867 8.67193 4.73059 8.85741 4.91652L11.5831 7.64219Z"
                  fill="url(#paint0_linear_22916_12479)"
                />
              </mask>
              <g mask="url(#mask0_22916_12479)">
                <path opacity="0.7" d="M18.2492 18.8745L-0.125076 0.500244L-2 18.8745H18.2492Z" fill="currentColor" />
              </g>
              <circle cx="12.2498" cy="4.25009" r="3.74985" fill="currentColor" />
              <defs>
                <linearGradient
                  id="paint0_linear_22916_12479"
                  x1="4.24983"
                  y1="0.125259"
                  x2="10.8329"
                  y2="17.9995"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#68FFF1" />
                  <stop offset="0.493101" stopColor="#00BABA" />
                  <stop offset="1" stopColor="#00C2EC" />
                </linearGradient>
              </defs>
            </svg>

            <div className="">Side Station</div>
          </div>
        </Row>

        <Row
          style={{
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
