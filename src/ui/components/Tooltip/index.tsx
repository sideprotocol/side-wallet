import { colors } from '@/ui/theme/colors';
import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: colors.white,
    color: colors.black,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    '& .MuiTooltip-arrow': {
      color: colors.white
    }
  }
}));
