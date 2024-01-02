import { PasswordFieldProps } from '@base/types/common';
import { Height, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <Box sx={{ borderLeft: `1px solid ${theme.palette.secondary.light}` }}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              size="small"
              sx={{ height: 40, width: 40 }}
            >
              {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
            </IconButton>
          </Box>
        ),
      }}
      sx={{ '.MuiInputBase-root': { pr: 0 } }}
    />
  );
};

export default PasswordField;
