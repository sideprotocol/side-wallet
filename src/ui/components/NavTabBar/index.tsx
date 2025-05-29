import { useLayoutEffect, useState } from 'react';

import { NetworkType } from '@/shared/types';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useUnreadAppSummary } from '@/ui/state/accounts/hooks';
import { TabOption } from '@/ui/state/global/reducer';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { useWallet } from '@/ui/utils';

import { BaseView } from '../BaseView';
import { Column } from '../Column';
import { Grid } from '../Grid';
import { Icon, IconTypes } from '../Icon';

export const NavTabBar = function NavTabBar({ tab }: { tab: TabOption }) {
  return (
    <Grid columns={4} style={{ width: '100%', height: '66px', backgroundColor: colors.bg2 }}>
      <TabButton tabName="home" icon="main-home" isActive={tab === 'home'} />
      <TabButton tabName="loans" icon="main-loans" isActive={tab === 'loans'} />
      <TabButton tabName="earn" icon="main-earn" isActive={tab === 'earn'} />
      <TabButton tabName="bridge" icon="main-bridge" isActive={tab === 'bridge'} />
    </Grid>
  );
};

const TabButton = function TabButton({
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
  const [isHover, setIsHover] = useState(false);
  const [showLoanNotice, setShowLoanNotice] = useState(true);
  const wallet = useWallet();
  const networkType = useNetworkType();

  useLayoutEffect(() => {
    wallet.getShowLoanNotice().then((show) => {
      setShowLoanNotice(show);
    });
  }, [wallet]);

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
          if (showLoanNotice || networkType === NetworkType.MAINNET) {
            navigate('LoansTabScreen');
          } else {
            navigate('LendingTabScreen');
          }
        } else if (tabName === 'earn') {
          navigate('EarnTabScreen');
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
        <Icon size={24} color={isActive || isHover ? 'white' : 'white_muted'} icon={icon as IconTypes}></Icon>

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
};
