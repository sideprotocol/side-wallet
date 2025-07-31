import { useState } from 'react';

import { CHAINS_ENUM } from '@/shared/constant';
import { Button, Column, Content, Footer, Icon, Layout, Row, SuccessAnimation, Text } from '@/ui/components';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useBlockstreamUrl } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { useLocationState } from '@/ui/utils';
import { Typography } from '@mui/material';

interface LocationState {
  txid: string;
  chain: CHAINS_ENUM;
  type?: 'bridge' | 'send';
  text?: string;
  title?: string;
}

export default function TxSuccessScreen() {
  const { txid, chain, type, text, title } = useLocationState<LocationState>();
  const navigate = useNavigate();
  const { SIDE_BRIDGEEXPLORER_URL } = useEnvironment();
  const blockstream = useBlockstreamUrl(chain);
  const [isHover, setIsHover] = useState(false);

  return (
    <Layout>
      <Content style={{ gap: spacing.small, marginTop: '50px' }}>
        <Column justifyCenter mt="xxl" gap="xl">
          <Row justifyCenter>
            <SuccessAnimation />
          </Row>

          <Text
            preset="title"
            text={title || 'Transaction completed!'}
            textCenter
            style={{
              color: colors.green,
              fontWeight: 600
            }}
          />
          {text ? <Text preset="regular-bold" text={text} textCenter /> : null}

          <Row
            itemsCenter
            justifyCenter
            gap="sm"
            style={{
              cursor: 'pointer'
            }}
            onMouseOver={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            onClick={() => {
              window.open(type === 'bridge' ? `${SIDE_BRIDGEEXPLORER_URL}/${txid}` : `${blockstream}/tx/${txid}`);
            }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                transition: '.4s',
                color: isHover ? colors.white : colors.grey12
              }}>
              View on Explorer
            </Typography>

            <Icon icon="link" color={isHover ? 'white' : 'white_muted'} size={14} />
          </Row>
        </Column>
      </Content>
      <Footer>
        <Button
          preset={'primary'}
          full
          text="Done"
          onClick={() => {
            navigate('MainScreen');
          }}
        />
      </Footer>
    </Layout>
  );
}
