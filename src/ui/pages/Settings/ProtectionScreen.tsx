import { Checkbox, Switch } from 'antd';
import { useEffect, useState } from 'react';

import { AddressFlagType } from '@/shared/constant';
import { checkAddressFlag } from '@/shared/utils';
import { Button, Card, Column, Content, Header, Icon, Layout, Row, Text } from '@/ui/components';
import { EnableUnconfirmedPopover } from '@/ui/components/EnableUnconfirmedPopover';
import { Popover } from '@/ui/components/Popover';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { accountActions } from '@/ui/state/accounts/reducer';
import { useAppDispatch } from '@/ui/state/hooks';
import { ColorTypes, colors } from '@/ui/theme/colors';
import { fontSizes } from '@/ui/theme/font';
import { shortAddress, useWallet } from '@/ui/utils';

export default function ProtectionScreen() {
  const wallet = useWallet();
  const [enableSignData, setEnableSignData] = useState(false);

  const [enableSignDataPopoverVisible, setEnableSignDataPopoverVisible] = useState(false);

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

  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Protection"
      />
      <Content
        style={{
          marginTop: 16
        }}
      >
        <Column>
          <Card style={{ borderRadius: 10 }}>
            <Column fullX>
              <Text text={'Unconfirmed Balance Not Spendable'} preset="bold" size="sm" />
              <Row>
                <Text
                  preset="sub"
                  size="sm"
                  text={
                    'To protect your assets, only confirmed balances are spendable when holding Runes (or ARC-20) assets. This is to prevent accidental asset burning.'
                  }
                />
              </Row>
              <Row style={{ borderTopWidth: 1, borderColor: colors.border }} my="md" />

              <Row justifyBetween>
                <Column fullX gap="zero">
                  {enableUnconfirmed ? (
                    <Text text={'Mandatory use of unconfirmed balance '} size="xs" />
                  ) : (
                    <Text text={'Mandatory use of unconfirmed balance'} size="xs" />
                  )}
                  <Text
                    text={`Only applies to current address (${shortAddress(currentAccount.address)})`}
                    preset="sub"
                  />
                </Column>

                <Switch
                  onChange={async () => {
                    if (enableUnconfirmed) {
                      let _currentAccount = currentAccount;
                      _currentAccount = await wallet.addAddressFlag(
                        _currentAccount,
                        AddressFlagType.CONFIRMED_UTXO_MODE
                      );
                      dispatch(accountActions.setCurrent(_currentAccount));
                      setEnableUnconfirmed(false);
                    } else {
                      setUnconfirmedPopoverVisible(true);
                    }
                  }}
                  checked={enableUnconfirmed}
                ></Switch>
              </Row>
            </Column>
          </Card>
        </Column>

        <Column>
          <Card style={{ borderRadius: 10 }}>
            <Column>
              <Text text={'signData requests'} preset="bold" size="sm" />
              <Row>
                <Text
                  preset="sub"
                  size="sm"
                  text={
                    'If you enable this setting, you might get signature requests that aren\'t readable. By signing a message you don\'t understand, you could be agreeing to give away your funds and NFTs.You\'re at risk for phishing attacks. Protect yourself by turning off signData.'
                  }
                />
              </Row>

              <Row style={{ borderTopWidth: 1, borderColor: colors.border }} my="md" />

              <Row justifyBetween>
                <Text text={'Allow signData requests'} size="xs" />

                <Switch
                  onChange={() => {
                    if (enableSignData) {
                      wallet.setEnableSignData(false).then(() => {
                        setEnableSignData(false);
                      });
                    } else {
                      setEnableSignDataPopoverVisible(true);
                    }
                  }}
                  checked={enableSignData}
                ></Switch>
              </Row>
            </Column>
          </Card>
        </Column>
      </Content>
      {unconfirmedPopoverVisible ? (
        <EnableUnconfirmedPopover
          onClose={() => setUnconfirmedPopoverVisible(false)}
          onConfirm={async () => {
            let _currentAccount = currentAccount;
            _currentAccount = await wallet.addAddressFlag(
              _currentAccount,
              AddressFlagType.DISABLE_AUTO_SWITCH_CONFIRMED
            );
            _currentAccount = await wallet.removeAddressFlag(_currentAccount, AddressFlagType.CONFIRMED_UTXO_MODE);
            dispatch(accountActions.setCurrent(_currentAccount));
            setEnableUnconfirmed(true);
            setUnconfirmedPopoverVisible(false);
          }}
        />
      ) : null}
      {enableSignDataPopoverVisible ? (
        <EnableSignDataPopover
          onNext={() => {
            wallet.setEnableSignData(true).then(() => {
              setEnableSignData(true);
              setEnableSignDataPopoverVisible(false);
            });
          }}
          onCancel={() => {
            setEnableSignDataPopoverVisible(false);
          }}
        />
      ) : null}
    </Layout>
  );
}

const riskColor: { [key: string]: ColorTypes } = {
  high: 'danger',
  low: 'orange'
};

export const EnableSignDataPopover = ({ onNext, onCancel }: { onNext: () => void; onCancel: () => void }) => {
  const [understand, setUnderstand] = useState(false);
  return (
    <Popover>
      <Column justifyCenter itemsCenter>
        <div className="w-[68px] bg-[#282521] h-[68px] rounded-full flex items-center justify-center">
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#F0B622] bg-opacity-10">
            <Icon icon={'warning2'} color={'icon_yellow'} size={24} />
          </div>
        </div>

        <Text
          text="Use at your own risk"
          mt="sm"
          preset="title-bold"
          style={{
            fontSize: '16px'
          }}
        />

        <Column gap="zero">
          <div style={{ fontSize: fontSizes.sm, marginTop: 0 }} className="text-opacity-50 text-white">
            Allowing signData requests can make you vulnerable to phishing attacks. Always review the URL and be careful
            when signing messages that contain code.
          </div>
        </Column>

        <Column mt="sm">
          <Column>
            <Row style={{ backgroundColor: '#FF45451A', padding: 5, borderRadius: 10 }}>
              <Row>
                <Icon icon={'warning2'} color={'red_disconnect'} size={24} />

                <Text
                  color="red_disconnect"
                  text={'If you\'ve been asked to turn this setting on, you might be getting scammed'}
                />
              </Row>
            </Row>
            <Row>
              <Row>
                <Checkbox
                  onChange={() => {
                    setUnderstand(!understand);
                  }}
                  checked={understand}
                ></Checkbox>
                <Text
                  size="xs"
                  text={'I understand that I can lose all of my funds and NFTs if I enable signData requests.'}
                />
              </Row>
            </Row>
          </Column>
        </Column>

        <Row full mt="lg">
          <Button
            text="Cancel"
            full
            preset="default"
            onClick={(e) => {
              if (onCancel) {
                onCancel();
              }
            }}
            style={{
              fontWeight: '600'
            }}
          />
          <Button
            text="Continue"
            style={{
              fontWeight: '600'
            }}
            full
            disabled={!understand}
            preset="primary"
            onClick={(e) => {
              if (onNext) {
                onNext();
              }
            }}
          />
        </Row>
      </Column>
    </Popover>
  );
};
