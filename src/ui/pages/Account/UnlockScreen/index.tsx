import React, { useEffect, useState } from 'react';

import { Column, Image, Layout } from '@/ui/components';
// import { useTools } from '@/ui/components/ActionComponent';
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
  const [errorMsg, setErrorMsg] = useState('');
  const [btnText, setBtnText] = useState('Unlock');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const UIType = getUiType();
  const isInNotification = UIType.isNotification;
  const unlock = useUnlockCallback();
  // const tools = useTools();
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
      // setBtnText('Incorrect Password');
      setErrorMsg('Invalid Password');
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
        }}
        classname="fadeIn-page-bottom">
        <Column
          justifyCenter
          style={{
            flex: 1,
            alignItems: 'center',
            gap: '16px'
          }}>
          <Image src="/images/logo/wallet-logo.png" size={70} />
          <Text
            text="Welcome Back!"
            textCenter
            style={{
              fontSize: '18px',
              fontWeight: 500
            }}
          />
        </Column>

        <Text
          text="Password"
          style={{
            color: '#828282',
            fontSize: '14px',
            lineHeight: '24px',
            marginTop: '24px'
          }}
        />
        <Input
          containerStyle={{
            // borderColor: errorMsg ? 'rgba(255, 69, 69, 1)' : isFocused ? 'white' : 'rgba(255, 255, 255, 0.2)'
            borderColor: errorMsg ? 'rgba(255, 69, 69, 1)' : isFocused ? 'white' : ''
          }}
          preset="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            setBtnText('Unlock');
            setErrorMsg('');
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          onKeyUp={(e) => handleOnKeyUp(e)}
          autoFocus={true}
        />
        <div
          style={{
            color: '#ff0000',
            fontSize: '14px',
            opacity: errorMsg ? 1 : 0
          }}
          className="">
          {errorMsg}
        </div>
        <Button disabled={disabled} text={btnText} preset="primary" onClick={btnClick} style={{ marginTop: '8px' }} />
        <Text
          text={<span className="hover:text-white">Forget Password</span>}
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
