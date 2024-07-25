import { Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';

export default function CurrencyTypeScreen() {
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Currency"
      />
      {/*<Content>*/}
      {/*  <Column>*/}
      {/*    <Card preset={'styleChecked'}>*/}
      {/*      <Row full justifyBetween itemsCenter>*/}
      {/*        <Row itemsCenter>*/}
      {/*          <Text text={'USD'} preset="regular-bold" />*/}
      {/*        </Row>*/}
      {/*        <Column>*/}
      {/*          <Icon icon="check-box" />*/}
      {/*        </Column>*/}
      {/*      </Row>*/}
      {/*    </Card>*/}
      {/*  </Column>*/}
      {/*</Content>*/}
      <Content style={{
        padding: '0 16px'
      }}>
        <Column gap={'md'}>
          <Row style={{
            padding: '16px 24px',
          }} full justifyBetween itemsCenter classname={'bg-item1e'}>
            <Row itemsCenter>
              <Text text={'USD'} />
            </Row>
            <Column>
              <Icon icon="check-box" />
            </Column>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
