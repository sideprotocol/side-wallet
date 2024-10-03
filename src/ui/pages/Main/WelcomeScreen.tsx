import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { Button, Column, Header, Image, Row } from '@/ui/components';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const navigateRouter = useNavigateRouter();
  const { state } = useLocation();
  const wallet = useWallet();
  const isInTab = useExtensionIsInTab();

  return (
    <div
      style={{
        backgroundColor: '#09090A',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: window.location.pathname === '/sidePanel.html' ? '100vw' : '375px',
        minHeight: '600px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        overflowY: 'auto',
        overflowX: 'hidden',
        border: !isInTab ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}>
      {state?.addWallet && <Header onBack={() => navigateRouter(-1)} title="Add Wallet" />}
      <Column
        fullX
        fullY
        style={{
          gap: '0',
          padding: '0 16px 24px'
        }}>
        <Column
          style={{
            flex: 1
          }}>
          <Row
            justifyCenter
            style={{
              flex: 1,
              alignItems: 'center'
              // marginTop: '80px'
            }}>
            <Image src="/images/img/welcome.gif" size={330} />
          </Row>
          <Button
            style={
              {
                // marginTop: '60px'
              }
            }
            text="Create new wallet"
            preset="primary"
            onClick={async () => {
              const isBooted = await wallet.isBooted();
              if (isBooted) {
                navigate('CreateHDWalletScreen', { isImport: false });
              } else {
                navigate('CreatePasswordScreen', { isNewAccount: true });
              }
            }}
          />
          <Button
            text="Import an existing wallet"
            preset="default"
            onClick={async () => {
              const isBooted = await wallet.isBooted();
              if (isBooted) {
                navigate('CreateHDWalletScreen', { isImport: true });
              } else {
                navigate('CreatePasswordScreen', { isNewAccount: false });
              }
            }}
            style={{
              marginTop: '8px'
            }}
          />
        </Column>
      </Column>
    </div>
  );
}
