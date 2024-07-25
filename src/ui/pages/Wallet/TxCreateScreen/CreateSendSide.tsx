import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TxType } from '@/shared/types';
import { Button, Column, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useCalcPrice } from '@/ui/hooks/useCalcPrice';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useUiTxCreateSendSideScreen, useUpdateUiTxCreateSendSideScreen } from '@/ui/state/ui/hooks';
import { formatUnitAmount, isValidAddress } from '@/ui/utils';
import ImageIcon from '@/ui/components/ImageIcon';

export default function CreateSendSide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { base } = state as {
    base: string;
  };
  const uiState = useUiTxCreateSendSideScreen();
  const setUiState = useUpdateUiTxCreateSendSideScreen();

  const { data: sideTokenList } = useGetSideTokenList();
  const { balanceAmount } = useGetSideTokenBalance(base);
  const toInfo = uiState.toInfo;
  const inputAmount = uiState.inputAmount;
  const fee = uiState.fee;
  const feeDenom = uiState.feeDenom;
  const memo = uiState.memo;

  useEffect(() => {
    setUiState({ base });
  }, [base]);

  const { curToken, feeToken } = useMemo(() => {
    const curToken = sideTokenList.find((item) => item.base === base)!;
    const feeToken = sideTokenList.find((item) => item.base === feeDenom)!;
    return {
      curToken,
      feeToken
    };
  }, [sideTokenList]);

  const { data: feeByUSD } = useCalcPrice(fee, feeToken?.coingecko_id, feeToken?.exponent || 6);
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
  const available = formatUnitAmount(balanceAmount, curToken.exponent);

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
          marginTop: '40px',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
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
            <ImageIcon url={curToken.logo} style={{
              width: '62px',
              height: '62px',
              borderRadius: '50%',
            }} />
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
        <Row
          justifyBetween
          style={{
            padding: '16px 12px',
            borderRadius: '10px'
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
              text={`${formatUnitAmount(fee, feeToken.exponent)} ${feeToken.symbol}`}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px'
              }}
            />
            <Text
              text={`($${feeByUSD})`}
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
            marginTop: '12px',
            position: 'sticky',
            bottom: '24px',
            left: 0
          }}
          preset="primary"
          text="Next"
          disabled={disabled}
          onClick={() => {
            navigate('TxConfirmScreen', { type: TxType.SEND_SIDE });
          }}
        />
      </Column>
    </Layout>
  );
}
