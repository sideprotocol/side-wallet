import { Drawer } from 'antd';
import { useState } from 'react';

import { Chain } from '@/core/skip-go';
import { Column, Icon, Row, Search, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';
import { Asset } from '@skip-go/client';

export default function Index({ chain, asset }: { chain?: Chain; asset?: Asset }) {
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
          src={asset?.logoURI}
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
          {asset?.symbol}
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
          <Row
            itemsCenter
            gap="md"
            classname={'bg-item-hover-v2'}
            style={{
              backgroundColor: colors.black,
              padding: '10px 16px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}>
            <img className={'w-[14px] h-[14px]'} src={''} alt="" />
            <Text size="sm">ATOM</Text>
            <Text
              size="xs"
              style={{
                color: colors.grey12
              }}>
              50 networks
            </Text>
          </Row>
        </Column>
      </Drawer>
    </>
  );
}
