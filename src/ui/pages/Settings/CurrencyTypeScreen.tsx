import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';

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
      <Content
        style={{
          padding: '0 16px',
          marginTop: '16px'
        }}
      >
        <Column gap={'md'}>
          <Row
            rounded
            style={{
              padding: '16px 10px',
              backgroundColor: colors.backgroundChoose,
              border: `1px solid ${colors.backgroundChoose}`
            }}
            full
            justifyBetween
            itemsCenter
            classname={''}
          >
            <Row itemsCenter>
              <Text text={'USD'} />
            </Row>
            <Column>
              <Icon color={'primary'} contain={'contain'} icon="check-circle" />
            </Column>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
