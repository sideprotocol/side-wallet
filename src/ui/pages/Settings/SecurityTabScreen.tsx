import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ADDRESS_TYPES, KEYRING_TYPE, NETWORK_TYPES } from '@/shared/constant';
import { Card, Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { IconTypes } from '@/ui/components/Icon';
import { getCurrentTab, useExtensionIsInTab, useOpenExtensionInTab } from '@/ui/features/browser/tabs';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
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

const AdvancedList: Setting[] = [
  {
    label: 'Change Password',
    value: '',
    desc: '',
    action: 'password',
    route: '/settings/password',
    right: true
  },

  {
    label: 'Connected Sites',
    value: '',
    desc: '',
    action: '',
    route: '/connected-sites',

    right: true
  },

  {
    label: 'Auto-lock',
    value: '',
    desc: '',
    action: '',
    route: '/settings/auto-lock',

    right: true
  }
];

export default function SecurityTabScreen() {
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

  const toRenderSettings = AdvancedList.filter((v) => {
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
        title="Security"
      />
      <Content justifyBetween>
        <Column>
          <div>
            {toRenderSettings.map((item, index) => {
              if (!item.label) {
                return null;
              }
              return (
                <Card
                  classname="bg-item-hover"
                  key={item.action + index}
                  mt="lg"
                  onClick={(e) => {
                    if (item.action == 'addressType') {
                      if (isCustomHdPath) {
                        tools.showTip(
                          'The wallet currently uses a custom HD path and does not support switching address types.'
                        );
                        return;
                      }
                      navigate('/settings/address-type');
                      return;
                    }
                    navigate(item.route);
                  }}
                  style={{
                    backgroundColor: 'transparent'
                  }}>
                  <Row full justifyBetween>
                    <Column justifyCenter>
                      <Text text={item.label || item.desc} preset="regular-bold" />
                      <Text text={item.value} preset="sub" />
                    </Column>

                    <Column justifyCenter>
                      {item.right && <RightOutlined style={{ color: 'rgb(107,107,107)', fontSize: '14px' }} />}
                    </Column>
                  </Row>
                </Card>
              );
            })}
          </div>
        </Column>
      </Content>
    </Layout>
  );
}
