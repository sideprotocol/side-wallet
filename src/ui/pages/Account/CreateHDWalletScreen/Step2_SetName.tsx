import { Button, Column, Image, Input, Row, Text } from '@/ui/components';

import { ContextData, UpdateContextDataParams } from './type';

export default function Step2_SetName({
  contextData,
  updateContextData
}: {
  contextData: ContextData;
  updateContextData: (params: UpdateContextDataParams) => void;
}) {
  return (
    <Column
      style={{
        flex: 1,
        overflow: 'hidden'
      }}>
      <Column
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto'
        }}>
        <Column
          style={{
            border: '1px solid #404045',
            boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.25) inset',
            backgroundColor: '#222222',
            borderRadius: '14px',
            padding: '32px 16px 24px',
            width: '100%'
          }}>
          <Row justifyCenter>
            <Image src="/images/icons/wallet.svg" size={78} />
          </Row>
          <Text
            text="Wallet Name"
            style={{
              color: '#828282',
              fontSize: '14px',
              lineHeight: '24px'
            }}
          />
          <Input
            containerStyle={{
              padding: '0 10px',
              flex: 1,
              borderRadius: '8px',
              border: '1px solid #FFFFFF33',
              backgroundColor: '#121212'
            }}
            style={{ width: '100%', color: '#fff', textAlign: 'right' }}
            value={''}
            // onChange={(e) => {}}
            placeholder="Set up an account name for this wallet"
          />
        </Column>
      </Column>
      <Button
        text="Finish"
        preset="primary"
        onClick={() => {
          // updateContextData({ tabType: TabType.STEP3 });
        }}
      />
    </Column>
  );
}
