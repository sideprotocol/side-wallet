import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';

import { colors } from '@/ui/theme/colors';
import { Typography } from '@mui/material';

import { Row } from '../Row';
import { LightTooltip } from '../Tooltip';

export function RBFBar({ defaultValue, onChange }: { defaultValue?: boolean; onChange: (val: boolean) => void }) {
  const [enableRBF, setEnableRBF] = useState(defaultValue || false);

  useEffect(() => {
    onChange(enableRBF);
  }, [enableRBF]);
  return (
    <Row justifyBetween itemsCenter>
      <LightTooltip title={'A feature allows the transaction to be replaced.'} arrow placement="top">
        <Typography
          sx={{
            fontSize: '14px',
            color: colors.grey12,
            textDecoration: 'dotted underline',
            textUnderlineOffset: '2px',
            cursor: 'pointer',
            transition: '.4s',
            ':hover': {
              color: colors.white
            }
          }}>
          RBF
        </Typography>
      </LightTooltip>
      <Checkbox
        onChange={() => {
          setEnableRBF(!enableRBF);
        }}
        checked={enableRBF}></Checkbox>
    </Row>
  );
}
