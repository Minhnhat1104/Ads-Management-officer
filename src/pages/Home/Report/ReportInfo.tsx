import * as React from 'react';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { REPORT_STATUS_OPTIONS } from 'src/constants';
import { LabelValue } from '@base/types';

interface ReportInfoProps {
  info: any;
}

function ReportInfo(props: ReportInfoProps) {
  const { info } = props;

  const state =
    REPORT_STATUS_OPTIONS.find((_option: LabelValue<string, number>) => _option?.value === info?.state) || null;

  return (
    <Stack spacing={1} width={200}>
      <Typography sx={{ fontWeight: 500, fontSize: 16 }}>{info.type}</Typography>
      <Typography>{info.address}</Typography>
      <Typography>{info.district + ', ' + info.ward}</Typography>
      <Typography>{info.created ? dayjs(info.created).format('DD/MM/YYYY HH:mm') : ''}</Typography>
      <Typography sx={{ fontWeight: 500, fontSize: 16, fontStyle: 'italic' }}>{state?.label}</Typography>
    </Stack>
  );
}

export default React.memo(ReportInfo);
