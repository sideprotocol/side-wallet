// import { CHAINS_ENUM } from '@/shared/constant';
import BigNumber from 'bignumber.js';
import { Fragment } from 'react/jsx-runtime';

import { Column, Content, Header, Image, Layout, LightTooltip } from '@/ui/components';
import { PoolDataItem } from '@/ui/hooks/lending';
import { useAppDispatch } from '@/ui/state/hooks';
import { LendingActions } from '@/ui/state/lending/reducer';
import { colors } from '@/ui/theme/colors';
import { getTruncate, useLocationState } from '@/ui/utils';
import { Stack, Typography } from '@mui/material';

interface LendingSelectTokenLocation {
  poolsData: PoolDataItem[];
}

export default function LendingSelectTokenScreen() {
  const { poolsData } = useLocationState<LendingSelectTokenLocation>();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select loan asset"
      />
      <Content
        style={{
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16,
          position: 'relative'
        }}>
        <Column gap="md" px="xl">
          {poolsData?.map((pool) => {
            return (
              <Fragment key={pool.baseData.id}>
                <PoolItemFC item={pool} />
              </Fragment>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}

function PoolItemFC({ item }: { item: PoolDataItem }) {
  const dispatch = useAppDispatch();
  const onClose = () => window.history.go(-1);

  const data = [
    {
      label: 'Available Liquidity',
      value: getTruncate(new BigNumber(item.totalSupply).minus(item.totalBorrow).toString(), 6),
      tip: 'The total amount of tokens available for borrowing'
    },
    {
      label: 'Borrow APR',
      value: `${new BigNumber(item.baseData.config.tranches[0].borrow_apr).div(10).toFixed(2)}% - ${new BigNumber(
        item.baseData.config.tranches[item.baseData.config.tranches.length - 1].borrow_apr
      )
        .div(10)
        .toFixed(2)}%`,
      tip: 'The annual percentage rate (APR) applied to your loan'
    },
    {
      label: 'Max LTV',
      value: `${item?.baseData.config?.max_ltv || '-'}%`,
      tip: 'The maximum interest that can accrue on your loan'
    }
  ];

  return (
    <Stack
      gap="8px"
      onClick={() => {
        dispatch(LendingActions.update({ poolTokenDenom: item.token.asset.denom }));
        onClose();
      }}
      sx={{
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: colors.card_bgColor,
        borderRadius: '12px',
        transition: '.4s',
        ':hover': {
          backgroundColor: colors.black_dark
        }
      }}>
      <Stack direction="row" alignItems="center" gap="8px">
        <Image
          src={item.token.asset.logo}
          size={28}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%'
          }}
        />
        <Typography>{item.token.asset.symbol}</Typography>
      </Stack>
      {data.map((item, index) => (
        <Fragment key={index}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <LightTooltip title={item.tip} arrow placement="top">
              <Stack
                direction="row"
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
                {item.label}
              </Stack>
            </LightTooltip>
            <Stack
              direction="row"
              sx={{
                fontSize: '12px',
                color: colors.white
              }}>
              {item.value}
            </Stack>
          </Stack>
        </Fragment>
      ))}
    </Stack>
  );
}
