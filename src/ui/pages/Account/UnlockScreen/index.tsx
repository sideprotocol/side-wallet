import React, { useEffect, useState } from 'react';

import { Column, Image, Layout } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Button } from '@/ui/components/Button';
import { Input } from '@/ui/components/Input';
import { Text } from '@/ui/components/Text';
import { useUnlockCallback } from '@/ui/state/global/hooks';
import { getUiType, useWallet } from '@/ui/utils';

import { useNavigate } from '../../MainRoute';

export default function UnlockScreen() {
  const wallet = useWallet();
  const navigate = useNavigate();
  // const [btnText, setBtnText] = useState('Incorrect Password');
  const [btnText, setBtnText] = useState('Unlock');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const UIType = getUiType();
  const isInNotification = UIType.isNotification;
  const unlock = useUnlockCallback();
  const tools = useTools();
  const btnClick = async () => {
    try {
      await unlock(password);
      if (!isInNotification) {
        const hasVault = await wallet.hasVault();
        if (!hasVault) {
          navigate('WelcomeScreen');
          return;
        } else {
          navigate('MainScreen');
          return;
        }
      }
    } catch (e) {
      // tools.toastError('PASSWORD ERROR');
      setDisabled(true);
      setBtnText('Incorrect Password');
    }
  };

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && 'Enter' == e.key) {
      btnClick();
    }
  };

  useEffect(() => {
    if (password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);
  return (
    <Layout>
      <Column
        fullX
        fullY
        style={{
          padding: '0 16px 24px'
        }}>
        <Column
          justifyCenter
          style={{
            flex: 1,
            alignItems: 'center',
            gap: '16px'
          }}>
          <Image src="./images/img/phone.png" size={174} />
          <Text
            text="🎉 Welcome Back"
            textCenter
            style={{
              fontSize: '24px',
              fontWeight: 600
            }}
          />
        </Column>

        <Text
          text="Password"
          style={{
            color: '#828282',
            fontSize: '14px',
            lineHeight: '24px'
          }}
        />
        <Input
          preset="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setBtnText('Unlock');
          }}
          onKeyUp={(e) => handleOnKeyUp(e)}
          autoFocus={true}
        />
        {/*<Button disabled={disabled} text="Unlock" preset="primary" onClick={btnClick} style={{ marginTop: '24px' }} />*/}
        <Button disabled={disabled} text={btnText} preset="primary" onClick={btnClick} style={{ marginTop: '24px' }} />
        <Text
          text="Forget Password"
          style={{
            marginTop: '16px',
            color: '#828282',
            fontSize: '14px',
            lineHeight: '24px'
          }}
          textCenter
          onClick={() => {
            navigate('ForgetPasswordScreen');
          }}
        />
      </Column>
    </Layout>
  );
}
