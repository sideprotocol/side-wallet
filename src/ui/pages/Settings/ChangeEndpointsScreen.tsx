import { Select } from 'antd';
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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

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
      <Content mt={'xl'} justifyBetween>
        <Column>
          {' '}
          <Column>
            <Text color={'white'} preset="sub" text={'Choose Network'} />

            {/*<Input preset="text" />*/}
            {/*<select name="pets" id="pet-select">*/}
            {/*  <option value="dog">Dog</option>*/}
            {/*  <option value="cat">Cat</option>*/}
            {/*</select>*/}
            <Select
              defaultValue="Bitcoin"
              // style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'Bitcoin', label: 'Bitcoin' },
                { value: 'Side', label: 'Side' }
              ]}
            />
          </Column>
          <Column>
            <Text color={'white'} preset="sub" text={'RPC'} />
            <Input preset="text" />
          </Column>
          <Column>
            <Text color={'white'} preset="sub" text={'LCD'} />
            <Input preset="text" />
          </Column>
          <Column
            style={{
              marginTop: '10px'
            }}
          >
            <Card style={{ borderRadius: 10 }}>
              <Column>
                <Row>
                  <Icon icon="alert-circle" size={24} color="white" />
                  <Text text={'Restart to apply new endpoints'} preset="bold" size="sm" />
                </Row>
                <Row>
                  <Text
                    color={'white'}
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
          <Button
            style={{
              width: '87px',
              height: '36px',
              background: '#22AB384D',
              border: '1px solid #22AB38!important'
            }}
            preset="reset"
            text="Reset"
          />

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
