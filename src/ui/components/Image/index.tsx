import React, { CSSProperties, useState } from 'react';

import { fontSizes } from '@/ui/theme/font';
import { Stack } from '@mui/material';

interface ImageProps {
  src?: string;
  className?: string;
  size?: number | string;
  style?: CSSProperties;
  containerStyle?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  height?: string | number;
  width?: string | number;
}

export function Image(props: ImageProps) {
  const {
    className,
    src,
    size,
    style: $imageStyleOverride,
    onClick,
    onMouseEnter,
    onMouseLeave,
    width,
    height
  } = props;
  const unknownUrl = 'https://api.side.one/static/token/logo/unknown.svg';
  const [isError, setError] = useState<boolean>(false);
  const handleOnError = () => {
    setError(true);
  };

  if (!src) {
    return (
      <img
        className={className ? className : ''}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        src={unknownUrl}
        alt=""
        style={Object.assign({}, $imageStyleOverride, {
          width: size || fontSizes.icon,
          height: size || fontSizes.icon
        })}
      />
    );
  } else if (isError) {
    const runeSymbol = src.split('/runes/')?.[1];
    if (!runeSymbol) {
      return (
        <img
          className={className ? className : ''}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          src={unknownUrl}
          alt=""
          style={Object.assign({}, $imageStyleOverride, {
            width: size || fontSizes.icon,
            height: size || fontSizes.icon
          })}
        />
      );
    }
    const splitPrefix = runeSymbol.slice(0, 2);
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        style={Object.assign(
          { background: '#FD8C2C', fontSize: '14px', borderRadius: '50%', fontWeight: 400, color: '#fff' },
          $imageStyleOverride,
          {
            width: size || fontSizes.icon,
            height: size || fontSizes.icon
          }
        )}>
        {splitPrefix}
      </Stack>
    );
  }

  return (
    <img
      className={className ? className : ''}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={src}
      onError={handleOnError}
      alt=""
      style={Object.assign({}, $imageStyleOverride, {
        width: size || width || fontSizes.icon,
        height: size || height || fontSizes.icon
      })}
    />
  );
}
