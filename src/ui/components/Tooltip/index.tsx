import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 1)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    '& .MuiTooltip-arrow': {
      color: theme.palette.common.white
    }
  }
}));
