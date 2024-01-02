import React from 'react';

import toast from 'react-hot-toast';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useTheme } from '@mui/material';

export const useSnackBar = () => {
  const theme = useTheme();
  const enqueueSuccessBar = (msg: string) => {
    toast.success(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.success.main,
        secondary: theme.palette.secondary.main,
      },
      duration: 3000,
    });
  };
  const enqueueErrorBar = (msg: string) => {
    toast.error(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.error.light,
        secondary: theme.palette.secondary.main,
      },
      duration: 3000,
      style: {
        backgroundColor: 'red', // Màu sắc nền thông báo
        color: 'white', // Màu chữ
        fontWeight: 700,
      },
    });
  };
  return { enqueueSuccessBar, enqueueErrorBar };
};
