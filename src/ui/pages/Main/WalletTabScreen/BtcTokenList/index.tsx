import { Fragment } from 'react';

import { CHAINS_ENUM } from '@/shared/constant';
import { Column } from '@/ui/components';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { Skeleton } from '@mui/material';

import { TokenItem } from '../SideTokenList';

export default function BtcTokenList({ balanceVisible }) {
  const currentAccount = useCurrentAccount();

  const { balanceList, loading } = useGetBitcoinBalanceList(currentAccount?.address);
  const filterList = balanceList.filter((item) => !(!+item.amount && item.denom !== 'sat'));

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
              <TokenItem chainType={CHAINS_ENUM.BTC} token={item} balanceVisible={balanceVisible} />
            </Fragment>
          );
        })
      )}
    </Column>
  );
}
