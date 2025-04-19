import { sideChain } from '@/shared/constant';
import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useReloadAccounts } from '@/ui/state/accounts/hooks';
import { useChangeNetworkTypeCallback } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';

import { useNavigate } from '../MainRoute';

export default function NetworkTypeScreen() {
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
          <Row
            rounded
            style={{
              height: 56,
              padding: '16px 10px',
              backgroundColor: colors.backgroundChoose,
              border: `1px solid ${colors.backgroundChoose}`
            }}
            full
            justifyBetween
            itemsCenter
            classname={'hover:bg-[#17171C] '}>
            <Row itemsCenter>
              <Text text={`${sideChain.name} & Bitcoin (mainnet)`} />
            </Row>
            <Column>
              <Icon color={'primary'} contain={'contain'} icon="check-circle" />
            </Column>
          </Row>

          <Row
            rounded
            style={{
              height: 56,
              padding: '16px 10px',
              backgroundColor: colors.card_bgColor,
              border: `1px solid ${colors.white1}`
            }}
            full
            justifyBetween
            itemsCenter>
            <Row itemsCenter>
              <Text text={`${sideChain.name} & Bitcoin (testnet)`} />
            </Row>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
