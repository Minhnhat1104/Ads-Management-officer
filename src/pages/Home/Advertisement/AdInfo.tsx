import * as React from 'react';
import { Stack, Typography } from '@mui/material';

interface AdInfoProps {
  info: any;
}

function AdInfo(props: AdInfoProps) {
  const { info } = props;

  return (
    <Stack spacing={1} width={200}>
      <Typography sx={{ fontWeight: 500, fontSize: 16 }}>{info?.format}</Typography>
      <Typography>{info?.locationType}</Typography>
      <Typography>{info?.address}</Typography>
      <Typography>{info?.district + ' ' + info?.ward}</Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 16, fontStyle: 'italic' }}>
        {info?.planned ? 'Đã quy hoạch' : 'Chưa quy hoạch'}
      </Typography>
    </Stack>
  );
}

export default React.memo(AdInfo);
