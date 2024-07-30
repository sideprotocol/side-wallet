import React, { CSSProperties } from 'react';

import './index.less';

export interface LayoutProps {
  children?: React.ReactNode;
  style?: CSSProperties;
}
export function Layout(props: LayoutProps) {
  const { children, style: $styleBase } = props;
  return (
    <div
      className="layout hide-scrollbar"
      style={Object.assign(
        {
          backgroundColor: '#09090A',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '375px',
          maxHeight: '620px',
          minHeight: '620px',
          // height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          justifyContent: 'center',
        },
        $styleBase
      )}>
      {children}
    </div>
  );
}
