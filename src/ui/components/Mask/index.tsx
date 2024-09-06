import React, { useState } from 'react';

import { Image } from '../Image';

export function Mask({ children, onClick }: { children: React.ReactNode; onClick?: React.MouseEventHandler }) {
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      style={{
        position: 'relative'
      }}
    >
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
          // maxHeight: '185px'
        }}
      >
        <div
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            setVisible(!visible);
            onClick();
          }}
        >
          <Image
            src={isHovered ? '/images/icons/eye-white.svg' : '/images/icons/eye-off.svg'}
            size={40}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
