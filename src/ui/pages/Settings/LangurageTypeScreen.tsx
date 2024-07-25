import { Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';

export default function LanguageTypeScreen() {
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Language"
      />
      <Content style={{
        padding: '0 16px'
      }}>
        <Column gap={'md'}>
          <Row style={{
            padding: '16px 24px',
          }} full justifyBetween itemsCenter classname={'bg-item1e'}>
            <Row itemsCenter>
              <Text text={'Automatic (Browser default)'} />
            </Row>
            <Column>
              <Icon icon="check-box" />
            </Column>
          </Row>

          <Row style={{
            padding: '16px 24px',
          }} full justifyBetween itemsCenter classname={'bg-item1e'}>
            <Row itemsCenter>
              <Text text={'English'} />
            </Row>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
