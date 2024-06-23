import VirtualList from 'rc-virtual-list';
import { forwardRef, useMemo, useState } from 'react';

import { KEYRING_TYPE } from '@/shared/constant';
import { Account } from '@/shared/types';
import { Card, Column, Icon, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard, shortAddress, useWallet } from '@/ui/utils';
import { CheckCircleFilled, CopyOutlined, EditOutlined, EllipsisOutlined, KeyOutlined } from '@ant-design/icons';

import { Input } from '../Input';

export interface ItemData {
  key: string;
  account?: Account;
}

interface MyItemProps {
  account?: Account;
  autoNav?: boolean;
}

export function MyItem({ account, autoNav }: MyItemProps, ref) {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const selected = currentAccount.pubkey == account?.pubkey;
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const keyring = useCurrentKeyring();
  if (!account) {
    return <div />;
  }
  const [optionsVisible, setOptionsVisible] = useState(false);
  const path = keyring.hdPath + '/' + account.index;

  const tools = useTools();

  return (
    <Card justifyBetween mt="md">
      <Row>
        <Column style={{ width: 20 }} selfItemsCenter>
          {selected && (
            <Icon>
              <CheckCircleFilled />
            </Icon>
          )}
        </Column>
        <Column
          onClick={async (e) => {
            if (currentAccount.pubkey !== account.pubkey) {
              await wallet.changeKeyring(keyring, account.index);
              const _currentAccount = await wallet.getCurrentAccount();
              dispatch(accountActions.setCurrent(_currentAccount));
            }
            if (autoNav) navigate('MainScreen');
          }}>
          <Text text={account.alianName} />
          <Text text={`${shortAddress(account.address)} (${path})`} preset="sub" />
        </Column>
      </Row>
      <Column relative>
        {optionsVisible && (
          <div
            style={{
              position: 'fixed',
              zIndex: 10,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }}
            onTouchStart={(e) => {
              setOptionsVisible(false);
            }}
            onMouseDown={(e) => {
              setOptionsVisible(false);
            }}></div>
        )}

        <Icon
          onClick={async (e) => {
            setOptionsVisible(!optionsVisible);
          }}>
          <EllipsisOutlined />
        </Icon>

        {optionsVisible && (
          <Column
            style={{
              backgroundColor: colors.black,
              width: 160,
              position: 'absolute',
              right: 0,
              padding: 5,
              zIndex: 10
            }}>
            <Row
              onClick={() => {
                navigate('EditAccountNameScreen', { account });
              }}>
              <EditOutlined />
              <Text text="Edit Name" size="sm" />
            </Row>
            <Row
              onClick={() => {
                copyToClipboard(account.address);
                tools.toastSuccess('copied');
                setOptionsVisible(false);
              }}>
              <CopyOutlined />
              <Text text="Copy address" size="sm" />
            </Row>
            {account.type !== KEYRING_TYPE.KeystoneKeyring && (
              <Row
                onClick={() => {
                  navigate('ExportPrivateKeyScreen', { account });
                }}>
                <KeyOutlined />
                <Text text="Export Private Key" size="sm" />
              </Row>
            )}
          </Column>
        )}
      </Column>
    </Card>
  );
}

export default function SwitchAccountScreen() {
  const keyring = useCurrentKeyring();
  const items = useMemo(() => {
    const _items: ItemData[] = keyring.accounts.map((v) => {
      return {
        key: v.address,
        account: v
      };
    });
    return _items;
  }, []);
  const ForwardMyItem = forwardRef(MyItem);

  return (
    <Column
      style={{
        gap: '24px'
      }}>
      <Row
        style={{
          padding: '0px 10px',
          borderRadius: '12px',
          backgroundColor: '#1E1E1F',
          border: '1px solid #FFFFFF33'
        }}
        itemsCenter
        bg="search_box_bg"
        full>
        <Icon icon="search" color={'search_icon'} size={20}></Icon>

        <Input
          containerStyle={{
            width: '100%',
            minHeight: '40px',
            border: 'none',
            padding: '0'
          }}
          placeholder="Search crypto"
        />
      </Row>
      <VirtualList data={items} data-id="list" itemHeight={20} itemKey={(item) => item.key}>
        {(item, index) => <ForwardMyItem account={item.account} autoNav={true} />}
      </VirtualList>
    </Column>
  );
}
