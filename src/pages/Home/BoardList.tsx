import * as React from 'react';
import { Box, ClickAwayListener, Stack, Typography, useTheme } from '@mui/material';
import { LabelValue } from '@base/types';

interface BoardListProps {
  locationAds: any[];
  boardData: any;
  setBoardData: React.Dispatch<any>;
}

const advertisementFields: LabelValue[] = [
  {
    label: 'Chiều dài',
    value: 'width',
  },
  {
    label: 'Chiều rộng',
    value: 'height',
  },
  {
    label: 'Số lượng',
    value: 'amount',
  },
];

const placementFields: LabelValue[] = [
  {
    label: 'Hình thức',
    value: 'format',
  },
  {
    label: 'Phân loại',
    value: 'locationType',
  },
];

function BoardList(props: BoardListProps) {
  const { locationAds, boardData, setBoardData } = props;
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <ClickAwayListener
      onClickAway={() => {
        setBoardData(null);
      }}
    >
      <Stack spacing={1} width={400} maxHeight={300} className="scroll-box" sx={{ overflowY: 'auto' }}>
        {boardData &&
          locationAds
            ?.filter((_item: any) => parseFloat(_item.lat) === boardData.lat && parseFloat(_item.lng) === boardData.lng)
            .map((_item: any, i: number) => (
              <Box p={1} key={i}>
                {boardData.data.map((item: any, j: number) => (
                  // Ensure you return the JSX elements

                  <Box key={j} border={border} marginTop={'5px'} padding={'5px'}>
                    {<Typography sx={{ fontSize: 20, fontWeight: 500 }}>{item?.advertisingType}</Typography>}

                    {advertisementFields?.map((_field: LabelValue) => (
                      <Stack key={_field.value} direction="row" spacing={0.5}>
                        <Typography fontWeight={500}>{`${_field.label}:`}</Typography>
                        <Typography>{item[_field.value]}</Typography>
                      </Stack>
                    ))}

                    {placementFields?.map((_field: LabelValue) => (
                      <Stack key={_field.value} direction="row" spacing={0.5}>
                        <Typography fontWeight={500}>{`${_field.label}:`}</Typography>
                        <Typography>{_item[_field.value]}</Typography>
                      </Stack>
                    ))}
                  </Box>
                ))}
              </Box>
            ))}
      </Stack>
    </ClickAwayListener>
  );
}

export default React.memo(BoardList);
