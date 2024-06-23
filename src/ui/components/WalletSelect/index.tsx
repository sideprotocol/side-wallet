import { useCurrentKeyring } from '@/ui/state/keyrings/hooks';

import { Icon } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

export default function WalletSelect() {
  const currentKeyring = useCurrentKeyring();
  return (
    <>
      <Row
        itemsCenter
        justifyBetween
        rounded
        onClick={() => {
          // setOpen(true);
          // navigate('SwitchAccountScreen');
        }}
        style={{
          padding: '5px 16px',
          gap: '10px'
        }}>
        <Text
          color="text"
          text={currentKeyring.alianName}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '17px'
          }}
        />
        <Icon icon="down" />
      </Row>
    </>
  );
}
