import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ADDRESS_TYPES, CHAINS_ENUM } from '@/shared/constant';
import { AddressType } from '@/shared/types';
import { Column, Content, Header, Icon, Image, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { copyToClipboard, satoshisToAmount, shortAddress, useWallet } from '@/ui/utils';
import { Box } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function SelecAddressScreen() {
  // TODO: set select network

  const wallet = useWallet();
  const currentKeyring = useCurrentKeyring();
  const account = useCurrentAccount();
  const { state } = useLocation();
  const navigate = useNavigate();
  const tools = useTools();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [addressAssets, setAddressAssets] = useState<{
    [key: string]: { total_btc: string; satoshis: number; total_inscription: number };
  }>({});
  const selfRef = useRef<{
    addressAssets: { [key: string]: { total_btc: string; satoshis: number; total_inscription: number } };
  }>({
    addressAssets: {}
  });
  const self = selfRef.current;

  const loadAddresses = async () => {
    tools.showLoading(true);

    const _res = await wallet.getAllAddresses(currentKeyring, account.index || 0);
    setAddresses(_res);
    const balances = await wallet.getMultiAddressAssets(_res.join(','));
    for (let i = 0; i < _res.length; i++) {
      const address = _res[i];
      const balance = balances[i];
      const satoshis = balance.totalSatoshis;
      self.addressAssets[address] = {
        total_btc: satoshisToAmount(balance.totalSatoshis),
        satoshis,
        total_inscription: balance.inscriptionCount
      };
    }
    setAddressAssets(self.addressAssets);

    tools.showLoading(false);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const displayAddress = ADDRESS_TYPES.filter((v) => v.value == AddressType.P2WPKH || v.value === AddressType.P2TR);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select address type"
      />
      <Content
        style={{
          padding: 0
        }}>
        <Column
          style={{
            margin: '16px 0'
          }}>
          {displayAddress.map((item) => {
            const address = addresses[item.value];
            return (
              <Row
                // classname={'bg-item-hover-v2'}
                itemsCenter
                justifyBetween
                style={{
                  cursor: 'pointer',
                  backgroundColor: colors.card_bgColor,
                  padding: '10px 16px',
                  borderRadius: 10
                }}
                full
                key={item.value}>
                <Row>
                  <Icon icon="btc" size={32}></Icon>

                  <Column gap={'zero'}>
                    <Text preset="regular" text={'Bitcoin' + ' ' + `(${item.name})`}></Text>
                    <Text preset="sub" text={shortAddress(address)}></Text>
                  </Column>
                </Row>

                <Row>
                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: colors.black,
                      '&:hover': {
                        bgcolor: colors.white_muted
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      navigate('ReceiveScreen', {
                        ...state,
                        address,
                        addressType: item.name
                      });
                    }}>
                    <Image
                      src={
                        '/images/icons/main/recevie-icon.svg' // Default image source
                      }
                      size={fontSizes.xl}
                      className="" // Hide the default image on hover
                    />
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: colors.black,
                      '&:hover': {
                        bgcolor: colors.white_muted
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      copyToClipboard(address);
                    }}>
                    <Image
                      src={
                        '/images/icons/copy-03.svg' // Default image source
                      }
                      size={fontSizes.xl}
                      className="" // Hide the default image on hover
                    />
                  </Box>
                </Row>
              </Row>
            );
          })}

          {displayAddress.map((item) => {
            const address = addresses[item.value];
            return (
              <Row
                itemsCenter
                justifyBetween
                style={{
                  cursor: 'pointer',
                  backgroundColor: colors.card_bgColor,
                  padding: '10px 16px',
                  borderRadius: 10
                }}
                full
                onClick={() => {
                  navigate('ReceiveScreen', {
                    ...state,
                    address,
                    addressType: item.name,
                    chain: CHAINS_ENUM.BTC
                  });
                }}
                key={item.value}>
                <Row>
                  <Icon icon="side" size={32}></Icon>

                  <Column gap={'zero'}>
                    <Text preset="regular" text={'Side Chain' + ' ' + `(${item.name})`}></Text>
                    <Text preset="sub" text={shortAddress(address)}></Text>
                  </Column>
                </Row>

                <Row>
                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: colors.black,
                      '&:hover': {
                        bgcolor: colors.white_muted
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      navigate('ReceiveScreen', {
                        ...state,
                        address,
                        addressType: item.name,
                        chain: CHAINS_ENUM.SIDE
                      });
                    }}>
                    <Image
                      src={
                        '/images/icons/main/recevie-icon.svg' // Default image source
                      }
                      size={fontSizes.xl}
                      className="" // Hide the default image on hover
                    />
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '100%',
                      p: 1,
                      bgcolor: colors.black,
                      '&:hover': {
                        bgcolor: colors.white_muted
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      copyToClipboard(address);
                    }}>
                    <Image
                      src={
                        '/images/icons/copy-03.svg' // Default image source
                      }
                      size={fontSizes.xl}
                      className="" // Hide the default image on hover
                    />
                  </Box>
                </Row>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
