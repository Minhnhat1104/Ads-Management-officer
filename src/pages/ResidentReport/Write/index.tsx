import React, { useState } from 'react';

import { Button, Stack, useTheme } from '@mui/material';

import QuillEditor from '@base/components/QuillEditor';
import LoadingButton from '@base/components/LoadingButton';
import { useReportMutation } from 'src/hooks/useReportMutation';
import { useQueryClient } from '@tanstack/react-query';
import { SET_TIMEOUT } from '@base/config/constants';
import { queryKeys } from '@base/config/queryKeys';

interface WriteProps {
  id: string;
}

const Write = (props: WriteProps) => {
  const { id } = props;
  const theme = useTheme();
  const queryClient = useQueryClient();

  // state
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const border = `1px solid ${theme.palette.divider}`;

  const { mSave } = useReportMutation(id);

  const handleSave = () => {
    const params = {
      state: 1, // trạng thái đã xử lí
      solution: content,
    };

    mSave.mutate(params, {
      onSuccess(data, variables, context) {
        setIsEdit(false);

        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.reportViewByReportId, id]);
        }, SET_TIMEOUT);
      },
    });
  };

  return (
    <>
      {isEdit ? (
        <>
          <QuillEditor value={content} onChange={setContent} />
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={() => setIsEdit(false)} variant="outlined">
              Hủy bỏ
            </Button>
            <LoadingButton onClick={handleSave} loading={mSave.isLoading} variant="contained" disabled={!content}>
              Lưu
            </LoadingButton>
          </Stack>
        </>
      ) : (
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={() => setIsEdit(true)} variant="contained">
            Xử lí báo cáo
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Write;
