import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import useGetBitcoinBalanceList from '@/ui/hooks/useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '@/ui/hooks/useGetSideBalanceList';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { formatUnitAmount } from '@/ui/utils';
import { toUnitAmount } from '@/ui/utils/formatter';

import useInitBtcBridge from './useInitBtcBridge';

export default function useGetButtonTips() {
  const currentAccount = useCurrentAccount();
  const { balanceList: sideBalanceList } = useGetSideBalanceList(currentAccount?.address);
  const { balanceList: btcBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);
  const { bridgeParams } = useInitBtcBridge();
  const { bridgeAmount, balance, from, to, bridgeAsset } = useBridgeState();

  const isBtcTransfer = from?.isBitcoin || to?.isBitcoin;

  const { transferBtcDisabled, transferBtcButtonTips } = useMemo(() => {
    if (!isBtcTransfer) {
      return {
        transferBtcDisabled: false,
        transferBtcButtonTips: ''
      };
    }
    const isDeposit = !!from?.isBitcoin;

    // 未输入
    if (!bridgeAmount || !bridgeParams) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: ''
      };
    }

    // 跨链桥是否开启
    const bridgeEnabled = isDeposit ? bridgeParams?.params.deposit_enabled : bridgeParams?.params.withdraw_enabled;
    if (!bridgeEnabled) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: 'Bridge disabled'
      };
    }

    // vault 合约
    const btcVault = bridgeParams?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
      .reduce(
        // @ts-ignore
        (max, current) => {
          return BigInt(current.version) > BigInt(max.version) ? current : max;
        },
        {
          version: 0,
          address: ''
        }
      )?.address;
    const runeVault = bridgeParams?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_RUNES')
      .reduce(
        // @ts-ignore
        (max, current) => {
          return BigInt(current.version) > BigInt(max.version) ? current : max;
        },
        {
          version: 0,
          address: ''
        }
      )?.address;

    if (!btcVault || !runeVault) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: ''
      };
    }

    // 计算跨链需要的费用
    const bitcoinFeeInfo = btcBalanceList.find((item) => item.denom === 'sat');
    const sideFeeInfo = sideBalanceList.find((item) => item.denom === 'sat');
    const bridgeFeeAssetInfo = isDeposit ? bitcoinFeeInfo : sideFeeInfo;

    // 判断deposit情况： 非rune，输入是小于 min_deposit + deposit_fee
    if (isDeposit && !bridgeAsset?.asset?.rune) {
      const lessThanMinSatDeposit = BigNumber(toUnitAmount(bridgeAmount || '0', bridgeAsset?.asset.exponent || 8)).lt(
        BigNumber(bridgeParams?.params.protocol_limits?.btc_min_deposit || 0).plus(
          bridgeParams?.params.protocol_fees?.deposit_fee || 0
        )
      );
      if (lessThanMinSatDeposit) {
        return {
          transferBtcDisabled: true,
          transferBtcButtonTips: `Minimum Amount Is ${formatUnitAmount(
            BigNumber(bridgeParams?.params.protocol_limits?.btc_min_deposit || '40000')
              .plus(bridgeParams?.params.protocol_fees?.deposit_fee || '0')
              .toFixed(),
            8
          )} ${bridgeAsset?.asset.symbol}`
        };
      }
    }

    // 判断withdraw情况： 非rune，输入是否小于 min_withdraw + withdraw_fee
    if (!isDeposit && !bridgeAsset?.asset?.rune) {
      const lessThanMinSatWithdraw = BigNumber(toUnitAmount(bridgeAmount || '0', bridgeAsset?.asset.exponent || 8)).lt(
        BigNumber(bridgeParams?.params.protocol_limits?.btc_min_withdraw || 0).plus(
          bridgeParams?.params.protocol_fees?.withdraw_fee || 0
        )
      );
      if (lessThanMinSatWithdraw) {
        return {
          transferBtcDisabled: true,
          transferBtcButtonTips: `Minimum Amount Is ${formatUnitAmount(
            BigNumber(bridgeParams?.params.protocol_limits?.btc_min_withdraw || '60000')
              .plus(bridgeParams?.params.protocol_fees?.withdraw_fee || '0')
              .toFixed(),
            8
          )} ${bridgeAsset?.asset.symbol}`
        };
      }
    }

    if (BigNumber(bridgeAmount || '0').gt(balance)) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: 'Insufficient Balance'
      };
    }

    if (bridgeAsset?.denom === bridgeFeeAssetInfo?.denom && +bridgeAmount === +balance) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: 'Please reserve sufficient funds for network and bridge fees.'
      };
    }
    return {
      transferBtcDisabled: false,
      transferBtcButtonTips: ''
    };
  }, [bridgeParams, bridgeAmount, bridgeAsset, btcBalanceList, sideBalanceList, from, to, balance, isBtcTransfer]);

  return {
    isDisabled: transferBtcDisabled,
    buttonTips: transferBtcButtonTips
  };
}
