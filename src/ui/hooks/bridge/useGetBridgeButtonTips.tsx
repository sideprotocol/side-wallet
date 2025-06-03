import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { toReadableAmount, toUnitAmount } from '@/ui/utils/formatter';

import { useCurrentAccount } from '../../state/accounts/hooks';
import { useBridgeParams, useBridgeState } from '../../state/bridge/hook';
import { useNetworkType } from '../../state/settings/hooks';
import { useUtxos } from '../../state/transactions/hooks';
import { estimateNetworkFeeHelper } from '../../wallet-sdk/utils';
import useGetBitcoinBalanceList from '../useGetBitcoinBalanceList';
import { useGetSideBalanceList } from '../useGetSideBalanceList';

export function useGetBridgeButtonTips() {
  const { isDeposit, balance, bridgeAmount, bridgeAsset, fee } = useBridgeState();

  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();

  const { params } = useBridgeParams();

  const { balanceList: bitcoinBalanceList } = useGetBitcoinBalanceList(currentAccount?.address);

  const { balanceList } = useGetSideBalanceList(currentAccount?.address);

  const [btcTransferGasError, setBtcTransferGasError] = useState<string | undefined>(undefined);
  const [debouncedBridgeAmount] = useDebounce(bridgeAmount, 300);

  const _utxos = useUtxos();

  // 校验比特币跨链的网络费用
  async function estimateNetworkFee() {
    if (!isDeposit || !params || +debouncedBridgeAmount > +balance) {
      setBtcTransferGasError(undefined);
      return;
    }
    try {
      await estimateNetworkFeeHelper(
        {
          amount: bridgeAsset?.asset.rune
            ? +(params?.params.protocol_fees.deposit_fee || '0')
            : +toUnitAmount(debouncedBridgeAmount || '0', bridgeAsset?.asset?.exponent || 8),
          fee: fee
        },
        params,
        _utxos,
        currentAccount,
        networkType
      )
        .then((res) => {
          console.log({ res, fee });
          setBtcTransferGasError(undefined);
        })
        .catch((error) => {
          setBtcTransferGasError(error?.message);
        });
    } catch (error: any) {
      setBtcTransferGasError(error?.message);
    }
  }

  useEffect(() => {
    estimateNetworkFee();
  }, [bridgeAsset, debouncedBridgeAmount, params, balance, fee]);

  const { transferBtcDisabled, transferBtcButtonTips } = useMemo(() => {
    // 未链接钱包 + 未输入
    if (!bridgeAmount || !params) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: ''
      };
    }

    if (btcTransferGasError) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: btcTransferGasError
      };
    }

    // 跨链桥是否开启
    const bridgeEnabled = isDeposit ? params?.params?.deposit_enabled : params?.params?.withdraw_enabled;
    if (!bridgeEnabled) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: 'Bridge disabled'
      };
    }

    // vault 合约
    const btcVault = params?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      })?.address;
    const runeVault = params?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_RUNES')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      })?.address;

    if (!btcVault || !runeVault) {
      return {
        transferBtcDisabled: true,
        transferBtcButtonTips: ''
      };
    }

    // 计算跨链需要的费用
    const bitcoinFeeInfo = bitcoinBalanceList.find((item) => item.denom === 'sat');
    const sideFeeInfo = balanceList.find((item) => item.denom === 'sat');
    const bridgeFeeAssetInfo = isDeposit ? bitcoinFeeInfo : sideFeeInfo;

    // 判断deposit情况： 非rune，输入是小于 min_deposit + deposit_fee
    if (isDeposit && !bridgeAsset?.asset?.rune) {
      const lessThanMinSatDeposit = BigNumber(toUnitAmount(bridgeAmount || '0', bridgeAsset.asset.exponent || 8)).lt(
        BigNumber(params?.params.protocol_limits?.btc_min_deposit || 0).plus(
          params?.params.protocol_fees?.deposit_fee || 0
        )
      );
      if (lessThanMinSatDeposit) {
        return {
          transferBtcDisabled: true,
          transferBtcButtonTips: `Minimum Amount Is ${toReadableAmount(
            BigNumber(params?.params.protocol_limits?.btc_min_deposit || '40000')
              .plus(params?.params.protocol_fees?.deposit_fee || '0')
              .toFixed(),
            8
          )} ${bridgeAsset?.asset.symbol}`
        };
      }
    }

    // 判断withdraw情况： 非rune，输入是否小于 min_withdraw + withdraw_fee
    if (!isDeposit && !bridgeAsset?.asset?.rune) {
      const lessThanMinSatWithdraw = BigNumber(toUnitAmount(bridgeAmount || '0', bridgeAsset?.asset.exponent || 8)).lt(
        BigNumber(params?.params.protocol_limits?.btc_min_withdraw || 0).plus(
          params?.params.protocol_fees?.withdraw_fee || 0
        )
      );
      if (lessThanMinSatWithdraw) {
        return {
          transferBtcDisabled: true,
          transferBtcButtonTips: `Minimum Amount Is ${toReadableAmount(
            BigNumber(params?.params.protocol_limits?.btc_min_withdraw || '60000')
              .plus(params?.params.protocol_fees?.withdraw_fee || '0')
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
      transferBtcButtonTips: 'Next'
    };
  }, [params, bridgeAmount, bridgeAsset, bitcoinBalanceList, balanceList, balance, btcTransferGasError]);

  return {
    isDisabled: transferBtcDisabled,
    buttonTips: transferBtcButtonTips
  };
}
