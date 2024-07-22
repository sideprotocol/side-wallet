import { useMemo } from 'react';

import { Column } from '../Column';
import { Logo } from '../Logo';
import { Row } from '../Row';
import { Text } from '../Text';
import './index.module.less';

interface HeaderProps {
  onBack?: () => void;
  onClickRight?: () => void;
  title?: React.ReactNode;
  leftTitle?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const { onBack, title, leftTitle, LeftComponent, RightComponent, onClickRight, children } = props;

  const CenterComponent = useMemo(() => {
    if (children) {
      return children;
    } else if (title) {
      return <Text size={'lg'} text={title} preset="regular-bold" />;
    } else {
      return <Logo preset="small" />;
    }
  }, [title]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px 20px'
        // marginBottom: '10px'
        // borderBottom: '1px solid #1E1E1F',
      }}>
      <Row full>
        <Column selfItemsCenter style={{ gap: '10px' }}>
          {LeftComponent}
          {onBack && (
            <Row
              style={{
                alignItems: 'center'
              }}
              onClick={(e) => {
                onBack();
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M20 8L12 16L20 24"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {leftTitle && <Text text={leftTitle} preset="title-bold" />}
            </Row>
          )}
        </Column>
      </Row>

      <Row itemsCenter>{CenterComponent}</Row>

      <Row onClick={onClickRight} full justifyEnd>
        <Column justifyCenter>{RightComponent}</Column>
      </Row>
    </div>
  );
}
