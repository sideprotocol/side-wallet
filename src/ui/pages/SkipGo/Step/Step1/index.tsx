import { sideChain } from '@/shared/constant';
import WalletIcon from '@/ui/assets/icons/wallet-icon.svg';
import { Button, Column, Row, Text } from '@/ui/components';
import { CoinInput } from '@/ui/components/CoinInput';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useSkipGoState } from '@/ui/state/skipGo/hook';
import { SkipGoActions } from '@/ui/state/skipGo/reducer';
import { colors } from '@/ui/theme/colors';
import { formatUnitAmount, getTruncate } from '@/ui/utils';
import { Skeleton } from '@mui/material';

import PowerBy from '../../PowerBy';
import useGetSkipAssets from '../../hooks/useGetSkipAssets';
import useGetSkipChains from '../../hooks/useGetSkipChains';
import useGetSkipRoute from '../../hooks/useGetSkipRoute';
import SelectToken from './SelectToken';
import Setting from './Setting';

export default function Index() {
  const currentAccount = useCurrentAccount();
  const dispatch = useAppDispatch();
  const { sourceAsset, sourceAssetChain, destAsset, destAssetChain, amountOut } = useSkipGoState();
  const { skipRoute, isLoading, error } = useGetSkipRoute();

  const { balanceList } = useGetSideBalanceList(currentAccount.address);
  const available = balanceList.find((item) => item.denom === sourceAsset?.denom)?.formatAmount || '0';

  const { skipChains } = useGetSkipChains();
  const { skipAssets } = useGetSkipAssets();

  return (
    <Row full relative rounded={true}>
      <Column full relative gap="lg">
        <Column px={'lg'} py={'medium'} rounded={true} bg={'card_bgColor'}>
          <Row justifyBetween itemsCenter>
            <Setting />
            <Row itemsCenter gap="sm">
              <img className={'w-[14px] h-[14px]'} src={WalletIcon} alt="" />
              <Text size="xs">
                {getTruncate(available, sourceAsset?.decimals)} {sourceAsset?.symbol}
              </Text>
              <Text
                size="xs"
                style={{
                  color: colors.main,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  dispatch(
                    SkipGoActions.update({
                      amountOut: available
                    })
                  );
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
                  amount: amountOut,
                  denom: sourceAsset?.denom || ''
                }}
                decimalScale={+6}
                onChange={(value) => {
                  dispatch(
                    SkipGoActions.update({
                      amountOut: value
                    })
                  );
                }}
              />
            </Row>
            {skipAssets ? (
              <SelectToken
                chainList={(skipChains || [])?.filter((item) => item.chainID === sideChain.chainID)}
                assetList={{ [sideChain.chainID]: skipAssets[sideChain.chainID] }}
                asset={sourceAsset}
                onChange={({ chain, asset }) => {
                  dispatch(
                    SkipGoActions.update({
                      sourceAssetChain: chain,
                      sourceAsset: asset,
                      amountOut: ''
                    })
                  );
                }}
              />
            ) : (
              <Skeleton
                sx={{
                  bgcolor: colors.black,
                  width: '102px',
                  borderRadius: '10px',
                  transform: 'scale(1)'
                }}
                height={48}
              />
            )}
          </Row>
          <Text
            size="sm"
            style={{
              textAlign: 'right',
              color: colors.grey12
            }}>
            on {sourceAssetChain?.chainName}
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
                  amount: skipRoute ? formatUnitAmount(skipRoute.amountIn, +destAsset!.decimals!) : '',
                  denom: destAsset?.denom || ''
                }}
                decimalScale={+6}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </Row>
            {destAsset ? (
              <SelectToken
                chainList={skipChains || []}
                assetList={skipAssets || {}}
                asset={destAsset}
                onChange={({ chain, asset }) => {
                  dispatch(
                    SkipGoActions.update({
                      destAssetChain: chain,
                      destAsset: asset
                    })
                  );
                }}
              />
            ) : (
              <Skeleton
                sx={{
                  bgcolor: colors.black,
                  width: '102px',
                  borderRadius: '10px',
                  transform: 'scale(1)'
                }}
                height={48}
              />
            )}
          </Row>
          <Text
            size="sm"
            style={{
              textAlign: 'right',
              color: colors.grey12
            }}>
            on {destAssetChain?.chainName}
          </Text>
        </Column>

        <Row>
          <Button
            disabled={isLoading || !skipRoute}
            full
            text={isLoading ? 'Finding best route' : 'Swap'}
            preset="primary"
          />
        </Row>

        {error ? (
          <Text
            size="sm"
            style={{
              textAlign: 'center',
              color: colors.red
            }}>
            {(error as Error).message}
          </Text>
        ) : null}

        <PowerBy />
      </Column>
    </Row>
  );
}
