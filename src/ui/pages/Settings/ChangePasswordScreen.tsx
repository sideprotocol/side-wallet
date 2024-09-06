import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Column, Content, Header, Input, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useWallet } from '@/ui/utils';
import { getPasswordStrengthWord } from '@/ui/utils/password-utils';

import { useNavigate } from '../MainRoute';

type Status = '' | 'error' | 'warning' | undefined;

export default function ChangePasswordScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [originPassword, setOriginPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const wallet = useWallet();
  const tools = useTools();

  const [isOldPwdError, setIsOldPwdError] = useState(false);
  const [isPwdError, setIsPwdError] = useState(false);
  const [isPwdFocus, setIsPwdFocus] = useState(false);
  const [oldPwdErrorMsg, setOldPwdErrorMsg] = useState('');
  const [pwdErrorMsg, setPwdErrorMsg] = useState('');
  const [isConfirmError, setIsConfirmError] = useState(false);
  const [isConfirmFocus, setIsConfirmFocus] = useState(false);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const strongText = useMemo(() => {
    if (!newPassword) {
      return;
    }
    const { text, color, tip } = getPasswordStrengthWord(newPassword);

    return (
      <Column>
        <Row>
          <Text size="xs" text={'Password strength: '} />
          <Text size="xs" text={text} style={{ color: color }} />
        </Row>
      </Column>
    );
  }, [newPassword]);
  useEffect(() => {
    if (originPassword.length > 0 && newPassword.length >= 8 && newPassword === confirmPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [originPassword, newPassword, confirmPassword]);

  const verify = async () => {
    try {
      await wallet.changePassword(originPassword, newPassword);
      // tools.toastSuccess('Success');
      // navigate('MainScreen');
      // setIsSuccess(true);
      // setTimeout(() => {
      // setConfirmErrorMsg('Your password has been reset!');
      tools.toastSuccess('Your password has been reset!');
      // }, 1000);
      // setTimeout(() => {
      //   setIsSuccess(false);
      navigate('MainScreen');
      // }, 1500);
    } catch (err) {
      // tools.toastError((err as any).message);
      setIsOldPwdError(true);
      setOldPwdErrorMsg('You entered wrong password.');
    }
  };
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Change Password"
      />
      <Content
        style={{
          marginTop: 16
        }}
        justifyBetween
      >
        <Column gap="lg">
          <Column>
            <Text text={'Old Password'} color={'white'} preset="sub"></Text>
            <Input
              preset="password"
              placeholder="Current Password"
              onChange={(e) => {
                setOriginPassword(e.target.value);
              }}
              autoFocus={true}
            />
            <Text text={oldPwdErrorMsg} color={'red'} preset="sub"></Text>
          </Column>

          <Column>
            <Text text={'New Password'} color={'white'} preset="sub"></Text>

            <Input
              containerStyle={{
                borderColor: isPwdError ? '#ff0000' : isPwdFocus ? 'white' : ''
              }}
              preset="password"
              placeholder="New Password"
              onFocus={(e) => {
                setIsPwdFocus(true);
              }}
              onBlur={(e) => {
                setIsPwdFocus(false);
                if (newPassword.length < 8) {
                  // tools.toastWarning('at least five characters');
                  setIsPwdError(true);
                  setPwdErrorMsg('Password must include at least 8 characters');
                  return;
                }
                if (newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword) {
                  // tools.toastWarning('Entered passwords differ');
                  setIsPwdError(true);
                  setPwdErrorMsg('Passwords do not match');
                }
              }}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setIsPwdError(false);
                setPwdErrorMsg('');
                setIsConfirmError(false);
                setConfirmErrorMsg('');
              }}
            />
            {strongText}
            <Text text={pwdErrorMsg} color={'red'} preset="sub"></Text>
          </Column>

          <Column>
            <Text text={'Confirm Password'} color={'white'} preset="sub"></Text>

            <Input
              preset="password"
              placeholder="Confirm Password"
              onFocus={(e) => {
                setIsConfirmFocus(true);
              }}
              onBlur={(e) => {
                setIsPwdError(false);
                setPwdErrorMsg('');
                setIsConfirmError(false);
                setConfirmErrorMsg('');
                if (newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword) {
                  // tools.toastWarning('Entered passwords differ');
                  setIsConfirmError(true);
                  setConfirmErrorMsg('Passwords do not match.');
                }
              }}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsPwdError(false);
                setPwdErrorMsg('');
                setIsConfirmError(false);
                setConfirmErrorMsg('');
              }}
            />
            <Text text={confirmErrorMsg} color={'red'} preset="sub"></Text>
          </Column>
        </Column>

        <Column>
          <Button
            disabled={disabled}
            text="Confirm"
            preset="primary"
            onClick={() => {
              verify();
            }}
          />
        </Column>
      </Content>
    </Layout>
  );
}
