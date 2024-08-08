import { Button, Column, Content, Header, Image, Input, Layout, Text } from '@/ui/components';
import {
  preferenceService,
  // sessionService
} from '@/background/service';
import { useCallback, useEffect, useRef, useState } from 'react';
import { settingsActions } from '@/ui/state/settings/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';

export default function AutoLockScreen() {
  const [time, setTime] = useState('0');
  const dispatch = useAppDispatch();
  const tools = useTools();
  const navigate = useNavigate();
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

          <Input preset={'amount'} placeholder="0"  onAmountInputChange={async(e) => setTime(e)} ></Input>

          <Button preset="primary" text="Confirm" onClick={() => {
            // preferenceService.setAutoLockDuration(10);
            if (isNaN(Number(time))) return;
            dispatch(
              settingsActions.updateSettings({
                unLockTimeLimit: Number(time)
              })
            );
            tools.toastSuccess('Your settings have been saved.');
            localStorage.setItem('unLockTimeLimit', time);
            navigate('MainScreen');
          }}></Button>
        </Column>
      </Content>
    </Layout>
  );
}
