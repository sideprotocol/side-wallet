import { useState } from 'react';
import 'swiper/css';

import { Button, Column, Content, Footer, Layout, Row, Text } from '@/ui/components';
import { NavTabBar } from '@/ui/components/NavTabBar';
import useApproveLoan from '@/ui/hooks/useApproveLoan';
import useGetDepositTx from '@/ui/hooks/useGetDepositTx';
import useGetLiquidationEvent from '@/ui/hooks/useGetLiquidationEvent';
import useGetLoanById from '@/ui/hooks/useGetLoanById';
import useGetPoolsData from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import MainHeader from '@/ui/pages/Main/MainHeader';
import { LiquidationEvent } from '@/ui/services/lending/types';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLendingState } from '@/ui/state/lending/hook';
import { colors } from '@/ui/theme/colors';
import { getTruncate, satoshisToAmount, useLocationState } from '@/ui/utils';
import { formatTimeWithUTC, toReadableAmount } from '@/ui/utils/formatter';
import { Input, Stack, Typography } from '@mui/material';

export interface LoanAuthorizeLocationState {
  loanId: string;
  borrowAmount: string;
  collateralAmount: string;
  feeRate: number;
  liquidationEvent: LiquidationEvent;
}

export default function LoanAuthorizeScreen() {
  const { loanId, feeRate, borrowAmount, collateralAmount } = useLocationState<LoanAuthorizeLocationState>();
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const { value } = useGetDepositTx(loanId, collateralAmount);

  const { approveLoan, loading } = useApproveLoan(loanId, collateralAmount);

  const { poolTokenDenom, maturity } = useLendingState();

  const [refundAddress, setRefundAddress] = useState(currentAccount.address);

  const { loan } = useGetLoanById({ loanId });

  const { data: poolsData } = useGetPoolsData();
  const poolTokenBalance = balanceList.find((b) => b.denom == poolTokenDenom);

  const poolData = poolsData.find((p) => p.token.denom === poolTokenBalance?.denom);

  const { liquidationEvent } = useGetLiquidationEvent({
    bitcoinAmount: value ? satoshisToAmount(value) : '',
    borrowToken: poolData?.token,
    borrowTokenAmount: toReadableAmount(borrowAmount, poolData?.token.asset.exponent || 6),
    poolId: poolData?.baseData.id || '',
    maturity: maturity
  });

  console.log({ liquidationEvent });

  const data = [
    {
      label: 'Liquidation Price (BTC/USDC)',
      value: liquidationEvent ? getTruncate(liquidationEvent?.price || '0', 2) : '-'
    },
    {
      label: 'Maturity Date',
      value: !loan ? '-' : formatTimeWithUTC(+loan.loan.maturity_time * 1000)
    }
  ];

  const disabled = loading || !loanId || !borrowAmount || !collateralAmount || !liquidationEvent;

  return (
    <Layout>
      <MainHeader title={''} />
      <Content gap="lg" mt="lg">
        <Row>
          <Text
            text="Step 2: Authorize Liquidation"
            size="lg"
            style={{
              fontWeight: 700
            }}></Text>
        </Row>

        <Row
          bg="black_dark2"
          fullX
          style={{
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

        <Column itemsCenter gap="xl" mt="lg">
          <Column fullX>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              gap="4px"
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.grey12
              }}>
              Liquidation Events
            </Stack>
            {data.map((item) => (
              <Stack
                key={item.label}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  width: '100%',
                  py: '12px',
                  px: '12px',
                  borderRadius: '10px',
                  bgcolor: colors.card_bgColor
                }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="4px"
                  sx={{
                    fontSize: '14px',
                    color: colors.white
                  }}>
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      id="Icon"
                      d="M6.17784 5.9C6.34242 5.43217 6.66725 5.03767 7.09481 4.78639C7.52237 4.53511 8.02507 4.44326 8.51387 4.5271C9.00266 4.61094 9.44602 4.86507 9.7654 5.24447C10.0848 5.62387 10.2596 6.10407 10.2588 6.6C10.2588 8 8.15884 8.7 8.15884 8.7M8.21484 11.5H8.22184M15.2148 8C15.2148 11.866 12.0808 15 8.21484 15C4.34885 15 1.21484 11.866 1.21484 8C1.21484 4.13401 4.34885 1 8.21484 1C12.0808 1 15.2148 4.13401 15.2148 8Z"
                      stroke="#6C7080"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Stack>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: colors.main
                  }}>
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Column>

          <Column fullX>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              gap="4px"
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                color: colors.grey12
              }}>
              Collateral Refund Address
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                py: '12px',
                px: '12px',
                borderRadius: '10px',
                bgcolor: colors.card_bgColor,
                width: '100%'
              }}>
              <Input
                onChange={(event) => {
                  setRefundAddress(event.target.value.trim());
                }}
                value={refundAddress}
                placeholder={'Refund Address'}
                disableUnderline
                sx={{
                  color: colors.white,
                  fontSize: '12px',
                  textAlign: 'left',
                  bgcolor: 'transparent',
                  p: '0',
                  width: '100%',
                  height: '20px',
                  border: 'none',
                  outline: 'none'
                }}
              />
            </Stack>
          </Column>

          <Row fullX mt="md">
            <Button
              disabled={disabled}
              onClick={async () => {
                if (!liquidationEvent) return;

                await approveLoan({
                  loanId,
                  borrowAmount: {
                    amount: borrowAmount,
                    denom: poolTokenDenom
                  },
                  collateralAmount: {
                    amount: collateralAmount,
                    denom: 'sat'
                  },
                  liquidationEvent: liquidationEvent,
                  feeRate,
                  refundAddress
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
