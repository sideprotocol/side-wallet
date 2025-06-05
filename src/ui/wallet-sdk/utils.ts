// import { UTXOBridge } from '@/ui/services';
import bigInt from 'big-integer';
import BigNumber from 'bignumber.js';
import { Buffer } from 'buffer';

import { ToSignInput, UTXO_DUST, UnspentOutput } from '@unisat/wallet-sdk';
import { ECPair, bitcoin } from '@unisat/wallet-sdk/lib/bitcoin-core';
import { ErrorCodes, WalletUtilsError } from '@unisat/wallet-sdk/lib/error';
import { NetworkType } from '@unisat/wallet-sdk/lib/network';
import { varint } from '@unisat/wallet-sdk/lib/runes';
import { RuneId } from '@unisat/wallet-sdk/lib/runes/rund_id';
import { Transaction, utxoHelper } from '@unisat/wallet-sdk/lib/transaction';

export const toXOnly = (pubKey: Buffer) => (pubKey.length === 32 ? pubKey : pubKey.slice(1, 33));

/**
 * ECDSA signature validator
 */
export const validator = (pubkey: Buffer, msghash: Buffer, signature: Buffer): boolean =>
  ECPair.fromPublicKey(pubkey).verify(msghash, signature);

/**
 * Schnorr signature validator
 */
export const schnorrValidator = (pubkey: Buffer, msghash: Buffer, signature: Buffer): boolean => {
  return ECPair.fromPublicKey(pubkey).verifySchnorr(msghash, signature);
};

/**
 * Transform satoshis to btc format
 */
export function satoshisToAmount(val: number) {
  const num = new BigNumber(val);
  return num.dividedBy(100000000).toFixed(8);
}

/**
 * Transform btc format to satoshis
 */
export function amountToSaothis(val: any) {
  const num = new BigNumber(val);
  return num.multipliedBy(100000000).toNumber();
}

export const satoshisToBTC = (amount: number) => {
  return amount / 100000000;
};

export function shortAddress(address?: string, len = 5) {
  if (!address) return '';
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + '...' + address.slice(address.length - len);
}

function toHex(data: Uint8Array): string {
  return Buffer.from(data).toString('hex');
}

