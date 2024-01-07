import React from 'react';
import ViewFields from './ViewFields';
import { placementFields } from './config/placementFields';
import { useParams } from 'react-router';
import { useRequest } from 'src/hooks/useRequest';
import { requesterField } from './config/requesterField';
import { Stack, Typography } from '@mui/material';
import { companyFields } from './config/companyFields';
import { advertisementFields } from './config/advertisementFields';
import Toolbar from './Toolbar';
import { approverField } from './config/approverField';
import { requestField } from './config/requestField';

const View = () => {
  const { id } = useParams();

  const { data } = useRequest(id);

  return (
    <>
      <Toolbar data={data} />
      <Stack spacing={1} py={1}>
        {/* report field */}
        {/* <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Thông tin bảng quảng cáo</Typography> */}
        <ViewFields data={{ ...data }} fieldConfigs={requestField} />
        {/* report field */}
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Thông tin bảng quảng cáo</Typography>
        <ViewFields
          data={{ ...data?.advertisementData, advertisingType: data?.advertisingType }}
          fieldConfigs={advertisementFields}
        />
        {/* placement field */}
        {data?.placement && (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Địa điểm</Typography>
            <ViewFields data={data?.placement} fieldConfigs={placementFields} />
          </>
        )}
        {/* company field */}
        {data?.company && (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Thông tin công ty</Typography>
            <ViewFields data={data?.company} fieldConfigs={companyFields} />
          </>
        )}
        {/* requester field */}
        {data?.requester && (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Người yêu cầu</Typography>
            <ViewFields data={data?.requester} fieldConfigs={requesterField} />
          </>
        )}
        {/* approver field */}
        {data?.approver ? (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Người xử lí</Typography>
            <ViewFields data={data?.approver} fieldConfigs={approverField} />
          </>
        ) : (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Chưa có người xử lí</Typography>
        )}
      </Stack>
    </>
  );
};

export default View;
