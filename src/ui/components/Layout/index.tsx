import React, { CSSProperties } from 'react';

import './index.less';
import { useExtensionIsInTab } from '@/ui/features/browser/tabs';

export interface LayoutProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}
export function Layout(props: LayoutProps) {
  const { children, style: $styleBase } = props;
  const isInTab = useExtensionIsInTab();
  return (
    <div
      className="layout "
      style={Object.assign(
        {
          backgroundColor: '#09090A',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '375px',
          // maxHeight: '600px',
          minHeight: $styleBase?.minHeight || '620px',
          height: $styleBase?.height || '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          border: !isInTab ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          justifyContent: 'center',
        },
        $styleBase
      )}>
      {children}
    </div>
  );
}
