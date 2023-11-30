import { useEffect, useState } from 'react';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import { ceil } from 'lodash';
import _ from 'lodash';
import IconButton from '@base/components/IconButton';

export interface ListPaginationProps {
  pageIndex: number; // current page
  pageTotal: number; // total page
  pageSize: number; // rows per page
  pageCount: number; // total rows ?
}

interface Props extends ListPaginationProps {
  gotoPage: (value: number) => void;
  setPageSize: (value: number, pageIndex?: number) => void;
  isSmall?: boolean; // isSplitMode
  sx?: SxProps;
}

const ListPagination = ({
  gotoPage,
  setPageSize,
  pageSize,
  pageIndex,
  pageTotal,
  pageCount,
  isSmall = false,
  sx,
}: Props) => {
  const theme = useTheme();
  const isFetching: number = useIsFetching();

  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState<boolean>(false);
  const [pageValue, setPageValue] = useState<number>(1);

  useEffect(() => {
    if (pageIndex) {
      if (!_.isEqual(pageIndex, pageValue)) {
        setPageValue(pageIndex);
      }
    } else {
      setPageValue(1);
    }
  }, [pageIndex]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (value: number) => {
    gotoPage(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = +event.target.value;
    const newPageTotal = ceil(pageCount / newPageSize);
    if (newPageTotal < pageIndex) {
      setPageSize(newPageSize, newPageTotal);
    } else {
      setPageSize(newPageSize);
    }
  };

  const isLastItem = pageCount - (pageIndex - 1) * pageSize === 1;

  const listPageOf =
    pageIndex === pageTotal
      ? pageCount === 0
        ? 0
        : isLastItem
        ? pageCount
        : `${(pageIndex - 1) * pageSize + 1} of ${pageCount}`
      : `${(pageIndex - 1) * pageSize + 1} of ${pageIndex * pageSize}`;

  return (
    <Stack
      color={'textSecondary'}
      direction={isSmall ? 'column' : 'row'}
      spacing={isSmall ? 1 : 0}
      sx={{
        px: isSmall ? 0 : 1,
        ...sx,
      }}
      alignItems={isSmall ? 'flex-end' : 'center'}
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={0} alignItems="center" sx={{ ml: 1 }}>
        <Typography
          variant="h5"
          sx={{
            mr: 1,
            fontWeight: theme.typography.fontWeightLight,
            color: theme.palette.text.secondary,
          }}
        >
          {`Total ${pageCount} | ${pageIndex} of ${pageTotal}`}
        </Typography>
        <IconButton
          size="medium"
          sx={{
            color: pageIndex > 1 ? 'grey.500' : 'grey.300',
            '&:hover': {
              borderColor: pageIndex > 1 ? 'grey.500' : 'grey.300',
              bgcolor: pageIndex > 1 ? 'grey.100' : 'inherit',
              color: pageIndex > 1 ? 'grey.500' : 'grey.300',
            },
          }}
          variant="text"
          shape="rounded"
          disabled={Boolean(isFetching) || pageIndex === 1}
          onClick={() => handleChangePagination(pageIndex - 1)}
        >
          <KeyboardArrowLeft sx={{ fontSize: '24px' }} />
        </IconButton>
        <IconButton
          size="medium"
          sx={{
            color: pageIndex < pageTotal ? 'grey.500' : 'grey.300',
            '&:hover': {
              borderColor: pageIndex < pageTotal ? 'grey.500' : 'grey.300',
              bgcolor: pageIndex < pageTotal ? 'grey.100' : 'inherit',
              color: pageIndex < pageTotal ? 'grey.500' : 'grey.300',
            },
          }}
          variant="text"
          shape="rounded"
          disabled={Boolean(isFetching) || pageIndex === pageTotal}
          onClick={() => handleChangePagination(pageIndex + 1)}
        >
          <KeyboardArrowRight sx={{ fontSize: '24px' }} />
        </IconButton>
        <Stack ml={1} direction={'row'} alignItems={'center'} spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: theme.typography.fontWeightLight,
              color: theme.palette.text.secondary,
            }}
          >
            Go to
          </Typography>
          <TextField
            sx={{ maxWidth: pageValue < 10 ? 32 : pageValue < 100 ? 40 : 46 }}
            size="small"
            // type="number"
            value={pageValue}
            onChange={(e: any) => {
              setPageValue(parseInt(e.target.value) || 0);
            }}
            onBlur={(e: any) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= pageTotal) {
                gotoPage(page);
              } else {
                gotoPage(pageTotal);
                setPageValue(pageTotal);
              }
            }}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography
          variant="h5"
          sx={{
            fontWeight: theme.typography.fontWeightLight,
            color: theme.palette.text.secondary,
          }}
        >
          Row per page
        </Typography>
        <FormControl sx={{ m: 1 }}>
          <Select
            size="small"
            sx={{
              '& .MuiSelect-outlined': {
                display: 'flex',
                alignItems: 'center',
              },
            }}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {[10, 15, 25, 50, 100].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default ListPagination;
