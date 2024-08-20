import { Tooltip } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { COIN_DUST } from '@/shared/constant';
import { TxType } from '@/shared/types';
import { Button, Column, Content, Header, Icon, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { FeeRateBar } from '@/ui/components/FeeRateBar';
import { RBFBar } from '@/ui/components/RBFBar';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useAccountBalance } from '@/ui/state/accounts/hooks';
// import { useSendRune } from '@/ui/state/send/hook';
import {
  // useBitcoinTx,
  useFetchUtxosCallback,
  // usePrepareSendBTCCallback,
  useSafeBalance,
  useSpendUnavailableUtxos
} from '@/ui/state/transactions/hooks';
import { useUiTxCreateScreen, useUpdateUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { fontSizes } from '@/ui/theme/font';
import { amountToSatoshis, isValidAddress, parseUnitAmount, satoshisToAmount, useLocationState } from '@/ui/utils';
import { useBridge } from '@/ui/state/bridge/hook';
import BigNumber from 'bignumber.js';
// import { bridgeStore } from '@/ui/stores/BridgeStore';

interface LocationState {
  base: string;
  token: any;
}

export default function CreateSendBtc() {
  const accountBalance = useAccountBalance();
  const safeBalance = useSafeBalance();
  const navigate = useNavigate();
  // const bitcoinTx = useBitcoinTx();
  const { depositBTC } = useBridge();

  const { base, token } = useLocationState<LocationState>();

  const [disabled, setDisabled] = useState(true);

  const dustAmount = useMemo(() => satoshisToAmount(COIN_DUST), [COIN_DUST]);
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
  // console.log(`token: `, token);

  const avaiableSatoshis = useMemo(() => {
    return amountToSatoshis(safeBalance);
  }, [safeBalance]);

  const toSatoshis = useMemo(() => {
    if (!inputAmount) return 0;
    return amountToSatoshis(inputAmount);
  }, [inputAmount]);
  const spendUnavailableUtxos = useSpendUnavailableUtxos();
  const spendUnavailableSatoshis = useMemo(() => {
    return spendUnavailableUtxos.reduce((acc, cur) => {
      return acc + cur.satoshis;
    }, 0);
  }, [spendUnavailableUtxos]);
  const spendUnavailableAmount = satoshisToAmount(spendUnavailableSatoshis);
  const totalSatoshis = amountToSatoshis(accountBalance.amount);
  const unavailableSatoshis = totalSatoshis - avaiableSatoshis;
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
      setError(`Amount must be at least ${dustAmount} BTC`);
      return;
    }
    if (BigNumber(inputAmount).gt(BigNumber(token?.balanceAva || '0'))) {
      setError('Amount exceeds your available balance');
      return;
    }

    if (!!inputAmount && BigNumber(inputAmount || '0').lte(BigNumber(token?.balanceAva || '0'))) {
      setDisabled(false);
    }

    if (feeRate <= 0) {
      return;
    }

    // if (
    //   toInfo.address == bitcoinTx.toAddress &&
    //   toSatoshis == bitcoinTx.toSatoshis &&
    //   feeRate == bitcoinTx.feeRate &&
    //   enableRBF == bitcoinTx.enableRBF
    // ) {
    //   //Prevent repeated triggering caused by setAmount
    //   setDisabled(false);
    //   return;
    // }

    // if (
    //   toInfo.address == bitcoinTx.toAddress &&
    //   toSatoshis == bitcoinTx.toSatoshis &&
    //   feeRate == bitcoinTx.feeRate &&
    //   enableRBF == bitcoinTx.enableRBF
    // ) {
    //   //Prevent repeated triggering caused by setAmount
    //   setDisabled(false);
    //   return;
    // }

    // prepareSendBTC({ toAddressInfo: toInfo, toAmount: toSatoshis, feeRate, enableRBF })
    //   .then((data) => {
    //     // if (data.fee < data.estimateFee) {
    //     //   setError(`Network fee must be at leat ${data.estimateFee}`);
    //     //   return;
    //     // }
    //     setRawTxInfo(data);
    //     setDisabled(false);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     setError(e.message);
    //   });
  }, [toInfo, inputAmount, feeRate, enableRBF]);

  // console.log(`token: `, token);

  return (
    <Layout
      style={{
        position: 'relative'
      }}>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={`Send ${token.symbol}`}
      />

      <Row
        style={{
          background: '#222',
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
            marginTop: '6px'
          }}>
          <Image src={token.logo} size={50}></Image>
          {/* <Icon icon={token.logo || 'btc'} size={50} /> */}
        </Row>
      </Row>

      <Content
        style={{
          position: 'relative',
          borderTop: '1px solid #404045',
          borderRadius: '10px',
          background: '#222',
          padding: '16px 16px 64px 16px',
          marginTop: '66px',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
        }}>
        <Column mt="xxl">
          <Text text="Recipient" preset="regular" color="textDim" />
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
          <Text text="Transfer amount" preset="regular" color="textDim" />
          <Input
            preset="amount"
            placeholder={'Amount'}
            defaultValue={inputAmount}
            value={inputAmount}
            onAmountInputChange={(amount) => {
              if (autoAdjust) {
                setAutoAdjust(false);
              }
              setError('');
              setUiState({ inputAmount: amount });
            }}
            enableMax={true}
            onMaxClick={() => {
              setAutoAdjust(true);
              // setUiState({ inputAmount: totalAvailableAmount.toString() });
              setUiState({ inputAmount: token?.balanceAva?.toString() });
            }}
          />
          {error && <Text text={error} color="error" />}

          <Row justifyBetween>
            <Text text="Available" color="primary" />
            {spendUnavailableSatoshis > 0 && (
              <Row>
                <Text text={`${spendUnavailableAmount}`} size="sm" style={{ color: '#65D5F0' }} />
                <Text text={'BTC'} size="sm" color="textDim" />
                <Text text={'+'} size="sm" color="textDim" />
              </Row>
            )}

            <Row>
              <Text text={`${token?.balanceAva}`} size="sm" color="primary" />
              <Text text={'BTC'} size="sm" color="textDim" />
            </Row>
          </Row>

          <Row justifyBetween>
            <Tooltip
              title={
                'Includes Inscriptions, ARC20, Runes, and unconfirmed UTXO assets. Future versions will support spending these assets.'
              }
              overlayStyle={{
                fontSize: fontSizes.xs
              }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Row itemsCenter>
                  <Text
                    text="Unavailable"
                    // text="Unavailable >"
                    color="textDim"
                    // onClick={() => {
                    //   navigate('UnavailableUtxoScreen');
                    // }}
                  />
                  <Icon icon="circle-question" color="textDim" />
                </Row>
              </div>
            </Tooltip>

            {spendUnavailableSatoshis > 0 ? (
              <Row>
                <Text text={`${unspendUnavailableAmount}`} size="sm" color="white" />
                <Text text={'BTC'} size="sm" color="textDim" />
              </Row>
            ) : (
              <Row>
                <Text text={`${token?.balanceNot}`} size="sm" color="white" />
                <Text text={'BTC'} size="sm" color="textDim" />
              </Row>
            )}
          </Row>

          <Row justifyBetween>
            <Text text="Total" color="textDim" />
            <Row>
              <Text text={`${token?.balance}`} size="sm" color="white" />
              <Text text={'BTC'} size="sm" color="textDim" />
            </Row>
          </Row>
        </Column>

        <Column mt="lg">
          <Text text="Fee" color="white" />

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
            onClick={async(e) => {
              try {
                const rawTxInfo = await depositBTC({
                  to: toInfo.address,
                  amount: BigNumber(parseUnitAmount(inputAmount, 8)).toNumber(),
                  fee: uiState.feeRate,
                  isSign: false,
                  // enableRBF: uiState.enableRBF,
                })
                console.log(`rawTxInfo: `, rawTxInfo);
                if (rawTxInfo) {
                  // navigate('TxConfirmScreen', { rawTxInfo });
                  navigate('TxConfirmScreen', {  rawTxInfo, type: TxType.SEND_BTC_TEST });
                }
              } catch (err) {
                console.log('error: ', err);
                tools.toastError(err.message);
              }
            }}></Button>
        </Column>
      </Content>
    </Layout>
  );
}
