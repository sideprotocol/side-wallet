import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import 'swiper/css';

import { RawTxInfo, TxType } from '@/shared/types';
import { Button, Column, Content, Footer, Grid, Header, Image, Layout, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import useGetBtcStoreParams from '@/ui/hooks/useGetBtcStoreParams';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { amountToSatoshis, btcTosatoshis } from '@/ui/utils';
import { toReadableAmount } from '@/ui/utils/formatter';
import { Box } from '@mui/material';

import {
  usePrepareSendBTCCallback,
  useSafeBalance,
  useSpendUnavailableUtxos
} from '../../state/transactions/hooks/index';
import { useNavigate } from '../MainRoute';

export default function SwapSideScreen() {
  const currentAccount = useCurrentAccount();

  const [sideAmount, setSideAmount] = useState('');

  const { params } = useGetBtcStoreParams();

  const [rateExchange, setRateExchange] = useState(false);
  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const [rawTxInfo, setRawTxInfo] = useState<RawTxInfo>();

  const uiState = useUiTxCreateScreen();
  const navigate = useNavigate();
  const toInfo = uiState.toInfo;
  const inputAmount = uiState.inputAmount;
  const enableRBF = uiState.enableRBF;
  const feeRate = uiState.feeRate;

  const sideBalance = balanceList.find((b) => b.denom === 'uside');

  const satBalance = bitcoinBalanceList.find((b) => b.denom === 'sat');

  const sideToBtcRate = useMemo(() => {
    if (!params) return '-';

    return BigNumber(params.sidePriceInSats)
      .div(10 ** +(satBalance?.asset.exponent || 8))
      .toNumber();
  }, [params, satBalance]);

  const btcToSideRate = useMemo(() => {
    if (!params) return '-';

    return BigNumber(1).div(sideToBtcRate).toNumber();
  }, [sideToBtcRate]);

  const satAmount = useMemo(() => {
    if (!params) return '0';

    return toReadableAmount(
      BigNumber(sideAmount || 0)
        .times(params.sidePriceInSats)
        .toFixed(),
      satBalance?.asset.exponent || 8
    );
  }, [sideAmount, params]);

  const satValue = useMemo(() => {
    return (
      '$' +
      BigNumber(satAmount || '0')
        .times(satBalance?.denomPrice || 0)
        .toFormat()
    );
  }, [satBalance, satAmount]);

  const tooLessSideAmount = useMemo(() => {
    if (!params) return false;

    return BigNumber(sideAmount).lt(params.minPurchaseAmount);
  }, [sideAmount, params]);

  const tooMuchSideAmount = useMemo(() => {
    if (!params) return false;

    return BigNumber(sideAmount).gt(params.maxPurchaseAmount);
  }, [sideAmount, params]);

  const prepareSendBTC = usePrepareSendBTCCallback();

  const [disabled, setDisabled] = useState(true);

  const safeBalance = useSafeBalance();

  const avaiableSatoshis = useMemo(() => {
    return amountToSatoshis(safeBalance);
  }, [safeBalance]);

  const [error, setError] = useState('');
  const spendUnavailableUtxos = useSpendUnavailableUtxos();
  const spendUnavailableSatoshis = useMemo(() => {
    return spendUnavailableUtxos.reduce((acc, cur) => {
      return acc + cur.satoshis;
    }, 0);
  }, [spendUnavailableUtxos]);

  useEffect(() => {
    if (!satAmount || !params) return;

    setError('');
    setDisabled(true);

    const toSatoshis = +btcTosatoshis(+satAmount);

    if (toSatoshis > avaiableSatoshis + spendUnavailableSatoshis) {
      setError('Amount exceeds your available balance');
      return;
    }

    if (feeRate <= 0) {
      return;
    }

    prepareSendBTC({
      toAddressInfo: {
        address: params?.btcVaultAddress
      },
      toAmount: toSatoshis,
      feeRate,
      enableRBF
    })
      .then((data) => {
        setRawTxInfo(data);
        setDisabled(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [toInfo, inputAmount, feeRate, enableRBF, params, satAmount]);

  const disabledBuy = tooLessSideAmount || tooMuchSideAmount || !params || +satAmount <= 0 || disabled;

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Swap SIDE"
      />
      <Content gap="lg" mt="lg">
        <Column
          gap="xs"
          style={{
            borderRadius: '10px'
          }}
          bg="card_bgColor"
          px="lg"
          py="md">
          <Row px="md" full justifyBetween itemsCenter>
            <Text color="white" size="xs">
              How much would you like to buy?
            </Text>
          </Row>

          <Row
            bg="black"
            style={{
              height: 68
            }}
            px="md"
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              px="lg"
              py="md"
              bg="card_bgColor">
              <Image src={sideBalance?.asset.logo} height={24} width={24}></Image>

              <Text text={sideBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'} display={'flex'} justifyContent={'space-between'} gap={'2px'} height={'max-content'}>
              <CoinInput
                size={22}
                coin={{
                  amount: sideAmount,
                  denom: sideBalance?.denom || 'uside'
                }}
                onChange={(value) => {
                  setSideAmount(value);
                }}></CoinInput>

              <Grid
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '4px'
                }}>
                {['100', '200', '500', params?.maxPurchaseAmount || ''].map((item) => {
                  if (!item) return null;
                  return (
                    <Box
                      key={item}
                      sx={{
                        fontSize: '8px',
                        borderRadius: '4px',
                        bgcolor: colors.white1,
                        p: '0px 4px',
                        height: '20px',
                        color: colors.white2,
                        width: 'max-content',
                        cursor: 'pointer',
                        ':hover': {
                          color: colors.main
                        }
                      }}
                      onClick={() => {
                        setSideAmount(item);
                      }}>
                      {item}
                    </Box>
                  );
                })}
              </Grid>
            </Box>
          </Row>

          <Row px="md" full justifyBetween itemsCenter mt="lg">
            <Text color="white" size="xs">
              You need to pay
            </Text>
          </Row>

          <Row
            bg="black"
            style={{
              height: 68
            }}
            px="md"
            itemsCenter
            rounded
            py="md">
            <Row
              style={{
                flexShrink: 0
              }}
              rounded={true}
              py="md"
              px="lg"
              itemsCenter
              bg="card_bgColor">
              <Image src={satBalance?.asset.logo} height={24} width={24}></Image>

              <Text text={satBalance?.asset.symbol || 'BTC'} color="white" size="md"></Text>
            </Row>

            <Box py={'2px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'2px'}>
              <CoinInput
                readOnly
                onChange={(_) => null}
                size={22}
                decimalScale={+(satBalance?.asset.exponent || 8)}
                coin={{
                  amount: satAmount,
                  denom: satBalance?.denom || 'uusdc'
                }}></CoinInput>

              <Box>
                <Text text={satValue} color="grey12" size="xs"></Text>
              </Box>
            </Box>
          </Row>

          <Column rounded px="lg" py="md" full justifyBetween bg="black" mt="lg">
            <Row itemsCenter justifyBetween>
              <Row itemsCenter gap="xs">
                <Text text={rateExchange ? 'BTC/SIDE' : 'SIDE/BTC'} color="grey12" size="sm"></Text>
                <Box
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setRateExchange((b) => !b);
                  }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.66797 10.3333H12.3346M12.3346 10.3333L9.66797 7.66667M12.3346 10.3333L9.66797 13M12.3346 3.66667H1.66797M1.66797 3.66667L4.33464 1M1.66797 3.66667L4.33464 6.33333"
                      stroke="#6C7080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
              </Row>

              <Text text={rateExchange ? btcToSideRate : sideToBtcRate} color="white" size="sm"></Text>
            </Row>

            <Row itemsCenter justifyBetween>
              <Text text="Estimated Time" color="grey12" size="sm"></Text>

              <Text text="~ 10 minutes" color="white" size="sm"></Text>
            </Row>
          </Column>

          <Row>
            <Text color="red" size="xs">
              {tooLessSideAmount
                ? `Min purchase amount: ${params?.minPurchaseAmount}`
                : tooMuchSideAmount
                ? `Max purchase amount: ${params?.maxPurchaseAmount}`
                : null}
            </Text>
          </Row>

          <Row fullX mt="xl">
            <Button
              onClick={() => {
                navigate('TxConfirmScreen', { rawTxInfo, type: TxType.SWAP_SIDE });
              }}
              disabled={disabledBuy}
              text="Buy Now"
              preset="primary"
              full></Button>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="swap" />
      </Footer>
    </Layout>
  );
}
