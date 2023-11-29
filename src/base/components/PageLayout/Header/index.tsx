import React from 'react';

import { LabelValue } from '@base/types';
import { Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { HEADER_HEIGHT } from '@base/config/constants';

const navItems: LabelValue[] = [
  {
    label: '  Home',
    value: '/',
  },
  {
    label: '  Ads Management',
    value: 'ads-management',
  },
  {
    label: '  Resident Report',
    value: 'resident-report',
  },
  {
    label: '  Ads license',
    value: 'ads-license',
  },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <Stack
      height={HEADER_HEIGHT}
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      borderBottom={border}
      py={1}
    >
      {navItems.map((_item: LabelValue) => (
        // <Button
        //   key={_item.value}
        //   variant="text"
        //   color={pathname === _item.value ? 'primary' : 'secondary'}
        //   onClick={() => handleNavigate(_item.value as string)}
        // >
        //   {_item.label}
        // </Button>

        <NavLink key={_item.value} to={_item.value} style={{ textDecoration: 'none' }}>
          {({ isActive, isPending }: any) => {
            if (isActive) {
              console.log('🚀 ~ file: index.tsx:51 ~ _item:', _item);
            }

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
  );
};

export default Header;
