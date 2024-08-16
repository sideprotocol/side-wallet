import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TxType } from '@/shared/types';
import { Button, Column, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { useUiTxCreateSendSideScreen, useUpdateUiTxCreateSendSideScreen } from '@/ui/state/ui/hooks';
import { formatUnitAmount, isValidAddress, parseUnitAmount } from '@/ui/utils';
import { toReadableAmount } from '@/ui/utils/formatter';

export default function CreateSendSide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { base } = state as {
    base: string;
  };
  const uiState = useUiTxCreateSendSideScreen();
  const setUiState = useUpdateUiTxCreateSendSideScreen();

  const { estimateGasFee } = useSignAndBroadcastTxRaw();

  const { data: sideTokenList } = useGetSideTokenList();
  const { balanceAmount } = useGetSideTokenBalance(base);
  const toInfo = uiState.toInfo;
  const inputAmount = uiState.inputAmount;
  // const fee = uiState.fee;

  const feeDenom = uiState.feeDenom;
  const memo = uiState.memo;

  const currentAccount = useCurrentAccount();

  const { curToken, feeToken } = useMemo(() => {
    const curToken = sideTokenList.find((item) => item.base === base)!;
    const feeToken = sideTokenList.find((item) => item.base === feeDenom)!;
    return {
      curToken,
      feeToken
    };
  }, [sideTokenList]);

  async function estimateFee() {
    const msg = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: currentAccount.address,
        toAddress: currentAccount.address,
        amount: [
          {
            amount: parseUnitAmount('1', 6),
            denom: 'uside'
          }
        ]
      }
    };

    const { tx } = await estimateGasFee({
      messages: [msg],
      feeAmount: uiState.fee,
      feeDenom: feeDenom
    });

    const coin = tx.fee.amount[0];

    const feeEstimate = coin.amount;

    setUiState({
      fee: feeEstimate
    });
  }

  useEffect(() => {
    if (!base) return;
    estimateFee();
  }, [base]);

  useEffect(() => {
    setUiState({ base });
  }, [base]);

  const { data: feeByUSD } = useCalcPrice(uiState.fee || '0', feeToken?.base, feeToken?.exponent || 6);
  const available = formatUnitAmount(balanceAmount, curToken?.exponent || 6);

  const disabled = useMemo(() => {
    let _disabled = false;
    if (!isValidAddress(toInfo.address)) {
      _disabled = true;
    } else if (!+inputAmount) {
      _disabled = true;
    }
    return _disabled;
  }, [toInfo, inputAmount]);

  if (!curToken) {
    return <Layout />;
  }

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={`Send ${curToken.symbol}`}
      />

      <Column
        style={{
          flex: 1,
          borderTop: '1px solid #404045',
          borderRadius: '10px',
          background: '#222',
          padding: '0 16px',
          paddingBottom: '14px',
          marginTop: '66px',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
        }}>
        <Column
          style={{
            flex: '1',
            gap: '10px'
          }}>
          <Row
            justifyCenter
            style={{
              marginTop: '-35px'
            }}>
            <Row
              style={{
                background: '#1E1E1F',
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                alignItems: 'center'
              }}
              justifyCenter>
              {/*<Image src={curToken.logo} size={62} />*/}
              <ImageIcon
                url={curToken.logo}
                style={{
                  width: '62px',
                  height: '62px',
                  borderRadius: '50%'
                }}
              />
            </Row>
          </Row>
          <Text
            text="Recipient"
            color="white_muted"
            style={{
              fontSize: '14px',
              lineHeight: '24px'
            }}
          />
          <Input
            preset="address"
            addressInputData={toInfo}
            onAddressInputChange={(val) => {
              setUiState({ toInfo: val });
            }}
            autoFocus={true}
          />
          <Row
            justifyBetween
            style={{
              marginTop: '16px'
            }}>
            <Text
              text="Amount"
              color="white_muted"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Row
              style={{
                alignItems: 'center'
              }}>
              <Image src="./images/icons/wallet-04.svg" size={24} />
              <Text
                text={available}
                style={{
                  fontSize: '14px',
                  lineHeight: '24px'
                }}
              />
            </Row>
          </Row>
          <Input
            preset="amount"
            placeholder={'Amount'}
            value={inputAmount}
            onAmountInputChange={(amount) => {
              setUiState({ inputAmount: amount });
            }}
            enableMax={true}
            onMaxClick={() => {
              setUiState({ inputAmount: available });
            }}
          />
          <Text
            text="Memo"
            color="white_muted"
            style={{
              fontSize: '14px',
              lineHeight: '24px',
              marginTop: '16px'
            }}
          />
          <Input
            preset="text"
            placeholder={'Required for sending to centralized exchanges'}
            value={memo}
            onChange={(e) => setUiState({ memo: e.target.value })}
          />
        </Column>

        <Row
          justifyBetween
          style={{
            padding: '0px 12px',
            paddingTop: '16px',
            borderRadius: '10px'
            // opacity: 0
          }}>
          <Text
            text="Tx Fee:"
            style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '24px'
            }}
          />
          <Row>
            <Text
              // text={`${formatUnitAmount(fee, feeToken.exponent)} ${feeToken.symbol}`}
              text={`${disabled ? '-' : toReadableAmount(uiState.fee, feeToken.exponent)} ${feeToken.symbol}`}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px'
              }}
            />
            <Text
              text={`($${disabled ? '-' : feeByUSD})`}
              color="white_muted"
              style={{
                fontSize: '16px',
                lineHeight: '24px'
              }}
            />
          </Row>
        </Row>

        <Button
          style={{
            bottom: '24px',
            left: 0
          }}
          preset="primary"
          text={+inputAmount > +available ? 'Insufficient Balance' : 'Next'}
          disabled={disabled || +inputAmount > +available}
          onClick={() => {
            navigate('TxConfirmScreen', { type: TxType.SEND_SIDE });
          }}
        />
      </Column>
    </Layout>
  );
}
