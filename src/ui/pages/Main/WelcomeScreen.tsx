/* eslint-disable quotes */
import { Button, Column, Image, Layout, Row } from '@/ui/components';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { useWallet } from '@/ui/utils';

import { useNavigate } from '../MainRoute';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const isInTab = useExtensionIsInTab();

  return (
    <Layout>
      <Column
        fullX
        fullY
        style={{
          padding: '0 16px'
        }}>
        <Row
          justifyCenter
          style={{
            flex: 1,
            alignItems: 'center'
          }}>
          <Image src="./images/icons/wallet.svg" size={78} />
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
          text="I already have a wallet"
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
            marginTop: '24px',
            marginBottom: '24px'
          }}
        />
      </Column>
    </Layout>
  );
}
