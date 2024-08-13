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
import Lottie from 'react-lottie';
import * as animationData from '@/ui/assets/lottie/lock.json';

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
          {/*<Image*/}
          {/*  style={{*/}
          {/*    margin: 'auto'*/}
          {/*  }}*/}
          {/*  src="/images/icons/settings/auto-lock.svg"*/}
          {/*  size={90}*/}
          {/*/>*/}
          <div className="">
            <Lottie options={
              // loop: true,
              {
                autoplay: true,
                animationData
              }
            }
                    width={120}/>
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
          <Text color={'white'} preset="sub" text={'Duration (minutes)'}></Text>

          <Input preset={'amount'} placeholder={localStorage.getItem('unLockTimeLimit') ? localStorage.getItem('unLockTimeLimit') : '5'}  onAmountInputChange={async(e) => setTime(e)} ></Input>

          <Button preset="primary" text="Confirm" onClick={(e) => {
            // preferenceService.setAutoLockDuration(10);
            e.stopPropagation();
            if (isNaN(Number(time)) || Number(time) <= 0) return false;
            dispatch(
              settingsActions.updateSettings({
                unLockTimeLimit: Number(time)
              })
            );
            tools.toastSuccess('Your settings have been saved.');
            localStorage.setItem('unLockTimeLimit', time);
            navigate('MainScreen');
            chrome.storage.local.set({ unLockTimeLimit: Number(time) }, function() {
              console.log('锁屏时间限制已保存为 ' + Number(time) + ' 分钟。');
            });
          }}></Button>
        </Column>
      </Content>
    </Layout>
  );
}
