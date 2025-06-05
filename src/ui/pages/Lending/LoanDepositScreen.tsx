import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';

import { COIN_DUST } from '@/shared/constant';
import { RawTxInfo } from '@/shared/types';
import { Button, Column, Content, CopyIcon, Footer, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import ToastView from '@/ui/components/ToastView';
import useGetDepositTx from '@/ui/hooks/useGetDepositTx';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useNavigate } from '@/ui/pages/MainRoute';
import { LiquidationEvent } from '@/ui/services/lending/types';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useBTCUnit } from '@/ui/state/settings/hooks';
import {
  useBitcoinTx,
  useFetchUtxosCallback,
  usePrepareSendBTCCallback,
  useSafeBalance,
  useSpendUnavailableUtxos
} from '@/ui/state/transactions/hooks';
import { useUiTxCreateScreen, useUpdateUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { amountToSatoshis, formatUnitAmount, isValidAddress, satoshisToAmount, useLocationState } from '@/ui/utils';
import { Box, Stack, Typography } from '@mui/material';

interface LoanDepositLocationState {
  borrowAmount: string;
  collateralAmount: string;
  liquidationEvent: LiquidationEvent;
  loanId: string;
  from?: string;
}

export default function LoanDepositScreen() {
  const { SIDE_BTC_EXPLORER } = useEnvironment();
  const setUiState = useUpdateUiTxCreateScreen();
  const { borrowAmount, collateralAmount, liquidationEvent, loanId, from } =
    useLocationState<LoanDepositLocationState>();

  const safeBalance = useSafeBalance();
  const navigate = useNavigate();
  const bitcoinTx = useBitcoinTx();
  const btcUnit = useBTCUnit();

  const uiState = useUiTxCreateScreen();

  const toInfo = uiState.toInfo;
  const inputAmount = uiState.inputAmount;
  const enableRBF = uiState.enableRBF;
  const feeRate = uiState.feeRate;

  const [error, setError] = useState('');
  const fetchUtxos = useFetchUtxosCallback();
  const [disabled, setDisabled] = useState(true);
  const tools = useTools();

  useEffect(() => {
    tools.showLoading(true);
    setUiState({
      toInfo: {
        address: loanId,
        domain: ''
      },
      inputAmount: formatUnitAmount(collateralAmount, 8)
    });
    fetchUtxos().finally(() => {
      tools.showLoading(false);
    });
  }, []);

  const prepareSendBTC = usePrepareSendBTCCallback();

  const [errorMsg, setErrorMsg] = useState('');
  const [temporaryLoading, setTemporaryLoading] = useState(false);

  const { refetch, depositTxs, address } = useGetDepositTx(loanId, collateralAmount);

  useEffect(() => {
    if (address === loanId && depositTxs?.length) {
      navigate('LoanAuthorizeScreen', {
        loanId: toInfo.address,
        borrowAmount,
        collateralAmount,
        feeRate,
        liquidationEvent
      });
    }
  }, [depositTxs, loanId]);

  const avaiableSatoshis = useMemo(() => {
    return amountToSatoshis(safeBalance);
  }, [safeBalance]);

  const toSatoshis = useMemo(() => {
    if (!inputAmount) return 0;
    return amountToSatoshis(inputAmount);
  }, [inputAmount]);

  const dustAmount = useMemo(() => satoshisToAmount(COIN_DUST), [COIN_DUST]);

  const [rawTxInfo, setRawTxInfo] = useState<RawTxInfo>();

  const spendUnavailableUtxos = useSpendUnavailableUtxos();
  const spendUnavailableSatoshis = useMemo(() => {
    return spendUnavailableUtxos.reduce((acc, cur) => {
      return acc + cur.satoshis;
    }, 0);
  }, [spendUnavailableUtxos]);

  useEffect(() => {
    setError('');
    setDisabled(true);

    if (!isValidAddress(toInfo.address)) {
      return;
    }
    if (!toSatoshis) {
      return;
    }
    if (toSatoshis < COIN_DUST) {
      setError(`Amount must be at least ${dustAmount} ${btcUnit}`);
      return;
    }

    if (toSatoshis > avaiableSatoshis + spendUnavailableSatoshis) {
      setError('Amount exceeds your available balance');
      return;
    }

    if (feeRate <= 0) {
      return;
    }

    if (
      toInfo.address == bitcoinTx.toAddress &&
      toSatoshis == bitcoinTx.toSatoshis &&
      feeRate == bitcoinTx.feeRate &&
      enableRBF == bitcoinTx.enableRBF
    ) {
      setError('');
      //Prevent repeated triggering caused by setAmount
      setDisabled(false);
      return;
    }

    prepareSendBTC({ toAddressInfo: toInfo, toAmount: toSatoshis, feeRate, enableRBF })
      .then((data) => {
        setRawTxInfo(data);
        setDisabled(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [toInfo, inputAmount, feeRate, enableRBF, avaiableSatoshis, spendUnavailableSatoshis]);

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="lg">
        <Row justifyCenter>
          <Text
            text="Step 1: Lock BTC Collateral"
            size="lg"
            style={{
              fontWeight: 700
            }}></Text>
        </Row>

        <Row
          bg="black_dark2"
          fullX
          style={{
            flexShrink: 0,
            position: 'relative',
            borderRadius: '10px',
            height: '6px'
          }}>
          <Row
            bg="main"
            fullY
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: '10px',
              width: '50%',
              height: '100%'
            }}
          />
        </Row>

        <Column
          itemsCenter
          style={{
            gap: '0'
          }}>
          <Stack
            sx={{
              width: '100%',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="8px"
              sx={{
                height: '50px',
                bgcolor: colors.card_bgColor
              }}>
              <Stack direction="row" alignItems="center" gap="4px">
                <ImageIcon
                  url={'/images/img/btc.png'}
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '24px',
                    fontWeight: 600
                  }}>
                  {+satoshisToAmount(+collateralAmount)}
                </Typography>
              </Stack>
              <CopyIcon
                size={16}
                text={satoshisToAmount(+collateralAmount)}
                onlyIcon
                style={{
                  cursor: 'pointer'
                }}
              />
            </Stack>
            <Stack
              alignItems="center"
              gap="12px"
              sx={{
                p: '12px 16px',
                bgcolor: colors.black
              }}>
              <Box
                sx={{
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                <QRCodeSVG
                  value={toInfo.address}
                  includeMargin
                  width={130}
                  height={130}
                  bgColor={colors.white}
                  fgColor={colors.black}
                />
              </Box>
              <Stack
                sx={{
                  cursor: 'pointer',
                  ':hover': {
                    p: {
                      color: colors.main,
                      textDecorationLine: 'underline'
                    }
                  }
                }}
                onClick={() => {
                  window.open(`${SIDE_BTC_EXPLORER}/address/${toInfo.address}`);
                }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                  {toInfo.address.slice(0, 40)}
                </Typography>
                <Stack direction="row" gap="4px" justifyContent="center" alignItems="center">
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                    {toInfo.address.slice(40)}
                  </Typography>
                  <CopyIcon text={toInfo.address} onlyIcon size={12} />
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              gap="8px"
              sx={{
                height: '42px',
                bgcolor: colors.card_bgColor
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M5.4987 9.58314L7.16536 11.2498L10.9154 7.49981M14.6654 9.99981C14.6654 14.0902 10.2037 17.0651 8.58036 18.0122C8.39586 18.1198 8.30362 18.1737 8.17343 18.2016C8.0724 18.2232 7.925 18.2232 7.82396 18.2016C7.69378 18.1737 7.60153 18.1198 7.41704 18.0122C5.79367 17.0651 1.33203 14.0902 1.33203 9.99981V6.01448C1.33203 5.34822 1.33203 5.01509 1.441 4.72873C1.53726 4.47576 1.69368 4.25004 1.89675 4.07109C2.12661 3.86851 2.43853 3.75154 3.06237 3.5176L7.53053 1.84204C7.70378 1.77707 7.7904 1.74459 7.87952 1.73171C7.95856 1.72029 8.03883 1.72029 8.11788 1.73171C8.20699 1.74459 8.29362 1.77707 8.46686 1.84204L12.935 3.5176C13.5589 3.75154 13.8708 3.86851 14.1006 4.07109C14.3037 4.25004 14.4601 4.47576 14.5564 4.72873C14.6654 5.01509 14.6654 5.34822 14.6654 6.01448V9.99981Z"
                  stroke={colors.green_success}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: colors.green_success
                }}>
                Your bitcoin is secured in a 2-of-2 multisig vault. Your key is required to authorize any spending,
                ensuring no one can move your funds without your approval
              </Typography>
            </Stack>
          </Stack>

          <Row
            fullX
            style={{
              marginTop: '12px'
            }}>
            <Button
              onClick={() => {
                navigate('TxConfirmScreen', {
                  rawTxInfo,
                  lendingState: {
                    loanId: toInfo.address,
                    borrowAmount,
                    collateralAmount,
                    feeRate,
                    liquidationEvent,
                    from
                  }
                });
              }}
              full
              disabled={disabled}
              text="Lock"
              preset="primary"></Button>
          </Row>
          {error && <Text text={error} color={'red'} size="xs" textCenter></Text>}

          <Stack direction="row" justifyContent="center" alignItems="center" gap="4px" mt="12px">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.754 5.2C5.89506 4.799 6.17349 4.46086 6.53997 4.24548C6.90645 4.0301 7.33734 3.95136 7.75631 4.02323C8.17527 4.09509 8.55529 4.31291 8.82905 4.63812C9.1028 4.96332 9.25263 5.37491 9.252 5.8C9.252 7 7.452 7.6 7.452 7.6M7.5 10H7.506M13.5 7C13.5 10.3137 10.8137 13 7.5 13C4.18629 13 1.5 10.3137 1.5 7C1.5 3.68629 4.18629 1 7.5 1C10.8137 1 13.5 3.68629 13.5 7Z"
                stroke="#6C7080"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.grey12,
                small: {}
              }}>
              Deposited from another wallet?
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              gap="2px"
              sx={{
                cursor: 'pointer',
                p: {
                  color: colors.white
                },
                path: {
                  stroke: colors.white
                },
                ':hover': {
                  p: {
                    color: colors.main
                  },
                  path: {
                    stroke: colors.main
                  }
                }
              }}
              onClick={async () => {
                try {
                  setTemporaryLoading(true);
                  const { error: err } = await refetch();

                  const error = err as Error;
                  if (error) {
                    setErrorMsg(error.message);
                    toast.custom((t) => (
                      <ToastView toaster={t} type="fail">
                        <Box
                          sx={{
                            mb: '6px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                          {error.message}
                        </Box>
                      </ToastView>
                    ));
                  } else {
                    setErrorMsg('');
                  }
                } catch {
                  setTemporaryLoading(false);
                } finally {
                  setTemporaryLoading(false);
                }
              }}>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  transition: '.4s'
                }}>
                Check status
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className={temporaryLoading ? 'animate-[spin_1s_linear_infinite]' : ''}>
                <g clipPath="url(#clip0_22981_11416)">
                  <path
                    d="M12.072 5.85742C12.072 5.85742 10.9263 4.2964 9.99551 3.36499C9.06474 2.43358 7.7785 1.85742 6.3577 1.85742C3.51738 1.85742 1.21484 4.15996 1.21484 7.00028C1.21484 9.8406 3.51738 12.1431 6.3577 12.1431C8.70233 12.1431 10.6805 10.5742 11.2995 8.42885M12.072 5.85742V2.42885M12.072 5.85742H8.64342"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: '.4s'
                    }}
                  />
                </g>
                <defs>
                  <clipPath id="clip0_22981_11416">
                    <rect width="13.7143" height="13.7143" fill="white" transform="translate(0.0703125 0.142578)" />
                  </clipPath>
                </defs>
              </svg>
            </Stack>
          </Stack>
          {errorMsg && <Text text={errorMsg} color={'red'} size="xs" textCenter></Text>}
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
