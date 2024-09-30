// import { Typography, Stack } from "@mui/material";
import React from 'react';

import { Coin } from '@cosmjs/stargate';

import { useGetSideBalanceList } from '../hooks/useGetSideBalanceList';
import { useCurrentAccount } from '../state/accounts/hooks';
import ImageIcon from './ImageIcon';

function Icon({ type, style, className }: { type: string; style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      className={className ?? className}
      style={{
        width: '16px',
        height: '16px',
        flexShrink: '0',
        ...style
      }}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}
export { Icon };

export default function TokenCurrent({ value, setShow }: { value: Coin; setShow: any }) {
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);
  const newValue = balanceList.find((asset) => asset.denom === value?.denom);

  const unSelected = !newValue?.denom;

  let limitWidth = newValue?.asset.logo
    ? {
        maxWidth: '72px',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
    : {};
  return (
    <div
      className={`hover:bg-[#000]/70 bg-[#292828]/50 border-[1px] border-solid border-[#fff]/10 ${
        unSelected ? 'bg-[#000]' : ''
      }`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 8px',
        cursor: 'pointer',
        borderRadius: '24px',
        color: unSelected ? 'white' : 'white',
        // background: unSelected ? 'rgba(41, 40, 40, 1)' : 'black',
        minWidth: 'max-content'
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(true);
      }}>
      {newValue?.asset.logo && (
        <ImageIcon
          style={{
            width: '20px',
            height: '20px',
            marginRight: '4px',
            borderRadius: '20px'
          }}
          url={newValue?.asset.logo}
        />
      )}
      <div style={{ fontSize: '14px', paddingRight: '6px', whiteSpace: 'nowrap', ...limitWidth }}>
        {newValue?.asset.symbol || 'Select Token'}
      </div>
      <Icon type="side-down" />
    </div>
  );
}

// maxWidth: '40px',
//   textOverflow: 'ellipsis',
//   overflow: 'hidden'
