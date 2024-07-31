// import { Typography, Stack } from "@mui/material";
import ImageIcon from './ImageIcon';
import { Coin } from '@cosmjs/stargate';
import { SWAP_ASSETS } from '@/ui/constants';


function Icon({ type }: { type: string }) {
  return (
    <svg
      style={{
        width: '16px',
        height: '16px',
        flexShrink: '0',
      }}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}

export default function TokenCurrent({ value, setShow }: { value: Coin; setShow: any }) {
  const newValue = SWAP_ASSETS.assets.find((asset) => asset.base === value?.denom);

  const unSelected = !newValue?.base;

  let limitWidth = newValue?.logo ? {
    maxWidth: '72px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  } : {};
  return (
    <div className={'bg-swap-hover'} style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 8px',
      cursor: 'pointer',
      borderRadius: '24px',
      color: unSelected ? 'white' : 'white',
      background: unSelected ? 'black' : 'black',
      minWidth: 'max-content',
    }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(true);
      }}
    >
      {newValue?.logo && (
        <ImageIcon
          style={{
            width: '20px',
            height: '20px',
            marginRight: '4px',
            borderRadius: '20px',
          }}
          url={newValue?.logo || newValue?.logo}
        />
      )}
      <div style={{ fontSize: '14px', paddingRight: '6px', whiteSpace: 'nowrap',
        ...limitWidth
      }}>
        {newValue?.symbol || newValue?.symbol || newValue?.base || 'Select Token'}
      </div>
      <Icon type="side-down" />
    </div>
  );
}

// maxWidth: '40px',
//   textOverflow: 'ellipsis',
//   overflow: 'hidden'
