import { Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';

export default function LanguageTypeScreen() {
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Theme"
      />
      {/*<Content>*/}
      {/*  <Column>*/}
      {/*    <Card preset="styleChecked">*/}
      {/*      <Row full justifyBetween itemsCenter>*/}
      {/*        <Row itemsCenter>*/}
      {/*          <Text text={'Black'} preset="regular-bold" />*/}
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
              backgroundColor: colors.green_light,
              border: `1px solid ${colors.green_light}`
            }}
            full
            justifyBetween
            itemsCenter
            classname={''}
          >
            <Row itemsCenter>
              <Text text={'Black'} />
            </Row>
            <Column>
              <Icon color={'primary'} icon="check-circle" />
            </Column>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
