import BigNumber from 'bignumber.js';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Column, Row, Text, Tooltip } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { Box, Skeleton } from '@mui/material';

export function TokenItem({
  token,
  balanceVisible,
  chainType
}: {
  token: BalanceItem;
  balanceVisible: boolean;
  chainType: CHAINS_ENUM;
}) {
  const isIbc = token.asset.denom.includes('ibc/');

  const isSide = token.asset.denom === 'uside';

  const navigate = useNavigate();

  const [hover, setHover] = useState(false);

  const isSideChain = chainType === CHAINS_ENUM.SIDE;

  const isBitcoinChain = chainType === CHAINS_ENUM.BTC;

  return (
    <Column
      classname={'bg-item-hover-v2'}
      style={{
        cursor: 'pointer',
        backgroundColor: colors.card_bgColor,
        padding: '10px 16px',
        borderRadius: 10,
        paddingBottom: isSide ? '29px' : '10px',
        position: 'relative',
        transition: 'padding-bottom 0.1s ease-in-out'
      }}>
      <Row fullX justifyBetween>
        <Row>
          <Row
            style={{
              position: 'relative'
            }}>
            <ImageIcon
              url={token.asset.logo}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%'
              }}
            />

            <Box position="absolute" bottom="2px" right="2px">
              {isSideChain && (
                <ImageIcon url="/images/img/side_network.png" style={{ width: '16px', height: '16px' }} />
              )}

              {isBitcoinChain && (
                <ImageIcon url="/images/img/bitcoin_network.png" style={{ width: '16px', height: '16px' }} />
              )}
            </Box>
          </Row>

          <Column
            style={{
              gap: '0px'
            }}>
            <Text classname={'symbol'} preset="regular" text={token?.asset?.symbol}></Text>

            <Row itemsCenter style={{ position: 'relative' }}>
              <Text preset="sub" text={token?.asset?.name}></Text>

              {isIbc && (
                <Tooltip title={'IBC'}>
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
                      color: '#B8BFBD',
                      position: 'relative'
                    }}>
                    IBC
                  </Box>
                </Tooltip>
              )}
            </Row>
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
      {isSide && (
        <Row
          style={{
            position: 'absolute',
            width: '328px',
            bottom: 0,
            left: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            navigate('/swap-side');
          }}
          fullX
          py="xs"
          bg={hover ? 'green_success40' : 'green_success15'}
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

  const { balanceList, loading } = useGetSideBalanceList(currentAccount?.address);
  const filterList = balanceList.filter((item) => !(!+item.amount && item.denom !== 'uside'));

  return (
    <Column>
      {loading ? (
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
        </>
      ) : (
        filterList.map((item) => {
          return (
            <Fragment key={item?.asset?.symbol + item?.asset?.name}>
              <TokenItem chainType={CHAINS_ENUM.SIDE} token={item} balanceVisible={balanceVisible} />
            </Fragment>
          );
        })
      )}
    </Column>
  );
}
