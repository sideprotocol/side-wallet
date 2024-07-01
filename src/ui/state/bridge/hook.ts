import BigNumber from 'bignumber.js';
import * as bitcoin from 'bitcoinjs-lib';
import { useEffect } from 'react';

import wallet from '@/background/controller/wallet';
import { SIDE_BTC_INDEXER, SIDE_BTC_VAULT_ADDRESS_MAINNET, SIDE_BTC_VAULT_ADDRESS_TESTNET } from '@/shared/constant';
import { NetworkType } from '@/shared/types';
import { MessageComposer } from '@/ui/codegen/src/side/btcbridge/tx.registry';
import { useTools } from '@/ui/components/ActionComponent';
import { useGetSideTokenBalance } from '@/ui/hooks/useGetBalance';
import { DepositBTCBridge, bridgeStore, useBridgeStore } from '@/ui/stores/BridgeStore';
import { formatUnitAmount, formatWithDP, parseUnitAmount } from '@/ui/utils';
import { fromHex } from '@cosmjs/encoding';

import { useCurrentAccount } from '../accounts/hooks';
import { useNetworkType } from '../settings/hooks';
import { useSignAndBroadcastTxRaw } from '../transactions/hooks/cosmos';

export const useBtcBalance = () => {
  const { from } = useBridgeStore();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const currentAccount = useCurrentAccount();

  async function getUtxos() {
    const rawUtxos = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) =>
      res.json()
    );

    const utxo = rawUtxos.length == 1 ? rawUtxos[0] : rawUtxos.find((utxo) => utxo.vout == 1);

    if (!utxo) {
      bridgeStore.balance = '0';
      return;
    }
    const _data = formatWithDP(formatUnitAmount(utxo.value.toString(), 8), 8);

    bridgeStore.balance = _data;
  }

  const { balanceAmount: balanceSideSat } = useGetSideTokenBalance('sat');

  useEffect(() => {
    if (isDeposit) {
      //  get from indexer
      getUtxos();
    } else {
      const parsedBalance = formatWithDP(formatUnitAmount(balanceSideSat, 8), 8);

      bridgeStore.balance = parsedBalance;
    }
  }, [isDeposit, currentAccount.address, balanceSideSat]);
};

