import React from 'react';

import MiModal from '@base/components/MiModal';
import { profileFields } from './profileFields';
import ViewFields from './ViewFields';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: any;
}

const UserInfoModal = (props: UserInfoModalProps) => {
  const { isOpen, onClose, account } = props;

  return (
    <MiModal title={'Thông tin cá nhân'} isOpen={isOpen} onClose={onClose} size="sm">
      {/* <Stack alignItems="center" justifyContent="center" padding={4}>
        <Typography style={{ fontSize: 24, fontWeight: 800, padding: 4 }}>{account?.roleName}</Typography>
        <Typography style={{ fontSize: 18, fontWeight: 600 }}>
          Họ tên: {account?.firstName + ' ' + account?.lastName}
        </Typography>
        <Typography style={{ fontSize: 18, fontWeight: 600, padding: 4 }}>Email: {account?.email}</Typography>
        <Typography style={{ fontSize: 18, fontWeight: 600, padding: 4 }}>Số điện thoại: {account?.phone}</Typography>
        <Typography style={{ fontSize: 18, fontWeight: 600, padding: 4 }}>
          Địa bàn: {account.ward + ', ' + account?.district}
        </Typography>
      </Stack> */}
      <ViewFields data={account} fieldConfigs={profileFields} />
    </MiModal>
  );
};

export default UserInfoModal;
