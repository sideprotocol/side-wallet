import { Fragment, useState } from 'react';

import { IChain } from '@/shared/types';
import { Image, Row } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { Box, Popover, PopoverOrigin, Stack } from '@mui/material';

interface ShortChain extends Pick<IChain, 'chainID' | 'name' | 'logo'> {}

interface IChainSelect {
  chainList: ShortChain[];
  curChain: ShortChain | undefined;
  onChange: (val: ShortChain) => void;
  horizontal?: PopoverOrigin['horizontal'];
}
export function ChainSelect({ chainList, curChain, onChange, horizontal }: IChainSelect) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (chainList.length > 1) {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <Fragment>
      <Row
        itemsCenter
        gap={'zero'}
        style={{
          borderRadius: '10px',
          padding: '10px',
          backgroundColor: '#000'
        }}
        onClick={handleClick}>
        <Image size={28} src={curChain?.logo} />
        <span
          style={{
            fontSize: '14px',
            paddingLeft: '5px',
            whiteSpace: 'nowrap'
          }}>
          {curChain?.name}
        </span>
        {chainList.length > 1 && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: '.4s'
            }}>
            <g id="Component/icon/ic_Chevron Down">
              <path
                id="Shape"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 13.5858L16.2929 9.29289C16.6834 8.90237 17.3166 8.90237 17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L12 13.5858Z"
                fill="#ffffff"
              />
            </g>
          </svg>
        )}
      </Row>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: horizontal || 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: horizontal || 'left'
        }}
        sx={{
          mt: '10px',
          '.MuiPaper-root': {
            background: colors.black,
            border: `1px solid ${colors.white1}`,
            borderRadius: '16px',
            padding: '8px',
            '.item': {
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '8px 12px',
              transition: '.4s',
              '&.active': {
                color: colors.main
              },
              ':hover': {
                color: colors.main,
                background: colors.card_bgColor
              },
              ':not(:first-of-type)': {
                marginTop: '8px'
              }
            }
          }
        }}>
        <Box
          sx={{
            borderRadius: '10px',
            mt: '8px',
            width: '100%',
            maxHeight: '40vh',
            overflow: 'auto'
          }}>
          {chainList.map((item, index) => {
            return (
              <Box
                key={item.chainID}
                className={`item ${curChain?.chainID === item.chainID && 'active'}`}
                sx={{
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onClick={() => {
                  onChange(item);
                  setAnchorEl(null);
                }}>
                <Stack gap={'8px'} direction={'row'} alignItems={'center'}>
                  <Image size={28} src={item.logo} />
                  <Box
                    sx={{
                      fontSize: '14px',
                      color: colors.white
                    }}>
                    {item.name}
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Popover>
    </Fragment>
  );
}
