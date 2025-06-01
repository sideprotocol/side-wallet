import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, KEYRING_TYPE } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { Card, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { IconTypes, Icon as ImageIcon } from '@/ui/components/Icon';
import { Icon } from '@/ui/components/TokenCurrent';
import { getCurrentTab, useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';

interface Setting {
  label?: string;
  value?: string;
  desc?: string;
  danger?: boolean;
  icon?: IconTypes;
  action: string;
  route: string;
  right: boolean;
}

export default function SettingsTabScreen() {
  const navigate = useNavigate();
  const networkType = useNetworkType();

  const isInTab = useExtensionIsInTab();

  const [connected, setConnected] = useState(false);

  const currentKeyring = useCurrentKeyring();
  const wallet = useWallet();

  useEffect(() => {
    const run = async () => {
      const res = await getCurrentTab();
      if (!res) return;
      const site = await wallet.getCurrentConnectedSite(res.id);
      if (site) {
        setConnected(site.isConnected);
      }
    };
    run();
  }, []);

  const SettingList: Setting[] = [
    {
      label: 'Address Type',
      value: 'Taproot',
      icon: 'setting-address',
      desc: '',
      action: 'addressType',
      route: '/settings/address-type',
      right: true
    },

    {
      label: 'Network',
      value: networkType === NetworkType.MAINNET ? 'Mainnet' : 'Testnet',
      icon: 'setting-network',
      desc: '',
      action: 'networkType',
      route: '/settings/network-type',
      right: true
    },

    {
      label: 'General',
      value: '',
      icon: 'general',
      desc: '',
      action: 'general',
      route: '/settings/general',
      right: true
    },

    {
      label: 'Advance',
      value: '',
      icon: 'advance',
      desc: '',
      action: 'advanced',
      route: '/settings/advanced',
      right: true
    },

    {
      label: 'Security',
      value: '',
      icon: 'security',
      desc: '',
      action: 'security',
      route: '/settings/security',
      right: true
    },

    {
      label: 'About',
      value: '',
      icon: 'about',
      desc: '',
      action: 'about',
      route: '/settings/about',

      right: true
    },
    {
      label: '',
      value: '',
      desc: ' Expand View',
      action: 'expand-view',
      route: '/settings/export-privatekey',
      right: false,
      icon: 'expand'
    },
    {
      label: '',
      value: '',
      desc: 'Lock',
      icon: 'lock',
      action: 'lock-wallet',
      route: '',
      right: false
    }
  ];

  const toRenderSettings = SettingList.filter((v) => {
    if (v.action == 'manage-wallet') {
      v.value = currentKeyring.alianName;
    }

    if (v.action == 'connected-sites') {
      v.value = connected ? 'Connected' : 'Not connected';
    }

    if (v.action == 'addressType') {
      const item = ADDRESS_TYPES[currentKeyring.addressType];

      const hdPath = currentKeyring.hdPath || item.hdPath;
      if (currentKeyring.type === KEYRING_TYPE.SimpleKeyring) {
        v.value = `${item.name}`;
      } else {
        // v.value = `${item.name} (${hdPath}/${currentAccount.index})`;
        v.value = `${item.name}`;
      }
    }

    if (v.action == 'expand-view') {
      if (isInTab) {
        return false;
      }
    }

    return true;
  });

  const openExtensionInTab = useOpenExtensionInTab();

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Setting"
      />
      <Content justifyBetween>
        <Column>
          <div>
            {toRenderSettings.map((item) => {
              if (!item.label) {
                return null;
              }
              return (
                <Card
                  classname="bg-item-hover"
                  key={item.action}
                  mt="lg"
                  onClick={(e) => {
                    navigate(item.route);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    paddingLeft: '6px',
                    paddingRight: '6px'
                  }}>
                  <Row full justifyBetween>
                    <Row itemsCenter>
                      <ImageIcon size={24} icon={item.icon}></ImageIcon>
                      <Text text={item.label || item.desc} preset="regular" style={{ whiteSpace: 'nowrap' }} />
                    </Row>

                    <Row justifyEnd itemsCenter>
                      <Text text={item.value} preset="regular" size="xs" style={{ opacity: 0.5, textAlign: 'right' }} />
                      {item.right && (
                        <Icon
                          type="side-down"
                          className={'hover-100'}
                          style={{
                            transform: 'rotate(-90deg)',
                            opacity: '0.6'
                          }}
                        />
                      )}
                    </Row>
                  </Row>
                </Card>
              );
            })}
          </div>
        </Column>

        <Column>
          <div>
            {toRenderSettings.map((item) => {
              if (!item.label) {
                return (
                  <Button
                    key={item.action}
                    preset={item.action === 'expand-view' ? 'primary' : 'default'}
                    style={{ marginTop: spacing.small, height: 50 }}
                    text={item.desc}
                    onClick={(e) => {
                      if (item.action == 'expand-view') {
                        openExtensionInTab();
                        return;
                      }
                      if (item.action == 'lock-wallet') {
                        wallet.lockWallet();
                        navigate('/account/unlock');
                        return;
                      }
                      navigate(item.route);
                    }}
                    icon={item.icon}
                  />
                );
              }
              return null;
            })}
          </div>
        </Column>
      </Content>
    </Layout>
  );
}
