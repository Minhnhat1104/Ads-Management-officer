import React, { useContext, useEffect, useState } from 'react';

import { LabelValue } from '@base/types';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { HEADER_HEIGHT } from '@base/config/constants';
import { useAccountProfile } from 'src/hooks/useAccountProfile';
import { AuthContext } from '@base/auth/AuthProvider';
import UserInfoModal from '../UserInfoModal';
import { useRecoilState } from 'recoil';
import { profileAtom } from '@base/store/atoms/profileAtom';

const navItems: LabelValue[] = [
  {
    label: 'Bản đồ',
    value: '/',
  },
  {
    label: 'Quản lý quảng cáo',
    value: 'ads-management',
  },
  {
    label: 'Quảng lý báo cáo',
    value: 'resident-report',
  },
  {
    label: 'Yêu cầu cấp phép',
    value: 'ads-license',
  },
  {
    label: 'Demo Page',
    value: 'demo-page',
  },
];

export const departmentNavItems: LabelValue[] = [
  {
    label: 'Quản lý quận',
    value: 'district',
  },
  {
    label: 'Quản lý phường',
    value: 'ward',
  },
  {
    label: 'Quản lý loại bảng quảng cáo',
    value: 'ads-format',
  },
  {
    label: 'Quản lý loại hình thức báo cáo',
    value: 'report-type',
  },
  {
    label: 'Quản lý các điểm đặt quảng cáo',
    value: 'placement-location-type',
  },
  {
    label: 'Yêu cầu chỉnh sửa',
    value: 'request-edit',
  },
  {
    label: 'Quản lý tài khoản cán bộ',
    value: 'account',
  },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const [profile, setProfile] = useRecoilState(profileAtom);

  const [open, setOpen] = useState<boolean>(false);
  const [account, setAccount] = useState<any>();

  const { data } = useAccountProfile();

  useEffect(() => {
    if (data) {
      setAccount(data);
      setProfile(data);
    } else {
      setAccount(null);
      setProfile(null);
    }
  }, [data]);

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Stack
            height={HEADER_HEIGHT}
            direction="row"
            alignItems="center"
            justifyContent="left"
            spacing={2}
            borderBottom={border}
            py={1}
            marginLeft={3}
          >
            {navItems.concat(departmentNavItems).map((_item: LabelValue) => (
              <NavLink key={_item.value} to={_item.value} style={{ textDecoration: 'none' }}>
                {({ isActive, isPending }: any) => {
                  return (
                    <Typography
                      sx={{
                        textDecoration: 'none',
                        fontWeight: 500,
                        color: isActive ? theme.palette.primary.main : theme.palette.secondary.main,
                        lineHeight: '40px',
                      }}
                    >
                      {_item.label}
                    </Typography>
                  );
                }}
              </NavLink>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            height={HEADER_HEIGHT}
            direction="row"
            alignItems="center"
            justifyContent="right"
            spacing={2}
            borderBottom={border}
            py={1}
            marginRight={4}
            sx={{
              cursor: 'pointer',
              transition: 'color 0.3s ease-in-out', // Add a smooth transition for the color change
              '&:hover': {
                color: '#2196f3', // Change the color on hover
              },
            }}
            onClick={() => setOpen(true)}
          >
            <AccountCircleIcon fontSize="small" />
            {account && (
              <Typography style={{ fontSize: 16, fontWeight: 600 }}>
                {account.firstName + ' ' + account.lastName}
              </Typography>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setIsAuthenticated && setIsAuthenticated(false);
              }}
            >
              Đăng xuất
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {open && (
        <UserInfoModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          account={account}
        />
      )}
    </>
  );
};

export default Header;
