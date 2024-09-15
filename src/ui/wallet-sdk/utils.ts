import BigNumber from "bignumber.js";
import { ECPair, bitcoin, ecc } from "./bitcoin-core";

// import { UTXOBridge } from '@/ui/services';

import { Buffer } from "buffer";

import { SIDE_RUNES_VAULT_ADDRESS } from "@/ui/constants";

import services from "@/ui/services";

import { UnspentOutput } from "./types";

import { isProduction } from "@/ui/constants";
import { sendAllBTC, sendBTC, sendRunesWithBTC } from "./tx-helpers";

// import { Account, DepositBTCBridge } from '../web3-wallet';
import {useWallet} from '@/ui/utils';

export const toXOnly = (pubKey: Buffer) => (pubKey.length === 32 ? pubKey : pubKey.slice(1, 33));

function tapTweakHash(pubKey: Buffer, h: Buffer | undefined): Buffer {
  return bitcoin.crypto.taggedHash("TapTweak", Buffer.concat(h ? [pubKey, h] : [pubKey]));
}

/**
 * Transform raw private key to taproot address private key
 */
export function tweakSigner(signer: bitcoin.Signer, opts: any = {}): bitcoin.Signer {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let privateKey: Uint8Array | undefined = signer.privateKey!;
  if (!privateKey) {
    throw new Error("Private key is required for tweaking signer!");
  }
  if (signer.publicKey[0] === 3) {
    privateKey = ecc.privateNegate(privateKey);
  }

  const tweakedPrivateKey = ecc.privateAdd(privateKey, tapTweakHash(toXOnly(signer.publicKey), opts.tweakHash));
  if (!tweakedPrivateKey) {
    throw new Error("Invalid tweaked private key!");
  }

  return ECPair.fromPrivateKey(Buffer.from(tweakedPrivateKey), {
    network: opts.network,
  });
}

/**
 * ECDSA signature validator
 */
export const validator = (pubkey: Buffer, msghash: Buffer, signature: Buffer): boolean => ECPair.fromPublicKey(pubkey).verify(msghash, signature);

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
  if (!address) return "";
  if (address.length <= len * 2) return address;
  return address.slice(0, len) + "..." + address.slice(address.length - len);
}

export function decodeTxToGetValue(tx) {
  const runeOut = tx.vout.find((vout) => vout.scriptpubkey_address === SIDE_RUNES_VAULT_ADDRESS);

  if (!runeOut) return 0;

  return runeOut.value;
}

export async function abstractDepositBTC(
  params,
  currentAccount,
) {
  const { amount, fee: feeRate } = params;

  const senderAddress = currentAccount?.address;

  const pbk = toHex(currentAccount?.pubkey);

  const _utxos = await services.unisat.getBTCUtxos({ address: senderAddress });

  const safeBalance = _utxos.filter((v) => v.inscriptions.length == 0).reduce((pre, cur) => pre + cur.satoshis, 0);

  if (safeBalance < amount) {
    throw new Error(
      `Insufficient balance. Non-Inscription balance(${satoshisToAmount(safeBalance)} BTC) is lower than ${satoshisToAmount(amount)} BTC `
    );
  }

  const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
    return {
      ...v,
      pubkey: pbk,
    };
  });

  const bridgeParams = await services.bridge.getBridgeParams();

  const btcVault = bridgeParams.params.vaults
    .filter((vault) => vault.asset_type === "ASSET_TYPE_BTC")
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  if (!btcVault) {
    throw new Error("No valid vault address found.");
  }

  const btcVaultAddress = btcVault.address;

  const { psbt, toSignInputs } =
    safeBalance === amount
      ? await sendAllBTC({
          btcUtxos: btcUtxos,
          toAddress: btcVaultAddress,
          networkType: isProduction ? 0 : 1,
          feeRate: feeRate,
          enableRBF: true,
        })
      : await sendBTC({
          btcUtxos: btcUtxos,
          tos: [{ address: btcVaultAddress, satoshis: amount }],
          networkType: isProduction ? 0 : 1,
          changeAddress: senderAddress,
          feeRate: feeRate,
          enableRBF: true,
          memo: undefined,
          memos: undefined,
        });
  const wallet = useWallet();
  console.log(`wallet: `, wallet);
  debugger;
  const signedTx = await wallet.signPsbtWithHex(psbt.toHex(), toSignInputs, true);

  const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

  const rawTx = signedPsbt.extractTransaction().toHex();
  const txid = await services.unisat.pushTx(rawTx);
  return txid;
}

