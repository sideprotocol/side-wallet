import React, { CSSProperties } from 'react';

import { fontSizes } from '@/ui/theme/font';

interface ImageProps {
  src?: string;
  className?: string;
  size?: number | string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export function Image(props: ImageProps) {
  const { className, src, size, style: $imageStyleOverride, onClick, onMouseEnter, onMouseLeave,  } = props;

  return (
    <img
      className={className ? className : ''}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={src}
      alt=""
      style={Object.assign({}, $imageStyleOverride, {
        width: size || fontSizes.icon,
        height: size || fontSizes.icon
      })}
    />
  );
}
