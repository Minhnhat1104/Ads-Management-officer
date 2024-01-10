import React from 'react';

import MiModal from '@base/components/MiModal';
import { profileFields } from './profileFields';
import ViewFields from './ViewFields';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: any;
}

const UserInfoModal = (props: UserInfoModalProps) => {
  const { isOpen, onClose, account } = props;

  const navigate = useNavigate();

  const gotoView = (data: any) => {
    onClose();
    navigate(`/detail-info`, { state: { account } });
  };

  return (
    <MiModal title={'Thông tin cá nhân'} isOpen={isOpen} onClose={onClose} size="sm">
      <ViewFields data={account} fieldConfigs={profileFields} />
      <Button variant="contained" sx={{ marginTop: 2, marginBottom: 2, marginLeft: 2 }} onClick={gotoView}>
        Thay đổi thông tin
      </Button>
    </MiModal>
  );
};

export default UserInfoModal;
