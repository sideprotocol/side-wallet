import { useState } from 'react';

import { useNavigate } from '@/ui/pages/MainRoute';
import { useReadTab, useUnreadAppSummary } from '@/ui/state/accounts/hooks';
import { TabOption } from '@/ui/state/global/reducer';
import { colors } from '@/ui/theme/colors';

import { BaseView } from '../BaseView';
import { Column } from '../Column';
import { Grid } from '../Grid';
import { Icon, IconTypes } from '../Icon';

export function NavTabBar({ tab }: { tab: TabOption }) {
  return (
    <Grid columns={4} style={{ width: '100%', height: '66px', backgroundColor: colors.bg2 }}>
      <TabButton tabName="home" icon="main-home" isActive={tab === 'home'} />
      <TabButton tabName="swap" icon="main-swap" isActive={tab === 'swap'} />
      {/*<TabButton tabName="app" name="activity" icon="main-activity" isActive={tab === 'app'} />*/}
      <TabButton tabName="bridge" icon="main-bridge" isActive={tab === 'bridge'} />

      <TabButton tabName="loans" icon="main-loans" isActive={tab === 'loans'} />
    </Grid>
  );
}

function TabButton({
  tabName,
  icon,
  isActive,
  name
}: {
  tabName: TabOption;
  icon: IconTypes;
  isActive: boolean;
  name?: string;
}) {
  const navigate = useNavigate();
  const unreadApp = useUnreadAppSummary();
  const readTab = useReadTab();
  const [isHover, setIsHover] = useState(false);
  return (
    <Column
      justifyCenter
      itemsCenter
      style={{
        padding: '8px 0',
        gap: 0
      }}
      onClick={(e) => {
        if (tabName === 'home') {
          navigate('MainScreen');
        } else if (tabName === 'swap') {
          navigate('SwapTabScreen');
        } else if (tabName === 'bridge') {
          navigate('BridgeTabScreen');
        } else if (tabName === 'loans') {
          navigate('ExploreTabScreen');
        }
      }}>
      <Column
        itemsCenter
        style={{
          gap: 0,
          opacity: isHover ? 0.8 : 1
        }}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <Icon size={24} icon={icon} color={isActive || isHover ? 'white' : 'white_muted'} />
        <span
          style={{
            textTransform: 'capitalize' as const,
            fontSize: 15,
            color: isActive || isHover ? '#fff' : '#6C7080'
          }}>
          {name ? name : tabName}
        </span>
      </Column>
      <BaseView style={{ position: 'relative' }}>
        {tabName === 'app' && unreadApp && (
          <BaseView
            style={{
              position: 'absolute',
              bottom: 20,
              left: 5,
              width: 5,
              height: 5,
              backgroundColor: 'red',
              borderRadius: '50%'
            }}></BaseView>
        )}
      </BaseView>
    </Column>
  );
}
