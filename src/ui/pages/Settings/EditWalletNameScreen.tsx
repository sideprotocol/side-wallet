import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { WalletKeyring } from '@/shared/types';
import { Button, Column, Header, Input, Layout, Text } from '@/ui/components';
import { useAppDispatch } from '@/ui/state/hooks';
import { keyringsActions } from '@/ui/state/keyrings/reducer';
import { useWallet } from '@/ui/utils';

export default function EditWalletNameScreen() {
  const { state } = useLocation();
  const { keyring } = state as {
    keyring: WalletKeyring;
  };

  const wallet = useWallet();
  const [alianName, setAlianName] = useState('');
  const dispatch = useAppDispatch();
  const handleOnClick = async () => {
    const newKeyring = await wallet.setKeyringAlianName(keyring, alianName || keyring.alianName);
    dispatch(keyringsActions.updateKeyringName(newKeyring));
    window.history.go(-1);
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      handleOnClick();
    }
  };

  const isValidName = useMemo(() => {
    if (alianName.length == 0) {
      return false;
    }
    return true;
  }, [alianName]);

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Change Wallet Name"
      />
      <Column
        style={{
          flex: 1,
          padding: '0 16px 24px'
        }}
      >
        <Column style={{ flex: 1, gap: '8px' }}>
          <Text
            text="Previous Wallet Name"
            color="white"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '24px',
              marginTop: '24px'
            }}
          />
          <Input value={keyring.alianName} disabled />
          <Text
            text="New Wallet Name"
            color="white"
            style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '24px',
              marginTop: '16px'
            }}
          />
          <Input
            onChange={(e) => {
              setAlianName(e.target.value);
            }}
            onKeyUp={(e) => handleOnKeyUp(e)}
            autoFocus={true}
          />
        </Column>
        <Button
          disabled={!isValidName}
          text="Save"
          preset="primary"
          onClick={(e) => {
            handleOnClick();
          }}
        />
      </Column>
    </Layout>
  );
}
