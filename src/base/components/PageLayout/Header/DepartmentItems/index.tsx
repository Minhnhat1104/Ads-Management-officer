import { LabelValue } from '@base/types';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Divider, Popover, Popper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
    label: 'Quản lý loại hình thức quảng cáo',
    value: 'ads-format',
  },
  {
    label: 'Quản lý loại bảng quảng cáo',
    value: 'advertisement-type',
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

interface DepartmentItemsProps {}

const DepartmentItems = (props: DepartmentItemsProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Stack direction="row" alignItems="center" aria-describedby={id} onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <Typography
          sx={{
            textDecoration: 'none',
            fontWeight: 500,
            color: theme.palette.secondary.main,
            lineHeight: '40px',
          }}
        >
          Các loại quản lý khác
        </Typography>
        <ExpandMoreOutlined color="secondary" />
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ zIndex: 2, border: `1px solid ${theme.palette.divider}` }}
      >
        <Stack sx={{ background: theme.palette.background.paper }} divider={<Divider />}>
          {departmentNavItems.map((_item: LabelValue) => (
            <NavLink key={_item.value} to={_item.value} style={{ textDecoration: 'none' }}>
              {({ isActive, isPending }: any) => {
                return (
                  <Typography
                    sx={{
                      textDecoration: 'none',
                      fontWeight: 500,
                      color: isActive ? theme.palette.primary.main : theme.palette.secondary.main,
                      lineHeight: '40px',
                      px: 2,
                      py: 1,
                    }}
                  >
                    {_item.label}
                  </Typography>
                );
              }}
            </NavLink>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default DepartmentItems;
