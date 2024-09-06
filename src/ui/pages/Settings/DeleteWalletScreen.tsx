import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Button, Column, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useKeyrings } from '@/ui/state/keyrings/hooks';
import { keyringsActions } from '@/ui/state/keyrings/reducer';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

export default function DeleteWalletScreen() {
  const { t } = useTranslation();

  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState('');
  const wallet = useWallet();
  const tools = useTools();
  const keyrings = useKeyrings();
  const { state } = useLocation();
  const { index } = state as {
    index: number;
  };
  const keyring = useMemo(() => {
    return keyrings.find((item) => item.index === index);
  }, [keyrings]);

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' == e.key) {
      handleDelete();
    }
  };

  useEffect(() => {
    if (password) {
      setDisabled(false);
      setError('');
    } else {
      setDisabled(true);
    }
  }, [password]);

  const handleDelete = async () => {
    try {
      if (!keyring) {
        return;
      }

      await wallet.getMnemonics(password, keyring);

      const keyrings = await wallet.getKeyrings();

      if (keyrings.length == 1) {
        tools.toastError('Removing the last wallet is not allowed');
        return;
      }
      const nextKeyring = await wallet.removeKeyring(keyring);
      dispatch(keyringsActions.setKeyrings(keyrings));

      if (nextKeyring) {
        dispatch(accountActions.setCurrent(nextKeyring.accounts[0]));
        navigate('MainScreen');
        return;
      }

      if (keyrings[0]) {
        dispatch(keyringsActions.setCurrent(keyrings[0]));
        navigate('MainScreen');
        return;
      }
      navigate('MainScreen');
    } catch (e) {
      setError((e as any).message);
    }
  };
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Delete Wallet"
      />
      <Column
        fullX
        fullY
        style={{
          gap: '0',
          padding: '0 16px 24px'
        }}
      >
        <Column
          justifyCenter
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Image src="/images/img/delete-icon.png" size={90} />
        </Column>
        <Column
          style={{
            marginTop: '24px',
            backgroundColor: 'rgb(240 182 34 / 10%)',
            borderRadius: '10px',
            padding: '10px',
            gap: '4px'
          }}
        >
          <Row
            style={{
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Image src="/images/icons/alert-triangle.svg" size={24} />
            <Text
              text="Alert"
              style={{
                color: '#F0B622',
                lineHeight: '20px',
                fontSize: '14px',
                fontWeight: 600
              }}
            />
          </Row>
          {/*<Text*/}
          {/*  text="Make sure that you have backed up your recovery phrase.  Back Up My Wallet"*/}
          {/*  style={{*/}
          {/*    color: '#fff',*/}
          {/*    lineHeight: '18px',*/}
          {/*    fontSize: '12px',*/}
          {/*    fontWeight: 400*/}
          {/*  }}*/}
          {/*/>*/}
          <div className="text-[12px] text-white leading-[18px] font-[400] ">
            Make sure that you have backed up your recovery phrase.{' '}
            <span
              className={'underline cursor-pointer'}
              onClick={() => {
                navigate('ExportMnemonicsScreen', { keyring });
              }}
            >
              Back Up My Wallet
            </span>
          </div>
          <Text
            text="After deletion, you will need to import your wallet to restore access."
            style={{
              color: '#fff',
              lineHeight: '18px',
              fontSize: '12px',
              fontWeight: 400
            }}
          />
        </Column>
        <Text
          text="Password"
          color="white_muted"
          style={{
            fontSize: '14px',
            lineHeight: '24px',
            marginTop: '24px'
          }}
        />
        <Input
          preset="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyUp={(e) => handleOnKeyUp(e)}
          autoFocus={true}
        />
        {error && <Text text={error} preset="regular" color="error" />}

        <Button
          disabled={disabled}
          text="Confirm"
          preset="primary"
          onClick={handleDelete}
          style={{
            marginTop: '24px'
          }}
        />
      </Column>
    </Layout>
  );
}
