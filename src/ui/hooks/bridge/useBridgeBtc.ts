import * as bitcoin from 'bitcoinjs-lib';
import { useState } from 'react';

import { MessageComposer } from '@/codegen/src/side/btcbridge/tx.registry';
import { CHAINS_ENUM } from '@/shared/constant';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { BridgeActions } from '@/ui/state/bridge/reducer';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useAppDispatch } from '@/ui/state/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useSafeBalance, useUtxos } from '@/ui/state/transactions/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { parseUnitAmount, useWallet } from '@/ui/utils';
import { satoshisToAmount, sendAllBTC, sendBTC } from '@/ui/wallet-sdk/utils';
import { UnspentOutput } from '@unisat/wallet-sdk';

export const useBridgeBtc = () => {
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const wallet = useWallet();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tools = useTools();
  const _utxos = useUtxos();

  const [loading, setLoading] = useState(false);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL } = useEnvironment();
  const { bridgeAmount, fee, fromChain, fromAsset, params } = useBridgeState();
  const safeBalance = useSafeBalance();
  const bridgeUnitAmount = parseUnitAmount(bridgeAmount, fromAsset?.asset.exponent || 8);

  const btcVault = params?.params?.vaults
    .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  const bridge = async () => {
    const isDeposit = !!fromChain?.isBitcoin;
    setLoading(true);

    if (isDeposit) {
      try {
        abstractDepositBTC({
          amount: bridgeUnitAmount,
          fee: Number(fee || '200')
        })
          .then((res) => {
            if (res) {
              navigate('TxSuccessScreen', { txid: res, chain: CHAINS_ENUM.SIDE, type: 'bridge' });
            }
          })
          .catch((err) => {
            tools.toastError(err.message);
          })
          .finally(() => {
            dispatch(BridgeActions.update({ bridgeAmount: '' }));
            setLoading(false);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        setLoading(false);
      }
    } else {
      const txMsg = MessageComposer.withTypeUrl.withdrawToBitcoin({
        amount: `${bridgeUnitAmount}sat`,
        sender: currentAccount?.address
      });

      try {
        signAndBroadcastTxRaw({
          messages: [txMsg]
        })
          .then((result) => {
            navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE, type: 'bridge' });
          })
          .catch((err) => {
            tools.toastError(err.message);
          })
          .finally(() => {
            setLoading(false);
            dispatch(BridgeActions.update({ bridgeAmount: '' }));
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        setLoading(false);
      }
    }
  };

  async function abstractDepositBTC(params) {
    const { amount, fee: feeRate } = params;

    const senderAddress = currentAccount?.address;

    const pbk = currentAccount?.pubkey;

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
        pubkey: pbk
      };
    });

    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    const { psbt, toSignInputs } =
      safeBalance === amount
        ? await sendAllBTC({
            btcUtxos: btcUtxos,
            toAddress: btcVault.address,
            networkType,
            feeRate: feeRate,
            enableRBF: true
          })
        : await sendBTC({
            btcUtxos: btcUtxos,
            tos: [{ address: btcVault.address, satoshis: amount }],
            networkType,
            changeAddress: senderAddress,
            feeRate: feeRate,
            enableRBF: true,
            memo: undefined,
            memos: undefined
          });
    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTx = signedPsbt.extractTransaction().toHex();
    const txid = await services.unisat.pushTx(rawTx, UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL);
    return txid;
  }

  return { bridge, loading };
};
