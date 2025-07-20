import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BalanceItem, TxType } from '@/shared/types';
import { Button, Column, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useSend } from '@/ui/hooks/useSend';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useUpdateUiTxCreateSendSideScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, isValidAddress } from '@/ui/utils';

export default function CreateSendSide() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const setUiState = useUpdateUiTxCreateSendSideScreen();
  const { token } = state as {
    token: BalanceItem;
  };

  useEffect(() => {
    setUiState({ base: token.denom });
  }, [token.denom]);

  const { curToken, feeToken, memo, inputAmount, toInfo, fee } = useSend();

  const disabled = useMemo(() => {
    let _disabled = false;
    if (!isValidAddress(toInfo.address)) {
      _disabled = true;
    } else if (!+inputAmount) {
      _disabled = true;
    }
    return _disabled;
  }, [toInfo.address, inputAmount]);

  if (!curToken) {
    return <Layout />;
  }

  const feeByUSD = new BigNumber(formatUnitAmount(fee || '0', feeToken?.asset.exponent || 6))
    .multipliedBy(feeToken?.denomPrice || '0')
    .toFixed(2);

  const available = curToken?.formatAmount || '0';

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={`Send ${curToken?.asset?.symbol}`}
      />

      <Column
        style={{
          flex: 1,
          borderTop: '1px solid #404045',
          borderRadius: '10px',
          background: colors.black_dark,
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
                background: colors.black_dark,

                width: '74px',
                height: '74px',
                borderRadius: '50%',
                alignItems: 'center'
              }}
              justifyCenter>
              <ImageIcon
                url={curToken?.asset.logo}
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
            color="white"
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
              color="white"
              style={{
                fontSize: '14px',
                lineHeight: '24px'
              }}
            />
            <Row
              style={{
                alignItems: 'center'
              }}
              gap="sm">
              <Icon icon="wallet-icon" color="white_muted" size={12} />
              <Text
                text={BigNumber(available).toFormat()}
                color="white_muted"
                size="xs"
                style={{
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
            color="white"
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
              text={`${disabled ? '-' : formatUnitAmount(fee, feeToken?.asset?.exponent || 6)} ${
                feeToken?.asset?.symbol
              }`}
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

        <Column>
          <Button
            preset="primary"
            text={+inputAmount > +available ? 'Insufficient Balance' : 'Next'}
            disabled={disabled || +inputAmount > +available}
            onClick={() => {
              navigate('TxConfirmScreen', { type: TxType.SEND_SIDE });
            }}
          />
        </Column>
      </Column>
    </Layout>
  );
}
