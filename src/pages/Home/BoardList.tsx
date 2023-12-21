import * as React from 'react';
import { AdBoardInterface, DiaDiem } from './dummyData';
import { Box, ClickAwayListener, Stack, Typography, useTheme } from '@mui/material';
import { LabelValue } from '@base/types';
import { useEffect, useRef } from 'react';

interface BoardListProps {
  data: any[];
  setBoardData: React.Dispatch<any>;
}

const bodyFields: LabelValue[] = [
  {
    label: 'Kích thước',
    value: 'size',
  },
  {
    label: 'Số lượng',
    value: 'quantity',
  },
  {
    label: 'Hình thức',
    value: 'form',
  },
  {
    label: 'Phân loại',
    value: 'class',
  },
];

function BoardList(props: BoardListProps) {
  const { data, setBoardData } = props;
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <ClickAwayListener
      onClickAway={() => {
        setBoardData(null);
      }}
    >
      <Stack spacing={1} width={400} maxHeight={300} className="scroll-box" sx={{ overflowY: 'auto' }}>
        {data?.map((_item: any, i: number) => (
          <Box p={1} border={border} key={i}>
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{_item?.name}</Typography>

            {bodyFields?.map((_field: LabelValue) => (
              <Stack key={_field.value} direction="row" spacing={0.5}>
                <Typography fontWeight={500}>{`${_field.label}:`}</Typography>
                <Typography>{_item[_field.value]}</Typography>
              </Stack>
            ))}
          </Box>
        ))}
      </Stack>
    </ClickAwayListener>
  );
}

export default React.memo(BoardList);
