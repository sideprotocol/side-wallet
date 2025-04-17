import { Checkbox } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { Button, Column, Header, Input, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { colors } from '@/ui/theme/colors';
import { useWallet, useWalletRequest } from '@/ui/utils';
import { getPasswordStrengthWord } from '@/ui/utils/password-utils';

import { useNavigate } from '../MainRoute';

type Status = '' | 'error' | 'warning' | undefined;

export default function CreatePasswordScreen() {
  const navigate = useNavigate();
  const navigateRouter = useNavigateRouter();
  const isInTab = useExtensionIsInTab();
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

  const [isPwdError, setIsPwdError] = useState(false);
  const [isPwdFocus, setIsPwdFocus] = useState(false);
  const [pwdErrorMsg, setPwdErrorMsg] = useState('');
  const [isConfirmError, setIsConfirmError] = useState(false);
  const [isConfirmFocus, setIsConfirmFocus] = useState(false);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState('');
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

  const strongText = useMemo(() => {
    if (!password) {
      return;
    }
    const { text, color, tip } = getPasswordStrengthWord(password);

    return (
      <Column>
        <Row>
          <Text size="xs" text={'Password strength: '} />
          <Text size="xs" text={text} style={{ color: color }} />
        </Row>
      </Column>
    );
  }, [password]);

  const btnClick = () => {
    run(password.trim());
  };

  const verify = (pwd2: string) => {
    if (pwd2 && pwd2 !== password) {
      // tools.toastWarning('Entered passwords differ');
      setIsPwdError(true);
      setIsConfirmError(true);
      setConfirmErrorMsg('Passwords do not match');
    }
  };

  useEffect(() => {
    setDisabled(true);
    if (password) {
      setIsPwdError(false);
      setPwdErrorMsg('');
      setIsConfirmError(false);
      setConfirmErrorMsg('');
      if (password.length < 8) {
        // tools.toastWarning('Password must contain at least 8 characters');
        setIsPwdError(true);
        setPwdErrorMsg('Password must include at least 8 characters');
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
    <div
      style={{
        backgroundColor: colors.black,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: window.location.pathname === '/sidePanel.html' ? '100vw' : '360px',
        minHeight: '600px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        overflowY: 'auto',
        overflowX: 'hidden',
        border: !isInTab ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        justifyContent: 'center'
      }}>
      <Header onBack={() => navigateRouter(-1)} title="Create Password"></Header>
      <Column
        style={{
          minHeight: '530px',
          flex: 1,
          padding: '0 16px 24px'
        }}>
        <Column
          style={{
            flex: 1
          }}>
          <Text
            text="Your password only unlocks your wallet on this local device. If you forget your password, you will lose access to your wallet on this device."
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
            placeholder="Set your password"
            containerStyle={{
              borderColor: isPwdError ? '#ff0000' : isPwdFocus ? 'white' : ''
            }}
            preset="password"
            onBlur={(e) => {
              setPassword(e.target.value);
              setIsPwdFocus(false);
            }}
            onFocus={(e) => {
              setIsPwdFocus(true);
            }}
            onChange={(e) => {
              setIsPwdError(false);
              setPwdErrorMsg('');
              setIsConfirmError(false);
              setConfirmErrorMsg('');
            }}
            autoFocus={true}
          />
          {strongText}
          <div
            style={{
              color: '#ff0000',
              fontSize: '14px',
              opacity: pwdErrorMsg ? 1 : 0
            }}
            className="">
            {pwdErrorMsg}
          </div>
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
            containerStyle={{
              borderColor: isConfirmError ? '#ff0000' : isConfirmFocus ? 'white' : ''
            }}
            preset="password"
            placeholder="Repeat your password"
            onChange={(e) => {
              setIsPwdError(false);
              setPwdErrorMsg('');
              setIsConfirmError(false);
              setConfirmErrorMsg('');
              setPassword2(e.target.value);
            }}
            onFocus={(e) => {
              setIsConfirmFocus(true);
            }}
            onBlur={(e) => {
              verify(e.target.value);
              setIsConfirmFocus(false);
            }}
            onKeyUp={(e) => handleOnKeyUp(e)}
          />
          <div
            style={{
              color: '#ff0000',
              fontSize: '14px',
              opacity: confirmErrorMsg ? 1 : 0
            }}
            className="">
            {confirmErrorMsg}
          </div>
          <Row
            style={{
              marginTop: '6px',
              alignItems: 'start'
            }}
            justifyBetween>
            <Checkbox
              style={{
                borderRadius: '4px'
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
    </div>
  );
}
