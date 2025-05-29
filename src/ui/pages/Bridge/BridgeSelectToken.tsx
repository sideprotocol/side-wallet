// import { CHAINS_ENUM } from '@/shared/constant';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import SearchInput from '@/ui/components/Input/Search';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
import { Stack } from '@mui/material';

export default function BridgeSelectTokenScreen() {
  const currentAccount = useCurrentAccount();
  let { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  let { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  // list, onSearch
  const [searchValue, onSearch] = useState<string>('');
  const { from } = useBridgeState();
  const dispatch = useAppDispatch();
  const isDeposit = (from?.name || '').includes('Bitcoin');
  sideBalanceList = sideBalanceList?.filter((item) => {
    return item?.denom.includes('rune') || item?.denom.includes('sat');
  });
  if (searchValue) {
    sideBalanceList = sideBalanceList.filter((item) => {
      return (
        item?.asset.symbol?.toLocaleLowerCase().includes(searchValue?.trim()) ||
        item?.asset.name?.toLocaleLowerCase()?.includes(searchValue?.trim())
      );
    });
    btcBalanceList = btcBalanceList.filter((item) => {
      return (
        item?.asset.symbol?.toLocaleLowerCase().includes(searchValue?.trim()) ||
        item?.asset.name?.toLocaleLowerCase()?.includes(searchValue?.trim())
      );
    });
  }
  const onClose = () => window.history.go(-1);

  const renderList = isDeposit ? btcBalanceList : sideBalanceList;

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select crypto"
      />
      <Content
        style={{
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16
        }}>
        <Column>
          <Column px="xl" gap="md">
            <SearchInput value={searchValue} onChange={onSearch} />
            {renderList?.map((asset) => {
              return (
                <Stack
                  key={asset.asset.symbol}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => {
                    dispatch(BridgeActions.update({ base: asset.denom, exponent: +asset.asset.exponent }));
                    onClose();
                  }}
                  sx={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    backgroundColor: colors.card_bgColor,
                    borderRadius: '8px',
                    transition: '.4s',
                    ':hover': {
                      backgroundColor: colors.black_dark
                    }
                  }}>
                  <Row>
                    <ImageIcon
                      url={asset.asset.logo}
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
                      <Text preset="regular" text={asset.asset.name}></Text>
                      <Text preset="sub" text={asset.asset.symbol}></Text>
                    </Column>
                  </Row>

                  <Column
                    style={{
                      gap: '0px'
                    }}>
                    <Text preset="regular" textEnd text={BigNumber(asset.formatAmount).toFormat()}></Text>
                    <Text preset="sub" textEnd text={`$${BigNumber(asset.totalValue).toFormat(2)}`}></Text>
                  </Column>
                </Stack>
              );
            })}
          </Column>
        </Column>
      </Content>
    </Layout>
  );
}
