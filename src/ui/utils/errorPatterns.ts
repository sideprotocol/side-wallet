export const errorPatterns = {
  sideBTCInsufficientFunds: {
    pattern: new RegExp('sat.*insufficient funds|insufficient funds.*sat', 'i'),
    message: 'Insufficient BTC balance on the Side Chain to cover transaction fees'
  },

  sideBTCVaultNoUTXOs: {
    pattern: new RegExp('insufficient utxos', 'i'),
    message: 'Side Bridge’s vault currently has no usable UTXOs. Please wait and check back later.'
  },

  sideVaultUTXONumberLimit: {
    pattern: new RegExp('maximum utxo number exceeded', 'i'),
    message:
      'Side Bridge is currently experiencing high demand. The vault UTXOs are locked for other withdrawal requests. Please try a smaller amount or attempt your transaction again later.'
  }
};
