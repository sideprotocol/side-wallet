import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';

import { fontSizes } from '@/ui/theme/font';

import { Button } from '../Button';
import { Column } from '../Column';
import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { Row } from '../Row';
import { Text } from '../Text';

export const NoticePopover = ({ onClose }: { onClose: () => void }) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  const [enable, setEnable] = useState(false);
  const [coolDown, setCoolDown] = useState(3);

  useEffect(() => {
    if (coolDown > 0) {
      setTimeout(() => {
        setCoolDown(coolDown - 1);
      }, 1000);
    } else {
      setEnable(true);
    }
  }, [coolDown]);

  return (
    <Popover>
      <Column justifyCenter itemsCenter>
        <Text text="Read Before Proceeding" preset="title-bold" />
        <Icon
          style={{
            margin: '16px 0'
          }}
          icon={'info'}
          color={'icon_yellow'}
          size={58}
        />

        <Column gap="lg">
          <Text
            style={{
              fontWeight: '300'
            }}
            text={'Please be aware that:'}
          />
          <div style={{ marginTop: 0, display: 'flex' }}>
            <Checkbox
              style={{
                display: 'flex',
                alignItems: 'self-start'
              }}
              checked={checked1}
              onChange={(e) => {
                setChecked1(e.target.checked);
              }}
            >
              <div style={{ fontSize: fontSizes.sm }}>
                This is an experimental product; do not use it on the mainnet.
              </div>
            </Checkbox>
          </div>

          <div style={{ display: 'flex' }}>
            <Checkbox
              style={{
                display: 'flex',
                alignItems: 'self-start'
              }}
              checked={checked2}
              onChange={(e) => setChecked2(e.target.checked)}
            >
              <div style={{ fontSize: fontSizes.sm }}>Ordinals assets are not currently supported.</div>
            </Checkbox>
          </div>

          <div style={{ display: 'flex' }}>
            <Checkbox
              style={{
                display: 'flex',
                alignItems: 'self-start'
              }}
              checked={checked3}
              onChange={(e) => setChecked3(e.target.checked)}
            >
              <div style={{ fontSize: fontSizes.sm }}>Atomicals assets are not currently supported.</div>
            </Checkbox>
          </div>
        </Column>

        <Row mt={'md'} full>
          <Button
            text={coolDown > 0 ? `OK (${coolDown}s)` : 'Confirm'}
            preset="primary"
            disabled={!checked1 || !checked2 || !checked3}
            full
            onClick={(e) => {
              if (!enable) return;
              if (onClose) {
                onClose();
              }
            }}
          />
        </Row>
      </Column>
    </Popover>
  );
};
