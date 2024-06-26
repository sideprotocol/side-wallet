import { Row, RowProps } from '../Row';

interface ButtonItem {
  key: string | number;
  label: string;
}

interface IButtonGroupProps {
  list: ButtonItem[];
  value: ButtonItem['key'];
  onChange: (value: ButtonItem['key']) => void;
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
          padding: '3px 0'
        }}>
        {list.map((item) => {
          return (
            <div
              key={item.key}
              style={{
                height,
                padding: '0 22px',
                backgroundColor: value === item.key ? '#404045' : 'transparent',
                borderRadius: '100px',
                color: '#fff',
                fontSize: '12px',
                opacity: 0.8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => {
                if (item.key === value) {
                  return;
                }
                onChange(item.key);
              }}>
              {item.label}
            </div>
          );
        })}
      </Row>
    </Row>
  );
}