export const useBridge = () => {
  const { from, bridgeAmount, fee } = useBridgeStore();

  const currentAccount = useCurrentAccount();

  const tools = useTools();

  const networkType = useNetworkType();

  const unitAmount = BigNumber(parseUnitAmount(bridgeAmount, 8)).toNumber();

  const isDeposit = (from?.name || '').includes('Bitcoin');

  const pbk = fromHex(currentAccount.pubkey);

  const BTC_BRIDGE_VAULT =
    networkType === NetworkType.MAINNET ? SIDE_BTC_VAULT_ADDRESS_MAINNET : SIDE_BTC_VAULT_ADDRESS_TESTNET;

  const { signAndBroadcastTxRaw } = useSignAndBroadcastTxRaw();

  const bridge = async () => {
    bridgeStore.loading = true;

    if (isDeposit) {
      try {
        depositBTC({
          amount: unitAmount,
          fee: Number(fee || '200')
        })
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            if (res) {
              tools.toastSuccess('Deposit Successful! ');
            }
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
      }
    } else {
      const txMsg = MessageComposer.withTypeUrl.withdrawBitcoin({
        amount: `${unitAmount}sat`,
        feeRate: `${fee || 200}`,
        sender: currentAccount?.address
      });

      try {
        signAndBroadcastTxRaw({
          messages: [txMsg]
        })
          .then(() => {
            tools.toastSuccess('Withdraw Successful!');
          })
          .catch((err) => {
            console.log('err: ', err);
            tools.toastError(err.message);
          });
      } catch (error) {
        tools.toastError('Deposit Failed! ');
      }
    }
    bridgeStore.loading = false;
  };

  const estimateNetworkFee = async (params: DepositBTCBridge) => {
    const { amount, fee } = params;
    const senderAddress = currentAccount.address;

    const rawUtxos = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) =>
      res.json()
    );

    const realRawUtxo = rawUtxos.length === 1 ? rawUtxos : rawUtxos.filter((utxo) => utxo.vout === 1);

    const utxos = await Promise.all(
      realRawUtxo.map(async (item, _) => {
        const result = await fetch(`${SIDE_BTC_INDEXER}/tx/${item.txid}`).then((res) => res.json());

        return result;
      })
    );

    const utxosHex = await Promise.all(
      realRawUtxo.map(async (item) => {
        const result = await fetch(`${SIDE_BTC_INDEXER}/tx/${item.txid}/hex`).then((res) => res.text());

        return result;
      })
    );

    const recipient = BTC_BRIDGE_VAULT;

    const psbt = new bitcoin.Psbt({
      // TODO: network type
      network: bitcoin.networks.testnet
    });

    let inputAmount = 0;

    const decodeBech32 = bitcoin.address.fromBech32(senderAddress);

    const isTaproot = decodeBech32.version === 1 && decodeBech32.data.length === 32;

    utxos.forEach((utxo, index) => {
      if (isTaproot) {
        psbt.addInput({
          hash: utxo.txid,
          index: realRawUtxo[0].vout,
          nonWitnessUtxo: Buffer.from(utxosHex[index], 'hex'),
          witnessUtxo: {
            script: Buffer.from(utxo.vout[realRawUtxo[0].vout].scriptpubkey, 'hex'),
            value: utxo.vout[realRawUtxo[0].vout].value
          },

          tapInternalKey: !isTaproot ? undefined : Buffer.from(pbk.slice(1, 33))
        });
      } else {
        psbt.addInput({
          hash: utxo.txid,
          index: realRawUtxo[0].vout,
          nonWitnessUtxo: Buffer.from(utxosHex[index], 'hex'),
          witnessUtxo: {
            script: Buffer.from(utxo.vout[realRawUtxo[0].vout].scriptpubkey, 'hex'),
            value: utxo.vout[realRawUtxo[0].vout].value
          }
        });
      }

      inputAmount += realRawUtxo[0].value || 0;
    });
    const changeAmount = inputAmount - amount;
    psbt.addOutput({
      address: recipient,
      value: amount
    });

    if (changeAmount > 0) {
      psbt.addOutput({
        address: senderAddress,
        value: changeAmount
      });
    }

    const rawTransaction = bitcoin.Transaction.fromBuffer(psbt.data.getTransaction());

    rawTransaction.ins.forEach((input) => {
      if (isTaproot) {
        input.witness = input.witness.concat(new Buffer('0'.repeat(64)));
      } else {
        input.witness = input.witness.concat(new Buffer('0'.repeat(105)));
      }
    });
    const txSize = rawTransaction.virtualSize();
    const networkFee = txSize * fee;

    return networkFee;
  };

  const depositBTC = async (params: DepositBTCBridge) => {
    const { amount } = params;
    const senderAddress = currentAccount.address;

    const rawUtxos = await fetch(`${SIDE_BTC_INDEXER}/address/${currentAccount.address}/utxo`).then((res) =>
      res.json()
    );

    const realRawUtxo = rawUtxos.length === 1 ? rawUtxos : rawUtxos.filter((utxo) => utxo.vout === 1);

    const utxos = await Promise.all(
      realRawUtxo.map(async (item, _) => {
        const result = await fetch(`${SIDE_BTC_INDEXER}/tx/${item.txid}`).then((res) => res.json());

        return result;
      })
    );
    const utxosHex = await Promise.all(
      realRawUtxo.map(async (item) => {
        const result = await fetch(`${SIDE_BTC_INDEXER}/tx/${item.txid}/hex`).then((res) => res.text());

        return result;
      })
    );
    const recipient = BTC_BRIDGE_VAULT;

    const networkFee = await estimateNetworkFee(params);

    const decodeBech32 = bitcoin.address.fromBech32(senderAddress);

    const isTaproot = decodeBech32.version === 1 && decodeBech32.data.length === 32;

    let inputAmount = 0;

    const psbtUpdated = new bitcoin.Psbt({
      // TODO: network type
      network: bitcoin.networks.testnet
    });

    utxos.forEach((utxo, index) => {
      if (isTaproot) {
        psbtUpdated.addInput({
          hash: utxo.txid,
          index: realRawUtxo[0].vout,
          nonWitnessUtxo: Buffer.from(utxosHex[index], 'hex'),
          witnessUtxo: {
            script: Buffer.from(utxo.vout[realRawUtxo[0].vout].scriptpubkey, 'hex'),
            value: utxo.vout[realRawUtxo[0].vout].value
          },

          tapInternalKey: !isTaproot ? undefined : Buffer.from(pbk.slice(1, 33))
        });
      } else {
        psbtUpdated.addInput({
          hash: utxo.txid,
          index: realRawUtxo[0].vout,
          nonWitnessUtxo: Buffer.from(utxosHex[index], 'hex'),
          witnessUtxo: {
            script: Buffer.from(utxo.vout[realRawUtxo[0].vout].scriptpubkey, 'hex'),
            value: utxo.vout[realRawUtxo[0].vout].value
          }
        });
      }

      inputAmount += realRawUtxo[0].value || 0;
    });

    psbtUpdated.addOutput({
      address: recipient,
      value: amount
    });

    const changeAmount = inputAmount - amount - networkFee;

    if (changeAmount > 0) {
      psbtUpdated.addOutput({
        address: senderAddress,
        value: changeAmount
      });
    }

    const psbtHex = psbtUpdated.toHex();

    const signedTx = await wallet.signPsbtWithHex(
      psbtHex,
      [
        {
          index: 0,
          publicKey: currentAccount.pubkey
        }
      ],
      false
    );

    // await window.unisat.signPsbt(psbtHex, {
    //   autoFinalized: true,
    //   toSignInputs:
    // });

    const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

    const rawTransaction = signedPsbt.extractTransaction().toHex();

    const res = await fetch(`${SIDE_BTC_INDEXER}/tx`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: rawTransaction
    });

    return res;
  };

  return { bridge };
};
