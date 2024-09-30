import BigNumber from 'bignumber.js';
import { useEffect } from 'react';

import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import BridgeSelectToken from '@/ui/components/Bridge/BridgeSelectToken';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import { Icon } from '@/ui/components/Icon';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { useCurChain, useIsTestNet } from '@/ui/hooks/useEnv';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useAccountBalance, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBitcoinRuneBalance, useBridgeParams, useRuneListV2 } from '@/ui/state/bridge/hook';
import { bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { swapStore, useSwapStore } from '@/ui/stores/SwapStore';
import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';

import { useNavigate } from '../MainRoute';

const SAT_ITEM = {
  denom: 'sat',
  amount: '0',
  denomPrice: '0',
  formatAmount: '0',
  totalValue: '0',
  asset: {
    denom: 'sat',
    symbol: 'BTC',
    name: 'Bitcoin',
    exponent: '8',
    precision: 8,
    logo: 'https://insider.side.one/static/token/logo/btc.svg',
    runeData: null,
    rune: false
  }
};

export default function BridgeTabScreen() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { balanceList: assets } = useGetSideBalanceList(currentAccount?.address);

  const { bridgeAmount, from, to, loading, selectTokenModalShow, base } = useBridgeStore();
  const isBtcBridge = base === 'sat';

  const { tokens: runesBalance } = useRuneListV2();
  const isDeposit = (from?.name || '').includes('Bitcoin');

  const { params } = useBridgeParams();

  const protocolLimit = params?.params?.protocol_limits;

  const protocolFee = params?.params?.protocol_fees;

  const depositEnabled = params?.params?.deposit_enabled;

  const withdrawEnabled = params?.params?.withdraw_enabled;

  const bridgeEnabled = isDeposit ? depositEnabled : withdrawEnabled;

  let runeBalance = useBitcoinRuneBalance(base);

  const bridgeAsset = assets.find((a) => a?.denom === `${base}`) || SAT_ITEM;

  const satAsset = assets.find((a) => a?.denom === 'sat');

  const depositRuneAsset = runesBalance.find((a) => base.includes(a.runeid));

  const accountBalance = useAccountBalance();
  const btcBalance = accountBalance?.amount;

  const balance = isDeposit ? (isBtcBridge ? btcBalance : runeBalance) : bridgeAsset?.formatAmount || '0';

  const btcBalanceOnFromChain = isDeposit ? btcBalance : satAsset?.formatAmount || '0';

  const isBTCEnoughPayingFee = BigNumber(toUnitAmount(btcBalanceOnFromChain, satAsset?.asset.precision || 8)).gte(
    isDeposit ? protocolFee?.deposit_fee || 0 : protocolFee?.withdraw_fee || 0
  );

  const lessThanMinSatWithdraw =
    base == 'sat' &&
    BigNumber(toUnitAmount(bridgeAmount || '0', 8)).lt(
      BigNumber(protocolLimit?.btc_min_withdraw || 0).plus(protocolFee?.withdraw_fee || 0)
    ) &&
    !isDeposit;

  const lessThanMinSatDeposit =
    base == 'sat' &&
    BigNumber(toUnitAmount(bridgeAmount || '0', 8)).lt(
      BigNumber(protocolLimit?.btc_min_deposit || 0).plus(protocolFee?.deposit_fee || 0)
    ) &&
    isDeposit;

  const isGreaterThanMaxWithdraw =
    base == 'sat' &&
    BigNumber(toUnitAmount(bridgeAmount || '0', 8)).gt(
      protocolLimit?.btc_max_withdraw || toUnitAmount(bridgeAmount || '0', 8)
    ) &&
    !isDeposit;

  useEffect(() => {
    bridgeStore.balance = balance;
  }, [balance]);
  const { hoverExchange } = useSwapStore();

  const sideChain = useCurChain();
  const isTestNet = useIsTestNet();

  const isGreaterThanBalance = BigNumber(bridgeAmount || '0').gt(balance);
  const disabled =
    BigNumber(bridgeAmount || 0).lte(0) ||
    isGreaterThanBalance ||
    lessThanMinSatWithdraw ||
    isGreaterThanMaxWithdraw ||
    lessThanMinSatDeposit ||
    !bridgeEnabled ||
    !isBTCEnoughPayingFee;

  useEffect(() => {
    if (isTestNet) {
      bridgeStore.from = {
        id: 'LIVENET',
        name: 'Bitcoin Signet',
        logo: '/images/icons/btc.svg'
      };
      bridgeStore.to = {
        id: sideChain.chainID,
        name: 'Side Chain',
        logo: '/images/logo/wallet-logo-white-v2.png'
      };
    } else {
      bridgeStore.from = {
        id: sideChain.chainID,
        name: 'SIDE devnet',
        logo: '/images/logo/wallet-logo-white-v2.svg'
      };
      bridgeStore.to = {
        id: 'mainnet',
        name: 'Bitcoin',
        logo: '/images/icons/btc.svg'
      };
    }
  }, []);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content classname={'hide-scrollbar'}>
        <Row full relative rounded={true}>
          <Column
            full
            relative
            style={{
              gap: '5px'
            }}>
            <Column mt={'medium'} px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
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
                }}>
                <Image size={28} src={from.logo} />
                <span
                  style={{
                    fontSize: '14px',
                    paddingLeft: '5px'
                  }}>
                  {from.name}
                </span>
              </Row>
            </Column>

            <Row relative>
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
                  swapStore.hoverExchange = true;
                }}
                onMouseLeave={() => {
                  swapStore.hoverExchange = false;
                }}
                onClick={() => {
                  const from = bridgeStore.from;
                  bridgeStore.from = to;
                  bridgeStore.to = from;
                }}>
                {/*<Icon icon={'swap-down-icon'}></Icon>*/}
                <Icon size={hoverExchange ? 22 : 11} icon={hoverExchange ? 'swap-down-hover' : 'swap-down-icon'}></Icon>
              </div>
            </Row>

            <Column px={'medium'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
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
                }}>
                <Image size={28} src={to.logo} />
                <span
                  style={{
                    fontSize: '14px',
                    paddingLeft: '5px'
                  }}>
                  {to.name}
                </span>
              </Row>
            </Column>

            <Row justifyBetween itemsCenter mt={'smm'} px={'xl'} py={'medium'} rounded={true} gap={'md'} bg={'swapBg'}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#7D7D7D'
                }}>
                Transfer
              </div>

              <div className={'flex flex-col gap-[8px]'}>
                <div
                  className={'hover:bg-[#000]/70 bg-[#292828]/50 border-[1px] border-solid border-[#fff]/10 bg-[#000]'}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 8px',
                    cursor: 'pointer',
                    borderRadius: '24px',
                    minWidth: 'max-content'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    bridgeStore.selectTokenModalShow = true;
                  }}>
                  <ImageIcon
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '4px',
                      borderRadius: '20px'
                    }}
                    url={bridgeAsset?.asset?.logo}
                  />
                  <div
                    style={{
                      fontSize: '14px',
                      paddingRight: '6px',
                      whiteSpace: 'nowrap',
                      maxWidth: '72px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}>
                    {bridgeAsset?.asset?.symbol || 'Select Token'}
                  </div>
                  {/*<Icon type="" />*/}
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
            </Row>

            <Column mt={'smm'} px={'xl'} py={'md'} rounded={true} gap={'md'} bg={'swapBg'}>
              <Row justifyBetween itemsCenter>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#7D7D7D'
                  }}>
                  Amount
                </div>

                <div className={'flex gap-[5px] items-center'}>
                  <img className={'w-[14px] h-[14px]'} src={WalletIcon} alt="" />

                  <Text size="sm">{balance}</Text>
                </div>
              </Row>

              <Row
                relative
                itemsCenter
                rounded={true}
                style={{
                  height: '50px',
                  background: '#09090A'
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
                      denom: bridgeAsset.denom
                    }}
                    onChange={(value) => {
                      bridgeStore.bridgeAmount = value;
                    }}
                  />
                  <div
                    className={'hover:bg-[#0dd4c3]/10'}
                    style={{
                      padding: '8px',
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#0DD4C3',
                      fontSize: '14px',
                      background: '#0DD4C31A',
                      cursor: 'pointer',
                      borderRadius: '8px'
                    }}
                    onClick={() => {
                      bridgeStore.bridgeAmount = balance;
                    }}>
                    Max
                  </div>
                </Row>
              </Row>
            </Column>

            {/*<ConfirmButton />*/}
            <Row mt={'xl'} full>
              <Button
                onClick={() => {
                  // if (base === 'sat') {
                  //   navigate('BridgeConfirmTabScreen');
                  // } else {
                  //   // navigate('BridgeConfirmTabScreen');
                  //   bridgeRune(base?.split('/')[1]);
                  // }
                  navigate('BridgeConfirmTabScreen');
                }}
                disabled={disabled}
                full
                text={
                  !isBTCEnoughPayingFee
                    ? 'Insufficient BTC balance'
                    : lessThanMinSatDeposit || lessThanMinSatWithdraw
                    ? `Minimum amount is ${
                        isDeposit
                          ? toReadableAmount(
                              BigNumber(protocolLimit?.btc_min_deposit || '10000')
                                .plus(protocolFee?.deposit_fee || '0')
                                .toFixed(),
                              8
                            )
                          : toReadableAmount(
                              BigNumber(protocolLimit?.btc_min_withdraw || '20000')
                                .plus(protocolFee?.withdraw_fee || '0')
                                .toFixed(),
                              8
                            )
                      } BTC`
                    : isGreaterThanBalance
                    ? 'Insufficient Balance'
                    : 'Bridge'
                }
                preset="primary"
              />
            </Row>
          </Column>
        </Row>

        <BridgeSelectToken
          open={selectTokenModalShow}
          onClose={() => {
            bridgeStore.selectTokenModalShow = false;
          }}
        />
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
