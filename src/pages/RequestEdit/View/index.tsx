import React from 'react';
import ViewFields from './ViewFields';
import { requesterFields } from './config/requesterFields';
import { useParams } from 'react-router';
import { useReportByReportId } from 'src/hooks/useReportByReportId';
import { Stack, Typography } from '@mui/material';
import { newDataField } from './config/newDataField';
import Write from '../Write';
import Toolbar from './Toolbar';
import { oldDataField } from './config/oldDataField';

const View = () => {
  const { id } = useParams();

  // const { data } = useReportByReportId(id);
  const { data } = useReportByReportId(id);

  return (
    <>
      <Toolbar />
      <Stack spacing={1} py={1}>
        {/* report field */}
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>CHI TIẾT YÊU CẦU CHỈNH SỬA</Typography>
        <ViewFields data={data} fieldConfigs={requesterFields} />
        {/* placement field */}
        {data?.requester !== null ? (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Thông tin người yêu cầu chỉnh sửa</Typography>
            <ViewFields data={data?.requester} fieldConfigs={requesterFields} />
          </>
        ) : null}

        {/* advertisement field */}
        {data?.newData !== null ? (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Nội dung mới</Typography>
            <ViewFields data={data?.newData} fieldConfigs={newDataField} />
          </>
        ) : (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Không có bảng quảng cáo</Typography>
        )}

        {/* contract field */}
        {data?.oldData !== null ? (
          <>
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Hợp đồng quảng cáo</Typography>
            <ViewFields data={data?.oldData} fieldConfigs={oldDataField} />
          </>
        ) : (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Không có hợp đồng quảng cáo</Typography>
        )}
        <Write id={id || ''} />
      </Stack>
    </>
  );
};

export default View;
