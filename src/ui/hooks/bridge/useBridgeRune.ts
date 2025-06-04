import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useState } from 'react';

import { MessageComposer } from '@/codegen/src/side/btcbridge/tx.registry';
import { CHAINS_ENUM } from '@/shared/constant';
import { useTools } from '@/ui/components/ActionComponent';
import { useNavigate } from '@/ui/pages/MainRoute';
import services from '@/ui/services';
import { useCurrentAccount } from '@/ui/state/accounts/hooks';
import { useBridgeState } from '@/ui/state/bridge/hook';
import { useEnvironment } from '@/ui/state/environment/hooks';
import { useNetworkType } from '@/ui/state/settings/hooks';
import { useUtxos } from '@/ui/state/transactions/hooks';
import { useSignAndBroadcastTxRaw } from '@/ui/state/transactions/hooks/cosmos';
import { parseUnitAmount, useWallet } from '@/ui/utils';
import { sendRunesWithBTC } from '@/ui/wallet-sdk/utils';
import { UnspentOutput } from '@unisat/wallet-sdk';

function compareAmount(a: string, b: string) {
  return new BigNumber(a || '0').comparedTo(new BigNumber(b || '0'));
}

export const useBridgeRune = () => {
  const currentAccount = useCurrentAccount();
  const networkType = useNetworkType();
  const wallet = useWallet();
  const navigate = useNavigate();
  const tools = useTools();
  const _utxos = useUtxos();

  const [loading, setLoading] = useState(false);

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();
  const { UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL, UNISAT_IO_API } = useEnvironment();
  const { bridgeAmount, fee, fromChain, fromAsset } = useBridgeState();

  const bridgeRune = async (runeId) => {
    setLoading(true);
    const isDeposit = !!fromChain?.isBitcoin;

    if (isDeposit) {
      try {
        abstractDepositRune({
          amount: bridgeAmount,
          fee: Number(fee || '200'),
          runeId
        })
          .then((res) => {
            if (res) {
              navigate('TxSuccessScreen', { txid: res, chain: CHAINS_ENUM.SIDE });
            }
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        setLoading(false);
      }
    } else {
      const unitAmount = parseUnitAmount(bridgeAmount, fromAsset?.asset.exponent || 8);
      const txMsg = MessageComposer.withTypeUrl.withdrawToBitcoin({
        amount: `${unitAmount}runes/${runeId}`,
        sender: currentAccount?.address
      });

      try {
        signAndBroadcastTxRaw({
          messages: [txMsg]
        })
          .then((result) => {
            navigate('TxSuccessScreen', { txid: result.tx_response.txhash, chain: CHAINS_ENUM.SIDE });
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
        setLoading(false);
      }
    }
  };

  async function abstractDepositRune(params) {
    const senderAddress = currentAccount.address;
    const pbk = currentAccount.pubkey;

    const { runeId, fee } = params;
    const btcVault = params?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      });

    const runeVault = params?.params?.vaults
      .filter((vault) => vault.asset_type === 'ASSET_TYPE_RUNES')
      .reduce((max, current) => {
        return BigInt(current.version) > BigInt(max.version) ? current : max;
      });
    const bridgeUnitAmount = parseUnitAmount(bridgeAmount, fromAsset?.asset.exponent || 8);

    const bridgeParams = await services.bridge.getBridgeParams(UNISAT_IO_API);

    if (!btcVault) {
      throw new Error('No valid vault address found.');
    }

    if (!runeVault) {
      throw new Error('No valid vault address found.');
    }

    const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
      return {
        ...v,
        pubkey: pbk
      };
    });

    const runes_utxos = await services.unisat.getRunesUtxos(senderAddress, runeId, UNISAT_SERVICE_ENDPOINT);

    const assetUtxosRunes = runes_utxos.map((v) => {
      return Object.assign(v, { pubkey: pbk });
    });

    assetUtxosRunes.forEach((v) => {
      v.inscriptions = [];
      v.atomicals = [];
    });

    assetUtxosRunes.sort((a, b) => {
      const bAmount = b.runes.find((v) => v.runeid == runeId)?.amount || '0';
      const aAmount = a.runes.find((v) => v.runeid == runeId)?.amount || '0';
      return compareAmount(bAmount, aAmount);
    });

    let assetUtxos = assetUtxosRunes;

    const _assetUtxos: UnspentOutput[] = [];

    // find the utxo that has the exact amount to split
    for (let i = 0; i < assetUtxos.length; i++) {
      const v = assetUtxos[i];
      if (v.runes && v.runes.length > 1) {
        const balance = v.runes.find((r) => r.runeid == runeId);
        if (balance && balance.amount == bridgeUnitAmount) {
          _assetUtxos.push(v);
          break;
        }
      }
    }

    if (_assetUtxos.length == 0) {
      for (let i = 0; i < assetUtxos.length; i++) {
        const v = assetUtxos[i];
        if (v.runes) {
          const balance = v.runes.find((r) => r.runeid == runeId);
          if (balance && balance.amount == bridgeUnitAmount) {
            _assetUtxos.push(v);
            break;
          }
        }
      }
    }

    if (_assetUtxos.length == 0) {
      let total = BigInt(0);
      for (let i = 0; i < assetUtxos.length; i++) {
        const v = assetUtxos[i];
        v.runes?.forEach((r) => {
          if (r.runeid == runeId) {
            total = total + BigInt(r.amount);
          }
        });
        _assetUtxos.push(v);
        if (total >= BigInt(bridgeUnitAmount)) {
          break;
        }
      }
    }

    assetUtxos = _assetUtxos as any;

    const { psbt, toSignInputs } = await sendRunesWithBTC({
      assetUtxos,
      btcUtxos: btcUtxos,
      networkType,
      toAddress: runeVault.address,
      btcToAddress: btcVault.address,
      protocolFee: Number(bridgeParams.params.protocol_fees.deposit_fee),
      assetAddress: senderAddress,
      btcAddress: senderAddress,
      feeRate: fee,
      runeid: runeId,
      runeAmount: bridgeUnitAmount,
      outputValue: 546,
      enableRBF: true
    });

    const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTx = signedPsbt.extractTransaction().toHex();
    const txid = await services.unisat.pushTx(rawTx, UNISAT_SERVICE_ENDPOINT, SERVICE_BASE_URL);
    return txid;
  }

  return { bridgeRune, loading };
};
