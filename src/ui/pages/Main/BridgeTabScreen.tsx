import BigNumber from 'bignumber.js';
import { useEffect } from 'react';

import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetBridgeButtonTips from '@/ui/hooks/useGetBridgeButtonTips';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';

import { useNavigate } from '../MainRoute';

export default function BridgeTabScreen() {
  const navigate = useNavigate();
  const { sideChain, UNISAT_SERVICE_ENDPOINT } = useEnvironment();
  const currentAccount = useCurrentAccount();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { bridgeAmount, from, to, base, hoverExchange, isDeposit } = useBridgeState();

  const dispatch = useAppDispatch();

  const assets = isDeposit ? btcBalanceList : sideBalanceList;

  const bridgeAsset = assets.find((a) => a?.denom === `${base}`);

  const balance = bridgeAsset?.formatAmount || '';

  const { isDisabled, buttonTips } = useGetBridgeButtonTips();

  useEffect(() => {
    const from = isDeposit
      ? {
          id: 'mainnet',
          name: 'Bitcoin',
          logo: '/images/icons/btc.svg'
        }
      : {
          id: sideChain.chainID,
          name: sideChain.name,
          logo: sideChain.logo
        };

    const to = isDeposit
      ? {
          id: sideChain.chainID,
          name: sideChain.name,
          logo: sideChain.logo
        }
      : {
          id: 'mainnet',
          name: 'Bitcoin',
          logo: '/images/icons/btc.svg'
        };

    dispatch(
      BridgeActions.update({
        from,
        to
      })
    );
  }, [isDeposit]);

  useEffect(() => {
    services.unisat.getFeeSummary(UNISAT_SERVICE_ENDPOINT).then((res) => {
      const rcFee = res.list[2].feeRate;
      dispatch(BridgeActions.update({ fee: +rcFee, feeSummary: res.list }));
    });
  }, []);

  useEffect(() => {
    dispatch(BridgeActions.update({ balance: balance, bridgeAsset: bridgeAsset }));
  }, [balance, bridgeAsset]);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content classname={'hide-scrollbar fadeIn-page'}>
        <Column full relative rounded={true}>
          <Column
            full
            relative
            style={{
              gap: '5px'
            }}>
            <Row
              mt={'medium'}
              justifyBetween
              itemsCenter
              px={'lg'}
              py={'medium'}
              rounded={true}
              gap={'md'}
              bg={'card_bgColor'}>
              <Column
                gap="sm"
                style={{
                  width: '42%'
                }}>
                <Row justifyBetween itemsCenter>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#fff'
                    }}>
                    From
                  </div>
                </Row>

                <Row
                  itemsCenter
                  gap={'zero'}
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: '#000'
                  }}>
                  <Image size={28} src={from.logo} />
                  <span
                    style={{
                      fontSize: '14px',
                      paddingLeft: '4px'
                    }}>
                    {from.name}
                  </span>
                </Row>
              </Column>

              <Row
                relative
                style={{
                  top: '12px'
                }}>
                <div
                  onMouseEnter={() => {
                    dispatch(BridgeActions.update({ hoverExchange: true }));
                  }}
                  onMouseLeave={() => {
                    dispatch(BridgeActions.update({ hoverExchange: false }));
                  }}
                  onClick={() => {
                    dispatch(
                      BridgeActions.update({
                        isDeposit: !isDeposit
                      })
                    );
                  }}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 15L0.999999 15M0.999999 15L5 11M0.999999 15L5 19M1 5L17 5M17 5L13 1M17 5L13 9"
                      stroke={hoverExchange ? '#F7771A' : 'white'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Row>

              <Column
                style={{
                  width: '42%'
                }}
                gap="sm">
                <Row justifyBetween itemsCenter>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#fff'
                    }}>
                    To
                  </div>
                </Row>

                <Row
                  itemsCenter
                  gap={'zero'}
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: '#000'
                  }}>
                  <Image size={28} src={to.logo} />
                  <span
                    style={{
                      fontSize: '14px',
                      paddingLeft: '4px'
                    }}>
                    {to.name}
                  </span>
                </Row>
              </Column>
            </Row>

            <Column mt={'smm'} px={'lg'} py={'medium'} rounded={true} gap={'md'} bg={'card_bgColor'}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#fff'
                }}>
                Transfer
              </div>

              <div className={'flex flex-col gap-[8px]'}>
                <div
                  className={
                    'bg-[#000]/70 hover:bg-[#292828]/50 border-[1px] border-solid border-[#fff]/10 bg-[#000] flex justify-between items-center p-2 cursor-pointer rounded-[10px] min-w-max'
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('BridgeSelectTokenScreen');
                  }}>
                  <Row itemsCenter gap="sm">
                    <ImageIcon
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '20px'
                      }}
                      url={bridgeAsset?.asset?.logo}
                    />
                    <div className="text-[14px]  whitespace-nowrap ">
                      {bridgeAsset?.asset?.symbol || 'Select Token'}
                    </div>
                  </Row>

                  <svg
                    style={{
                      width: '16px',
                      height: '16px',
                      flexShrink: '0'
                    }}>
                    <use xlinkHref={'#side-down'} />
                  </svg>
                </div>
              </div>
            </Column>

            <Column mt={'smm'} px={'lg'} py={'medium'} rounded={true} gap={'md'} bg={'card_bgColor'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#fff'
                  }}>
                  Amount
                </div>

                <div className={'flex gap-[5px] items-center'}>
                  <img className={'w-[14px] h-[14px]'} src={WalletIcon} alt="" />

                  <Text size="xs" color="white_muted">
                    {BigNumber(balance).toFormat()}
                  </Text>
                </div>
              </Row>

              <Row
                relative
                itemsCenter
                rounded={true}
                style={{
                  height: '50px',
                  background: colors.black
                }}>
                <Row
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
                      denom: bridgeAsset?.denom || ''
                    }}
                    decimalScale={bridgeAsset ? +bridgeAsset.asset.exponent : 6}
                    onChange={(value) => {
                      dispatch(BridgeActions.update({ bridgeAmount: value }));
                    }}
                  />
                  <div
                    className={
                      'absolute right-[10px] top-1/2 -translate-y-1/2 p-2 text-[#F7771A] text-sm  cursor-pointer rounded-lg hover:bg-[#F7771A1A]'
                    }
                    onClick={() => {
                      dispatch(BridgeActions.update({ bridgeAmount: balance }));
                    }}>
                    Max
                  </div>
                </Row>
              </Row>
            </Column>

            <Row mt={'md'}>
              <Button
                onClick={() => {
                  navigate('BridgeConfirmTabScreen');
                }}
                disabled={isDisabled}
                full
                text={buttonTips || 'Next'}
                preset="primary"
              />
            </Row>
          </Column>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
