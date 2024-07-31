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
      <TabButton tabName="explore" icon="main-summon" isActive={tab === 'explore'} />
      {/*<TabButton tabName="settings" icon="main-setting" isActive={tab === 'settings'} />*/}
    </Grid>
  );
}

function TabButton({ tabName, icon, isActive, name }: { tabName: TabOption; icon: IconTypes; isActive: boolean, name?: string }) {
  const navigate = useNavigate();
  const unreadApp = useUnreadAppSummary();
  const readTab = useReadTab();
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
        }  else if (tabName === 'bridge') {
          navigate('BridgeTabScreen');
        } else if (tabName === 'explore') {
          navigate('SummonTabScreen');
        }
        // else if (tabName === 'app') {
        //   navigate('AppTabScrren');
        //   readTab('app');
        // } else if (tabName === 'settings') {
        //   navigate('SettingsTabScreen');
        // }
      }}>
      <Column itemsCenter style={{
        gap: 0
      }}>
        <Icon size={24} icon={icon} color={isActive ? 'white' : 'white_muted'} />
        <span style={{
          textTransform: 'capitalize' as const,
          fontSize: 15,
          color: isActive ? '#fff' : 'rgb(130 130 130 / 50%)'
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

// export function NavTabBarBak({ tab }: { tab: TabOption }) {
//   return (
//     <Grid columns={4} style={{ width: '100%', height: '67.5px', backgroundColor: colors.bg2 }}>
//       <TabButton tabName="home" icon="wallet" isActive={tab === 'home'} />
//       <TabButton tabName="mint" icon="compass" isActive={tab === 'mint'} />
//       <TabButton tabName="app" icon="grid" isActive={tab === 'app'} />
//       <TabButton tabName="settings" icon="settings" isActive={tab === 'settings'} />
//     </Grid>
//   );
// }
//
// function TabButtonBak({ tabName, icon, isActive }: { tabName: TabOption; icon: IconTypes; isActive: boolean }) {
//   const navigate = useNavigate();
//   const unreadApp = useUnreadAppSummary();
//   const readTab = useReadTab();
//   return (
//     <Column
//       justifyCenter
//       itemsCenter
//       style={{
//         padding: '8px 0',
//         gap: 0
//       }}
//       onClick={(e) => {
//         if (tabName === 'home') {
//           navigate('MainScreen');
//         } else if (tabName === 'mint') {
//           navigate('DiscoverTabScreen');
//         } else if (tabName === 'app') {
//           navigate('AppTabScrren');
//           readTab('app');
//         } else if (tabName === 'settings') {
//           navigate('SettingsTabScreen');
//         }
//       }}>
//       <Column itemsCenter style={{
//         gap: 0
//       }}>
//         <Icon size={24} icon={icon} color={isActive ? 'white' : 'white_muted'} />
//         <span style={{
//             textTransform: 'capitalize' as const,
//             fontSize: 15,
//             color: isActive ? '#fff' : 'rgb(130 130 130 / 50%)'
//           }}>
//           {tabName}
//         </span>
//       </Column>
//       <BaseView style={{ position: 'relative' }}>
//         {tabName === 'app' && unreadApp && (
//           <BaseView
//             style={{
//               position: 'absolute',
//               bottom: 20,
//               left: 5,
//               width: 5,
//               height: 5,
//               backgroundColor: 'red',
//               borderRadius: '50%'
//             }}></BaseView>
//         )}
//       </BaseView>
//     </Column>
//   );
// }
