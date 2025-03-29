import { Checkbox } from 'antd';
import { useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate as useNavigateRouter } from 'react-router-dom';

import * as animationData from '@/ui/assets/lottie/forget-pwd.json';
import { Button, Column, Header, Row, Text } from '@/ui/components';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { useAppDispatch } from '@/ui/state/hooks';
import { keyringsActions } from '@/ui/state/keyrings/reducer';
import { colors } from '@/ui/theme/colors';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

export default function CreateHDWalletScreen() {
  const navigateRouter = useNavigateRouter();
  const navigate = useNavigate();
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const isInTab = useExtensionIsInTab();

  // const strongText = useMemo(() => {
  //   if (!password) {
  //     return;
  //   }
  //   const { text, color, tip } = getPasswordStrengthWord(password);
  //
  //   return (
  //     <Column>
  //       <Row>
  //         <Text size="xs" text={'Password strength: '} />
  //         <Text size="xs" text={text} style={{ color: color }} />
  //       </Row>
  //     </Column>
  //   );
  // }, [password]);

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
        border: !isInTab ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}>
      <Header onBack={() => navigateRouter(-1)} title="Forgot Password"></Header>
      <Column
        style={{
          flex: 1,
          paddingBottom: '10px',
          padding: '0 16px 24px'
        }}>
        <Column
          style={{
            flex: 1,
            overflow: 'auto'
          }}>
          <Row
            justifyCenter
            style={{
              padding: '34px 0 16px'
            }}>
            {/*<Image src="./images/icons/wallet.svg" size={90} />*/}
            <Lottie
              options={
                // loop: true,
                {
                  autoplay: true,
                  animationData
                }
              }
              width={180}
            />
          </Row>
          <Row
            style={{
              alignItems: 'center',
              padding: '16px',
              gap: '8px',
              backgroundColor: '#222222',
              borderRadius: '14px'
            }}>
            <Checkbox
              checked={checked1}
              onChange={(e) => {
                setChecked1(e.target.checked);
              }}
            />
            <Text
              text="Side Wallet does not store your password and cannot assist in recovering it."
              style={{
                color: '#fff',
                opacity: 0.5,
                fontSize: '12px',
                lineHeight: '18px'
              }}
            />
          </Row>
          <Row
            style={{
              alignItems: 'center',
              padding: '16px',
              gap: '8px',
              backgroundColor: '#222222',
              borderRadius: '14px',
              marginTop: '10px'
            }}>
            <Checkbox
              checked={checked2}
              onChange={(e) => {
                setChecked2(e.target.checked);
              }}
            />
            <Text
              text="If you forget your password and have not backed it up, you will permanently lose access to it and your assets. Always ensure that you back up your wallet and keep your seed phrase or private key secure before resetting."
              style={{
                color: '#fff',
                opacity: 0.5,
                fontSize: '12px',
                lineHeight: '18px'
              }}
            />
          </Row>
          <Row
            style={{
              alignItems: 'center',
              padding: '16px',
              gap: '8px',
              backgroundColor: '#222222',
              borderRadius: '14px',
              marginTop: '10px'
            }}>
            <Checkbox
              checked={checked3}
              onChange={(e) => {
                setChecked3(e.target.checked);
              }}
            />
            <Text
              text="If you forget your password, you can reset the wallet by re-importing it using your seed phrase without losing your assets."
              style={{
                color: '#fff',
                opacity: 0.5,
                fontSize: '12px',
                lineHeight: '18px'
              }}
            />
          </Row>
        </Column>
        <Button
          disabled={!(checked1 && checked2 && checked3)}
          text="Reset wallet"
          preset="primary"
          style={{
            marginTop: '8px'
          }}
          onClick={async () => {
            await wallet.reset();
            dispatch(keyringsActions.reset());
            navigate('WelcomeScreen');
          }}
        />
      </Column>
    </div>
  );
}
