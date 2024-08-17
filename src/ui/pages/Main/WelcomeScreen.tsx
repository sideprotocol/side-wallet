import { useLocation, useNavigate as useNavigateRouter } from 'react-router-dom';

import { Button, Column, Header, Image, Layout, Row } from '@/ui/components';
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
    <Layout
      style={{
        maxWidth: window.location.pathname === '/sidePanel.html' ? '100vw' : '375px',
        height: window.location.pathname === '/sidePanel.html' ? '100vh' : '600px',
        overflow: 'hidden'
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
              alignItems: 'center',
              marginTop: '115px'
            }}>
            <Image src="./images/img/welcome.gif" size={174} />
          </Row>
          <Button
            style={{
              marginTop: '100px'
            }}
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
    </Layout>
  );
}
