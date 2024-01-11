import { useState } from 'react';

import { Button, IconButton, Stack, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { West } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { profileAtom } from '@base/store/atoms/profileAtom';
import Write from '../Write';
import { useParams } from 'react-router';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const navigate = useNavigate();
  const profile = useRecoilValue(profileAtom);
  const { id } = useParams();

  // state
  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  const handleRefresh = () => {
    // queryClient.invalidateQueries([queryKeys.advertisements]);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
        <Button variant="outlined" color="primary" startIcon={<West fontSize="small" />} onClick={handleBack}>
          Trở về
        </Button>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Xử lý
        </Button>
      </Stack>

      {open && <Write isOpen={open} onClose={() => setOpen(false)} id={id || ''} />}
    </>
  );
};

export default Toolbar;
