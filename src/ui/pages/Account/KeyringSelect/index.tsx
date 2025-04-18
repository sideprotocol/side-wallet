import { Modal } from 'antd';
import VirtualList from 'rc-virtual-list';
import { forwardRef, useMemo, useState } from 'react';

import { WalletKeyring } from '@/shared/types';
import { Button, Icon, Image, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useCurrentKeyring, useKeyrings } from '@/ui/state/keyrings/hooks';
import { keyringsActions } from '@/ui/state/keyrings/reducer';
import { useWallet } from '@/ui/utils';

import './index.less';

export interface ItemData {
  key: string;
  keyring: WalletKeyring;
}

interface MyItemProps {
  keyring: WalletKeyring;
  autoNav?: boolean;
}

function MyItem({ keyring, autoNav }: MyItemProps, ref) {
  const currentKeyring = useCurrentKeyring();
  const selected = currentKeyring.index === keyring?.index;
  const wallet = useWallet();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const tools = useTools();

  return (
    <>
      <Row
        justifyBetween
        classname="accountItem"
        style={{
          height: '44px',
          alignItems: 'center',
          padding: '0 16px',
          borderRadius: '10px',
          marginTop: '4px',
          background: selected ? '#1E1E1F' : 'transparent',
          cursor: 'pointer'
        }}
        onClick={async (e) => {
          if (!keyring.accounts[0]) {
            tools.toastError('Invalid wallet, please remove it and add new one');
            return;
          }
          if (currentKeyring.key !== keyring.key) {
            await wallet.changeKeyring(keyring);
            dispatch(keyringsActions.setCurrent(keyring));
            const _currentAccount = await wallet.getCurrentAccount();
            dispatch(accountActions.setCurrent(_currentAccount));
          }
          if (autoNav) navigate('MainScreen');
        }}>
        <Text
          text={keyring.alianName}
          color="text"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '17px'
          }}
        />
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate('KeyringSettingScreen', { index: keyring.index });
          }}>
          <Image src="./images/icons/settings-02.svg" size={20} />
        </div>
      </Row>
    </>
  );
}

export default function WalletSelect() {
  const currentKeyring = useCurrentKeyring();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const keyrings = useKeyrings();

  const items = useMemo(() => {
    const _items: ItemData[] = keyrings.map((v) => {
      return {
        key: v.key,
        keyring: v
      };
    });
    // _items.push({
    //   key: 'add'
    // });
    return _items;
  }, [keyrings]);
  const ForwardMyItem = forwardRef(MyItem);

  return (
    <>
      <Row
        classname="bg-item-hover-v2 !rounded-[16px]"
        itemsCenter
        justifyBetween
        rounded
        onClick={() => {
          setIsModalOpen(true);
        }}
        style={{
          padding: '5px 16px',
          gap: '10px'
        }}>
        <Text
          color="text"
          text={currentKeyring.alianName}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '17px'
          }}
        />
        <Icon icon="down" />
      </Row>
      <Modal
        className="walletSelectModal"
        title={null}
        closable={false}
        centered
        open={isModalOpen}
        footer={null}
        width={314}
        onCancel={() => setIsModalOpen(false)}>
        <div
          style={{
            padding: '12px 10px 16px'
          }}>
          <VirtualList
            data={items}
            data-id="list"
            itemHeight={30}
            itemKey={(item) => item.key}
            // disabled={animating}
            style={{
              boxSizing: 'border-box'
            }}
            // onSkipRender={onAppear}
            // onItemRemove={onAppear}
          >
            {(item, index) => <ForwardMyItem keyring={item.keyring} autoNav={true} />}
          </VirtualList>
          <Button
            text="Add Wallet"
            preset="primary"
            onClick={() => {
              navigate('WelcomeScreen', { addWallet: true });
            }}
            style={{
              marginTop: '18px'
            }}
          />
        </div>
      </Modal>
    </>
  );
}
