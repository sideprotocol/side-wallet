import { Icon, Row } from '@/ui/components';
import { fontSizes } from '@/ui/theme/font';

import { Button } from '../Button';
import { Column } from '../Column';
import { Popover } from '../Popover';
import { Text } from '../Text';

export const EnableUnconfirmedPopover = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
  return (
    <Popover>
      <Column justifyCenter itemsCenter>
        <Icon
          icon={'warning'}
          color={'icon_yellow'}
          size={57}
          style={{
            marginTop: '8px'
          }}
        />

        <Text
          text="Enable Unconfirmed Balance"
          mt="sm"
          preset="title-bold"
          style={{
            fontSize: '16px'
          }}
        />
        <Column gap="zero">
          <div style={{ fontSize: fontSizes.sm, marginTop: 0 }} className="text-opacity-50 text-white">
            If Runes (or ARC20) assets are detected in the given address, the unconfirmed UTXOs are explicitly not
            allowed to be spent until it's confirmed. Forcely spending these unconfirmed assets will incur the risks of
            losing assets.
          </div>
        </Column>

        <Row full mt={'xl'}>
          <Button
            text="Cancel"
            full
            preset="default"
            onClick={(e) => {
              if (onClose) {
                onClose();
              }
            }}
          />
          <Button
            text="Allow"
            preset="primary"
            full
            onClick={(e) => {
              if (onConfirm) {
                onConfirm();
              }
            }}
          />
        </Row>
      </Column>
    </Popover>
  );
};
