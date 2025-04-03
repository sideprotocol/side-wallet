import { NumericFormat } from 'react-number-format';

import { Coin } from '@cosmjs/stargate';

export type CoinInputProps = {
  coin: Coin;
  onChange: (value: string) => void;
  readOnly?: boolean;
  size?: number;
  color?: string;
  onInput?: () => void;
  decimalScale?: number;
};
export function CoinInput({ coin, onChange, readOnly, onInput, size, color, decimalScale }: CoinInputProps) {
  return (
    <NumericFormat
      type="text"
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
        color: color,
        overflow: 'hidden',
        resize: 'none'
      }}
      decimalScale={decimalScale || 6}
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
