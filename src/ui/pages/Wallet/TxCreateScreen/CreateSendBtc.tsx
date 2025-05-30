import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';

import { COIN_DUST } from '@/shared/constant';
import { BalanceItem, RawTxInfo } from '@/shared/types';
import { Button, Column, Content, Header, Image, Input, Layout, LightTooltip, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { FeeRateBar } from '@/ui/components/FeeRateBar';
import { RBFBar } from '@/ui/components/RBFBar';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
// import { useSendRune } from '@/ui/state/send/hook';
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
import { amountToSatoshis, isValidAddress, satoshisToAmount, useLocationState } from '@/ui/utils';
import { Typography } from '@mui/material';

interface LocationState {
  base: string;
  token: BalanceItem;
}

export default function CreateSendBtc() {
  const accountBalance = useAccountBalance();
  const safeBalance = useSafeBalance();
  const navigate = useNavigate();
  const bitcoinTx = useBitcoinTx();
  const btcUnit = useBTCUnit();

  const { token } = useLocationState<LocationState>();
  const [disabled, setDisabled] = useState(true);

  const setUiState = useUpdateUiTxCreateScreen();
  const uiState = useUiTxCreateScreen();

  const toInfo = uiState.toInfo;
  const inputAmount = uiState.inputAmount;
  const enableRBF = uiState.enableRBF;
  const feeRate = uiState.feeRate;

  const [error, setError] = useState('');
  const [autoAdjust, setAutoAdjust] = useState(false);
  const fetchUtxos = useFetchUtxosCallback();

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
  const spendUnavailableAmount = satoshisToAmount(spendUnavailableSatoshis);

  const totalAvailableSatoshis = avaiableSatoshis + spendUnavailableSatoshis;
  const totalAvailableAmount = satoshisToAmount(totalAvailableSatoshis);

  const totalSatoshis = amountToSatoshis(accountBalance.amount);
  const unavailableSatoshis = totalSatoshis - avaiableSatoshis;

  const avaiableAmount = safeBalance;

  const unavailableAmount = satoshisToAmount(unavailableSatoshis);
  const totalAmount = accountBalance.amount;

  const unspendUnavailableAmount = satoshisToAmount(unavailableSatoshis - spendUnavailableSatoshis);

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
        console.log(e);
        setError(e.message);
      });
  }, [toInfo, inputAmount, feeRate, enableRBF]);

  return (
    <Layout
      style={{
        position: 'relative'
      }}>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={`Send ${token?.asset.symbol}`}
      />

      <Row
        style={{
          background: colors.black_dark,
          width: '74px',
          height: '74px',
          position: 'absolute',
          top: '92px',
          left: '50%',
          borderRadius: '50%',
          transform: 'translate(-50%, 0)',
          zIndex: 2,
          borderTop: '1px solid #404045',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
        }}
        justifyCenter>
        <Row
          style={{
            marginTop: '10px'
          }}>
          <Image src={token?.asset.logo} size={50}></Image>
        </Row>
      </Row>

      <Content
        style={{
          position: 'relative',
          borderTop: '1px solid #404045',
          borderRadius: '10px',
          padding: '16px 16px 64px 16px',
          marginTop: '66px',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
          background: colors.black_dark
        }}>
        <Column mt="xxl">
          <Text text="Recipient" preset="regular" color="white" />
          <Input
            preset="address"
            addressInputData={toInfo}
            onAddressInputChange={(val) => {
              setUiState({ toInfo: val });
            }}
            autoFocus={true}
          />
        </Column>

        <Column mt="lg">
          <Text text="Transfer amount" preset="regular" color="white" />
          <Input
            preset="amount"
            placeholder={'Amount'}
            value={inputAmount}
            onAmountInputChange={(amount) => {
              setError('');
              if (autoAdjust == true) {
                setAutoAdjust(false);
              }
              setUiState({ inputAmount: amount });
            }}
            enableMax={true}
            onMaxClick={() => {
              setAutoAdjust(true);
              setUiState({ inputAmount: totalAvailableAmount.toString() });
              // setUiState({ inputAmount: token?.balance?.toString() });
            }}
          />
          {error && <Text text={error} color="error" />}

          <Row justifyBetween itemsCenter>
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.main
              }}>
              Available
            </Typography>
            {spendUnavailableSatoshis > 0 && (
              <Row>
                <Text text={`${BigNumber(spendUnavailableAmount).toFormat()}`} size="sm" style={{ color: '#65D5F0' }} />
                <Text text={token.asset.symbol} size="sm" color="textDim" />
                <Text text={'+'} size="sm" color="textDim" />
              </Row>
            )}

            <Row>
              <Text text={`${BigNumber(avaiableAmount).toFormat()}`} size="sm" color="primary" />
              <Text text={token.asset.symbol} size="sm" color="textDim" />
            </Row>
          </Row>

          <Row justifyBetween itemsCenter>
            <LightTooltip
              title={
                'Includes Inscriptions, ARC20, Runes, and unconfirmed UTXO assets. Future versions will support spending these assets.'
              }
              arrow
              placement="top">
              <Typography
                sx={{
                  fontSize: '14px',
                  color: colors.grey12,
                  textDecoration: 'dotted underline',
                  textUnderlineOffset: '2px',
                  cursor: 'pointer',
                  transition: '.4s',
                  ':hover': {
                    color: colors.white
                  }
                }}>
                Unavailable
              </Typography>
            </LightTooltip>

            {spendUnavailableSatoshis > 0 ? (
              <Row>
                <Text text={`${BigNumber(unspendUnavailableAmount).toFormat()}`} size="sm" color="white" />
                <Text text={''} size="sm" color="textDim" />
              </Row>
            ) : (
              <Row>
                <Text text={`${BigNumber(unavailableAmount).toFormat()}`} size="sm" color="white" />
                <Text text={token.asset.symbol} size="sm" color="textDim" />
              </Row>
            )}
          </Row>

          <Row justifyBetween itemsCenter>
            <Typography
              sx={{
                fontSize: '14px',
                color: colors.grey12
              }}>
              Total
            </Typography>
            <Row>
              <Text text={`${BigNumber(totalAmount).toFormat()}`} size="sm" color="white" />
              <Text text={token.asset.symbol} size="sm" color="textDim" />
            </Row>
          </Row>
        </Column>

        <Column mt="lg">
          <Typography
            sx={{
              fontSize: '14px',
              color: colors.white
            }}>
            Fee
          </Typography>

          <FeeRateBar
            onChange={(val) => {
              setUiState({ feeRate: val });
            }}
          />
        </Column>

        <Column mt="lg">
          <RBFBar
            defaultValue={enableRBF}
            onChange={(val) => {
              setUiState({ enableRBF: val });
            }}
          />
        </Column>

        <Column mt="lg">
          {/*{error && <Text text={error} color="error" />}*/}
          <Button
            disabled={disabled}
            preset="primary"
            text="Next"
            onClick={async (e) => {
              navigate('TxConfirmScreen', { rawTxInfo });
            }}></Button>
        </Column>
      </Content>
    </Layout>
  );
}
