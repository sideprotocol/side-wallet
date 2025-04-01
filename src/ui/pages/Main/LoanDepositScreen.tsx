import { useEffect, useMemo, useState } from 'react';
import 'swiper/css';

import { COIN_DUST } from '@/shared/constant';
import { RawTxInfo } from '@/shared/types';
import { Button, Column, Content, Footer, Image, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { NavTabBar } from '@/ui/components/NavTabBar';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { useNavigate } from '@/ui/pages/MainRoute';
// import { useSendRune } from '@/ui/state/send/hook';
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
import { amountToSatoshis, isValidAddress, satoshisToAmount, useLocationState } from '@/ui/utils';

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
      console.log(toSatoshis, avaiableSatoshis + spendUnavailableSatoshis, 'exceed');
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
            size="xs"
            style={{
              fontWeight: 700
            }}></Text>
        </Row>

        <Row
          bg="black_dark2"
          fullX
          style={{
            borderRadius: '10px',
            height: 6
          }}>
          <Row
            bg="main"
            fullY
            style={{
              width: '50%',
              borderRadius: '10px'
            }}
          />
        </Row>

        <Column itemsCenter gap="xl" mt="lg">
          <Text text="Funding using Side Wallet" color="white_muted" size="xs"></Text>

          <Image src="/images/logo/wallet-logo.png" width={62} height={62} />

          <Image src="/images/icons/side_wallet.svg" width={186} height={20} />

          <Row fullX mt="xl">
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
              text="Sign"
              preset="primary"></Button>
          </Row>

          <Text text="or" color="white_muted" size="xs"></Text>

          <Row
            py="lg"
            itemsCenter
            justifyCenter
            fullX
            style={{
              border: `1px solid ${colors.white1}`,
              borderRadius: 10
            }}>
            <Text text="Funding using another wallet on web app" color="white" size="xs"></Text>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
