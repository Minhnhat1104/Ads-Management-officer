import React from 'react';
import ViewFields from './ViewFields';
import { requesterFields } from './config/requesterFields';
import { useParams } from 'react-router';
import { useReportByReportId } from 'src/hooks/useReportByReportId';
import { Box, Stack, Typography } from '@mui/material';
import { newDataFieldPlacement, newDataFieldAdvertisement } from './config/newDataField';
import Write from '../Write';
import Toolbar from './Toolbar';
import { oldDataFieldPlacement, oldDataFieldAdvertisement } from './config/oldDataField';
import { useRequestEditById } from 'src/hooks/useRequestEditById';

const View = () => {
  const { id } = useParams();

  const { data } = useRequestEditById(id);

  return (
    <>
      {data?.type === 'advertisement' ? (
        <Stack spacing={1} py={1}>
          {/* report field */}
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>CHI TIẾT YÊU CẦU CHỈNH SỬA BẢNG QUẢNG CÁO</Typography>
          <Toolbar data={data} />
          {/* Requester field */}
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Lý do chỉnh sửa</Typography>
          <Box dangerouslySetInnerHTML={{ __html: data.editReason }} />
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
              <ViewFields data={data?.newData} fieldConfigs={newDataFieldAdvertisement} />
            </>
          ) : (
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Không có bảng quảng cáo</Typography>
          )}

          {/* oldDataFieldAdvertisement */}
          {data?.oldData !== null ? (
            <>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Nội dung cũ</Typography>
              <ViewFields data={data?.oldData} fieldConfigs={oldDataFieldAdvertisement} />
            </>
          ) : null}
          <Write id={id || ''} />
        </Stack>
      ) : (
        <Stack spacing={1} py={1}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>CHI TIẾT YÊU CẦU CHỈNH SỬA ĐIỂM ĐẶT</Typography>
          <Toolbar data={data} />
          {/* requester field */}
          {data?.requester !== null ? (
            <>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Thông tin người yêu cầu chỉnh sửa</Typography>
              <ViewFields data={data?.requester} fieldConfigs={requesterFields} />
            </>
          ) : null}

          {/* newDataFieldPlacement */}
          {data?.newData !== null ? (
            <>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Nội dung mới</Typography>
              <ViewFields data={data?.newData} fieldConfigs={newDataFieldPlacement} />
            </>
          ) : (
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Không có bảng quảng cáo</Typography>
          )}

          {/* oldDataFieldPlacement */}
          {data?.oldData !== null ? (
            <>
              <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Nội dung cũ</Typography>
              <ViewFields data={data?.oldData} fieldConfigs={oldDataFieldPlacement} />
            </>
          ) : null}
          <Write id={id || ''} />
        </Stack>
      )}
    </>
  );
};

export default View;
