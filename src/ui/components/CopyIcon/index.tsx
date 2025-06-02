import { useState } from 'react';

import { copyToClipboard } from '@/ui/utils';

import { Icon, IconProps } from '../Icon';
import { Row } from '../Row';
import { Text } from '../Text';

export function CopyIcon({
  text,
  onlyIcon = false,
  style,
  defaultColor,
  size = 20
}: {
  text: string;
  onlyIcon?: boolean;
  style?: React.CSSProperties;
  defaultColor?: IconProps['color'];
  size?: number;
}) {
  const [isClickCopy, setIsClickCopy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  function copy(str: string) {
    copyToClipboard(str).then(() => {
      // tools.toastSuccess('Copied');
      setTimeout(() => {
        setIsClickCopy(false);
      }, 3000);
    });
  }
  return (
    <Row
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      justifyCenter
      onClick={(e) => {
        e.stopPropagation();
        copy(text);
        setIsClickCopy(true);
      }}
      style={style}>
      <Icon
        icon={isClickCopy ? 'check-circle-broken' : 'copy2'}
        color={isClickCopy ? 'primary' : isHovered ? 'white' : defaultColor || 'search_icon'}
        size={size}
      />
      {!onlyIcon && (
        <Text
          text={isClickCopy ? 'Copied' : 'Copy to clipboard'}
          color={isClickCopy ? 'primary' : isHovered ? 'white' : 'search_icon'}
        />
      )}
    </Row>
  );
}
