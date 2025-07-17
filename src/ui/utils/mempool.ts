import { UTXOBridge } from '../services/bridge/types';

export interface AnalyzeTransactionResult {
  txid: string;
  type: 'deposit' | 'withdraw' | 'neutral';
  amount: number;
  change: number;
  inputTotal: number;
  outputTotal: number;
}

export function analyzeTransaction(tx: UTXOBridge, targetAddress: string): AnalyzeTransactionResult {
  // 计算输入总额
  const inputTotal = tx.vin.reduce((sum, input) => {
    if (input.prevout.scriptpubkey_address === targetAddress) {
      return sum + input.prevout.value;
    }
    return sum;
  }, 0);

  // 计算输出总额
  const outputTotal = tx.vout.reduce((sum, output) => {
    if (output.scriptpubkey_address === targetAddress) {
      return sum + output.value;
    }
    return sum;
  }, 0);

  // 计算净变化
  const change = outputTotal - inputTotal;

  return {
    txid: tx.txid,
    type: change > 0 ? 'deposit' : change < 0 ? 'withdraw' : 'neutral',
    amount: Math.abs(change),
    change,
    inputTotal,
    outputTotal
  };
}

/**
 * 筛选BTC交易，排除Rune交易
 * @param transactions 交易数组
 * @returns 只包含BTC交易的数组
 */
export function filterBTCTransactions(transactions: UTXOBridge[]): UTXOBridge[] {
  return transactions.filter((tx) => {
    // 检查是否包含OP_RETURN输出（Rune交易的特征）
    const hasOpReturn = tx.vout.some((output) => output.scriptpubkey_type === 'op_return');

    // 检查是否包含Rune相关的输出
    // Rune交易通常有546 sats的Taproot输出作为Rune载体
    const hasRuneOutput = tx.vout.some((output) => output.scriptpubkey_type === 'v1_p2tr' && output.value === 546);

    // 检查OP_RETURN内容是否包含Rune协议标识
    const hasRuneProtocol = tx.vout.some((output) => {
      if (output.scriptpubkey_type === 'op_return') {
        const scriptAsm = output.scriptpubkey_asm;
        // Rune协议通常以 "OP_RETURN OP_PUSHNUM_13" 开头
        return scriptAsm.includes('OP_RETURN OP_PUSHNUM_13');
      }
      return false;
    });

    // 如果包含OP_RETURN且是Rune协议，则排除
    if (hasOpReturn && hasRuneProtocol) {
      return false;
    }

    // 如果同时有OP_RETURN和546 sats的Taproot输出，很可能是Rune交易
    if (hasOpReturn && hasRuneOutput) {
      return false;
    }

    // 其他情况认为是BTC交易
    return true;
  });
}
