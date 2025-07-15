interface Transaction {
  txid: string;
  vin: Array<{
    prevout: {
      scriptpubkey_address: string;
      value: number;
    };
  }>;
  vout: Array<{
    scriptpubkey_address: string;
    value: number;
  }>;
  fee: number;
}

export interface AnalyzeTransactionResult {
  txid: string;
  type: "deposit" | "withdraw" | "neutral";
  amount: number;
  change: number;
  inputTotal: number;
  outputTotal: number;
}

export function analyzeTransaction(tx: Transaction, targetAddress: string): AnalyzeTransactionResult {
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
    type: change > 0 ? "deposit" : change < 0 ? "withdraw" : "neutral",
    amount: Math.abs(change),
    change,
    inputTotal,
    outputTotal,
  };
}
