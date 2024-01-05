import React from 'react';
import ViewFields from './ViewFields';
import { reportFields } from './config/reportFields';
import { useParams } from 'react-router';
import { useReportByReportId } from 'src/hooks/useReportByReportId';
import { placementFields } from './config/placementField';
import { Stack, Typography } from '@mui/material';
import { contractFields } from './config/contractFields';
import Write from '../Write';
import { advertisementFields } from './config/advertisementFields';

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
      {data?.placement !== null ? (
        <>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Địa điểm</Typography>
          <ViewFields data={data?.placement} fieldConfigs={placementFields} />
        </>
      ) : null}

      {/* advertisement field */}
      {data?.advertisement !== null ? (
        <>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Bảng quảng cáo</Typography>
          <ViewFields data={data?.advertisement} fieldConfigs={advertisementFields} />
        </>
      ) : (
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Không có bảng quảng cáo</Typography>
      )}

      {/* contract field */}
      {data?.contract !== null ? (
        <>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Hợp đồng quảng cáo</Typography>
          <ViewFields data={data?.contract} fieldConfigs={contractFields} />
        </>
      ) : (
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Không có hợp đồng quảng cáo</Typography>
      )}

      <Write id={id || ''} />
    </Stack>
  );
};

export default View;
