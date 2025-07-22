import { useEffect, useState } from 'react';

import { AddressFlagType } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { checkAddressFlag } from '@/shared/utils';
import { Column, Footer, Image, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetAccountBalanceByUSD from '@/ui/hooks/useGetAccountBalanceByUSD';
import { useAddressSummary, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useBlockstreamUrl, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { getTruncate, useWallet } from '@/ui/utils';
import { Stack } from '@mui/material';

import { BuyBTCModal } from '../../BuyBTC/BuyBTCModal';
import { useNavigate } from '../../MainRoute';
import MainHeader from '../MainHeader';
import SideTokenList from './SideTokenList';

export default function WalletTabScreen() {
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();

  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const { sideChain } = useEnvironment();
  const accountBalanceByUSD = useGetAccountBalanceByUSD();
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
          }
        }
      }
    }
  }, [addressSummary, currentAccount]);

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
              window.open(`${sideChain.explorerUrl}/address/${currentAccount.address}`, '_blank');
            }}>
            <div className="w-[75px] h-[66px] gap-2 pt-1 rounded-xl flex flex-col items-center justify-center bg-[#17171C] group-hover:bg-[#404045] transition">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.9974 2.33366C6.21069 2.33366 2.33073 6.21362 2.33073 11.0003C2.33073 15.787 6.21069 19.667 10.9974 19.667C15.7841 19.667 19.6641 15.787 19.6641 11.0003C19.6641 6.21362 15.7841 2.33366 10.9974 2.33366ZM0.164062 11.0003C0.164062 5.01708 5.01415 0.166992 10.9974 0.166992C16.9806 0.166992 21.8307 5.01708 21.8307 11.0003C21.8307 16.9836 16.9806 21.8337 10.9974 21.8337C5.01415 21.8337 0.164062 16.9836 0.164062 11.0003Z"
                  fill="white"
                />
                <path
                  d="M15.5099 6.31755C15.6521 6.45979 15.7519 6.6388 15.7981 6.83453C15.8443 7.03027 15.8351 7.235 15.7715 7.4258L13.8567 13.1713C13.8035 13.3308 13.7139 13.4758 13.595 13.5947C13.4761 13.7137 13.3311 13.8033 13.1715 13.8565L7.42606 15.7713C7.23518 15.8349 7.03034 15.8442 6.83451 15.7979C6.63867 15.7517 6.45958 15.6519 6.3173 15.5096C6.17502 15.3673 6.07518 15.1882 6.02896 14.9924C5.98275 14.7966 5.99199 14.5917 6.05564 14.4008L7.97098 8.65593C8.02416 8.49636 8.11376 8.35137 8.2327 8.23244C8.35163 8.11351 8.49662 8.0239 8.65618 7.97072L14.4016 6.05539C14.5925 5.9919 14.7973 5.98279 14.993 6.0291C15.1887 6.0754 15.3677 6.17528 15.5099 6.31755ZM9.85489 9.85464L8.79647 13.031L11.9723 11.972L13.0312 8.79622L9.85543 9.85518L9.85489 9.85464Z"
                  fill="white"
                />
              </svg>

              <div className="text-[#fff]/80 group-hover:text-[#fff] text-[12px] leading-[17px] font-[Saira]">
                Explorer
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center gap-[8px] group transition"
            onClick={() => {
              window.open(`${blockStreamUrl}/address/${currentAccount.address}`, '_blank');
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

        {networkType === NetworkType.MAINNET && (
          <Stack
            direction="row"
            justifyContent="center"
            sx={{
              margin: '12px 12px 0',
              py: '4px',
              fontSize: '12px',
              fontWeight: 500,
              color: colors.grey12,
              bgcolor: colors.card_bgColor,
              borderRadius: '10px',
              transition: '.4s',
              ':hover': {
                bgcolor: colors.grey_dark
              }
            }}
            onClick={() => {
              navigate('RegisterEvmAddress');
            }}>
            Register for TGE
          </Stack>
        )}

        <Column my="lg" px="lg">
          <SideTokenList balanceVisible={balanceVisible} />
        </Column>
      </Column>

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
