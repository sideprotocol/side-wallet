import { useState } from 'react';

import { Image } from '../Image';

export function Mask({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  return (
    <div
      style={{
        position: 'relative'
      }}>
      {children}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          backdropFilter: 'blur(5px)',
          borderRadius: '14px',
          display: visible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div onClick={() => setVisible(!visible)}>
          <Image src="/images/icons/eye-off.svg" size={40} style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
}
