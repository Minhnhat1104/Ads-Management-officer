import React from 'react';
import ViewFields from './ViewFields';
import { reportFields } from './config/reportFields';
import { useParams } from 'react-router';
import { useReportByReportId } from 'src/hooks/useReportByReportId';
import { placementFields } from './config/placementField';
import { Stack, Typography } from '@mui/material';
import { contractFields } from './config/contractFields';
import Write from '../Write';

const View = () => {
  const { id } = useParams();

  // const { data } = useReportByReportId(id);
  const { data } = useReportByReportId(id);

  return (
    <Stack spacing={1} py={1}>
      {/* report field */}
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Thông tin người báo cáo</Typography>
      <ViewFields data={data} fieldConfigs={reportFields} />

      {/* placement field */}
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Địa điểm</Typography>
      <ViewFields data={data?.placement} fieldConfigs={placementFields} />

      {/* contract field */}
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Hợp đồng quảng cáo</Typography>
      <ViewFields data={data?.contract} fieldConfigs={contractFields} />

      <Write id={id || ''} />
    </Stack>
  );
};

export default View;
