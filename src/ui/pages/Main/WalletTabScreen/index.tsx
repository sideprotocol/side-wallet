import { useEffect, useState } from 'react';

import { AddressFlagType, CHAINS_ENUM, SIDE_HUB_URL } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { Column, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { DisableUnconfirmedsPopover } from '@/ui/components/DisableUnconfirmedPopover';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { NoticePopover } from '@/ui/components/NoticePopover';
import { getCurrentTab } from '@/ui/features/browser/tabs';
import useGetAccountBalanceByUSD from '@/ui/hooks/useGetAccountBalanceByUSD';
import { useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useBlockstreamUrl } from '@/ui/state/settings/hooks';
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
            gap: '12px'
          }}
          mt="xl"
          px="lg">
          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              navigate('SelectAddressScreen');
            }}>
            <div className="w-[75px] h-[66px] gap-2 pt-1 rounded-xl flex flex-col items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <ImageIcon
                url={
                  '/images/icons/main/recevie-icon.svg' // Default image source
                }
                style={{
                  width: '22px',
                  height: '22px'
                }}
              />
              <div className="text-[#fff]/80 group-hover:text-[#fff] text-[12px] leading-[17px] font-[Saira]">
                Receive
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              navigate('SelectNetworkScreen', { type: 'send' });
            }}>
            <div className="w-[75px] h-[66px] gap-2 pt-1 rounded-xl flex flex-col items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <ImageIcon
                url={
                  '/images/icons/main/send-icon.svg' // Default image source
                }
                style={{
                  width: '22px',
                  height: '22px'
                }}
              />
              <div className="text-[#fff]/80 group-hover:text-[#fff] text-[12px] leading-[17px] font-[Saira]">Send</div>
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(`${SIDE_HUB_URL}`, '_blank');
            }}>
            <div className="w-[75px] h-[66px] gap-2 pt-1 rounded-xl flex flex-col items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.3103 3.44011V9.10948C10.3099 9.48525 10.1604 9.84551 9.89473 10.1112C9.62902 10.3769 9.26876 10.5264 8.89299 10.5268H3.22362C1.50421 10.5268 0.105469 9.12719 0.105469 7.40867V3.44011C0.105469 1.72158 1.50509 0.321957 3.22362 0.321957H7.19218C8.91159 0.321957 10.3103 1.72158 10.3103 3.44011ZM8.89299 12.7946H3.22362C1.50421 12.7946 0.105469 14.1942 0.105469 15.9127V19.8813C0.105469 21.5998 1.50421 22.9994 3.22362 22.9994H7.19218C8.9107 22.9994 10.3103 21.5998 10.3103 19.8813V14.2119C10.3099 13.8361 10.1604 13.4759 9.89473 13.2102C9.62902 12.9444 9.26876 12.795 8.89299 12.7946ZM19.6648 12.7946H13.9954C13.6196 12.795 13.2594 12.9444 12.9937 13.2102C12.728 13.4759 12.5785 13.8361 12.5781 14.2119V19.8813C12.5781 21.5998 13.9777 22.9994 15.6962 22.9994H19.6648C21.3833 22.9994 22.7829 21.5998 22.7829 19.8813V15.9127C22.7829 14.1942 21.3842 12.7946 19.6648 12.7946ZM16.6783 10.3264C16.9443 10.5918 17.3047 10.7409 17.6805 10.7409C18.0563 10.7409 18.4167 10.5918 18.6827 10.3264L22.5826 6.42662C22.8479 6.16059 22.997 5.80016 22.997 5.42439C22.997 5.04862 22.8479 4.68818 22.5826 4.42215L18.6827 0.522334C18.4167 0.256948 18.0563 0.10791 17.6805 0.10791C17.3047 0.10791 16.9443 0.256948 16.6783 0.522334L12.7785 4.42215C12.5131 4.68818 12.364 5.04862 12.364 5.42439C12.364 5.80016 12.5131 6.16059 12.7785 6.42662L16.6783 10.3264Z"
                  fill="white"
                />
                <mask
                  id="mask0_23013_11262"
                  style={{
                    maskType: 'alpha'
                  }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="23"
                  height="23">
                  <path
                    d="M10.3103 3.44011V9.10948C10.3099 9.48525 10.1604 9.84551 9.89473 10.1112C9.62902 10.3769 9.26876 10.5264 8.89299 10.5268H3.22362C1.50421 10.5268 0.105469 9.12719 0.105469 7.40867V3.44011C0.105469 1.72158 1.50509 0.321957 3.22362 0.321957H7.19218C8.91159 0.321957 10.3103 1.72158 10.3103 3.44011ZM8.89299 12.7946H3.22362C1.50421 12.7946 0.105469 14.1942 0.105469 15.9127V19.8813C0.105469 21.5998 1.50421 22.9994 3.22362 22.9994H7.19218C8.9107 22.9994 10.3103 21.5998 10.3103 19.8813V14.2119C10.3099 13.8361 10.1604 13.4759 9.89473 13.2102C9.62902 12.9444 9.26876 12.795 8.89299 12.7946ZM19.6648 12.7946H13.9954C13.6196 12.795 13.2594 12.9444 12.9937 13.2102C12.728 13.4759 12.5785 13.8361 12.5781 14.2119V19.8813C12.5781 21.5998 13.9777 22.9994 15.6962 22.9994H19.6648C21.3833 22.9994 22.7829 21.5998 22.7829 19.8813V15.9127C22.7829 14.1942 21.3842 12.7946 19.6648 12.7946ZM16.6783 10.3264C16.9443 10.5918 17.3047 10.7409 17.6805 10.7409C18.0563 10.7409 18.4167 10.5918 18.6827 10.3264L22.5826 6.42662C22.8479 6.16059 22.997 5.80016 22.997 5.42439C22.997 5.04862 22.8479 4.68818 22.5826 4.42215L18.6827 0.522334C18.4167 0.256948 18.0563 0.10791 17.6805 0.10791C17.3047 0.10791 16.9443 0.256948 16.6783 0.522334L12.7785 4.42215C12.5131 4.68818 12.364 5.04862 12.364 5.42439C12.364 5.80016 12.5131 6.16059 12.7785 6.42662L16.6783 10.3264Z"
                    fill="url(#paint0_linear_23013_11262)"
                  />
                </mask>
                <g mask="url(#mask0_23013_11262)">
                  <path opacity="0.7" d="M26.2182 26.3974L-0.0713065 0.10791L-2.75391 26.3974H26.2182Z" fill="white" />
                </g>
                <circle cx="17.6347" cy="5.47311" r="5.3652" fill="white" />
                <defs>
                  <linearGradient
                    id="paint0_linear_23013_11262"
                    x1="6.18603"
                    y1="-0.42861"
                    x2="15.6049"
                    y2="25.1455"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#68FFF1" />
                    <stop offset="0.493101" stopColor="#00BABA" />
                    <stop offset="1" stopColor="#00C2EC" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="text-[#fff]/80 group-hover:text-[#fff] text-[12px] leading-[17px] font-[Saira]">Hub</div>
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(blockStreamUrl, '_blank');
            }}>
            <div className="w-[75px] h-[66px] gap-2 pt-1 rounded-xl flex flex-col items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
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
              <div className="text-[#fff]/80 group-hover:text-[#fff] text-[12px] leading-[17px] font-[Saira]">
                Mempool
              </div>
            </div>
          </div>
        </Row>

        <Column my="xl" px="lg">
          <BtcTokenList balanceVisible={balanceVisible} />
          <SideTokenList balanceVisible={balanceVisible} />
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
