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
      className={`
      bg-[#09090A]
      flex
      flex-col
      w-full
      ${window.location.pathname === '/sidePanel.html' ? 'max-w-[100vw]' : 'max-w-[375px]'}
      min-h-[600px]
      ${window.location.pathname === '/sidePanel.html' ? 'h-screen' : 'h-[600px]'}
      overflow-y-auto
      overflow-x-hidden
      ${!isInTab ? 'border border-white/10' : 'border-none'}
    `}>
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
            }}>
            <Image src="/images/img/welcome.png" width={184} height={220} />
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
              marginTop: '8px'
            }}
          />
        </Column>
      </Column>
    </div>
  );
}
