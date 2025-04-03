import BigNumber from 'bignumber.js';
import 'swiper/css';

import { Button, Column, Content, Footer, Icon, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useApproveLoan from '@/ui/hooks/useApproveLoan';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { LiquidationEvent } from '@/ui/services/lending/types';
import { colors } from '@/ui/theme/colors';
import { useLocationState } from '@/ui/utils';
import { Box } from '@mui/material';

export interface LoanAuthorizeLocationState {
  txid: string;
  psbtHex: string;
  loanId: string;
  borrowAmount: string;
  collateralAmount: string;
  feeRate: number;
  liquidationEvent: LiquidationEvent;
}

export default function LoanAuthorizeScreen() {
  const { txid, psbtHex, loanId, feeRate, borrowAmount, collateralAmount, liquidationEvent } =
    useLocationState<LoanAuthorizeLocationState>();

  const { approveLoan, loading } = useApproveLoan(loanId);

  const disabled = loading || !txid || !psbtHex || !loanId || !borrowAmount || !collateralAmount || !liquidationEvent;

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="lg">
        <Row>
          <Text
            text="Step 2: Authorize Liquidation"
            size="xs"
            style={{
              fontWeight: 700
            }}></Text>
        </Row>

        <Row
          bg="black_dark2"
          fullX
          style={{
            // borderRadius: '100%',
            borderRadius: '10px',
            height: 6
          }}>
          <Row
            bg="main"
            fullY
            fullX
            style={{
              borderRadius: '10px'
            }}
          />
        </Row>

        <Box p={1.5} bgcolor={'#222222'} color={colors.white_muted} borderRadius={'10px'}>
          <Row itemsCenter>
            <Icon icon="alert-circle" color={'search_icon'} size={24}></Icon>

            <Text
              text="Note:"
              color="search_icon"
              size="sm"
              style={{
                fontWeight: 600
              }}></Text>
          </Row>

          <Row mt="lg">
            <Text
              color="search_icon"
              size="xs"
              text={`In this step, you will presign a CET (Contract Execution Transaction) within a DLC (Discrete Log Contract), authorizing the liquidation of your loan collateral if the oracle price reaches ${BigNumber(
                liquidationEvent.price
              ).toFormat()}.`}></Text>
          </Row>
        </Box>

        <Column itemsCenter gap="xl" mt="lg">
          <Text text="Liquidation Price (BTC/USDC)" color="white_muted" size="xs"></Text>

          <Text
            text={`${BigNumber(liquidationEvent.price).toFormat()}`}
            color="main"
            style={{
              fontSize: 36,
              fontWeight: 700
            }}></Text>

          <Row fullX mt="xxl">
            <Button
              disabled={disabled}
              onClick={async () => {
                await approveLoan({
                  depositTxId: txid,
                  psbtHex,
                  loanId,
                  borrowAmount: {
                    amount: borrowAmount,
                    denom: 'uusdc'
                  },
                  collateralAmount: {
                    amount: collateralAmount,
                    denom: 'sat'
                  },
                  liquidationEvent: liquidationEvent,
                  feeRate
                });
              }}
              full
              loading={loading}
              text="Authorize"
              preset="primary"></Button>
          </Row>
        </Column>
      </Content>
      <Footer px="zero" py="zero">
        <NavTabBar tab="loans" />
      </Footer>
    </Layout>
  );
}
