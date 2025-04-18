import BigNumber from 'bignumber.js';
import { useEffect } from 'react';

import { isDev, sideChain } from '@/shared/constant';
import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { CoinInput } from '@/ui/components/CoinInput';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useAccountBalance, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBitcoinRuneBalance, useBridgeParams, useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
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
    logo: 'https://api.side.one/static/token/logo/btc.svg',
    runeData: null,
    rune: false
  }
};

export default function BridgeTabScreen() {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { bridgeAmount, from, to, selectTokenModalShow, base, hoverExchange } = useBridgeState();
  const dispatch = useAppDispatch();
  const isBtcBridge = base === 'sat';

  const isDeposit = (from?.name || '').includes('Bitcoin');
  const assets = isDeposit ? btcBalanceList : sideBalanceList;

  const { params } = useBridgeParams();

  const protocolLimit = params?.params?.protocol_limits;

  const protocolFee = params?.params?.protocol_fees;

  const depositEnabled = params?.params?.deposit_enabled;

  const withdrawEnabled = params?.params?.withdraw_enabled;

  const btcVault = params?.params?.vaults
    ?.filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
    ?.reduce(
      (max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      },
      { version: '0', address: '' }
    )?.address;

  const runeVault = params?.params?.vaults
    ?.filter((vault) => vault.asset_type === 'ASSET_TYPE_RUNES')
    ?.reduce(
      (max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      },
      { version: '0', address: '' }
    )?.address;

  const bridgeEnabled = isDeposit ? depositEnabled : withdrawEnabled;

  let runeBalance = useBitcoinRuneBalance(base);

  const bridgeAsset = assets.find((a) => a?.denom === `${base}`) || SAT_ITEM;

  const satAsset = assets.find((a) => a?.denom === 'sat');

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
    dispatch(BridgeActions.update({ balance: balance }));
  }, [balance]);

  const isGreaterThanBalance = BigNumber(bridgeAmount || '0').gt(balance);
  const disabled =
    BigNumber(bridgeAmount || 0).lte(0) ||
    isGreaterThanBalance ||
    lessThanMinSatWithdraw ||
    isGreaterThanMaxWithdraw ||
    lessThanMinSatDeposit ||
    !bridgeEnabled ||
    !isBTCEnoughPayingFee ||
    !btcVault ||
    !runeVault;

  useEffect(() => {
    if (isDev) {
      dispatch(
        BridgeActions.update({
          from: {
            id: 'LIVENET',
            name: 'Bitcoin',
            logo: '/images/icons/btc.svg'
          },
          to: {
            id: sideChain.chainID,
            name: sideChain.name,
            logo: sideChain.logo
          }
        })
      );
    } else {
      dispatch(
        BridgeActions.update({
          from: {
            id: sideChain.chainID,
            name: sideChain.name,
            logo: sideChain.logo
          },
          to: {
            id: 'mainnet',
            name: 'Bitcoin',
            logo: '/images/icons/btc.svg'
          }
        })
      );
    }
  }, []);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content classname={'hide-scrollbar fadeIn-page'}>
        <Row full relative rounded={true}>
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
                      paddingLeft: '5px'
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
                        from: to,
                        to: from
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
                      paddingLeft: '5px'
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
                  <Row itemsCenter>
                    <ImageIcon
                      style={{
                        width: '24px',
                        height: '24px',
                        marginRight: '4px',
                        borderRadius: '20px'
                      }}
                      url={bridgeAsset?.asset?.logo}
                    />
                    <div className="text-[14px] pr-[6px] whitespace-nowrap ">
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

                  <Text size="xs">{BigNumber(balance).toFormat()}</Text>
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
                      denom: bridgeAsset.denom
                    }}
                    decimalScale={+bridgeAsset.asset.exponent}
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
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="bridge" />
      </Footer>
    </Layout>
  );
}
