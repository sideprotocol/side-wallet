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
              backgroundColor: colors.backgroundChoose,
              border: `1px solid ${colors.backgroundChoose}`
            }}
            full
            justifyBetween
            itemsCenter
            classname={'bg-item-hover'}>
            <Row itemsCenter>
              <Text text={'Automatic (Browser default)'} />
            </Row>
            <Column>
              <Icon color={'primary'} contain={'contain'} icon="check-circle" />
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
            classname={'hover:bg-[#17171C]'}>
            <Row itemsCenter>
              <Text text={'English'} />
            </Row>
          </Row>
        </Column>
      </Content>
    </Layout>
  );
}
