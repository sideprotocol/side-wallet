import { Button, Column, Content, Header, Image, Input, Layout, Text } from '@/ui/components';

export default function AutoLockScreen() {
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Auto-Lock"
      />
      <Content justifyBetween>
        <Column
          gap={'xl'}
          style={{
            paddingTop: '70px',
            paddingBottom: '25px'
          }}>
          <Image
            style={{
              margin: 'auto'
            }}
            src="/images/icons/settings/auto-lock.svg"
            size={90}
          />

          <Text
            preset="sub"
            color={'white'}
            style={{
              textAlign: 'center',
              width: '200px',
              margin: 'auto'
            }}
            text="Set the duration for the wallet to automatically lock."></Text>
        </Column>

        <Column>
          <Text color={'white'} preset="sub" text={'Duration (minutes)'}></Text>

          <Input placeholder="0"></Input>

          <Button preset="primary" text="Confirm"></Button>
        </Column>
      </Content>
    </Layout>
  );
}
