import BigNumber from 'bignumber.js';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BalanceItem } from '@/shared/types';
import { Column, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { Box, Skeleton } from '@mui/material';

export function TokenItem({ token, balanceVisible }: { token: BalanceItem; balanceVisible: boolean }) {
  const isIbc = token.asset.denom.includes('ibc/');

  const isSide = token.asset.denom === 'uside';

  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  console.log({
    isSide,
    hover
  });

  return (
    <Column
      classname={'bg-item-hover-v2'}
      style={{
        cursor: 'pointer',
        backgroundColor: colors.card_bgColor,
        padding: '10px 16px',
        borderRadius: 10,
        paddingBottom: hover && isSide ? '29px' : '10px',
        position: 'relative',
        transition: 'padding-bottom 0.1s ease-in-out'
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Row fullX justifyBetween>
        <Row>
          <ImageIcon
            url={token.asset.logo}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%'
            }}
          />
          <Column
            style={{
              gap: '0px'
            }}>
            <Row itemsCenter>
              <Text classname={'symbol'} preset="regular" text={token?.asset?.symbol}></Text>
              {isIbc && (
                <Box
                  sx={{
                    borderRadius: '4px',
                    background: '#FFFFFF1A',
                    fontSize: '8px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    height: '16px',
                    p: '4px 6px',
                    color: '#B8BFBD'
                  }}>
                  IBC
                </Box>
              )}
            </Row>
            <Text preset="sub" text={token?.asset?.name}></Text>
          </Column>
        </Row>

        <Column
          style={{
            gap: '0px'
          }}>
          <Text preset="regular" text={balanceVisible ? BigNumber(token?.formatAmount).toFormat() : '**'} textEnd />
          <Text
            preset="sub"
            text={`${balanceVisible ? '$' + BigNumber(token?.totalValue || '').toFormat(2) : '**'}`}
            textEnd
          />
        </Column>
      </Row>
      {isSide && hover && (
        <Row
          style={{
            position: 'absolute',
            width: '328px',
            bottom: 0,
            left: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
          onClick={() => {
            navigate('/swap-side');
          }}
          fullX
          bg="green_success40"
          itemsCenter
          justifyCenter>
          <Text
            color={'green_light2'}
            size="xs"
            style={{
              fontWeight: 500
            }}
            text="Swap BTC to SIDE"></Text>

          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 11L6.5 6L1.5 1"
              stroke="#58E593"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Row>
      )}
    </Column>
  );
}

export default function SideTokenList({ balanceVisible }) {
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const filterList = balanceList.filter((item) => !(!+item.amount && item.denom !== 'uside'));

  return (
    <Column>
      {!filterList.length ? (
        <>
          <Skeleton
            sx={{
              bgcolor: colors.card_bgColor,
              transform: 'scale(1)',
              width: '100%',
              borderRadius: '10px'
            }}
            height={60}
          />
          <Skeleton
            sx={{
              bgcolor: colors.card_bgColor,
              transform: 'scale(1)',
              width: '100%',
              borderRadius: '10px'
            }}
            height={60}
          />
        </>
      ) : (
        filterList.map((item) => {
          return (
            <Fragment key={item?.asset?.symbol + item?.asset?.name}>
              <TokenItem token={item} balanceVisible={balanceVisible} />
            </Fragment>
          );
        })
      )}
    </Column>
  );
}
