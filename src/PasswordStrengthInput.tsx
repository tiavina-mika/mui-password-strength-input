import { ChangeEvent, forwardRef, useState } from 'react';

import { IconButton, Stack, Typography, TextFieldProps, TextField, Box, styled } from '@mui/material';

import VisibilityOff from './icons/VisibilityOff';
import Visibility from './icons/Visibility';
import { CheckOptionResult, checkPasswordComplexity } from 'check-password-complexity';

type Labels = {
  tooWeak?: string;
  weak?: string;
  medium?: string;
  strong?: string;
}

/**
 * Colors for the password strength bar
 * each color will represent a different strength level
 * @see getPasswordStrengthLabel
 * @see evaluatePasswordStrength
 * @see PasswordStrengthType
 * @see PasswordInput
 * @see PasswordProps
 */
const colors = ['error.main', 'warning.main', 'success.light', 'success.main'];

/**
 * Get the label to be displayed depending on the strength level
 * or use custom labels if provided
 * @param strength
 * @param labels
 */
export const getPasswordStrengthLabel = (strength: CheckOptionResult['value'], labels?: Labels): string => {
  // custom labels
  if (labels) {
    let label: string = '';
    Object.keys(labels).forEach((key: string) => {
      if (strength === key && labels[key]) {
        return labels[key];
      }
    });
    return label;
  }

  // default labels
  switch (strength) {
    case 'tooWeak':
      return 'Too weak';
    case 'weak':
      return 'Weak';
    case 'medium':
      return 'Okay';
    default:
      return 'Strong';
  }
}

interface BarProps {
  color: string;
  disable: boolean;
}

const Bar = styled('div', {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== 'color' && prop !== 'disable',
})<BarProps>(({ theme, color, disable }) => {
  const colorArr = color.split('.');
  return {
    width: 40,
    height: 6,
    borderRadius: 6,
    backgroundColor: disable ? theme.palette.grey[300] : (theme.palette as any)[colorArr[0]][colorArr[1]],
  };
});

export type PasswordStrengthInputProps = {
  className?: string;
  labels?: Labels;
};

const PasswordStrengthInput =  forwardRef<HTMLDivElement, PasswordStrengthInputProps & TextFieldProps>(({ labels, className, ...rest }, ref) => {
  const [strengthOption, setStrengthOption] = useState<CheckOptionResult | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
              {showPassword ? <VisibilityOff /> : <Visibility />}
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
            <Stack direction="row" spacing={1}>
              {colors.map((color, index) => (
                <Bar
                  color={color}
                  // the bar color depends on the strength level
                  disable={index >= strengthOption.score - 1}
                  key={color}
                />
              ))}
            </Stack>
            {/* label to be displayed depending of the strength level */}
            <Typography variant="caption" color={colors.find((_, index) => index === (strengthOption.score - 1))}>
              {getPasswordStrengthLabel(strengthOption.value, labels)}
            </Typography>
          </Stack>
        </Box>
      )}
    </div>
  );
});

export default PasswordStrengthInput;
