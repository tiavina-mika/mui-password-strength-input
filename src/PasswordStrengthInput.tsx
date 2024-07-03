import { ChangeEvent, ReactNode, forwardRef, useState } from 'react';

import { IconButton, Stack, Typography, TextFieldProps, TextField, Box, styled, Theme, useTheme } from '@mui/material';

import VisibilityOff from './icons/VisibilityOff';
import Visibility from './icons/Visibility';
import { CheckOptionResult, checkPasswordComplexity } from 'check-password-complexity';

type Strength ={
  label?: string;
  color?: string;
}
type Options = {
  tooWeak?: Strength;
  weak?: Strength;
  medium?: Strength;
  strong?: Strength;
}

type ColorOption = {
  color: string;
  value: string;
}

/**
 * Colors for the password strength bar
 * each color will represent a different strength level
 */
const getColors = (theme: Theme): ColorOption[] => [
  {
    color: theme.palette.error.main,
    value: 'tooWeak',
  },
  {
    color: theme.palette.warning.main,
    value: 'weak',
  },
  {
    color: theme.palette.success.light,
    value: 'medium',
  },
  {
    color: theme.palette.success.main,
    value: 'strong',
  },
];

export const getPasswordStrengthResult = (strength: CheckOptionResult['value'], options?: Options, theme?: Theme): Strength => {
  const option = options?.[strength];

  // default options
  switch (strength) {

    case 'tooWeak':
      return {
        label: option?.label || 'Too weak',
        color: option?.color || theme?.palette.error.main
      };
    case 'weak':
      return {
        label: option?.label || 'Weak',
        color: option?.color || theme?.palette.warning.main
      };
    case 'medium':
      return {
        label: option?.label || 'Okay',
        color: option?.color || theme?.palette.success.light
      };
    default:
      return {
        label: option?.label || 'Strong',
        color: option?.color || theme?.palette.success.dark
      };
  }
}

export type PasswordStrengthInputProps = {
  className?: string;
  options?: Options;
  inactiveColor?: string;
  barClassName?: string;
  strengthLabelClassName?: string;
  hidePasswordIcon?: ReactNode;
  showPasswordIcon?: ReactNode;
  barWidth?: number;
};
interface BarProps extends Pick<PasswordStrengthInputProps, 'inactiveColor' | 'barWidth'>{
  color: string;
  inactive: boolean;
}

const Bar = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'inactive' && prop !== 'inactiveColor' && prop !== 'barWidth',
})<BarProps>(({ theme, color, inactive, inactiveColor, barWidth }) => {
  const defaultInactiveColor = inactiveColor || theme.palette.grey[300];

  const style: Record<string, string | number> = {
    height: 6,
    borderRadius: 6,
    backgroundColor: inactive ? defaultInactiveColor : color,
  };

  if (barWidth) {
    style.width = barWidth;
  } else {
    style.flex = 1;
  }

  return style;
});

const PasswordStrengthInput =  forwardRef<HTMLDivElement, PasswordStrengthInputProps & TextFieldProps>(({
  inactiveColor,
  options,
  className,
  barClassName,
  strengthLabelClassName,
  hidePasswordIcon,
  showPasswordIcon,
  barWidth,
  ...rest
}, ref) => {
  const [strengthOption, setStrengthOption] = useState<CheckOptionResult | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useTheme();


  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const result = checkPasswordComplexity(value);
    setStrengthOption(result);

    rest.onChange?.(event);
  };

  return (
    <div>
      <TextField
        ref={ref}
        {...rest}
        className={className}
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {/* toggle eye icon */}
              {showPassword
                ? (hidePasswordIcon || <VisibilityOff />)
                : (showPasswordIcon || <Visibility />)
              }
            </IconButton>
          ),
        }}
      />

      {/* ------------------------------------------- */}
      {/* ------------ password strength ------------ */}
      {/* ------------------------------------------- */}
      {strengthOption && (
        <Box sx={{ mt: 0.8 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            {/*
            * each strength level (4) will have a different color
            * it will be displayed as a bar
            */}
            <Stack direction="row" spacing={1} flex={barWidth ? 'initial' : 1}>
              {getColors(theme).map((option: ColorOption, index: number) => (
                <Bar
                  color={(options as any)?.[option.value]?.color || option.color}
                  // the bar color depends on the strength level
                  inactive={index + 1 > strengthOption?.score}
                  inactiveColor={inactiveColor}
                  key={index}
                  className={barClassName}
                  barWidth={barWidth}
                />
                ))}
            </Stack>
            {/* label to be displayed depending of the strength level */}
            <Typography
              variant="caption"
              sx={{ color: getPasswordStrengthResult(strengthOption?.value, options, theme).color }}
              className={strengthLabelClassName}
            >
              {getPasswordStrengthResult(strengthOption?.value, options, theme).label}
            </Typography>
          </Stack>
        </Box>
      )}
    </div>
  );
});

export default PasswordStrengthInput;
