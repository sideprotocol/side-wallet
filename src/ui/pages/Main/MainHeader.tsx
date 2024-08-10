import { useState } from 'react';

import { KEYRING_TYPE } from '@/shared/constant';
import { Header, Image} from '@/ui/components';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { fontSizes } from '@/ui/theme/font';

import { useNavigate } from '../MainRoute';

export default function Index({title}) {
  const navigate = useNavigate();
  const currentKeyring = useCurrentKeyring();
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Header
      LeftComponent={
        <>
          <Image
            onClick={() => {
              navigate('SettingsTabScreen');
            }}
            src="/images/icons/main/menu-icon.svg"
            size={fontSizes.xxl}
          />
        </>
      }
      title={
        title ? title : currentKeyring.type === KEYRING_TYPE.HdKeyring || currentKeyring.type === KEYRING_TYPE.KeystoneKeyring ? (
          <AccountSelect />
        ) : (
          ''
        )
      }
      RightComponent={window.location.pathname !== '/sidePanel.html'
        ? <img onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}  alt={''} width={isHovered ? 24 : 20} height={isHovered ? 24 : 20} src={isHovered ? '/images/icons/main/sidebar-modal-h.gif' : '/images/icons/main/sidebar-modal.svg'} />
        : <Image size={22} src={'/images/icons/main/popuo-modal.svg'} />}
      onClickRight={async () => {
        if (window.location.pathname === '/sidePanel.html') {
          chrome.sidePanel
            .setPanelBehavior({ openPanelOnActionClick: false })
            .catch((error) => console.error(error));
          setTimeout(() => {
            window.close();
          }, 500);
          // debugger;
        } else {
          window.close();
          chrome.sidePanel
            .setPanelBehavior({ openPanelOnActionClick: true })
            .catch((error) => console.error(error));
          const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
          });
          const tabId = tab.id;
          await chrome.sidePanel.open({ tabId });
          await chrome.sidePanel.setOptions({
            tabId,
            path: 'sidePanel.html#/main',
            enabled: true
          });
        }
      }}
    />
  );
}
