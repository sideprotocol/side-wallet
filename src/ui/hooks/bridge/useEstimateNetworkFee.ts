import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSafeBalance, useUtxos } from '@/ui/state/transactions/hooks';
import { satoshisToAmount, sendAllBTC, sendBTC } from '@/ui/wallet-sdk/utils';
import { UnspentOutput } from '@unisat/wallet-sdk';

export function useEstimateNetworkFee() {
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const _utxos = useUtxos();

  const { params } = useBridgeState();
  const safeBalance = useSafeBalance();

  async function estimateNetworkFee({ amount, fee }: { amount: number; fee: number; to?: string; isSign?: boolean }) {
    const btcVault = params?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      });
    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    const senderAddress = currentAccount.address;

    if (safeBalance < +satoshisToAmount(amount)) {
      throw new Error(
        `Insufficient balance. Non-Inscription balance(${satoshisToAmount(
          safeBalance
        )} BTC) is lower than ${satoshisToAmount(amount)} BTC `
      );
    }

    const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
      return {
        ...v,
        pubkey: currentAccount.pubkey
      };
    });

    const { networkFee, walletInputs } =
      safeBalance === amount
        ? await sendAllBTC({
            btcUtxos: btcUtxos,
            toAddress: btcVault.address,
            networkType,
            feeRate: fee,
            enableRBF: true
          })
        : await sendBTC({
            btcUtxos: btcUtxos,
            tos: [{ address: btcVault.address, satoshis: amount }],
            networkType,
            changeAddress: senderAddress,
            feeRate: fee,
            enableRBF: true,
            memo: undefined,
            memos: undefined
          });

    return { networkFee, walletInputs };
  }

  return { estimateNetworkFee };
}
