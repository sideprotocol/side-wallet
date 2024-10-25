import { Column, Image, Row, Text } from '@/ui/components';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';

export default function BtcTokenList({ balanceVisible }) {
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  return (
    <Column
      style={{
        minHeight: '132px'
      }}>
      {balanceList.map((item) => {
        if (!+item.amount && item.denom !== 'sat') {
          return null;
        }
        return (
          <Row
            key={item.denom}
            classname={'bg-item-hover-v2'}
            justifyBetween
            style={{
              cursor: 'pointer',
              backgroundColor: '#1D1D1F',
              padding: '10px 16px',
              borderRadius: 10
            }}>
            <Row>
              <Image className={'rounded-full'} src={item.asset.logo} size={38}></Image>
              <Column
                style={{
                  gap: '0px'
                }}>
                <div>
                  <Text preset="regular" text={item?.asset.symbol}></Text>
                  <Text preset="sub" text={item?.asset?.name}></Text>
                </div>
              </Column>
            </Row>

            <Column
              style={{
                gap: '0px'
              }}>
              <Text preset="regular" text={balanceVisible ? item.formatAmount : '**'} textEnd />
              <Text preset="sub" text={balanceVisible ? `$${item.totalValue}` : '**'} textEnd />
            </Column>
          </Row>
        );
      })}
    </Column>
  );
}
