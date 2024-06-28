import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Column, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { useGetSideTokenList } from '@/ui/hooks/useGetTokenList';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { formatUnitAmount } from '@/ui/utils';

export default function CreateSendSide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { base } = state as {
    base: string;
  };
  const uiState = useUiTxCreateScreen();

  const { data: sideTokenList } = useGetSideTokenList();
  const { balanceAmount } = useGetSideTokenBalance(base);
  const toInfo = uiState.toInfo;

  const curToken = useMemo(() => {
    return sideTokenList.find((item) => item.base === base)!;
  }, [sideTokenList]);

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
          marginTop: '40px',
          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset'
        }}>
        <Row
          justifyCenter
          style={{
            marginTop: '-24px'
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
            <Image src={curToken.logo} size={62} />
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
            // setUiState({ toInfo: val });
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
              text={formatUnitAmount(balanceAmount, curToken.exponent)}
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
          // defaultValue={inputAmount}
          // value={inputAmount}
          onAmountInputChange={(amount) => {
            // if (autoAdjust) {
            //   setAutoAdjust(false);
            // }
            // setUiState({ inputAmount: amount });
          }}
          enableMax={true}
          onMaxClick={() => {
            // setAutoAdjust(true);
            // setUiState({ inputAmount: totalAvailableAmount.toString() });
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
        <Input preset="text" placeholder={'Required for sending to centralized exchanges'} value="" />
        <Row
          justifyBetween
          style={{
            padding: '16px 12px',
            // background: '#1E1E1F',
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
              text="0.0002249 ATOM"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '24px'
              }}
            />
            <Text
              text="($0.01)"
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
          onClick={(e) => {
            // navigate('TxConfirmScreen', { rawTxInfo });
          }}
        />
      </Column>
    </Layout>
  );
}
