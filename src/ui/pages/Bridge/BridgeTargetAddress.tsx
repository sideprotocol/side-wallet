// import { CHAINS_ENUM } from '@/shared/constant';
import { useState } from 'react';

import { Button, Column, Content, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
import { Box } from '@mui/material';

export default function BridgeTargetAddress() {
  const dispatch = useAppDispatch();
  const { toChain } = useBridgeState();
  const [value, setValue] = useState('');

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-2);
        }}
        title="Provide target address"
      />
      <Content
        style={{
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16
        }}>
        <Column px="xl" gap="xl" itemsCenter>
          <Text textCenter text="Target Chain" size="xs" color="white_muted" />
          <Row justifyCenter itemsCenter gap="md">
            <Image src={toChain?.logo} size={38} />
            <Text
              text={toChain?.name}
              size="sm"
              color="white"
              style={{
                fontWeight: 600
              }}
            />
          </Row>
          <Text textCenter text="channel-xxx" size="xs" color="white_muted" />
          <Box
            sx={{
              height: '1px',
              width: '100%',
              bgcolor: colors.white1
            }}
          />
          <Text textCenter text="Target Address" size="xs" color="white_muted" />
          <Input
            preset="address"
            placeholder="Enter the target address"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            preset="primary"
            text="Confirm"
            disabled={!value}
            onClick={() => {
              dispatch(BridgeActions.update({ toAddress: value }));
            }}
          />
        </Column>
      </Content>
    </Layout>
  );
}
