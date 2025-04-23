// import { CHAINS_ENUM } from '@/shared/constant';
import BigNumber from 'bignumber.js';

import { Column, Content, Header, Layout, Row, Text } from '@/ui/components';
import ImageIcon from '@/ui/components/ImageIcon';
import { PoolDataItem } from '@/ui/hooks/useGetPoolsData';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { LendingActions } from '@/ui/state/lending/reducer';
import { colors } from '@/ui/theme/colors';
import { useLocationState } from '@/ui/utils';

interface LendingSelectTokenLocation {
  poolsData: PoolDataItem[];
  type: string;
}

export default function LendingSelectTokenScreen() {
  // list, onSearch

  const { poolsData, type } = useLocationState<LendingSelectTokenLocation>();

  const dispatch = useAppDispatch();

  const currentAccount = useCurrentAccount();

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const onClose = () => window.history.go(-1);
  return (
    <Layout>
      <Header
        onBack={() => {
          window.history.go(-1);
        }}
        title="Select crypto"
      />
      <Content
        style={{
          backgroundColor: colors.black,
          padding: 0,
          marginTop: 16,
          position: 'relative'
        }}>
        <Column gap="sm">
          {poolsData?.map((pool) => {
            const stoken = balanceList.find((b) => b.denom == pool.baseData.id)!;

            const token = pool.token;

            const asset = type === 'stoken' ? stoken : token;

            return (
              <Row
                classname={'bg-item-hover'}
                onClick={() => {
                  dispatch(LendingActions.update({ poolTokenDenom: (type === 'stoken' ? 'u' : '') + asset.denom }));
                  onClose();
                }}
                full
                key={asset.denom}
                justifyBetween
                px="lg"
                style={{
                  cursor: 'pointer',
                  height: '44px',
                  padding: '10px 0px'
                }}>
                <Row>
                  <ImageIcon
                    url={asset.asset.logo}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%'
                    }}
                  />
                  <Column
                    style={{
                      gap: '0px'
                    }}>
                    <Text preset="regular" text={asset.asset.name}></Text>
                    <Text preset="sub" text={asset.asset.symbol}></Text>
                  </Column>
                </Row>

                <Column
                  style={{
                    gap: '0px'
                  }}>
                  <Text preset="regular" textEnd text={BigNumber(asset.formatAmount).toFormat()}></Text>
                  <Text preset="sub" textEnd text={`$${BigNumber(asset.totalValue).toFormat(2)}`}></Text>
                </Column>
              </Row>
            );
          })}
        </Column>
      </Content>
    </Layout>
  );
}
