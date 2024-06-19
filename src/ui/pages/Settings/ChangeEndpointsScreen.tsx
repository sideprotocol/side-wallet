import { useEffect, useState } from 'react';

import { AddressFlagType } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { Card, Column, Content, Header, Icon, Input, Layout, Row, Text } from '@/ui/components';
import { Button } from '@/ui/components/Button';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useWallet } from '@/ui/utils';

export default function ChangeEndpointsScreen() {
  const wallet = useWallet();
  const [enableSignData, setEnableSignData] = useState(false);

  const [enableUnconfirmed, setEnableUnconfirmed] = useState(false);
  const [unconfirmedPopoverVisible, setUnconfirmedPopoverVisible] = useState(false);

  const currentAccount = useCurrentAccount();

  const dispatch = useAppDispatch();
  const [init, setInit] = useState(false);
  useEffect(() => {
    wallet
      .getEnableSignData()
      .then((v) => {
        setEnableSignData(v);
      })
      .finally(() => {
        setInit(true);
      });

    const only_confirmed = checkAddressFlag(currentAccount.flag, AddressFlagType.CONFIRMED_UTXO_MODE);
    if (only_confirmed) {
      setEnableUnconfirmed(false);
    } else {
      setEnableUnconfirmed(true);
    }
  }, []);

  if (!init) {
    return <Layout></Layout>;
  }

  // TODO: read and change RPC

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Change Endpoints"
      />
      <Content justifyBetween>
        <Column>
          {' '}
          <Column>
            <Text preset="sub" text={'Choose Network'} />

            <Input preset="text" />
          </Column>
          <Column>
            <Text preset="sub" text={'RPC'} />
            <Input preset="text" />
          </Column>
          <Column>
            <Text preset="sub" text={'LCD'} />
            <Input preset="text" />
          </Column>
          <Column>
            <Card style={{ borderRadius: 10 }}>
              <Column fullX>
                <Icon icon="alert-circle" size={24} color="white" />
                <Text text={'Restart to apply new endpoints'} preset="bold" size="sm" />
                <Row>
                  <Text
                    preset="sub"
                    size="sm"
                    text={
                      'Please contact the endpoint providers to address any issues that may arise from changes to the endpoint(s).'
                    }
                  />
                </Row>
              </Column>
            </Card>
          </Column>
        </Column>

        <Column itemsCenter>
          <Button preset="reset" text="Reset" />

          <Button
            preset="primary"
            style={{
              width: '100%'
            }}
            text="Comfirm"
          />
        </Column>
      </Content>
    </Layout>
  );
}
