import { Column, Image, Row, Text } from '@/ui/components';
import { useGetBitcoinTokenList } from '@/ui/hooks/useGetTokenList';

export default function BtcTokenList() {
  const { data: bitcoinAssets } = useGetBitcoinTokenList();
  return (
    <Column>
      {bitcoinAssets.map((item) => {
        return (
          <Row
            onClick={() => {
              // navigate('SelectAddressScreen');
            }}
            full
            key={item.symbol + item.name}
            justifyBetween
            style={{
              cursor: 'pointer',
              backgroundColor: '#1D1D1F',
              padding: '10px 20px',
              borderRadius: 10
            }}>
            <Row>
              <Image src={item.icon} size={42}></Image>
              <Column
                style={{
                  gap: '0px'
                }}>
                <Text preset="regular" text={item.symbol}></Text>
                <Text preset="sub" text={item.name}></Text>
              </Column>
            </Row>

            <Column
              style={{
                gap: '0px'
              }}>
              <Text preset="regular" text={item.balance}></Text>
              <Text preset="sub" text={item.value}></Text>
            </Column>
          </Row>
        );
      })}
    </Column>
  );
}
