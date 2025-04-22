import { Drawer } from 'antd';
import { useState } from 'react';

import { Header, Icon, Image, Row, Text } from '@/ui/components';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';
import { shortAddress } from '@/ui/utils';

import KeyringSelect from '../KeyringSelect';
import SwitchAccountScreen from './SwitchAccountScreen';
import './index.less';

const AccountSelect = () => {
  const currentKeyring = useCurrentKeyring();
  const currentAccount = useCurrentAccount();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Row
        itemsCenter
        justifyCenter
        bg="card"
        classname={'bg-item-hover-v2'}
        onClick={() => {
          setOpen(true);
          // navigate('SwitchAccountScreen');
        }}
        style={{
          padding: '5px 16px',
          borderRadius: '20px'
        }}>
        <Row
          itemsCenter
          justifyCenter
          style={{
            gap: '0'
          }}>
          <Text
            color="white_muted"
            text={currentKeyring.alianName}
            style={{
              fontSize: '14px',
              fontWeight: 600
            }}
          />

          <Text
            color="white"
            text={'/'}
            size="xs"
            style={{
              fontSize: '14px'
            }}
          />
          <Text
            color="white"
            text={shortAddress(currentAccount?.alianName, 8)}
            style={{
              fontSize: '14px',
              fontWeight: 600
            }}
          />
        </Row>
        <Icon icon="down" size={10} />
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
          border: '1px solid #2D2D2D'
        }}>
        <Header
          title={<KeyringSelect />}
          RightComponent={
            <span
              className="close-icon"
              style={{
                cursor: 'pointer',
                position: 'relative',
                right: '-25px',
                padding: '6px'
              }}
              onClick={() => setOpen(false)}>
              <Image src="./images/icons/x.svg" size={24} />
            </span>
          }
        />

        <SwitchAccountScreen />
      </Drawer>
    </>
  );
};

export default AccountSelect;
