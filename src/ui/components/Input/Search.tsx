import { Dispatch, SetStateAction, useState } from 'react';

import { colors } from '@/ui/theme/colors';
import { Box, BoxProps } from '@mui/material';

import { Input } from '.';
import { Icon } from '../Icon';

export default function SearchInput({
  value,
  onChange,
  sx
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  sx?: BoxProps['sx'];
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      sx={[
        {
          border: `1px solid ${colors.white20}`,
          px: '10px',
          borderRadius: '10px',
          bgcolor: colors.card_bgColor,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          ':hover': {
            border: `1px solid ${colors.white_4}`
          }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}>
      <Icon icon="search" color={'search_icon'} size={20} />
      <Input
        value={value}
        onChange={(event) => {
          onChange(event.target.value.trim());
        }}
        containerStyle={{
          width: '100%',
          border: 'none',
          padding: '0',
          fontSize: '14px',
          fontWeight: 400,
          color: colors.white,
          backgroundColor: 'transparent'
        }}
        placeholder="Search crypto"
      />
      <div
        onClick={() => {
          onChange('');
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          display: value ? 'block' : 'none'
        }}>
        <Icon icon="clear" color={isHover ? 'white' : 'search_icon'} size={20}></Icon>
      </div>
    </Box>
  );
}
