import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { useNavigate } from '@/ui/pages/MainRoute';
import { colors } from '@/ui/theme/colors';
import { useLocationState } from '@/ui/utils';

export default function TxFailScreen() {
  const { error } = useLocationState<{ error: any }>();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header
        onBack={() => {
          // window.history.go(-1);
          navigate('MainScreen');
        }}
      />
      <Content>
        <Column justifyCenter mt="xxl" gap="xl">
          <Row justifyCenter>
            <Icon icon="delete" size={50} />
          </Row>

          <Text preset="title" text="Payment Failed" textCenter />
          {
            <Text
              preset="sub"
              style={{ color: colors.red }}
              text={error instanceof Error ? JSON.stringify(error) : error}
              textCenter
            />
          }
        </Column>
      </Content>
    </Layout>
  );
}