export async function estimateNetworkFeeHelper(params, bridgeParams, utxos, account, networkType: NetworkType) {
  const { amount, fee: feeRate } = params;

  const senderAddress = account?.address;

  const pbk = toHex(account?.pubkey);

  const _utxos = utxos;

  const safeBalance = _utxos.filter((v) => v.inscriptions.length == 0).reduce((pre, cur) => pre + cur.satoshis, 0);

  if (safeBalance < amount) {
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

  const protocolFee = bridgeParams.params.protocol_fees;

  const protocolLimit = bridgeParams.params.protocol_limits;

  const btcVault = bridgeParams.params.vaults
    .filter((vault) => vault.asset_type === 'ASSET_TYPE_BTC')
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  if (!btcVault) {
    throw new Error('No valid vault address found.');
  }

  const btcVaultAddress = btcVault.address;

  const { networkFee, walletInputs } =
    safeBalance === amount
      ? await sendAllBTC({
          btcUtxos: btcUtxos,
          toAddress: btcVaultAddress,
          networkType,
          feeRate: feeRate,
          enableRBF: true
        })
      : await sendBTC({
          btcUtxos: btcUtxos,
          tos: [{ address: btcVaultAddress, satoshis: amount }],
          networkType,
          changeAddress: senderAddress,
          feeRate: feeRate,
          enableRBF: true,
          memo: undefined,
          memos: undefined
        });

  return { networkFee, walletInputs, protocolFee, protocolLimit };
}

export async function sendAllBTC({
  btcUtxos,
  toAddress,
  networkType,
  feeRate,
  enableRBF = true,
  btcBridgeDepositIbcScript
}: {
  btcUtxos: UnspentOutput[];
  toAddress: string;
  networkType: NetworkType;
  feeRate: number;
  enableRBF?: boolean;
  btcBridgeDepositIbcScript?: string;
}) {
  if (utxoHelper.hasAnyAssets(btcUtxos)) {
    throw new WalletUtilsError(ErrorCodes.NOT_SAFE_UTXOS);
  }

  const tx = new Transaction();
  tx.setNetworkType(networkType);
  tx.setFeeRate(feeRate);
  tx.setEnableRBF(enableRBF);
  tx.addOutput(toAddress, UTXO_DUST);

  if (btcBridgeDepositIbcScript) {
    tx.addScriptOutput(Buffer.from(btcBridgeDepositIbcScript, 'hex'), 0);
  }

  const toSignInputs: ToSignInput[] = [];
  btcUtxos.forEach((v, index) => {
    tx.addInput(v);
    toSignInputs.push({ index, publicKey: v.pubkey });
  });

  const fee = await tx.calNetworkFee();
  const unspent = tx.getTotalInput() - fee;
  if (unspent < UTXO_DUST) {
    throw new WalletUtilsError(ErrorCodes.INSUFFICIENT_BTC_UTXO);
  }
  tx.outputs[0].value = unspent;

  const psbt = tx.toPsbt();

  const walletInputs = btcUtxos.filter(
    (btcutxo) => !!psbt.data.inputs.find((input) => input.witnessUtxo?.value === btcutxo.satoshis)
  );

  const uniqueArray = walletInputs.reduce((acc, current) => {
    const x = acc.find((item) => item.txid === current.txid);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, [] as UnspentOutput[]);

  return { psbt, toSignInputs, networkFee: await tx.calNetworkFee(), walletInputs: uniqueArray };
}

export async function sendBTC({
  btcUtxos,
  tos,
  networkType,
  changeAddress,
  feeRate,
  enableRBF = true,
  memo,
  memos,
  btcBridgeDepositIbcScript
}: {
  btcUtxos: UnspentOutput[];
  tos: {
    address: string;
    satoshis: number;
  }[];
  networkType: NetworkType;
  changeAddress: string;
  feeRate: number;
  enableRBF?: boolean;
  memo?: string;
  memos?: string[];
  btcBridgeDepositIbcScript?: string;
}) {
  if (utxoHelper.hasAnyAssets(btcUtxos)) {
    throw new WalletUtilsError(ErrorCodes.NOT_SAFE_UTXOS);
  }

  const tx = new Transaction();
  tx.setNetworkType(networkType);
  tx.setFeeRate(feeRate);
  tx.setEnableRBF(enableRBF);
  tx.setChangeAddress(changeAddress);

  tos.forEach((v) => {
    tx.addOutput(v.address, v.satoshis);
  });

  if (btcBridgeDepositIbcScript) {
    tx.addScriptOutput(Buffer.from(btcBridgeDepositIbcScript, 'hex'), 0);
  }

  if (memo) {
    if (Buffer.from(memo, 'hex').toString('hex') === memo) {
      tx.addOpreturn([Buffer.from(memo, 'hex')]);
    } else {
      tx.addOpreturn([Buffer.from(memo)]);
    }
  } else if (memos) {
    if (Buffer.from(memos[0], 'hex').toString('hex') === memos[0]) {
      tx.addOpreturn(memos.map((memo) => Buffer.from(memo, 'hex')));
    } else {
      tx.addOpreturn(memos.map((memo) => Buffer.from(memo)));
    }
  }

  const toSignInputs = await tx.addSufficientUtxosForFee(btcUtxos);

  const psbt = tx.toPsbt();

  const walletInputs = btcUtxos.filter(
    (btcutxo) => !!psbt.data.inputs.find((input) => input.witnessUtxo?.value === btcutxo.satoshis)
  );

  const uniqueArray = walletInputs.reduce((acc, current) => {
    const x = acc.find((item) => item.txid === current.txid);
    if (!x) {
      acc.push(current);
    }
    return acc;
  }, [] as UnspentOutput[]);

  return {
    psbt,
    toSignInputs,
    networkFee: await tx.calNetworkFee(),
    walletInputs: uniqueArray
  };
}

export async function sendRunesWithBTC({
  assetUtxos,
  btcUtxos,
  assetAddress,
  btcAddress,
  toAddress,
  btcToAddress,
  networkType,
  protocolFee,
  runeid,
  runeAmount,
  outputValue,
  feeRate,
  enableRBF = true
}: {
  assetUtxos: UnspentOutput[];
  btcUtxos: UnspentOutput[];
  assetAddress: string;
  btcAddress: string;
  toAddress: string;
  btcToAddress: string;
  networkType: NetworkType;
  protocolFee: number;
  runeid: string;
  runeAmount: string;
  outputValue: number;
  feeRate: number;
  enableRBF?: boolean;
}) {
  // safe check
  if (utxoHelper.hasAtomicalsNFT(assetUtxos) || utxoHelper.hasInscription(assetUtxos)) {
    throw new WalletUtilsError(ErrorCodes.NOT_SAFE_UTXOS);
  }

  if (utxoHelper.hasAnyAssets(btcUtxos)) {
    throw new WalletUtilsError(ErrorCodes.NOT_SAFE_UTXOS);
  }

  const tx = new Transaction();
  tx.setNetworkType(networkType);
  tx.setFeeRate(feeRate);
  tx.setEnableRBF(enableRBF);
  tx.setChangeAddress(btcAddress);

  const toSignInputs: ToSignInput[] = [];

  // add assets
  assetUtxos.forEach((v, index) => {
    tx.addInput(v);
    toSignInputs.push({ index, publicKey: v.pubkey });
  });

  let fromRuneAmount = bigInt(0);
  let hasMultipleRunes = false;
  let runesMap = {};
  assetUtxos.forEach((v) => {
    if (v.runes) {
      v.runes.forEach((w) => {
        runesMap[w.runeid] = true;
        if (w.runeid === runeid) {
          fromRuneAmount = fromRuneAmount.plus(bigInt(w.amount));
        }
      });
    }
  });

  if (Object.keys(runesMap).length > 1) {
    hasMultipleRunes = true;
  }

  const changedRuneAmount = fromRuneAmount.minus(bigInt(runeAmount));

  if (changedRuneAmount.lt(0)) {
    throw new WalletUtilsError(ErrorCodes.INSUFFICIENT_ASSET_UTXO);
  }

  let needChange = false;
  if (hasMultipleRunes || changedRuneAmount.gt(0)) {
    needChange = true;
  }

  let payload = [];
  let runeId: RuneId = RuneId.fromString(runeid);

  varint.encodeToVec(0, payload);

  // add send data
  varint.encodeToVec(runeId.block, payload);
  varint.encodeToVec(runeId.tx, payload);
  varint.encodeToVec(runeAmount, payload);
  if (needChange) {
    // 1 is to change
    // 2 is to send
    varint.encodeToVec(2, payload);
  } else {
    // 1 is to send
    varint.encodeToVec(1, payload);
  }

  // add op_return
  tx.addScriptOutput(
    // OUTPUT_0
    bitcoin.script.compile([bitcoin.opcodes.OP_RETURN, bitcoin.opcodes.OP_13, Buffer.from(new Uint8Array(payload))]),
    0
  );

  if (needChange) {
    // OUTPUT_1
    // add change
    tx.addOutput(assetAddress, outputValue);
  }

  tx.addOutput(toAddress, outputValue);

  tx.addOutput(btcToAddress, protocolFee);

  // add btc
  const _toSignInputs = await tx.addSufficientUtxosForFee(btcUtxos, true);
  toSignInputs.push(..._toSignInputs);

  const psbt = tx.toPsbt();

  return { psbt, toSignInputs };
}
