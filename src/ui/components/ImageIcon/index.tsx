import { useState } from 'react';

import { Stack } from '@mui/material';

import Icon from './Icon';

export default function ImageIcon({ style, url }: { style?: React.CSSProperties; url: string | undefined }) {
  const unknownUrl = 'https://api.side.one/static/token/logo/unknown.svg';
  const [isError, setError] = useState<boolean>(false);
  const handleOnError = () => {
    setError(true);
  };
  if (!url) {
    return <img style={style} src={unknownUrl} />;
  } else if (isError) {
    const runeSymbol = url.split('/runes/')?.[1];
    if (!runeSymbol) {
      return <img style={style} src={unknownUrl} />;
    }
    const splitPrefix = runeSymbol.slice(0, 2);
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        style={{
          background: '#FD8C2C',
          fontSize: '14px',
          fontWeight: 400,
          color: '#fff',
          ...style
        }}>
        {splitPrefix}
      </Stack>
    );
  }
  return url?.includes('side-') ? (
    <Icon type={url} style={style} />
  ) : (
    <img style={style} src={url} onError={handleOnError} />
  );
}
