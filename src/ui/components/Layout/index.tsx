import React, { CSSProperties, useEffect } from 'react';

import { useExtensionIsInTab } from '@/ui/features/browser/tabs';
import { routes } from '@/ui/pages/MainRoute';
import { useBooted, useIsUnlocked } from '@/ui/state/global/hooks';
import { colors } from '@/ui/theme/colors';

import './index.less';

export interface LayoutProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}
export function Layout(props: LayoutProps) {
  const { children, style: $styleBase } = props;
  const isInTab = useExtensionIsInTab();

  const isBooted = useBooted();
  const isUnlocked = useIsUnlocked();

  useEffect(() => {
    if (isBooted && !isUnlocked && location.href.includes(routes.UnlockScreen.path) === false) {
      const basePath = location.href.split('#')[0];
      location.href = `${basePath}#${routes.UnlockScreen.path}`;
      return;
    }
  }, [isBooted, isUnlocked]);

  return (
    <div
      className="layout"
      style={Object.assign(
        {
          backgroundColor: colors.black,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: window.location.pathname === '/sidePanel.html' ? '100vw' : '360px',
          minHeight: $styleBase?.minHeight || '600px',
          height:
            window.location.pathname === '/sidePanel.html'
              ? '100vh'
              : $styleBase?.height
              ? $styleBase?.height
              : '600px',
          overflowY: 'auto',
          overflowX: 'hidden',
          border: !isInTab ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          justifyContent: 'center'
        },
        $styleBase
      )}>
      {children}
    </div>
  );
}
