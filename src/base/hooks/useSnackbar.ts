import React from 'react';

import toast from 'react-hot-toast';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useTheme } from '@mui/material';

export const useSnackbar = () => {
  const theme = useTheme();
  const enqueueSuccess = (msg: string) => {
    toast.success(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.success.main,
        secondary: theme.palette.secondary.main,
      },
      duration: 3000,
    });
  };
  const enqueueError = (msg: string) => {
    toast.error(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.success.main,
        secondary: theme.palette.secondary.main,
      },
      duration: 3000,
    });
  };
  return { enqueueSuccess, enqueueError };
};
