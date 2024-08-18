import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, KEYRING_TYPE, NETWORK_TYPES } from '@/shared/constant';
import { Card, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { Button } from '@/ui/components/Button';
import { Icon, IconTypes } from '@/ui/components/Icon';
import { getCurrentTab, useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { spacing } from '@/ui/theme/spacing';
import { useWallet } from '@/ui/utils';
import { RightOutlined } from '@ant-design/icons';

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

const SettingList: Setting[] = [
  // {
  //   label: 'Manage Wallet',
  //   value: '',
  //   desc: '',
  //   action: 'manage-wallet',
  //   route: '/settings/manage-wallet',
  //   right: true
  // },

  {
    label: 'General',
    value: '',
    icon: 'general',
    desc: '',
    action: '',
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
    action: '',
    route: '/settings/security',
    right: true
  },

  {
    label: 'About',
    value: '',
    icon: 'about',
    desc: '',
    action: '',
    route: '/settings/about',

    right: true
  },

  {
    label: 'Address Type',
    value: 'Taproot',
    icon: 'setting-address',
    desc: '',
    action: 'addressType',
    route: '/settings/address-type',
    right: true
  },

  // {
  //   label: 'Advanced',
  //   value: 'Advanced settings',
  //   desc: '',
  //   action: 'advanced',
  //   route: '/settings/advanced',
  //   right: true
  // },

  // {
  //   label: 'Connected Sites',
  //   value: '',
  //   desc: '',
  //   action: 'connected-sites',
  //   route: '/connected-sites',
  //   right: true
  // },
  {
    label: 'Network',
    value: 'TESTNET',
    icon: 'setting-network',
    desc: '',
    action: 'networkType',
    route: '/settings/network-type',
    right: true
  },

  // {
  //   label: 'Change Password',
  //   value: 'Change your lockscreen password',
  //   desc: '',
  //   action: 'password',
  //   route: '/settings/password',
  //   right: true
  // },
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

export default function SettingsTabScreen() {
  const navigate = useNavigate();

  const networkType = useNetworkType();

  const isInTab = useExtensionIsInTab();

  const [connected, setConnected] = useState(false);

  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();
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

  const isCustomHdPath = useMemo(() => {
    const item = ADDRESS_TYPES[currentKeyring.addressType];
    return currentKeyring.hdPath !== '' && item.hdPath !== currentKeyring.hdPath;
  }, [currentKeyring]);

  const toRenderSettings = SettingList.filter((v) => {
    if (v.action == 'manage-wallet') {
      v.value = currentKeyring.alianName;
    }

    if (v.action == 'connected-sites') {
      v.value = connected ? 'Connected' : 'Not connected';
    }

    if (v.action == 'networkType') {
      v.value = NETWORK_TYPES[networkType].label;
    }

    if (v.action == 'addressType') {
      const item = ADDRESS_TYPES[currentKeyring.addressType];
      const hdPath = currentKeyring.hdPath || item.hdPath;
      if (currentKeyring.type === KEYRING_TYPE.SimpleKeyring) {
        v.value = `${item.name}`;
      } else {
        v.value = `${item.name} (${hdPath}/${currentAccount.index})`;
      }
    }

    if (v.action == 'expand-view') {
      if (isInTab) {
        return false;
      }
    }

    return true;
  });

  const tools = useTools();
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
                    if (item.action == 'addressType') {
                      // if (isCustomHdPath) {
                      //   tools.showTip(
                      //     'The wallet currently uses a custom HD path and does not support switching address types.'
                      //   );
                      //   return;
                      // }
                      navigate('/settings/address-type');
                      return;
                    }
                    navigate(item.route);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                  }}>
                  <Row full justifyBetween>
                    <Row itemsCenter>
                      <Icon size={24} icon={item.icon}></Icon>
                      <Text text={item.label || item.desc} preset="regular" />
                    </Row>

                    <Column justifyCenter>
                      {item.right && <span className={'iconRight'}><RightOutlined style={{ fontSize: 14, color: 'rgb(107,107,107)' }} /></span>}
                    </Column>
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
