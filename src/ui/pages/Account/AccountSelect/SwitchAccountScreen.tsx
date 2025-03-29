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
import { copyToClipboard, shortAddress, useWallet } from '@/ui/utils';

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
  const [isHovered, setIsHovered] = useState(false);
  const [isClickCopy, setIsClickCopy] = useState(false);
  console.log('account: ', account);
  // debugger;
  if (!account) {
    return <div />;
  }

  function copy(str: string) {
    copyToClipboard(str).then(() => {
      setTimeout(() => {
        setIsClickCopy(false);
      }, 3000);
    });
  }

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <>
      <Row
        justifyBetween
        classname="accountItem bg-item-hover-v3"
        style={{
          height: '60px',
          alignItems: 'center',
          padding: '0 6px 0 14px',
          borderRadius: '10px',
          marginTop: '16px',
          background: selected ? '#F7771A33' : '#2E2E2F!important',
          border: `1px solid ${selected ? 'rgba(34, 171, 56, 0.1)' : '#2E2E2F!important'}`,
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
        <div>
          <Text
            text={account.alianName}
            color="text"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '17px'
            }}
          />

          <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'flex',
              gap: 0,
              alignItems: 'center',
              height: 19
            }}>
            <Text
              text={shortAddress(account.address)}
              color="search_icon"
              style={{
                fontSize: '12px',
                lineHeight: '17px',
                marginRight: '8px'
              }}
            />
            <Icon
              className={'copy-icon'}
              style={{
                marginRight: '3px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                copy(account.address);
                setIsClickCopy(true);
              }}
              icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
              color={isClickCopy ? 'primary' : isHovered ? 'white' : 'search_icon'}
              size={14}
            />
            <Text
              text={isClickCopy ? 'Copied' : ''}
              color={isClickCopy ? 'primary' : isHovered ? 'white' : 'search_icon'}
            />
          </div>
        </div>

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
                padding: '12px 0',
                zIndex: 10,
                gap: '8px',
                borderRadius: '8px'
              }}>
              <Row
                classname="bg-item-hover"
                style={{
                  gap: '16px',
                  alignItems: 'center',
                  padding: '10px 6px',
                  margin: '0 10px'
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
                  classname="bg-item-hover"
                  style={{
                    gap: '16px',
                    alignItems: 'center',
                    padding: '10px 6px',
                    margin: '0 10px'
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
              {/*<Row*/}
              {/*  classname="bg-item-hover"*/}
              {/*  style={{*/}
              {/*    gap: '16px',*/}
              {/*    alignItems: 'center',*/}
              {/*    padding: '10px 16px'*/}
              {/*  }}*/}
              {/*  onClick={(e) => {*/}
              {/*    e.stopPropagation();*/}
              {/*    copyToClipboard(account.address);*/}
              {/*    tools.toastSuccess('copied');*/}
              {/*    setOptionsVisible(false);*/}
              {/*  }}>*/}
              {/*  <Image src="./images/icons/copy-03.svg" size={20} />*/}
              {/*  <Text*/}
              {/*    text="Copy Address"*/}
              {/*    color="text"*/}
              {/*    style={{*/}
              {/*      fontSize: '14px',*/}
              {/*      fontWeight: 500,*/}
              {/*      lineHeight: '17px'*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</Row>*/}
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
  const [isFocus, setIsFocus] = useState(false);
  let items = useMemo(() => {
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
    items = [];
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
        <div
          className="flex items-center gap-[5px] bg-[#17171C] rounded-[12px] px-[10px] hover:border-[#ffffff50] border-[1px] border-solid border-[#ffffff20]"
          style={{
            borderColor: isFocus ? 'white' : ''
          }}>
          <Icon icon="search" color={'search_icon'} size={20}></Icon>

          <Input
            containerStyle={{
              width: '100%',
              minHeight: '40px',
              border: 'none',
              padding: '0'
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(event) => {
              const value = event.target.value.replace(/,/g, '');
              setKeyword(value);
            }}
            placeholder="Search Account"
          />
        </div>
      </div>
      <VirtualList
        data={items}
        data-id="list"
        itemHeight={20}
        itemKey={(item) => item.key}
        style={{ flex: 1, overflow: 'auto', marginBottom: '16px' }}>
        {(item, index) => <ForwardMyItem account={item.account} autoNav={true} />}
      </VirtualList>
      <Button text="Add Account" preset="primary" icon={'plus'} onClick={add} />
    </>
  );
}
