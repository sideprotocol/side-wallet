// import { CHAINS_ENUM } from '@/shared/constant';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Column, Content, Header, Image, Input, Layout, Row, Text } from '@/ui/components';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { colors } from '@/ui/theme/colors';
import { Box } from '@mui/material';

export function createCosmosAddressRegex(prefix) {
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^${escapedPrefix}1[a-zA-Z0-9]{38,44}$`);
  return regex;
}

export default function BridgeTargetAddress() {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { ibcChannel } = state as { ibcChannel: string };
  const { toChain } = useBridgeState();
  const [value, setValue] = useState('');

  const { isError, isDisabled } = useMemo(() => {
    let isError = false,
      isDisabled = true;
    if (value.trim()) {
      const regex = createCosmosAddressRegex(toChain?.prefix);
      if (!regex.test(value)) {
        isError = true;
      } else {
        isDisabled = false;
      }
    }

    return { isError, isDisabled };
  }, [value]);

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
        <Column px="xl" gap="md" itemsCenter>
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
          <Text textCenter text={ibcChannel} size="xs" color="white_muted" />
          <Box
            sx={{
              height: '1px',
              width: '100%',
              bgcolor: colors.black_dark
            }}
          />
          <Text textCenter text="Target Address" size="xs" color="white_muted" />

          <Input
            placeholder={`${toChain?.prefix}...`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            containerStyle={{
              borderColor: isError ? colors.red : 'inherit'
            }}
          />
          <Button
            preset="primary"
            text="Confirm"
            disabled={isDisabled}
            style={{
              marginTop: '16px'
            }}
            onClick={() => {
              dispatch(BridgeActions.update({ toAddress: value }));
              window.history.go(-2);
            }}
          />
        </Column>
      </Content>
    </Layout>
  );
}
