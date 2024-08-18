import { NETWORK_TYPES } from '@/shared/constant';
import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useChangeNetworkTypeCallback, useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { useNavigate } from '../MainRoute';

export default function NetworkTypeScreen() {
  const networkType = useNetworkType();
  const changeNetworkType = useChangeNetworkTypeCallback();
  const reloadAccounts = useReloadAccounts();
  const tools = useTools();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Switch Network"
      />
      <Content
        style={{
          padding: '0 16px',
          marginTop: 16
        }}>
        <Column gap={'md'}>
          {NETWORK_TYPES.map((item, index) => {
            return (
              <Row
                rounded
                onClick={async () => {
                  if (item.value == networkType) {
                    return;
                  }
                  await changeNetworkType(item.value);
                  reloadAccounts();
                  navigate('MainScreen');
                  tools.toastSuccess('Network type changed');
                }}
                key={index}
                style={{
                  height: 56,
                  padding: '16px 10px',
                  backgroundColor: item.value == networkType ? colors.green_light : 'tr',
                  border: `1px solid ${item.value == networkType ? colors.green_light : 'transparent'}`
                }}
                full
                justifyBetween
                itemsCenter
                classname={item.value != networkType ? 'hover:bg-[#1e1e1f] ' : ''}>
                <Row itemsCenter>
                  <Text text={item.label === 'DEVNET' ? 'grimoria-testnet-1' : item.label} />
                </Row>
                <Column>
                  {item.value == networkType && (
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        backgroundColor: '#22AB38',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Icon color={'white'} icon="check-square" />
                    </div>
                  )}
                </Column>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
