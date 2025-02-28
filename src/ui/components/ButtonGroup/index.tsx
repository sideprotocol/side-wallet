import { useEffect, useRef, useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);

  let height = size === 'big' ? '34px' : '26px';

  useEffect(() => {
    const index = list.findIndex((item) => item.key === value);
    setActiveIndex(index);
  }, [value, list]);

  return (
    <Row {...rowProps}>
      <Row
        justifyCenter
        style={{
          backgroundColor: colors.card_bgColor,
          borderRadius: '100px',
          padding: '3px 5px',
          gap: '0',
          position: 'relative'
        }}>
        <div
          style={{
            position: 'absolute',
            height,
            backgroundColor: '#404045',
            borderRadius: '100px',
            transition: 'all 0.3s ease',
            left: buttonRefs.current[activeIndex]?.offsetLeft ?? 0,
            width: buttonRefs.current[activeIndex]?.offsetWidth ?? 0
          }}
        />
        {list.map((item, index) => {
          return (
            <div
              key={item.key}
              ref={(el) => (buttonRefs.current[index] = el)}
              style={{
                height,
                padding: '0 22px',
                borderRadius: '100px',
                color: colors.white,
                fontSize: '12px',
                opacity: value === item.key ? 1 : 0.8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1
              }}
              onClick={() => {
                if (item.key === value) return;
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
