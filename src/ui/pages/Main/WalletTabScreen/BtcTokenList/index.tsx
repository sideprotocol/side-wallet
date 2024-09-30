import { Column, Image, Row, Text } from '@/ui/components';
import { useGetUrlList } from '@/ui/hooks/useEnv';
import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useNavigate } from '@/ui/pages/MainRoute';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';

export default function BtcTokenList({ balanceVisible }) {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const { UNISAT_RUNE_URL } = useGetUrlList();
  return (
    <Column
      style={{
        minHeight: '132px'
      }}>
      {balanceList.map((item) => {
        return (
          <Row
            key={item.denom}
            classname={'bg-item-hover-v2'}
            justifyBetween
            onClick={() => {
              if (item.asset.rune) {
                navigate('RunesTokenScreen', {
                  runeid: item.asset.runeData?.runeid
                });
              }
            }}
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
                  <Text preset="regular" text={item?.asset?.runeData?.spacedRune}></Text>
                  <Text preset="sub" text={item?.asset?.runeData?.symbol}></Text>
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
