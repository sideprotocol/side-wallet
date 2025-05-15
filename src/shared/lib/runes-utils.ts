import { BigNumber } from 'bignumber.js';

interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface UTXO {
  txid: string;
  version: number;
  locktime: number;
  vin: Vin[];
  vout: Prevout[];
  size: number;
  weight: number;
  fee: number;
  status: Status;
}

interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

interface Vin {
  txid: string;
  vout: number;
  prevout: Prevout;
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
}

interface Prevout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

// Max 38 decimal places
function toDecimalAmount(amount: string, divisibility: number) {
  const decimalAmount = new BigNumber(amount).dividedBy(new BigNumber(10).pow(divisibility));
  return decimalAmount.toString();
}

function toDecimalNumber(amount, divisibility) {
  const decimalAmount = new BigNumber(amount).dividedBy(new BigNumber(10).pow(divisibility));
  return decimalAmount;
}

function fromDecimalAmount(decimalAmount: string, divisibility: number) {
  decimalAmount = decimalAmount.replace(/\.$/, '');
  if (divisibility === 0) {
    return decimalAmount;
  }
  const amount = new BigNumber(decimalAmount).multipliedBy(new BigNumber(10).pow(divisibility));
  return amount.toString();
}

function compareAmount(a: string, b: string) {
  return new BigNumber(a).comparedTo(new BigNumber(b));
}

export const runesUtils = {
  toDecimalAmount,
  toDecimalNumber,
  fromDecimalAmount,
  compareAmount
};
