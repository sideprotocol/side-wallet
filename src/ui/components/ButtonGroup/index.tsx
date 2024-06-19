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
}

export function ButtonGroup(props: IButtonGroupProps) {
  const { list, value, onChange, rowProps } = props;
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
                height: '26px',
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
