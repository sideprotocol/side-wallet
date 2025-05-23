import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import 'swiper/css';

import { COIN_DUST, SIDE_BTC_EXPLORER } from '@/shared/constant';
import { RawTxInfo } from '@/shared/types';
import { Button, Column, Content, Footer, Icon, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import ImageIcon from '@/ui/components/ImageIcon';
import { NavTabBar } from '@/ui/components/NavTabBar';
import ToastView from '@/ui/components/ToastView';
import useGetDepositTx from '@/ui/hooks/useGetDepositTx';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useNavigate } from '@/ui/pages/MainRoute';
import { LiquidationEvent } from '@/ui/services/lending/types';
import { useBTCUnit } from '@/ui/state/settings/hooks';
import {
  useBitcoinTx,
  useFetchUtxosCallback,
  usePrepareSendBTCCallback,
  useSafeBalance,
  useSpendUnavailableUtxos
} from '@/ui/state/transactions/hooks';
import { useUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { amountToSatoshis, copyToClipboard, isValidAddress, satoshisToAmount, useLocationState } from '@/ui/utils';
import { Box, Stack, Typography } from '@mui/material';

interface LoanDepositLocationState {
  borrowAmount: string;
  collateralAmount: string;
  liquidationEvent: LiquidationEvent;
}

export default function LoanDepositScreen() {
  const { borrowAmount, collateralAmount, liquidationEvent } = useLocationState<LoanDepositLocationState>();

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
    fetchUtxos().finally(() => {
      tools.showLoading(false);
    });
  }, []);

  const prepareSendBTC = usePrepareSendBTCCallback();

  const [isClickCopy, setIsClickCopy] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const [isClickCopyAmount, setIsClickCopyAmount] = useState(false);

  const [temporaryLoading, setTemporaryLoading] = useState(false);

  const { refetch, depositTxs } = useGetDepositTx(toInfo.address, collateralAmount);

  useEffect(() => {
    console.log({ depositTxs });

    if (depositTxs?.length) {
      navigate('LoanAuthorizeScreen', {
        loanId: toInfo.address,
        borrowAmount,
        collateralAmount,
        feeRate,
        liquidationEvent
      });
    }
  }, [depositTxs]);

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
        <Row>
          <Text
            text="Step 1: Fund BTC Collateral"
            size="lg"
            style={{
              fontWeight: 700
            }}></Text>
        </Row>

        <Row
          bg="black_dark2"
          fullX
          style={{
            // borderRadius: '100%',
            borderRadius: '10px',
            height: 6
          }}>
          <Row
            bg="main"
            fullY
            style={{
              borderRadius: '10px',
              width: '50%'
            }}
          />
        </Row>

        <Column itemsCenter gap="lg">
          <Box
            sx={{
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
            <QRCodeSVG value={toInfo.address} marginSize={1} width={140} height={140} fgColor={'#000'} />
          </Box>

          <Stack
            justifyContent="space-between"
            gap="8px"
            sx={{
              flex: 1,
              overflow: 'hidden'
            }}>
            <Box>
              <Typography
                color={colors.grey12}
                sx={{
                  fontSize: '12px'
                }}>
                Collateral Vault Address
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="8px"
                sx={{
                  p: '8px',
                  borderRadius: '10px',
                  bgcolor: colors.card_bgColor,
                  width: '100%',
                  mt: '8px'
                }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 500,
                    wordBreak: 'break-all',
                    lineHeight: '16px',
                    cursor: 'pointer',
                    ':hover': {
                      textDecorationLine: 'underline'
                    }
                  }}
                  onClick={() => {
                    window.open(`${SIDE_BTC_EXPLORER}/address/${toInfo.address}`);
                  }}>
                  {toInfo.address}
                </Typography>
                <Box
                  onClick={(e) => {
                    copyToClipboard(toInfo.address).then(() => {
                      // tools.toastSuccess('Copied');
                      setTimeout(() => {
                        setIsClickCopy(false);
                      }, 3000);
                    });
                    setIsClickCopy(true);
                  }}>
                  <Icon color="main" icon={isClickCopy ? 'check-circle-broken' : 'copy2'} size={16} />
                </Box>
              </Stack>
            </Box>
            <Box>
              <Typography
                color={colors.grey12}
                sx={{
                  fontSize: '12px'
                }}>
                Collatearl Amount
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="8px"
                sx={{
                  p: '8px',
                  borderRadius: '10px',
                  bgcolor: colors.card_bgColor,
                  width: '100%',
                  mt: '8px'
                }}>
                <Stack direction="row" alignItems="center" gap="4px">
                  <ImageIcon
                    url={'/images/img/btc.png'}
                    style={{
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 500
                    }}>
                    {satoshisToAmount(+collateralAmount)}
                  </Typography>
                </Stack>
                <Box
                  onClick={(e) => {
                    copyToClipboard(satoshisToAmount(+collateralAmount)).then(() => {
                      setTimeout(() => {
                        setIsClickCopyAmount(false);
                      }, 3000);
                    });
                    setIsClickCopyAmount(true);
                  }}>
                  <Icon color="main" icon={isClickCopyAmount ? 'check-circle-broken' : 'copy2'} size={16} />
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Row fullX>
            <Button
              onClick={() => {
                navigate('TxConfirmScreen', {
                  rawTxInfo,
                  lendingState: {
                    loanId: toInfo.address,
                    borrowAmount,
                    collateralAmount,
                    feeRate,
                    liquidationEvent
                  }
                });
              }}
              full
              disabled={disabled}
              text="Deposit"
              preset="primary"></Button>
          </Row>

          <Stack direction="row" justifyContent="center" alignItems="center" gap="4px">
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
                fontSize: '14px',
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
                  fontSize: '14px',
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
