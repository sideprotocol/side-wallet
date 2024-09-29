import { useState } from 'react';
import Lottie from 'react-lottie';

import * as animationData from '@/ui/assets/lottie/lock.json';
import { Button, Column, Content, Header, Input, Layout, Text } from '@/ui/components';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useAppDispatch } from '@/ui/state/hooks';
import { useAutoLockTime } from '@/ui/state/settings/hooks';
import { settingsActions } from '@/ui/state/settings/reducer';
import { useWallet } from '@/ui/utils';

export default function AutoLockScreen() {
  const [time, setTime] = useState('0');
  const dispatch = useAppDispatch();
  const tools = useTools();
  const navigate = useNavigate();
  const wallet = useWallet();
  const autoLockTime = useAutoLockTime();
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
          {/*<Image*/}
          {/*  style={{*/}
          {/*    margin: 'auto'*/}
          {/*  }}*/}
          {/*  src="/images/icons/settings/auto-lock.svg"*/}
          {/*  size={90}*/}
          {/*/>*/}
          <div className="">
            <Lottie
              options={
                // loop: true,
                {
                  autoplay: true,
                  animationData
                }
              }
              width={120}
            />
          </div>

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
          <Text color={'search_icon'} preset="sub" text={'Duration (minutes)'}></Text>

          <Input
            preset={'amount'}
            placeholder={`${autoLockTime}`}
            onAmountInputChange={async (e) => setTime(e)}></Input>

          <Button
            preset="primary"
            text="Confirm"
            style={{
              marginTop: '16px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (isNaN(+time) || +time <= 0) return false;
              wallet.setAutoLockTime(+time);
              dispatch(
                settingsActions.updateSettings({
                  autoLockTime: +time
                })
              );
              tools.toastSuccess('Your settings have been saved.');
              navigate('MainScreen');
            }}></Button>
        </Column>
      </Content>
    </Layout>
  );
}
