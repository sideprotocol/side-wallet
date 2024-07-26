import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { Button, Column, Header, Input, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useWallet, useWalletRequest } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

type Status = '' | 'error' | 'warning' | undefined;

export default function CreatePasswordScreen() {
  const navigate = useNavigate();
  const navigateRouter = useNavigateRouter();
  const wallet = useWallet();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  let state = {};
  if (loc.state) {
    state = loc.state;
  }
  if (params.size > 0) {
    params.forEach((value, key) => {
      state[key] = value;
    });
  }
  const { isNewAccount, isKeystone } = state as { isNewAccount: boolean; isKeystone: boolean };
  const [password, setPassword] = useState('');

  const [password2, setPassword2] = useState('');

  const [disabled, setDisabled] = useState(true);
  const [check, setCheck] = useState(false);

  const tools = useTools();
  const [run, loading] = useWalletRequest(wallet.boot, {
    onSuccess() {
      if (isKeystone) {
        navigate('CreateKeystoneWalletScreen', { fromUnlock: true });
      } else if (isNewAccount) {
        navigate('CreateHDWalletScreen', { isImport: false, fromUnlock: true });
      } else {
        navigate('CreateHDWalletScreen', { isImport: true, fromUnlock: true });
      }
    },
    onError(err) {
      tools.toastError(err);
    }
  });

  const btnClick = () => {
    run(password.trim());
  };

  const verify = (pwd2: string) => {
    if (pwd2 && pwd2 !== password) {
      tools.toastWarning('Entered passwords differ');
    }
  };

  useEffect(() => {
    setDisabled(true);

    if (password) {
      if (password.length < 5) {
        tools.toastWarning('Password must contain at least 5 characters');
        return;
      }

      if (!check) {
        return;
      }

      if (password2) {
        if (password === password2) {
          setDisabled(false);
          return;
        }
      }
    }
  }, [password, password2, check]);

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      btnClick();
    }
  };

  return (
    <Layout>
      <Header onBack={() => navigateRouter(-1)} title="Create Password"></Header>
      <Column
        style={{
          flex: 1,
          padding: '0 16px 24px'
        }}>
        <Column
          style={{
            flex: 1
          }}>
          <Text
            text="Your password can unlock your wallet only this local device. if you forget your password,you will not be able to access your wallet on this decice."
            style={{
              opacity: 0.5,
              fontSize: '12px',
              lineHeight: '18px',
              marginTop: '24px'
            }}
          />
          <Text
            text="Password"
            style={{
              marginTop: '24px',
              color: '#828282',
              fontSize: '14px',
              lineHeight: '24px'
            }}
          />
          <Input
            preset="password"
            onBlur={(e) => {
              setPassword(e.target.value);
            }}
            autoFocus={true}
          />
          <Text
            text="Confirm Password"
            style={{
              marginTop: '16px',
              color: '#828282',
              fontSize: '14px',
              lineHeight: '24px'
            }}
          />
          <Input
            preset="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            onBlur={(e) => {
              verify(e.target.value);
            }}
            onKeyUp={(e) => handleOnKeyUp(e)}
          />
          <Row
            style={{
              marginTop: '16px',
              alignItems: 'start'
            }}
            justifyBetween>
            <Checkbox
              style={{
                borderRadius: '4px',
              }}
              defaultChecked={check}
              onChange={(e) => {
                setCheck(e.target.checked);
              }}
            />
            <Text
              text="I understand that I will not be able to access my wallet on this device if I forget my password"
              style={{
                color: '#fff',
                opacity: 0.5,
                fontSize: '12px',
                lineHeight: '18px'
              }}
            />
          </Row>
        </Column>
        <Button disabled={disabled} text="Next" preset="primary" onClick={btnClick} />
      </Column>
    </Layout>
  );
}
