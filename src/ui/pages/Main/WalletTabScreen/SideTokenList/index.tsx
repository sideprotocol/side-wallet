import { Column, Image, Row, Text } from '@/ui/components';

import useGetSideTokenList from './hooks/useGetSideTokenList';

export default function SideTokenList() {
  const { data: assets } = useGetSideTokenList();
  return (
    <Column>
      {assets.map((item) => {
        return (
          <Row
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
              <Image src={item.logo} size={42}></Image>
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
              <Text preset="regular" text={0}></Text>
              <Text preset="sub" text={0}></Text>
            </Column>
          </Row>
        );
      })}
    </Column>
  );
}
