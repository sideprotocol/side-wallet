import { Icon } from '@/ui/components';
import { fontSizes } from '@/ui/theme/font';

import { Button } from '../Button';
import { Column } from '../Column';
import { Popover } from '../Popover';
import { Text } from '../Text';

export const EnableUnconfirmedPopover = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
  return (
    <Popover>
      <Column justifyCenter itemsCenter>
        <div className="w-[68px] bg-[#282521] h-[68px] rounded-full flex items-center justify-center">
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#F0B622] bg-opacity-10">
            <Icon icon={'warning2'} color={'icon_yellow'} size={24} />
          </div>
        </div>
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

        <Column full mt={'xl'}>
          <Button
            text="Allow using unconfirmed balance"
            preset="primary"
            onClick={(e) => {
              if (onConfirm) {
                onConfirm();
              }
            }}
            style={{
              fontWeight: 600,
              fontSize: fontSizes.sm,
              height: 48
            }}
          />
          <Button
            text="Cancel"
            preset="default"
            onClick={(e) => {
              if (onClose) {
                onClose();
              }
            }}
            style={{
              fontWeight: 600,
              fontSize: fontSizes.sm,
              height: 48
            }}
          />
        </Column>
      </Column>
    </Popover>
  );
};
