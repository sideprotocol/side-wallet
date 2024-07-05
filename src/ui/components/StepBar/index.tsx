import { Row, RowProps } from '../Row';

interface StepProps {
  key: string | number;
  label: string;
}

interface IStepBarProps {
  items: StepProps[];
  activeKey: StepProps['key'];
  onChange?: (value: StepProps['key']) => void;
  rowProps?: RowProps;
}

export function StepBar(props: IStepBarProps) {
  const { items, activeKey, onChange, rowProps } = props;
  return (
    <Row justifyCenter {...rowProps}>
      {items.map((item) => (
        <div
          onClick={() => {
            onChange?.(item.key);
          }}
          key={item.key}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: +item.key <= +activeKey ? '#0DD4C3' : '#D9D9D9'
          }}
        />
      ))}
    </Row>
  );
}
