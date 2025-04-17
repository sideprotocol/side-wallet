import { Drawer } from 'antd';
import { useState } from 'react';

import { ButtonGroup, Column, Row, Text } from '@/ui/components';
import { colors } from '@/ui/theme/colors';

import PowerBy from '../../PowerBy';
import useGetSkipRoute from '../../hooks/useGetSkipRoute';

export default function Index() {
  const [open, setOpen] = useState(false);
  const { skipRoute } = useGetSkipRoute();
  return (
    <>
      <Row
        itemsCenter
        gap="sm"
        style={{
          cursor: 'pointer'
        }}
        onClick={() => {
          setOpen(true);
        }}>
        {/* <img className={'w-[14px] h-[14px]'} src={WalletIcon} alt="" /> */}
        <Text
          size="xs"
          style={{
            color: colors.grey12
          }}>
          Setting
        </Text>
        <Text
          size="xs"
          style={{
            color: colors.grey12
          }}>
          30 secs
        </Text>
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
            <Text size="xs">Route</Text>
            <Row itemsCenter gap="sm">
              <img className={'w-[14px] h-[14px]'} src="" alt="" />
              <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.8108 1.87099L4.62035 3.73224C5.01216 4.13524 4.73524 4.82459 4.17993 4.82459L0.876057 4.82459L0.876056 6.43207L4.18067 6.43282C4.7345 6.43282 5.01289 7.12217 4.62108 7.52518L2.80933 9.3887L3.91406 10.525L8.67323 5.62984L3.91553 0.736215L2.8108 1.87251L2.8108 1.87099Z"
                  fill="#ffffff"></path>
              </svg>
            </Row>
          </Row>
          <Text size="xs">Route Preference</Text>
          <ButtonGroup
            rowProps={{
              full: true
            }}
            value={0}
            list={[
              { key: 0, label: 'Fastest' },
              { key: 1, label: 'Cheapest' }
            ]}
            onChange={(value) => {
              console.log(value);
            }}
          />
          <Text size="xs">Max Slippage</Text>
          <ButtonGroup
            rowProps={{
              full: true
            }}
            value={0}
            list={[
              { key: 0.1, label: '0.1%' },
              { key: 0.5, label: '0.5%' },
              { key: 1, label: '1%' },
              { key: 3, label: '3%' }
            ]}
            onChange={(value) => {
              console.log(value);
            }}
          />
          <Row justifyBetween itemsCenter>
            <Text
              size="xs"
              style={{
                color: colors.grey12,
                cursor: 'pointer'
              }}
              onClick={() => setOpen(false)}>
              Close
            </Text>
            <PowerBy />
          </Row>
        </Column>
      </Drawer>
    </>
  );
}
