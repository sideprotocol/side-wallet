import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CHAINS_ENUM } from '@/shared/constant';
import { BalanceItem } from '@/shared/types';
import { Column, Content, Header, Image, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import SearchInput from '@/ui/components/Input/Search';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useResetUiTxCreateScreen } from '@/ui/state/ui/hooks';
import { colors } from '@/ui/theme/colors';
import { Box, Stack } from '@mui/material';

import { useNavigate } from '../MainRoute';

function BtcItem({ token }: { token: BalanceItem }) {
  return (
    <>
      <Row>
        <Image className={'rounded-full'} src={token.asset.logo} size={38}></Image>
        <Column
          style={{
            gap: '0px'
          }}>
          <Text preset="regular" text={token.asset.symbol}></Text>
          <Text preset="sub" text={token.asset.name}></Text>
        </Column>
      </Row>

      <Column
        style={{
          gap: '0px'
        }}>
        <Text preset="regular" textEnd text={BigNumber(token.formatAmount).toFormat()}></Text>
        <Text preset="sub" textEnd text={`$${BigNumber(token.totalValue || '0').toFormat(2)}`}></Text>
      </Column>
    </>
  );
}

function BitAndRuneCrypto({ searchTerm }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();

  const currentAccount = useCurrentAccount();
  let { balanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  balanceList = balanceList.filter((item) => {
    return (
      item.asset.symbol.toLocaleLowerCase().includes(searchTerm.trim()) ||
      item.asset.name.toLocaleLowerCase().includes(searchTerm.trim())
    );
  });

  return (
    <>
      {balanceList.map((token) => {
        return (
          <Stack
            key={token.asset.symbol}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { ...state, token });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { ...state, token });
              }
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
            <BtcItem token={token} />
          </Stack>
        );
      })}
    </>
  );
}

function SideCryptoItem({ token }: { token: BalanceItem }) {
  const isIbc = token.asset.denom.includes('ibc/');

  return (
    <>
      <Row classname={'bg-item-hover'}>
        <ImageIcon
          url={token?.asset?.logo}
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
            <Text preset="regular" text={token?.asset?.symbol}></Text>
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
        <Text preset="regular" textEnd text={BigNumber(token?.formatAmount).toFormat()}></Text>
        <Text preset="sub" textEnd text={`$${BigNumber(token?.totalValue || '0').toFormat(2)}`}></Text>
      </Column>
    </>
  );
}

function SideCrypto({ searchTerm }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { chain, type } = state as {
    chain: CHAINS_ENUM;
    type: 'receive' | 'send';
  };
  const resetUiTxCreateScreen = useResetUiTxCreateScreen();
  const currentAccount = useCurrentAccount();
  let { balanceList } = useGetSideBalanceList(currentAccount?.address);
  balanceList = balanceList.filter((item) => {
    return (
      item.asset.symbol.toLocaleLowerCase().includes(searchTerm.trim()) ||
      item.asset.name.toLocaleLowerCase().includes(searchTerm.trim())
    );
  });

  return (
    <>
      {balanceList.map((token) => {
        return (
          <Stack
            key={token.asset.symbol}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => {
              if (type === 'receive') {
                navigate('SelectAddressScreen', { chain, token });
              } else {
                resetUiTxCreateScreen();
                navigate('TxCreateScreen', { chain, token });
              }
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
            <SideCryptoItem token={token} />
          </Stack>
        );
      })}
    </>
  );
}

export default function SelecCryptoScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { state } = useLocation();
  const { chain } = state as {
    chain: CHAINS_ENUM;
  };
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
          marginTop: '16px'
        }}>
        <Column px="xl" gap="md">
          <SearchInput value={searchTerm} onChange={setSearchTerm} />

          {chain === CHAINS_ENUM.SIDE ? (
            <SideCrypto searchTerm={searchTerm} />
          ) : (
            <BitAndRuneCrypto searchTerm={searchTerm} />
          )}
        </Column>
      </Content>
    </Layout>
  );
}
