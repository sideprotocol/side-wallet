import { NETWORK_TYPES } from '@/shared/constant';
import { Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useChangeNetworkTypeCallback, useNetworkType } from '@/ui/state/settings/hooks';

import { useNavigate } from '../MainRoute';
import { colors } from '@/ui/theme/colors';

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
      <Content style={{
        padding: '0 16px'
      }}>
        <Column gap={'md'}>
          {NETWORK_TYPES.map((item, index) => {
            return (
              // <Card
              //   key={index}
              //   onClick={async () => {
              //     if (item.value == networkType) {
              //       return;
              //     }
              //     await changeNetworkType(item.value);
              //     reloadAccounts();
              //     navigate('MainScreen');
              //     tools.toastSuccess('Network type changed');
              //   }}>
              //   <Row full justifyBetween itemsCenter>
              //     <Row itemsCenter>
              //       <Text text={item.label}  />
              //     </Row>
              //     <Column>{item.value == networkType && <Icon icon="check" />}</Column>
              //   </Row>
              // </Card>
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
                  padding: '10px 10px',
                  backgroundColor: item.value == networkType ? colors.green_light : 'tr',
                  border: item.value == networkType ? `1px solid ${colors.green_light}` : 'none',
                }} full justifyBetween itemsCenter classname={item.value != networkType ? 'bg-item1e' : ''}>
                <Row itemsCenter>
                  <Text text={item.label} />
                </Row>
                <Column>{item.value == networkType && <Icon color={'green'} icon="check-circle" />}</Column>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
