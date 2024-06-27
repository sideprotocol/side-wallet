import { Column, Image, Row, Text } from '@/ui/components';

interface Asset {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  value: string;
  coingecko_id: string;
}

const bitcoinAssets: Asset[] = [
  {
    icon: '/images/img/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '1',
    value: '1',
    coingecko_id: 'bitcoin'
  }
];

export default function BtcTokenList() {
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
