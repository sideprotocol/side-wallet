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
  const { addWallet } = state as {
    addWallet: boolean;
  };

  return (
    <Layout>
      <Column
        fullX
        fullY
        style={{
          gap: '0',
          padding: '0 16px 24px'
        }}>
        {addWallet && <Header onBack={() => navigateRouter(-1)} title="Add Wallet" />}
        <Column
          style={{
            flex: 1
          }}>
          <Row
            justifyCenter
            style={{
              flex: 1,
              alignItems: 'center'
            }}>
            <Image src="./images/img/phone.png" size={174} />
          </Row>
          <Button
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
              marginTop: '24px'
            }}
          />
        </Column>
      </Column>
    </Layout>
  );
}
