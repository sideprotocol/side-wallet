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
      flex
      flex-col
      ${isInTab ? 'bg-transparent ' : 'bg-black min-h-[600px]'}
      w-full
      ${window.location.pathname === '/sidePanel.html' ? 'max-w-[100vw]' : 'max-w-[500px]'}
      min-h-[450px]
      ${window.location.pathname === '/sidePanel.html' ? 'h-screen' : isInTab ? 'h-[450px]' : 'h-[600px]'}
      overflow-y-auto
      overflow-x-hidden
      ${!isInTab ? 'border border-white/10' : 'border-none'}
    `}>
      {state?.addWallet && <Header onBack={() => navigateRouter(-1)} title="Add Wallet" />}
      {isInTab ? (
        <Row justifyCenter itemsCenter gap="xs" mb="lg">
          <Image src="/images/logo/wallet-logo.png" width={50} height={50} />
          <Image src="/images/icons/side_wallet.svg" width={186} height={20} />
        </Row>
      ) : null}

      <Column
        fullX
        fullY
        style={{
          gap: '0',
          padding: isInTab ? '0 40px 24px' : '0 16px 24px',
          backgroundColor: isInTab ? '#17171C' : 'transparent'
        }}>
        <Column
          style={{
            flex: 1
          }}
          gap={'lg'}>
          <Row
            justifyCenter
            style={{
              flex: 1,
              alignItems: 'center'
            }}>
            <Row
              justifyCenter
              itemsCenter
              style={{
                borderRadius: '20px',
                width: 120,
                height: 120,
                border: '1px solid #6C7080'
              }}>
              <Image src="/images/logo/wallet-logo.png" width={isInTab ? 80 : 120} height={isInTab ? 80 : 120} />
            </Row>
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
