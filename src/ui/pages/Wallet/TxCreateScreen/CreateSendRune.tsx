import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';

import { RawTxInfo } from '@/shared/types';
import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Button, Column, Content, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { FeeRateBar } from '@/ui/components/FeeRateBar';
import { OutputValueBar } from '@/ui/components/OutputValueBar';
import { RBFBar } from '@/ui/components/RBFBar';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useBitcoinRuneBalance, useRuneListV2 } from '@/ui/state/bridge/hook';
import { useSendRune } from '@/ui/state/send/hook';
import { useBitcoinTx, useFetchUtxosCallback, useSafeBalance, usePrepareSendRunesCallback } from '@/ui/state/transactions/hooks';
import { useUiTxCreateScreen, useUpdateUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { parseUnitAmount, useLocationState } from '@/ui/utils';
import { getAddressUtxoDust } from '@unisat/wallet-sdk/lib/transaction';
import { runesUtils } from '@/shared/lib/runes-utils';

interface LocationState {
  base: string;
  token: any;
}

export default function CreateSendRune() {
  const safeBalance = useSafeBalance();
  const navigate = useNavigate();
  const bitcoinTx = useBitcoinTx();

  const { base, token } = useLocationState<LocationState>();

  const [disabled, setDisabled] = useState(true);

  const setUiState = useUpdateUiTxCreateScreen();

  const [outputValue, setOutputValue] = useState<number>(546);

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

  const minOutputValue = useMemo(() => {
    if (toInfo.address) {
      return getAddressUtxoDust(toInfo.address);
    } else {
      return 0;
    }
  }, [toInfo.address]);
  const prepareSendRunes = usePrepareSendRunesCallback();
  // const runeBalance = useBitcoinRuneBalance(token.base);
  const [rawTxInfo, setRawTxInfo] = useState<RawTxInfo>();
  const { tokens: runeList } = useRuneListV2();
  const { balance: runeBalance, runeid} = useMemo(() => {
    const rune = runeList.find((r) => r.base === token.base);
    return {
      ...rune,
      balance: runesUtils.toDecimalNumber(rune?.amount, token?.divisibility)
    };
  }, [token, runeList]);
  // const runeBalance =  runesUtils.toDecimalNumber(balance, token?.divisibility);
  // const { sendRune } = useSendRune();

  useEffect(() => {
    setError('');
    setDisabled(true);

    if (outputValue < minOutputValue) {
      setError(`outputValue should be greater or equal than ${minOutputValue}`);
    }

    if (!!inputAmount && BigNumber(inputAmount || '0').lte(runeBalance)) {
      setDisabled(false);
      return;
    }

    prepareSendRunes({
      toAddressInfo: toInfo,
      runeid: runeid,
      runeAmount: inputAmount || '0',
      outputValue: outputValue,
      feeRate,
      enableRBF
    })
      .then((data) => {
        console.log(`data: `, data);
        setRawTxInfo(data);
        setDisabled(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }, [toInfo, inputAmount, feeRate, enableRBF, runeBalance, minOutputValue, outputValue]);

  return (
    <Layout
      style={{
        position: 'relative'
      }}>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={'Send Rune'}
      />

      <Row
        style={{
          background: '#222',
          width: '74px',
          height: '74px',
          position: 'absolute',
          top: '66px',
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
        </Row>
      </Row>

      <Content
        style={{
          position: 'relative',
          borderTop: '1px solid #404045',
          borderRadius: '10px',
          background: '#222',
          padding: '16px 16px 64px 16px',
          marginTop: '30px',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
        }}>
        <Column mt="xxl">
          <Row
            itemsCenter
            justifyCenter
            pt="lg"
            style={{
              fontSize: '16px',
              color: '#0DD4C3'
            }}>
            {token.symbol}
          </Row>

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
          <Row full justifyBetween>
            <Text text="Balance" preset="regular" color="textDim" />

            <Row
              gap="sm"
              style={{
                fontSize: '14px'
              }}>
              <img src={WalletIcon} alt={'WalletIcon'} />

              <div>{runeBalance?.toString()}</div>

              {token.emoji}
            </Row>
          </Row>
          <Input
            preset="amount"
            placeholder={'Amount'}
            defaultValue={inputAmount}
            value={inputAmount}
            onAmountInputChange={(amount) => {
              if (autoAdjust) {
                setAutoAdjust(false);
              }
              setUiState({ inputAmount: amount });
            }}
            enableMax={true}
            onMaxClick={() => {
              setAutoAdjust(true);
              setUiState({ inputAmount: runeBalance.toString() });
            }}
          />
        </Column>

        <Column mt="lg">
          <Text text="OutputValue" color="white" mb="sm" />

          <OutputValueBar
            onChange={(val) => {
              setOutputValue(val);
            }}
            defaultValue={546}
            minValue={0}
          />
        </Column>

        {error && <Text text={error} color="error" />}

        <Column mt="lg">
          <Text text="Fee" color="white" mb="sm" />

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
          <Button
            disabled={disabled || !!error}
            preset="primary"
            text="Next"
            onClick={(e) => {
              navigate('TxConfirmScreen', { rawTxInfo });
            }}></Button>
        </Column>
      </Content>
    </Layout>
  );
}