export async function abstractDepositRune(
  params,
  getAccounts: () => Promise<any[]>,
  signPsbt: (psbtHex: string, options: any) => Promise<string>
) {
  const senderAddress = (await getAccounts())[0].address;
  const pbk = toHex((await getAccounts())[0].pubkey);

  const { runeId, amount, fee } = params;
  const runeid = runeId?.substring(6);
  const runeAmount = BigNumber(amount).toFixed();

  const bridgeParams = await services.bridge.getBridgeParams();

  const btcVault = bridgeParams.params.vaults
    .filter((vault) => vault.asset_type === "ASSET_TYPE_BTC")
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  if (!btcVault) {
    throw new Error("No valid vault address found.");
  }

  const runeVault = bridgeParams.params.vaults
    .filter((vault) => vault.asset_type === "ASSET_TYPE_RUNES")
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  if (!runeVault) {
    throw new Error("No valid vault address found.");
  }

  const btcVaultAddress = btcVault.address;

  const runeVaultAddress = runeVault.address;

  const _utxos = await services.unisat.getBTCUtxos({ address: senderAddress });

  const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
    return {
      ...v,
      pubkey: pbk,
    };
  });

  const runes_utxos = await services.unisat.getRunesUtxos(senderAddress, runeid!);

  const assetUtxosRunes = runes_utxos.map((v) => {
    return Object.assign(v, { pubkey: pbk });
  });

  assetUtxosRunes.forEach((v) => {
    v.inscriptions = [];
    v.atomicals = [];
  });

  assetUtxosRunes.sort((a, b) => {
    const bAmount = b.runes.find((v) => v.runeid == runeid)?.amount || "0";
    const aAmount = a.runes.find((v) => v.runeid == runeid)?.amount || "0";
    return compareAmount(bAmount, aAmount);
  });

  let assetUtxos = assetUtxosRunes;

  const _assetUtxos: UnspentOutput[] = [];

  // find the utxo that has the exact amount to split
  for (let i = 0; i < assetUtxos.length; i++) {
    const v = assetUtxos[i];
    if (v.runes && v.runes.length > 1) {
      const balance = v.runes.find((r) => r.runeid == runeid);
      if (balance && balance.amount == runeAmount) {
        _assetUtxos.push(v);
        break;
      }
    }
  }

  if (_assetUtxos.length == 0) {
    for (let i = 0; i < assetUtxos.length; i++) {
      const v = assetUtxos[i];
      if (v.runes) {
        const balance = v.runes.find((r) => r.runeid == runeid);
        if (balance && balance.amount == runeAmount) {
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
        if (r.runeid == runeid) {
          total = total + BigInt(r.amount);
        }
      });
      _assetUtxos.push(v);
      if (total >= BigInt(runeAmount)) {
        break;
      }
    }
  }

  assetUtxos = _assetUtxos;

  const { psbt, toSignInputs } = await sendRunesWithBTC({
    assetUtxos,
    btcUtxos: btcUtxos,
    networkType: isProduction ? 0 : 1,
    toAddress: runeVaultAddress,
    btcToAddress: btcVaultAddress,
    protocolFee: Number(bridgeParams.params.protocol_fees.deposit_fee),
    assetAddress: senderAddress,
    btcAddress: senderAddress,
    feeRate: fee,
    runeid: runeid!,
    runeAmount: BigNumber(amount).toFixed(),
    outputValue: 546,
    enableRBF: true,
  });

  const signedTx = await signPsbt(psbt.toHex(), {
    autoFinalized: true,
    toSignInputs,
  });

  const signedPsbt = bitcoin.Psbt.fromHex(signedTx);

  const rawTx = signedPsbt.extractTransaction().toHex();

  const txid = await services.unisat.pushTx(rawTx);

  return txid;
}

function compareAmount(a: string, b: string) {
  return new BigNumber(a || "0").comparedTo(new BigNumber(b || "0"));
}

function toHex(data: Uint8Array): string {
  return Buffer.from(data).toString("hex");
}

export async function estimateNetworkFeeHelper(params, account) {
  const { amount, fee: feeRate } = params;

  const senderAddress = account?.address;

  const pbk = toHex(account?.pubkey);

  const _utxos = await services.unisat.getBTCUtxos({ address: senderAddress });

  const safeBalance = _utxos.filter((v) => v.inscriptions.length == 0).reduce((pre, cur) => pre + cur.satoshis, 0);

  if (safeBalance < amount) {
    throw new Error(
      `Insufficient balance. Non-Inscription balance(${satoshisToAmount(safeBalance)} BTC) is lower than ${satoshisToAmount(amount)} BTC `
    );
  }

  const btcUtxos: UnspentOutput[] = _utxos.map((v) => {
    return {
      ...v,
      pubkey: pbk,
    };
  });

  const bridgeParams = await services.bridge.getBridgeParams();

  const protocolFee = bridgeParams.params.protocol_fees;

  const protocolLimit = bridgeParams.params.protocol_limits;

  const btcVault = bridgeParams.params.vaults
    .filter((vault) => vault.asset_type === "ASSET_TYPE_BTC")
    .reduce((max, current) => {
      return BigInt(current.version) > BigInt(max.version) ? current : max;
    });

  if (!btcVault) {
    throw new Error("No valid vault address found.");
  }

  const btcVaultAddress = btcVault.address;

  const { networkFee, walletInputs } =
    safeBalance === amount
      ? await sendAllBTC({
          btcUtxos: btcUtxos,
          toAddress: btcVaultAddress,
          networkType: 1,
          feeRate: feeRate,
          enableRBF: true,
        })
      : await sendBTC({
          btcUtxos: btcUtxos,
          tos: [{ address: btcVaultAddress, satoshis: amount }],
          networkType: 1,
          changeAddress: senderAddress,
          feeRate: feeRate,
          enableRBF: true,
          memo: undefined,
          memos: undefined,
        });

  return { networkFee, walletInputs, protocolFee, protocolLimit };
}
