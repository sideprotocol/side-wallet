// import {Card} from '../Card';
import { useState } from 'react';

import { useBlockstreamUrl } from '@/ui/state/settings/hooks';
import { copyToClipboard, shortAddress } from '@/ui/utils';

import { Column } from '../Column';
import { Icon } from '../Icon';
import { Popover } from '../Popover';
import { Row } from '../Row';
import { Text } from '../Text';

export const AddressDetailPopover = ({ address, onClose }: { address: string; onClose: () => void }) => {
  // const tools = useTools();
  const blockstreamUrl = useBlockstreamUrl();
  const [isClickCopy, setIsClickCopy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseOver2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };
  return (
    <Popover onClose={onClose}>
      <Column>
        <Text text={shortAddress(address)} />
        {/*<Card*/}
        {/*  preset="style2"*/}
        {/*  onClick={(e) => {*/}
        {/*    copyToClipboard(address).then(() => {*/}
        {/*      tools.toastSuccess('Copied');*/}
        {/*    });*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Row >*/}
        {/*    <Text*/}
        {/*      text={address}*/}
        {/*      style={{*/}
        {/*        overflowWrap: 'anywhere'*/}
        {/*      }}*/}
        {/*    />*/}
        {/*    <Icon icon="copy" />*/}
        {/*  </Row>*/}
        {/*</Card>*/}
        <div className="flex bg-[#000] p-[16px] rounded-[8px]">
          <Row
            onClick={() => {
              setIsClickCopy(true);
              copyToClipboard(address).then(() => {
                setTimeout(() => {
                  setIsClickCopy(false);
                }, 3000);
              });
            }}>
            <Text
              text={address}
              style={{
                overflowWrap: 'anywhere'
              }}
            />
            <div className="flex justify-center" onMouseOver={handleMouseOver2} onMouseLeave={handleMouseLeave2}>
              {/*<Icon icon="copy"/>*/}
              <Icon
                containerStyle={{
                  display: 'flex',
                  alignItems: 'center'
                }}
                icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
                color={isClickCopy ? 'green' : isHovered2 ? 'white' : 'search_icon'}
                size={20}
              />
            </div>
          </Row>
        </div>

        <div
          className={'flex items-center justify-center gap-[6px]'}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            window.open(`${blockstreamUrl}/address/${address}`);
          }}>
          <Icon icon="eye-white" size={20} color={isHovered ? 'white' : 'textDim'} />
          <Text preset="regular-bold" text="View on Block Explorer" color={isHovered ? 'white' : 'textDim'} />
        </div>
      </Column>
    </Popover>
  );
};
