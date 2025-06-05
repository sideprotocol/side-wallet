import BigNumber from 'bignumber.js';
import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { CacheUTXO } from '@/shared/types';
import { Button, Column, Content, Footer, Header, Input, Layout, Row } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import { useBridgeBtc, useEstimateNetworkFee } from '@/ui/hooks/bridge';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, parseUnitAmount } from '@/ui/utils';
import { formatAddress } from '@/ui/utils/format';
import { Input as MuiInput, Stack, Typography } from '@mui/material';

import { createCosmosAddressRegex } from './BridgeTargetAddress';

export function DetailRow({
  text,
  value,
  tooltip
}: {
  text: ReactNode;
  tooltip?: ReactNode;
  value: ReactNode;
  id?: string;
}) {
  return (
    <div className="flex text-sm items-center justify-between">
      <Stack
        direction="row"
        alignItems="center"
        gap="2px"
        sx={{
          fontSize: '12px',
          color: colors.grey12,
          whiteSpace: 'nowrap'
        }}>
        {text}
      </Stack>
      <span className={'flex  w-full justify-end items-center gap-1'}>{value}</span>
    </div>
  );
}

export default function BridgeBtcConfirmScreen() {
  const currentAccount = useCurrentAccount();
  const dispatch = useAppDispatch();

  const { SIDE_BTC_EXPLORER, sideChain } = useEnvironment();
  const { bridgeAmount, fee, feeSummary, params, fromChain, toChain, fromAsset, toAsset, toAddress } = useBridgeState();
  const { bridge, loading } = useBridgeBtc();
  const { estimateNetworkFee } = useEstimateNetworkFee();

  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount.address);

  const [tx, setTx] = useState<CacheUTXO[]>([]);
  const [withdrawFee, setWithdrawFee] = useState('');
  const [openEditId, setOpenEditId] = useState('');

  useEffect(() => {
    const bridgeUnitAmount = +parseUnitAmount(bridgeAmount, fromAsset?.asset.exponent || 8);
    services.bridge
      .getBridgeWithdrawFee(currentAccount.address, `${bridgeUnitAmount}sat`, sideChain.restUrl)
      .then((result) => {
        setWithdrawFee(formatUnitAmount(result, fromAsset?.asset.exponent || 8));
      });
    estimateNetworkFee({ amount: bridgeUnitAmount, fee }).then((res) => {
      if (res) {
        setTx(res.walletInputs || []);
      }
    });
  }, []);

  const { data: btcBridgeDepositIbcScript, isLoading: getDepositIbcScriptLoading } = useQuery({
    queryKey: [
      'btcBridgeDepositIbcScript',
      {
        toChain,
        toAddress,
        toAsset
      }
    ],
    queryFn: async () => {
      const channel_id = toAsset?.asset.ibcData?.find(
        (item) => item.oppositeChainId === toChain?.chainID
      )?.oppositeChainChannelId;
      if (!channel_id) {
        return '';
      }
      const result = await services.bridge.getBtcBridgeDepositIbcScript(
        {
          channel_id,
          recipient_address: toAddress
        },
        sideChain.restUrl
      );
      return result.script;
    },
    enabled: fromChain?.isBitcoin && toChain?.isCosmos
  });

  const isDeposit = !!fromChain?.isBitcoin;
  const confirmations = isDeposit
    ? params?.params?.deposit_confirmation_depth
    : params?.params?.withdraw_confirmation_depth;
  const protocolFee = isDeposit
    ? params?.params?.protocol_fees?.deposit_fee
    : params?.params?.protocol_fees?.withdraw_fee;

  const yourReceive = formatUnitAmount(
    BigNumber(parseUnitAmount(bridgeAmount || '0', fromAsset?.asset.exponent || 8))
      .minus(protocolFee || '0')
      .toFixed(),
    fromAsset?.asset.exponent || 8
  );
  const bitcoinFeeInfo = btcBalanceList.find((item) => item.denom === 'sat');
  const sideFeeInfo = sideBalanceList.find((item) => item.denom === 'sat');
  const feePrice = sideFeeInfo?.denomPrice || bitcoinFeeInfo?.denomPrice || '0';

  const [isEditToAddress, setIsEditToAddress] = useState(false);
  const [isEditError, setIsEditError] = useState(false);

  const depositDetailItems = (
    <>
      <DetailRow
        text={'Transactions Fee'}
        value={
          <>
            {fee} sats/vB
            <Stack
              sx={{
                cursor: 'pointer',
                svg: {
                  path: {
                    fill: colors.grey12,
                    stroke: colors.grey12,
                    transition: '.4s'
                  }
                },
                ':hover': {
                  svg: {
                    path: {
                      fill: colors.white,
                      stroke: colors.white
                    }
                  }
                }
              }}
              onClick={() => {
                if (openEditId) {
                  setOpenEditId('');
                } else {
                  setOpenEditId('edit_sat');
                }
              }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="&#231;&#188;&#150;&#232;&#190;&#145; 1">
                  <path
                    id="Vector"
                    d="M16.7421 2.16228L16.7371 2.16742L7.90556 10.9985L8.01162 11.1046L7.90556 10.9985C7.76021 11.1439 7.67855 11.341 7.67855 11.5466C7.67855 11.7522 7.76021 11.9493 7.90556 12.0946C8.05091 12.24 8.24804 12.3216 8.4536 12.3216C8.65916 12.3216 8.8563 12.24 9.00165 12.0946L17.8389 3.25715C17.9125 3.18586 17.9712 3.10069 18.0116 3.00657C18.0522 2.91202 18.0736 2.81032 18.0745 2.70742C18.0754 2.60451 18.0558 2.50246 18.0168 2.40722C17.9778 2.31197 17.9203 2.22544 17.8475 2.15268C17.7747 2.07991 17.6882 2.02236 17.593 1.9834C17.4977 1.94443 17.3957 1.92482 17.2928 1.92571C17.1899 1.92661 17.0882 1.94799 16.9936 1.9886C16.8991 2.02922 16.8136 2.08826 16.7421 2.16228ZM16.7438 8.20202C16.5985 8.34736 16.5168 8.54449 16.5168 8.75003V15.625C16.5168 15.8615 16.4229 16.0883 16.2557 16.2555C16.0884 16.4228 15.8616 16.5167 15.6252 16.5167H4.37516C4.13868 16.5167 3.91188 16.4228 3.74466 16.2555C3.57744 16.0883 3.4835 15.8615 3.4835 15.625V4.37503C3.4835 4.13855 3.57744 3.91175 3.74466 3.74453C3.91188 3.57731 4.13868 3.48336 4.37516 3.48336H11.0418C11.2474 3.48336 11.4445 3.40171 11.5898 3.25637C11.7352 3.11103 11.8168 2.91391 11.8168 2.70836C11.8168 2.50282 11.7352 2.3057 11.5898 2.16036C11.4445 2.01502 11.2474 1.93336 11.0418 1.93336H4.37516C3.0267 1.93336 1.9335 3.02656 1.9335 4.37503V15.625C1.9335 16.9735 3.0267 18.0667 4.37516 18.0667H15.6252C16.9736 18.0667 18.0668 16.9735 18.0668 15.625V8.75003C18.0668 8.54449 17.9852 8.34736 17.8398 8.20202C17.6945 8.05668 17.4974 7.97503 17.2918 7.97503C17.0863 7.97503 16.8892 8.05668 16.7438 8.20202Z"
                    strokeWidth="0.3"
                  />
                </g>
              </svg>
            </Stack>
          </>
        }></DetailRow>

      {openEditId === 'edit_sat' && (
        <DetailRow
          text={''}
          value={
            openEditId !== 'edit_sat' ? (
              <></>
            ) : (
              <Input
                containerStyle={{
                  width: '100%'
                }}
                onChange={(e) => {
                  const targetValue = e.target.value;
                  if (targetValue.startsWith('.')) {
                    return;
                  }
                  if (targetValue !== '' && !targetValue.match(/^\d*(\.\d*)?$/)) {
                    return;
                  }
                  const amount = targetValue.replace(/^0+/, '0'); // remove prefix zeros
                  dispatch(BridgeActions.update({ fee: +amount }));
                }}
                placeholder="sats/vB"
                onBlur={() => setOpenEditId('')}></Input>
            )
          }
          id="edit_sat"></DetailRow>
      )}

      <DetailRow
        text={'Est. Bridge Time'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              ({confirmations} blocks)
            </Typography>
            {feeSummary?.find((item) => item.feeRate === fee)?.desc || '-'}
          </>
        }
        tooltip={`This bridge requires ${confirmations} confirmations to ensure the transaction’s irreversibility and security.`}></DetailRow>

      <DetailRow
        text={'Bridge Fees'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              (~$
              {BigNumber(feePrice)
                .multipliedBy(formatUnitAmount(protocolFee || '0', bitcoinFeeInfo?.asset.exponent || 8))
                .toFixed(2, BigNumber.ROUND_CEIL)}
              )
            </Typography>
            <Typography fontSize={'14px'} color={colors.white}>
              {formatUnitAmount(protocolFee || '0', bitcoinFeeInfo?.asset.exponent || 8)}
            </Typography>
            <Typography fontSize={'14px'} color={colors.grey12}>
              {bitcoinFeeInfo?.asset.symbol}
            </Typography>
          </>
        }
        tooltip={
          'For peg-in, fees will be deducted from your Bitcoin balance; for peg-out, fees will be deducted from your Side Chain balance.'
        }></DetailRow>

      <DetailRow
        text={'You will receive'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              (~$
              {BigNumber(toAsset?.denomPrice || feePrice)
                .multipliedBy(yourReceive)
                .toFixed(2, BigNumber.ROUND_CEIL)}
              )
            </Typography>
            <Typography fontSize={'14px'} color={colors.white}>
              {yourReceive}
            </Typography>
            <Typography fontSize={'14px'} color={colors.grey12}>
              {toAsset?.asset.symbol}
            </Typography>
            <ImageIcon url={toAsset?.asset.logo} style={{ width: 20, height: 20 }}></ImageIcon>
          </>
        }
        tooltip={
          'Please note that the sBTC tokens you receive on the Side Chain are not native BTC from the Bitcoin network. Instead, they are representations of BTC issued to you on the Side Chain.'
        }></DetailRow>

      {toChain?.isCosmos && (
        <>
          <DetailRow
            text={
              <>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12
                  }}>
                  Target Chain
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.white
                  }}>
                  ({toChain?.name})
                </Typography>
              </>
            }
            value=""></DetailRow>

          <DetailRow
            text={''}
            value={
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: '12px',
                  px: '12px',
                  borderRadius: '10px',
                  width: '100%',
                  mt: '8px',
                  border: `1px solid ${isEditError ? colors.red : colors.white20}`,
                  transition: '.4s',
                  ':hover': {
                    border: `1px solid ${isEditError ? colors.red : colors.white_4}`
                  }
                }}>
                <MuiInput
                  onChange={(event) => {
                    setIsEditError(false);
                    dispatch(BridgeActions.update({ toAddress: event.target.value.trim() }));
                  }}
                  value={toAddress}
                  disabled={!isEditToAddress}
                  placeholder={`${toChain.prefix}...`}
                  sx={{
                    color: colors.white,
                    fontSize: '12px',
                    textAlign: 'left',
                    bgcolor: 'transparent',
                    p: '0',
                    width: '250px',
                    height: '20px',
                    border: 'none',
                    outline: 'none',
                    input: {
                      '&:disabled': {
                        WebkitTextFillColor: colors.grey12
                      }
                    }
                  }}
                  disableUnderline
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    cursor: 'pointer',
                    svg: {
                      path: {
                        stroke: colors.grey12,
                        transition: '.4s'
                      }
                    },
                    ':hover': {
                      svg: {
                        path: {
                          stroke: colors.white
                        }
                      }
                    }
                  }}>
                  {isEditToAddress ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 18 18"
                      fill="none"
                      onClick={() => {
                        const regex = createCosmosAddressRegex(toChain?.prefix);
                        if (!regex.test(toAddress)) {
                          setIsEditError(true);
                        } else {
                          setIsEditError(false);
                          setIsEditToAddress(false);
                        }
                      }}>
                      <path
                        d="M4.83333 1.5V4.33333C4.83333 4.80004 4.83333 5.0334 4.92416 5.21166C5.00406 5.36846 5.13154 5.49594 5.28834 5.57584C5.4666 5.66667 5.69996 5.66667 6.16667 5.66667H11.8333C12.3 5.66667 12.5334 5.66667 12.7117 5.57584C12.8685 5.49594 12.9959 5.36846 13.0758 5.21166C13.1667 5.0334 13.1667 4.80004 13.1667 4.33333V2.33333M13.1667 16.5V11.1667C13.1667 10.7 13.1667 10.4666 13.0758 10.2883C12.9959 10.1315 12.8685 10.0041 12.7117 9.92416C12.5334 9.83333 12.3 9.83333 11.8333 9.83333H6.16667C5.69996 9.83333 5.4666 9.83333 5.28834 9.92416C5.13154 10.0041 5.00406 10.1315 4.92416 10.2883C4.83333 10.4666 4.83333 10.7 4.83333 11.1667V16.5M16.5 6.77124V12.5C16.5 13.9001 16.5 14.6002 16.2275 15.135C15.9878 15.6054 15.6054 15.9878 15.135 16.2275C14.6002 16.5 13.9001 16.5 12.5 16.5H5.5C4.09987 16.5 3.3998 16.5 2.86502 16.2275C2.39462 15.9878 2.01217 15.6054 1.77248 15.135C1.5 14.6002 1.5 13.9001 1.5 12.5V5.5C1.5 4.09987 1.5 3.3998 1.77248 2.86502C2.01217 2.39462 2.39462 2.01217 2.86502 1.77248C3.3998 1.5 4.09987 1.5 5.5 1.5H11.2288C11.6364 1.5 11.8402 1.5 12.0321 1.54605C12.2021 1.58688 12.3647 1.65422 12.5138 1.7456C12.682 1.84867 12.8261 1.9928 13.1144 2.28105L15.719 4.88562C16.0072 5.17387 16.1513 5.318 16.2544 5.48619C16.3458 5.63531 16.4131 5.79789 16.4539 5.96795C16.5 6.15976 16.5 6.36358 16.5 6.77124Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      onClick={() => {
                        setIsEditToAddress(true);
                      }}>
                      <path
                        d="M9.16797 3.33332L3.33464 3.33332C2.89261 3.33332 2.46868 3.50891 2.15612 3.82147C1.84356 4.13403 1.66797 4.55796 1.66797 4.99999L1.66797 16.6667C1.66797 17.1087 1.84356 17.5326 2.15612 17.8452C2.46868 18.1577 2.89261 18.3333 3.33464 18.3333L15.0013 18.3333C15.4433 18.3333 15.8673 18.1577 16.1798 17.8452C16.4924 17.5326 16.668 17.1087 16.668 16.6667L16.668 10.8333M15.418 2.08332C15.7495 1.7518 16.1991 1.56555 16.668 1.56555C17.1368 1.56555 17.5864 1.7518 17.918 2.08332C18.2495 2.41484 18.4357 2.86448 18.4357 3.33332C18.4357 3.80216 18.2495 4.2518 17.918 4.58332L10.0013 12.5L6.66797 13.3333L7.5013 9.99999L15.418 2.08332Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Stack>
              </Stack>
            }></DetailRow>
        </>
      )}
    </>
  );

  const withdrawDetailItems = (
    <>
      <DetailRow
        text={'Est. Tansaction Fee'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.white}>
              {withdrawFee}
            </Typography>
            <Typography fontSize={'14px'} color={colors.grey12}>
              {sideFeeInfo?.asset.symbol}
            </Typography>
          </>
        }></DetailRow>
      <DetailRow text={'Est. Bridge Time'} value={'About 10 minutes'}></DetailRow>

      <DetailRow
        text={'Bridge Fees'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.grey12}>
              (~$
              {BigNumber(feePrice)
                .multipliedBy(formatUnitAmount(protocolFee || '0', sideFeeInfo?.asset.exponent || 8))
                .toFixed(2, BigNumber.ROUND_CEIL)}
              )
            </Typography>
            <Typography fontSize={'14px'} color={colors.white}>
              {formatUnitAmount(protocolFee || '0', sideFeeInfo?.asset.exponent || 8)}
            </Typography>
            <Typography fontSize={'14px'} color={colors.grey12}>
              {sideFeeInfo?.asset.symbol}
            </Typography>
          </>
        }
        tooltip={
          'For peg-in, fees will be deducted from your Bitcoin balance; for peg-out, fees will be deducted from your Side Chain balance.'
        }></DetailRow>

      <DetailRow
        text={'You will receive'}
        value={
          <>
            <Typography fontSize={'14px'} color={colors.white}>
              {yourReceive}
            </Typography>
            <Typography fontSize={'14px'} color={colors.grey12}>
              {toAsset?.asset.symbol}
            </Typography>
            <ImageIcon url={toAsset?.asset.logo} style={{ width: 20, height: 20, marginLeft: '4px' }}></ImageIcon>
          </>
        }></DetailRow>
    </>
  );

  const isDisabled =
    BigNumber(parseUnitAmount(bridgeAmount || '0', 8)).lt(fee) ||
    loading ||
    Number(fee) === 0 ||
    (!isDeposit && !withdrawFee) ||
    (isDeposit && (isEditToAddress || isEditError || !toAddress)) ||
    !tx.length ||
    getDepositIbcScriptLoading;

  return (
    <Layout>
      <Header
        title={'Review Transaction'}
        onBack={() => {
          window.history.go(-1);
        }}
      />
      <Content classname={'hide-scrollbar'}>
        <Row full relative mt="lg" rounded={true}>
          <Column
            full
            relative
            style={{
              gap: '12px'
            }}>
            <Column
              relative
              rounded
              style={{
                fontSize: '14px',
                padding: '8px',
                background: colors.card_bgColor,
                display: isDeposit ? 'flex' : 'none'
              }}>
              <Row relative full justifyBetween color={'grey12'}>
                <Typography color={colors.grey12} fontSize={'14px'} className="w-1/3 text-left">
                  Tx
                </Typography>

                <Typography color={colors.grey12} fontSize={'14px'} className="w-1/3">
                  Index
                </Typography>
                <Typography color={colors.grey12} fontSize={'14px'} className="text-right">
                  Amount
                </Typography>
              </Row>

              {tx.map((item) => {
                return (
                  <Row key={item.txid} relative full justifyBetween color={'white'}>
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: colors.white,
                        cursor: 'pointer',
                        transition: '.4s',
                        ':hover': {
                          color: colors.main,
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={() => {
                        window.open(`${SIDE_BTC_EXPLORER}/tx/${item?.txid}`, '_blank');
                      }}>
                      {formatAddress(item.txid || '-', 6)}
                    </Typography>

                    <Typography fontSize={'14px'} className="w-1/3 text-center">
                      {item.vout}
                    </Typography>
                    <Typography fontSize={'14px'} className="w-1/3 text-right">
                      {formatUnitAmount(item.satoshis.toString() || '0', 8)}
                    </Typography>
                  </Row>
                );
              })}
            </Column>

            <Column relative rounded bg={'card_bgColor'} classname=" p-2 py-3">
              {isDeposit ? depositDetailItems : withdrawDetailItems}
            </Column>

            <Row full itemsCenter>
              <Button
                preset="default"
                text="Last"
                full
                onClick={() => {
                  window.history.go(-1);
                }}
              />

              <Button
                full
                preset="primary"
                text="Confirm"
                disabled={isDisabled}
                onClick={() => {
                  bridge(btcBridgeDepositIbcScript);
                }}
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
