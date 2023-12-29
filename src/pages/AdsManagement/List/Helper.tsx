import { Box, Button, IconButton, Stack, Theme, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import * as keyNames from './keyNames';
import { CheckCircle } from '@mui/icons-material';
import WritePage from '../Write';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const getMapColumns = () => {
  // const [open, setOpen] = useState<boolean>(false);
  return {
    [keyNames.KEY_NAME_ADS_PLACEMENT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_WIDTH](col: string, data: any) {
      return <Typography>{data?.[col] + 'm' || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_HEIGHT](col: string, data: any) {
      return <Typography>{data?.[col] + 'm' || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_IMAGE](col: string, data: any) {
      return (
        <Box
          component="img"
          sx={{
            height: 230,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Ads."
          src={data?.[col] || ''}
        />
      );
    },
    [keyNames.KEY_NAME_ADS_AMOUNT](col: string, data: any) {
      return <Typography>{data?.[col] || ''}</Typography>;
    },
    [keyNames.KEY_NAME_ADS_TYPE](col: string, data: any) {
      return <Typography>{data?.[col].name || ''}</Typography>;
    },
    // [keyNames.KEY_NAME_REPORT_ISPROCESSING](col: string, data: any) {
    //   return (
    //     <>
    //       {data?.[col] ? (
    //         <CheckCircle fontSize="small" color="success" />
    //       ) : (
    //         <CancelIcon fontSize="small" color="error" />
    //       )}
    //     </>
    //   );
    // },
    ['Detail'](col: string, data: any) {
      return (
        <>
          <Button
            variant="contained"
            onClick={() => {
              // setOpen(true);
              console.log('Detail clicked');
            }}
          >
            Xem chi tiết
          </Button>
          {/* {open && <WritePage isOpen={open} onClose={() => setOpen(false)} />} */}
        </>
      );
    },
  };
};
