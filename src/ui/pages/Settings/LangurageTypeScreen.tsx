import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';

export default function LanguageTypeScreen() {
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Language"
      />
      <Content
        style={{
          padding: '0 16px',
          marginTop: '16px'
        }}>
        <Column gap={'md'}>
          <Row
            rounded
            style={{
              padding: '16px 10px',
              backgroundColor: colors.green_light,
              border: `1px solid ${colors.green_light}`
            }}
            full
            justifyBetween
            itemsCenter
            classname={''}>
            <Row itemsCenter>
              <Text text={'Automatic (Browser default)'} />
            </Row>
            <Column>
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
            </Column>
          </Row>

          <Row
            rounded
            style={{
              padding: '16px 10px'
            }}
            full
            justifyBetween
            itemsCenter
            classname={'bg-item1e'}>
            <Row itemsCenter>
              <Text text={'English'} />
            </Row>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
