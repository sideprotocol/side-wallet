import { CHAINS_ENUM } from '@/shared/constant';
import { Button, Column, Content, Footer, Icon, Layout, Row, Text } from '@/ui/components';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useBlockstreamUrl } from '@/ui/state/settings/hooks';
import { colors } from '@/ui/theme/colors';
import { spacing } from '@/ui/theme/spacing';
import { useLocationState } from '@/ui/utils';
import { Typography } from '@mui/material';

interface LocationState {
  txid: string;
  chain: CHAINS_ENUM;
  type?: 'bridge' | 'send';
}

export default function TxSuccessScreen() {
  const { txid, chain, type } = useLocationState<LocationState>();
  const navigate = useNavigate();

  const blockstream = useBlockstreamUrl(chain);

  return (
    <Layout>
      <Content style={{ gap: spacing.small, marginTop: '50px' }}>
        <Column justifyCenter mt="xxl" gap="xl">
          <Row justifyCenter>
            <img width={'105px'} src="/images/icons/main/correct.gif" alt="" />
          </Row>

          <Text preset="title" text="Transaction completed!" textCenter />

          <Row
            itemsCenter
            justifyCenter
            onClick={() => {
              window.open(`${blockstream}/tx/${txid}`);
            }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                color: colors.grey12,
                ':hover': {
                  color: colors.white
                }
              }}>
              {type === 'bridge' ? 'View on Side Chain' : 'View on Block Explorer'}
            </Typography>

            <Icon icon="link" color="white" size={20} />
          </Row>
        </Column>
      </Content>
      <Footer>
        <Button
          preset={'primary'}
          full
          text="Finish"
          onClick={() => {
            // window.history.go(-1);
            navigate('MainScreen');
          }}
        />
      </Footer>
    </Layout>
  );
}
