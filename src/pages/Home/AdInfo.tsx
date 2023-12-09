import * as React from 'react';
import { DiaDiem } from './dummyData';
import { Stack, Typography } from '@mui/material';

interface AdInfoProps {
  info: DiaDiem;
}

function AdInfo(props: AdInfoProps) {
  const { info } = props;

  return (
    <Stack spacing={1} width={200}>
      <Typography sx={{ fontWeight: 500, fontSize: 16 }}>{info.name}</Typography>
      <Typography>{info.description}</Typography>
    </Stack>
  );
}

export default React.memo(AdInfo);
