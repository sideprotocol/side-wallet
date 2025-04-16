import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Button, Column, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { colors } from '@/ui/theme/colors';

import PowerBy from '../../PowerBy';
import SelectToken from './SelectToken';
import Setting from './Setting';

export default function Index() {
  return (
    <Row full relative rounded={true}>
      <Column full relative gap="lg">
        <Column px={'lg'} py={'medium'} rounded={true} bg={'card_bgColor'}>
          <Row justifyBetween itemsCenter>
            <Setting />
            <Row itemsCenter gap="sm">
              <img className={'w-[14px] h-[14px]'} src={WalletIcon} alt="" />
              <Text size="xs">1 USDC</Text>
              <Text
                size="xs"
                style={{
                  color: colors.main,
                  cursor: 'pointer'
                }}>
                Max
              </Text>
            </Row>
          </Row>
          <Row itemsCenter gap={'md'}>
            <Row
              style={{
                background: colors.black,
                borderRadius: '10px',
                height: '48px',
                padding: '0 12px',
                flex: 1
              }}>
              <CoinInput
                size={14}
                coin={{
                  amount: '',
                  denom: 'uusdc'
                }}
                decimalScale={+6}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </Row>
            <SelectToken />
          </Row>
          <Text
            size="sm"
            style={{
              textAlign: 'right',
              color: colors.grey12
            }}>
            on Side Chain
          </Text>
        </Column>

        <Column px={'lg'} py={'medium'} rounded={true} bg={'card_bgColor'}>
          <Row itemsCenter gap={'md'}>
            <Row
              style={{
                background: colors.black,
                borderRadius: '10px',
                height: '48px',
                padding: '0 12px',
                flex: 1
              }}>
              <CoinInput
                disabled
                size={14}
                coin={{
                  amount: '',
                  denom: 'uusdc'
                }}
                decimalScale={+6}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </Row>
            <SelectToken />
          </Row>
          <Text
            size="sm"
            style={{
              textAlign: 'right',
              color: colors.grey12
            }}>
            on Side Chain
          </Text>
        </Column>

        <Row>
          <Button disabled full text="Swap" preset="primary" />
        </Row>

        <PowerBy />
      </Column>
    </Row>
  );
}
