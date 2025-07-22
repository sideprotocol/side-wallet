import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';

import { Button, Column, Content, Footer, Header, Icon, Input, Layout, LightTooltip, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useSend } from '@/ui/hooks/useSend';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useResetUiTxCreateScreen, useUpdateUiTxCreateSendSideScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { isValidAddress } from '@/ui/utils';
import { Stack, Typography } from '@mui/material';

export default function RegisterEvmAddress() {
  const setUiState = useUpdateUiTxCreateSendSideScreen();
  const reset = useResetUiTxCreateScreen();
  const { EVM_COLLECTOR, sideChain } = useEnvironment();

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
            <Stack direction="row">
              <LightTooltip
                title={
                  'Any SIDE sent to this address will be reserved for future token burns and cannot be recovered. This is a permanent and irreversible action. '
                }
                arrow
                placement="top">
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: colors.grey12,
                    textDecoration: 'dotted underline',
                    textUnderlineOffset: '2px',
                    cursor: 'pointer',
                    transition: '.4s',
                    ':hover': {
                      color: colors.white
                    }
                  }}>
                  Burn Address
                </Typography>
              </LightTooltip>
            </Stack>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                color: colors.white,
                overflowWrap: 'break-word',
                textDecoration: 'dotted underline',
                textUnderlineOffset: '2px',
                cursor: 'pointer',
                transition: '.4s',
                ':hover': {
                  color: colors.main
                }
              }}
              onClick={() => {
                window.open(`${sideChain.explorerUrl}/address/${toInfo.address}`, '_blank');
              }}>
              {toInfo.address}
            </Typography>
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
          text={+inputAmount > +available ? 'Insufficient Balance' : 'Confirm'}
          disabled={disabled}
          onClick={() => {
            handleSubmit({
              text: 'Please follow us on X and stay tuned for further announcements regarding the TGE.',
              title: 'Registration completed!'
            });
          }}
        />
      </Footer>
    </Layout>
  );
}
