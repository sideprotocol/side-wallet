import VirtualList from 'rc-virtual-list';
import { forwardRef, useMemo, useState } from 'react';

import { KEYRING_TYPE } from '@/shared/constant';
import { Account } from '@/shared/types';
import { Button, Column, Icon, Image, Input, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { colors } from '@/ui/theme/colors';
import { copyToClipboard, useWallet } from '@/ui/utils';

import './index.less';

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
  const tools = useTools();

  if (!account) {
    return <div />;
  }
  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <>
      <Row
        justifyBetween
        classname="accountItem"
        style={{
          height: '60px',
          alignItems: 'center',
          padding: '0 6px 0 14px',
          borderRadius: '10px',
          marginTop: '16px',
          background: selected ? '#22AB384D' : '#2E2E2F',
          border: `1px solid ${selected ? '#22AB38' : '#2E2E2F'}`,
          cursor: 'pointer'
        }}
        onClick={async (e) => {
          if (currentAccount.pubkey !== account.pubkey) {
            await wallet.changeKeyring(keyring, account.index);
            const _currentAccount = await wallet.getCurrentAccount();
            dispatch(accountActions.setCurrent(_currentAccount));
          }
          if (autoNav) navigate('MainScreen');
        }}>
        <Text
          text={account.alianName}
          color="text"
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '17px'
          }}
        />
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
              }}
            />
          )}
          <div
            className="accountOperateBtn"
            onClick={(e) => {
              e.stopPropagation();
              setOptionsVisible(!optionsVisible);
            }}>
            <Image src="./images/icons/dots-vertical.svg" size={24} />
          </div>

          {optionsVisible && (
            <Column
              style={{
                backgroundColor: colors.black,
                width: 200,
                position: 'absolute',
                right: 0,
                padding: '24px 16px',
                zIndex: 10,
                gap: '16px',
                borderRadius: '12px'
              }}>
              <Row
                style={{
                  gap: '16px',
                  alignItems: 'center'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('EditAccountNameScreen', { account });
                }}>
                <Image src="./images/icons/edit-03.svg" size={20} />
                <Text
                  text="Edit Account Name"
                  color="text"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '17px'
                  }}
                />
              </Row>
              {account.type !== KEYRING_TYPE.KeystoneKeyring && (
                <Row
                  style={{
                    gap: '16px',
                    alignItems: 'center'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('ExportPrivateKeyScreen', { account });
                  }}>
                  <Image src="./images/icons/key-02.svg" size={20} />
                  <Text
                    text="Show Private Key"
                    color="text"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      lineHeight: '17px'
                    }}
                  />
                </Row>
              )}
              <Row
                style={{
                  gap: '16px',
                  alignItems: 'center'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(account.address);
                  tools.toastSuccess('copied');
                  setOptionsVisible(false);
                }}>
                <Image src="./images/icons/key-02.svg" size={20} />
                <Text
                  text="Copy Address"
                  color="text"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '17px'
                  }}
                />
              </Row>
            </Column>
          )}
        </Column>
      </Row>
    </>
  );
}

export default function SwitchAccountScreen() {
  const keyring = useCurrentKeyring();
  const wallet = useWallet();
  const [keyword, setKeyword] = useState('');
  const items = useMemo(() => {
    const _items: ItemData[] = keyring.accounts.map((v) => {
      return {
        key: v.address,
        account: v
      };
    });
    if (keyword) {
      return _items.filter((item) =>
        (item.account?.alianName || item.account?.address || '')
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase())
      );
    }
    return _items;
  }, [keyring.accounts, keyword]);

  const add = async () => {
    const defaultName = await wallet.getNextAlianName(keyring);
    await wallet.deriveNewAccountFromMnemonic(keyring, defaultName);
  };

  const ForwardMyItem = forwardRef(MyItem);

  return (
    <>
      <div
        style={{
          flexGrow: 0
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
            onChange={(event) => {
              const value = event.target.value.replace(/,/g, '');
              setKeyword(value);
            }}
            placeholder="Search Account"
          />
        </Row>
      </div>
      <VirtualList
        data={items}
        data-id="list"
        itemHeight={20}
        itemKey={(item) => item.key}
        style={{ flex: 1, overflow: 'auto', marginBottom: '16px' }}>
        {(item, index) => <ForwardMyItem account={item.account} autoNav={true} />}
      </VirtualList>
      <Button
        text="Add Account"
        preset="ghost"
        icon={<Image src="./images/icons/plus.svg" size={20} />}
        onClick={add}
      />
    </>
  );
}
