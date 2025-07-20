import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';

import { Button, Column, Content, Footer, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useSend } from '@/ui/hooks/useSend';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useResetUiTxCreateScreen, useUpdateUiTxCreateSendSideScreen } from '@/ui/state/ui/hooks';
import { isValidAddress } from '@/ui/utils';

export default function RegisterEvmAddress() {
  const currentAccount = useCurrentAccount();
  const setUiState = useUpdateUiTxCreateSendSideScreen();
  const reset = useResetUiTxCreateScreen();
  const { EVM_COLLECTOR } = useEnvironment();

  useEffect(() => {
    setUiState({ base: 'uside', toInfo: { address: EVM_COLLECTOR, domain: '' } });
    return () => {
      reset();
    };
  }, []);

  const { curToken, memo, inputAmount, toInfo, handleSubmit } = useSend();

  const available = curToken?.formatAmount || '0';

  const disabled = useMemo(() => {
    let _disabled = false;
    if (!isValidAddress(toInfo.address)) {
      _disabled = true;
    } else if (!+inputAmount) {
      _disabled = true;
    } else if (!memo || !ethers.utils.isAddress(memo)) {
      _disabled = true;
    } else if (+inputAmount > +available) {
      _disabled = true;
    }
    return _disabled;
  }, [toInfo, inputAmount, memo, available]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title={'Register Your EVM address'}
      />

      <Content mt="lg" classname="fadeIn-page">
        <Column
          style={{
            flex: '1',
            gap: '10px'
          }}>
          <Column
            bg="card_bgColor"
            style={{
              borderRadius: '10px',
              padding: '16px'
            }}>
            <Text text="Burn Address" color="white" size="xs" />
            <Text
              text={currentAccount.address}
              color="white"
              size="sm"
              style={{
                fontWeight: 500,
                overflowWrap: 'break-word'
              }}
            />
          </Column>

          <Row
            justifyBetween
            style={{
              marginTop: '16px'
            }}>
            <Text
              text="Amount to send"
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
            autoFocus={true}
            rightElement={
              <Row gap="sm" itemsCenter>
                <ImageIcon
                  url={curToken?.asset.logo}
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
                <Text text={curToken?.asset.symbol} color="white" size="xs" />
              </Row>
            }
          />

          <Text
            text="Your EVM address (memo)"
            color="white"
            style={{
              fontSize: '14px',
              lineHeight: '24px'
            }}
          />

          <Input
            preset="text"
            placeholder={'0x...'}
            value={memo}
            onChange={(val) => {
              setUiState({ memo: val.target.value });
            }}
          />
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <Button
          preset="primary"
          text={+inputAmount > +available ? 'Insufficient Balance' : 'Next'}
          disabled={disabled}
          onClick={() => {
            handleSubmit('Please follow us on X and stay tuned for further announcements regarding the TGE.');
          }}
        />
      </Footer>
    </Layout>
  );
}
