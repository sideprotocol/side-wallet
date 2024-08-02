import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { satoshisToAmount, shortAddress, useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';
import { useAccountAddress, useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ADDRESS_TYPES, KEYRING_TYPE } from '@/shared/constant';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useTools } from '@/ui/components/ActionComponent';

interface Address {
  type: string;
  address: string;
  balance: string;
  value: string;
}

export default function SelecAddressScreen() {
  // TODO: set select network

  const wallet = useWallet();
  const currentKeyring = useCurrentKeyring();
  const account = useCurrentAccount();
  const currentAccount = useCurrentAccount();
  const address = useAccountAddress();
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

  // let NEWADDRESS_TYPES;
  // if (state.chain === 'SIDE') {
  //   NEWADDRESS_TYPES = ADDRESS_TYPES.filter((v) => v.label !== 'P2PKH' || v.label !== 'P2WPKH');
  // } else {
  //   NEWADDRESS_TYPES = ADDRESS_TYPES;
  // }

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

  const addressTypes = useMemo(() => {
    if (currentKeyring.type === KEYRING_TYPE.HdKeyring) {
      return ADDRESS_TYPES.filter((v) => {
        if (v.displayIndex < 0) {
          return false;
        }
        const address = addresses[v.value];
        const balance = addressAssets[address];
        if (v.isUnisatLegacy) {
          if (!balance || balance.satoshis == 0) {
            return false;
          }
        }
        return true;
      }).sort((a, b) => a.displayIndex - b.displayIndex);
    } else {
      return ADDRESS_TYPES.filter((v) => v.displayIndex >= 0 && v.isUnisatLegacy != true).sort(
        (a, b) => a.displayIndex - b.displayIndex
      );
    }
  }, [currentKeyring.type, addressAssets, addresses]);

  // const addresses: Address[] = [
  //   {
  //     type: 'Taproot',
  //     address: address,
  //     balance: '',
  //     value: ''
  //   }
  // ];
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select address type"
      />
      <Content style={{
        padding: 0,
      }}>
        <Column style={{
          margin: '16px 0'
        }}>
          {addressTypes.map((item) => {
            const address = addresses[item.value];
            const assets = addressAssets[address] || {
              total_btc: '--',
              satoshis: 0,
              total_inscription: 0
            };
            // console.log(`assets: `, assets);
            // debugger;
            return (
              <Row
                classname={'bg-item-hover'}
                style={{
                  // backgroundColor: '#21232F',
                  cursor: 'pointer',
                  // height: '71px',
                  margin: '0 16px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                }}
                full
                onClick={() => {
                  navigate('ReceiveScreen', {
                    ...state,
                    address,
                    addressType: item.name
                  });
                }}
                key={address}
                justifyBetween>
                <Column gap={'zero'}>
                  <Text preset="regular" text={item.name}></Text>
                  <Text preset="sub" text={shortAddress(address)}></Text>
                </Column>

                <Column style={{
                  display: 'none'
                }}>
                  <Text preset="regular" text={item?.balance}></Text>
                  <Text preset="sub" text={item?.value}></Text>
                </Column>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
