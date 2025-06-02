import { Header, Image } from '@/ui/components';
import AccountSelect from '@/ui/pages/Account/AccountSelect';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { Stack } from '@mui/material';

import { useNavigate } from '../MainRoute';

export default function Index({ title }) {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const address = currentAccount.address;
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
      title={title ? title : address ? <AccountSelect /> : ''}
      RightComponent={
        <Stack
          sx={{
            img: {
              display: 'none'
            },
            svg: {
              rect: {
                transition: '.4s',
                stroke: colors.grey12
              },
              path: {
                transition: '.4s',
                stroke: colors.grey12,
                fill: colors.grey12
              }
            },
            ':hover': {
              img: {
                display: 'block'
              },
              svg: {
                rect: {
                  stroke: colors.white
                },
                path: {
                  stroke: colors.white,
                  fill: colors.white
                },
                '&.expand_svg': {
                  display: 'none'
                }
              }
            }
          }}>
          {window.location.pathname !== '/sidePanel.html' ? (
            <>
              <img alt={''} width={24} height={24} src={'/images/icons/main/sidebar-modal-h.gif'} />
              <svg
                className="expand_svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="0.916016" y="2" width="22" height="19.25" rx="2.75" strokeWidth="1.83333" />
                <path d="M10.084 2.91797V22.168" strokeWidth="1.83333" />
                <path
                  d="M6.875 8.41406L4.125 11.1641L6.875 13.9141"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.1469 2.625H5.00586C4.34282 2.625 3.70693 2.88839 3.23809 3.35723C2.76925 3.82607 2.50586 4.46196 2.50586 5.125V18.875C2.50586 19.538 2.76925 20.1739 3.23809 20.6428C3.70693 21.1116 4.34282 21.375 5.00586 21.375H11.0379C11.1669 21.3792 11.2954 21.3573 11.4158 21.3108C11.5362 21.2643 11.646 21.1941 11.7388 21.1043C11.8315 21.0145 11.9052 20.907 11.9556 20.7882C12.0059 20.6693 12.0319 20.5416 12.0319 20.4125C12.0319 20.2834 12.0059 20.1557 11.9556 20.0368C11.9052 19.918 11.8315 19.8105 11.7388 19.7207C11.646 19.6309 11.5362 19.5607 11.4158 19.5142C11.2954 19.4677 11.1669 19.4458 11.0379 19.45H5.96486C5.56703 19.45 5.1855 19.292 4.9042 19.0107C4.62289 18.7294 4.46486 18.3478 4.46486 17.95V5.915C4.46486 5.51718 4.62289 5.13564 4.9042 4.85434C5.1855 4.57304 5.56703 4.415 5.96486 4.415H18.1889C18.5867 4.415 18.9682 4.57304 19.2495 4.85434C19.5308 5.13564 19.6889 5.51718 19.6889 5.915V11.021C19.7003 11.273 19.8084 11.5109 19.9907 11.6852C20.1731 11.8595 20.4156 11.9567 20.6679 11.9567C20.9201 11.9567 21.1626 11.8595 21.345 11.6852C21.5273 11.5109 21.6355 11.273 21.6469 11.021V5.125C21.6469 4.46196 21.3835 3.82607 20.9146 3.35723C20.4458 2.88839 19.8099 2.625 19.1469 2.625ZM15.3129 14.048L16.5359 12.825C16.6459 12.715 16.5809 12.525 16.4259 12.506L12.2209 12.014C12.1927 12.0108 12.1641 12.014 12.1374 12.0234C12.1106 12.0327 12.0863 12.0481 12.0663 12.0682C12.0463 12.0883 12.0311 12.1126 12.0218 12.1395C12.0126 12.1663 12.0095 12.1948 12.0129 12.223L12.5049 16.427C12.5239 16.582 12.7139 16.647 12.8239 16.537L14.0519 15.309L19.7479 20.806C19.9189 20.9709 20.1478 21.062 20.3853 21.0598C20.6229 21.0575 20.85 20.9621 21.0179 20.794C21.0998 20.7119 21.1647 20.6142 21.2085 20.5068C21.2524 20.3993 21.2745 20.2842 21.2735 20.1682C21.2724 20.0521 21.2484 19.9375 21.2026 19.8308C21.1568 19.7242 21.0903 19.6277 21.0069 19.547L15.3129 14.048Z" />
            </svg>
          )}
        </Stack>
      }
      onClickRight={async () => {
        if (window.location.pathname === '/sidePanel.html') {
          chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch((error) => console.error(error));
          setTimeout(() => {
            window.close();
          }, 500);
        } else {
          window.close();
          chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
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
