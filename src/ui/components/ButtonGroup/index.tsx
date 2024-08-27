import { colors } from '@/ui/theme/colors';

import { Row, RowProps } from '../Row';

interface ButtonItem {
  key: string | number;
  label: string;
}

interface IButtonGroupProps {
  list: ButtonItem[];
  value: ButtonItem['key'];
  onChange: (value: ButtonItem['key'], index: number) => void;
  rowProps: RowProps;
  size?: 'normal' | 'big';
}

export function ButtonGroup(props: IButtonGroupProps) {
  const { list, value, onChange, size, rowProps } = props;
  let height = '26px';
  if (size === 'big') {
    height = '34px';
  }
  return (
    <Row {...rowProps}>
      <Row
        justifyCenter
        style={{
          backgroundColor: '#1E1E1F',
          borderRadius: '100px',
          padding: '3px 5px',
          gap: '0'
        }}>
        {list.map((item, index) => {
          return (
            <div
              key={item.key}
              // className={value !== item.key ? 'bg-swap-hover' : ''}
              style={{
                height,
                padding: '0 22px',
                backgroundColor: value === item.key ? '#404045' : 'transparent',
                borderRadius: '100px',
                color: colors.white,
                fontSize: '12px',
                opacity: value === item.key ? 1 : 0.8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'background 0.6s ease'
              }}
              onClick={() => {
                if (item.key === value) {
                  return;
                }
                onChange(item.key, index);
              }}>
              {item.label}
            </div>
          );
        })}
      </Row>
    </Row>
  );
}
