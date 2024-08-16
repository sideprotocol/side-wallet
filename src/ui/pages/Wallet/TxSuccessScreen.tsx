import { CHAINS_ENUM } from '@/shared/constant';
import { Button, Column, Content, Footer, Icon, Layout, Row, Text } from '@/ui/components';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useBlockstreamUrl } from '@/ui/state/settings/hooks';
import { spacing } from '@/ui/theme/spacing';
import { useLocationState } from '@/ui/utils';

interface LocationState {
  txid: string;
  chain: CHAINS_ENUM;
}

export default function TxSuccessScreen() {
  const { txid, chain } = useLocationState<LocationState>();
  const navigate = useNavigate();
  const blockstreamUrl = useBlockstreamUrl(chain);

  return (
    <Layout>
      {/*<Header title=" " />*/}

      <Content style={{ gap: spacing.small, marginTop: '50px' }}>
        <Column justifyCenter mt="xxl" gap="xl">
          <Row style={{
            // width: '105px',
          }} justifyCenter>
            {/*<Icon icon="icon-correct" size={50} style={{ alignSelf: 'center' }} />*/}
            <img width={'105px'} src="/images/icons/main/correct.gif" alt="" />
          </Row>

          <Text preset="title" text="Transaction completed!" textCenter />
          {/*<Text preset="sub" text="Your transaction has been successfully sent" color="textDim" textCenter />*/}

          <Row
            itemsCenter
            justifyCenter
            onClick={() => {
              window.open(`${blockstreamUrl}/tx/${txid}`);
            }}>
            <Icon icon="eye" color="white" />
            <Text preset="regular-bold" text="View on Block Explorer" color="white" />
          </Row>
        </Column>
      </Content>
      <Footer>
        <Button
          preset={'primary'}
          full
          text="Finish"
          onClick={() => {
            window.history.go(-1);
          }}
        />
      </Footer>
    </Layout>
  );
}
