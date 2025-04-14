import React, { useEffect, useRef } from 'react';

import { colors } from '@/ui/theme/colors';
import { Box, SxProps, Theme, TooltipProps } from '@mui/material';

interface ITooltipV2Props {
  children: React.ReactNode;
  title: React.ReactNode;
  noOpen?: boolean;
  isLight?: boolean;
  placement?: TooltipProps['placement'];
  isH5?: boolean;
  interactive?: boolean;
  tooltipPadding?: number;
  sx?: SxProps<Theme>;
}

export function Tooltip(props: ITooltipV2Props) {
  const { children, title, noOpen, isLight = true, placement = 'top', isH5 } = props;
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getPositionStyle = (rect: DOMRect) => {
    const { left, top, width, height } = rect;
    const tooltipPadding = 0;

    // 获取layout元素
    const layoutElement = document.querySelector('.layout');
    if (!layoutElement) return '';

    // 获取layout的位置信息
    const layoutRect = layoutElement.getBoundingClientRect();

    // 计算相对于layout的位置
    const relativeLeft = left - layoutRect.left;
    const relativeTop = top - layoutRect.top;

    let position;
    if (placement === 'top') {
      position = `top:${relativeTop}px;left:${
        relativeLeft + width / 2
      }px;transform:translate(-50%, -250%) translateY(-${tooltipPadding}px)`;
    } else if (placement === 'bottom') {
      position = `top:${relativeTop + height}px;left:${
        relativeLeft + width / 2
      }px;transform:translate(-50%, 0) translateY(${tooltipPadding}px)`;
    } else if (placement === 'left') {
      position = `top:${
        relativeTop + height / 2
      }px;left:${relativeLeft}px;transform:translate(-100%, -50%) translateX(-${tooltipPadding}px)`;
    } else if (placement === 'right') {
      position = `top:${relativeTop + height / 2}px;left:${
        relativeLeft + width
      }px;transform:translate(0, -50%) translateX(${tooltipPadding}px)`;
    }

    // 延迟一帧获取 tooltip 尺寸并调整位置

    return `visibility:visible;${position}`;
  };

  useEffect(() => {
    if (isH5) {
      const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !(tooltipRef.current as any).contains(event.target)) {
          tooltipRef.current.style.visibility = 'hidden';
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isH5]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (noOpen) return;

    if (tooltipRef.current) {
      const isVisible = tooltipRef.current.style.visibility === 'visible';
      if (isVisible) {
        tooltipRef.current.style.cssText = 'visibility: hidden';
      } else {
        const rect = event.currentTarget.getBoundingClientRect();
        tooltipRef.current.style.cssText = getPositionStyle(rect);
      }
    }
  };

  if (!title) return <>{children}</>;

  return (
    <Box
      sx={{
        zIndex: 1
      }}
      {...(!isH5
        ? {
            onMouseLeave: (event: React.MouseEvent) => {
              event.stopPropagation();
              if (tooltipRef.current) {
                tooltipRef.current.style.visibility = 'hidden';
              }
            },
            onMouseEnter: (event: React.MouseEvent) => {
              event.stopPropagation();
              if (noOpen) return;
              const rect = event.currentTarget.getBoundingClientRect();
              if (tooltipRef.current) {
                tooltipRef.current.style.cssText = getPositionStyle(rect);
              }
            },
            onClick: (event: React.MouseEvent) => {
              event.stopPropagation();
            }
          }
        : {
            onClick: handleClick
          })}>
      <Box>{children}</Box>
      <Box
        ref={tooltipRef}
        sx={{
          visibility: 'hidden',
          position: 'fixed'
        }}>
        <Box
          sx={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0'
          }}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
              borderRadius: '10px',
              padding: '4px'
            }}>
            <Box
              sx={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                ...(placement === 'bottom' && {
                  left: '50%',
                  top: '-4px',
                  transform: 'translateX(-50%) rotate(45deg)'
                }),
                ...(placement === 'top' && {
                  left: '50%',
                  bottom: '-4px',
                  transform: 'translateX(-50%) rotate(45deg)'
                }),
                ...(placement === 'left' && {
                  right: '-4px',
                  top: '50%',
                  transform: 'translateY(-50%) rotate(45deg)'
                }),
                ...(placement === 'right' && {
                  left: '-4px',
                  top: '50%',
                  transform: 'translateY(-50%) rotate(45deg)'
                })
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '2px',
                right: '2px',
                top: '2px',
                bottom: '3px',
                backgroundColor: isLight ? colors.white : colors.black,
                borderRadius: '10px',
                ...props.sx
              }}>
              <Box
                sx={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  backgroundColor: isLight ? colors.white : colors.black,
                  ...props.sx,
                  ...(placement === 'bottom' && {
                    left: '50%',
                    top: '-4px',
                    transform: 'translateX(-50%) rotate(45deg)'
                  }),
                  ...(placement === 'top' && {
                    left: '50%',
                    bottom: '-4px',
                    transform: 'translateX(-50%) rotate(45deg)'
                  }),
                  ...(placement === 'left' && {
                    right: '-4px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)'
                  }),
                  ...(placement === 'right' && {
                    left: '-4px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)'
                  })
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'relative',
            zIndex: 101,
            p: '10px 12px',
            color: isLight ? colors.black : colors.white,
            fontSize: '12px',
            fontWeight: 500,
            minWidth: '50px',
            maxWidth: 'max-content',
            textAlign: 'center'
          }}>
          {title}
        </Box>
      </Box>
    </Box>
  );
}
