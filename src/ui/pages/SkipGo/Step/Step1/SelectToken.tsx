import { Drawer } from 'antd';
import { useState } from 'react';

import { Column, Icon, Row, Search, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';

export default function Index() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Row
        itemsCenter
        style={{
          flexShrink: 0,
          padding: '10px',
          borderRadius: '10px',
          background: colors.black,
          gap: '5px',
          cursor: 'pointer'
        }}
        onClick={() => setOpen(true)}>
        <img
          src="https://api.side.one/static/token/logo/usdc.svg"
          alt=""
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%'
          }}
        />
        <Text
          style={{
            fontSize: '14px'
          }}>
          USDC
        </Text>
        <Icon
          icon="down"
          style={{
            width: '8px',
            height: '8px',
            transition: '.4s',
            transform: `rotate(${open ? '-180deg' : '0'})`
          }}
        />
      </Row>
      <Drawer
        title={null}
        placement="bottom"
        width={500}
        onClose={() => setOpen(false)}
        open={open}
        closable={false}
        headerStyle={{
          display: 'none'
        }}
        bodyStyle={{
          backgroundColor: '#17171C',
          borderRadius: '10px 10px 0 0',
          border: '1px solid #2D2D2D',
          padding: '16px'
        }}>
        <Column gap="lg">
          <Row justifyBetween itemsCenter>
            <Search
              value=""
              setValue={(data) => {
                console.log(data);
              }}
            />
          </Row>
          <Text size="xs">Max Slippage</Text>
        </Column>
      </Drawer>
    </>
  );
}
