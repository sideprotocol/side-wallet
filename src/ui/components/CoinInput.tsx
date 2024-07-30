import { Coin } from '@cosmjs/stargate';

import { NumericFormat } from 'react-number-format';

export type CoinInputProps = {
  coin: Coin;
  onChange: (value: string) => void;
  readOnly?: boolean;
  size?: number;
  onInput?: () => void;
};
export function CoinInput({ coin, onChange, readOnly, onInput, size }: CoinInputProps) {
  return (
    <NumericFormat
      type="text"
      // disableUnderline
      className="coin-input"
      readOnly={readOnly}
      style={{
        textDecoration: 'none',
        width: '100%',
        fontSize: size || '36px',
        background: 'transparent',
        border: 'none',
        fontWeight: '500',
        outline: 'none',
      }}
      onInput={() => onInput?.()}
      valueIsNumericString
      thousandSeparator
      placeholder={'0'}
      onValueChange={({ value }) => {
        const targetValue = value;
        if (targetValue.startsWith('.')) {
          return;
        }
        if (targetValue !== '' && !targetValue.match(/^\d*(\.\d*)?$/)) {
          return;
        }
        const amount = targetValue.replace(/^0+/, '0'); // remove prefix zeros
        onChange(amount);
      }}
      value={coin.amount}
    />
  );
}
