import React, { useEffect, useState } from 'react';

import { LabelValue } from '@base/types';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { HEADER_HEIGHT } from '@base/config/constants';
import { useAccounts } from 'src/hooks/useAccounts';
import { usePlacements } from 'src/hooks/usePlacements';

const navItems: LabelValue[] = [
  {
    label: '  Home',
    value: '/',
  },
  {
    label: 'Ads Management',
    value: 'ads-management',
  },
  {
    label: 'Resident Report',
    value: 'resident-report',
  },
  {
    label: 'Ads license',
    value: 'ads-license',
  },
  {
    label: 'Demo Page',
    value: 'demo-page',
  },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [account, setAccount] = useState<any>();

  const { data } = useAccounts();

  useEffect(() => {
    if (data) {
      setAccount(data);
      // console.log('🚀 ~ file: index.tsx:43 ~ data:', data);
    } else {
      setAccount(null);
      // console.log('🚀 ~ file: index.tsx:43 ~ data:', data);
    }
  }, [data]);

  const border = `1px solid ${theme.palette.divider}`;

  return (
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
          {navItems.map((_item: LabelValue) => (
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
        >
          <AccountCircleIcon fontSize="small" />
          {account && (
            <Typography style={{ fontSize: 16, fontWeight: 600 }}>
              {account.firstName + ' ' + account.lastName}
            </Typography>
          )}
          {/* <Button variant="contained" color="error">
            Đăng xuất
          </Button> */}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Header;
